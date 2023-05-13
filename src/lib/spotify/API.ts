import { error } from '@sveltejs/kit';
import type {
    UserPlaylistsResponse,
    PlaylistItems,
    PlaylistItemsResponse,
    PlaylistResponse,
    SpotifyUser,
    TrackItems,
    TrackResponse,
    SavedUserTrackResponse
} from './spotifyTypes';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

export async function SpotifyAPIRequest<SpotifyResponseType>(
    endpoint: string,
    token: string,
    ...opts: any
): Promise<SpotifyResponseType> {
    const fullUrl = SPOTIFY_API_BASE_URL + endpoint;
    const spotifyResponse = await fetch(fullUrl, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        ...opts
    });
    if (!spotifyResponse.ok) {
        throw error(spotifyResponse.status, spotifyResponse.statusText);
    }
    const spotifyResponseJson: SpotifyResponseType = await spotifyResponse.json();
    return spotifyResponseJson;
}

export async function GetMe(accessToken: string): Promise<SpotifyUser> {
    return await SpotifyAPIRequest<SpotifyUser>('/me', accessToken);
}

export async function GetUserPlaylists(
    accessToken: string,
    limit: number = 10,
    offset: number = 0
): Promise<PlaylistItems[]> {
    const currUser = await GetMe(accessToken);

    //Get only the playlists that are modifiable by the owner
    const playlistResponse = await SpotifyAPIRequest<PlaylistResponse>(
        `/me/playlists?limit=${limit}&offset=${offset}`,
        accessToken
    );
    // Filter out playlists that are not owned by the user
    return playlistResponse.items;
}

export async function GetPlaylistTracks(
    accessToken: string,
    playlistId: string,
    limit: number = 100
): Promise<TrackItems[]> {
    const tracksResponse = await SpotifyAPIRequest<TrackResponse>(
        `/playlists/${playlistId}/tracks`,
        accessToken
    );
    const tracks = tracksResponse.items.map((trackResponse) => trackResponse.track);
    return tracks;
}

export async function GetAllModifiableUserPlaylists(accessToken: string): Promise<PlaylistItems[]> {
    const currentUser = await GetMe(accessToken);
    let limit = 50;
    let offset = 0;
    let playlists: PlaylistItems[] = [];
    // Make iniital fetch
    const initialPlaylist = await SpotifyAPIRequest<UserPlaylistsResponse>(
        `/me/playlists?limit=${limit}&offset=${offset}`,
        accessToken
    );
    // Filter only on playlists that are modifiable by the owner
    playlists = playlists.concat(
        initialPlaylist.items.filter(
            (playlist) => playlist.owner.display_name === currentUser.display_name
        )
    );
    // Fetch the rest of the playlists (if any)
    while (initialPlaylist.next) {
        offset += limit;
        const nextPlaylist = await SpotifyAPIRequest<UserPlaylistsResponse>(
            `/me/playlists?limit=${limit}&offset=${offset}`,
            accessToken
        );
        playlists = playlists.concat(
            nextPlaylist.items.filter(
                (playlist) => playlist.owner.display_name === currentUser.display_name
            )
        );
    }
    return playlists;
}

export function GetTrackDuplicates(items: Array<TrackItems>): Array<TrackItems> {
    // Conditions to mark a track as a duplicate:
    // 1. Spotify track id is the same
    // 2. Same track name && artist
    // 3. song track name && artist && track length
    let duplicates: Array<TrackItems> = [];

    // 1. Spotify track id is the same
    const seenIds: Set<string> = new Set();
    items.forEach((currentTrack) => {
        // 1. Spotify track id is the same
        if (seenIds.has(currentTrack.id)) {
            duplicates.push(currentTrack);
            return;
        } else {
            seenIds.add(currentTrack.id);
        }

        // 2. Same track name && artist
        const sameTrackNameArtist = items.filter(
            (track) => track.name === currentTrack.name && track.artists === currentTrack.artists
        );
        if (sameTrackNameArtist.length > 1) {
            duplicates.push(currentTrack);
            return;
        }
        // 3. song track name && artist && track length
        const sameTrackNameTrackLength = items.filter(
            (track) =>
                track.name === currentTrack.name && track.duration_ms === currentTrack.duration_ms
        );

        if (sameTrackNameTrackLength.length > 1) {
            duplicates.push(currentTrack);
            return;
        }
    });

    return duplicates;
}

export async function GetAllPlaylistTracks(
    accessToken: string,
    playlistId: string
): Promise<TrackItems[]> {
    let offset = 0;
    let limit = 100;
    let tracks: TrackItems[] = [];
    let playlistItems = await SpotifyAPIRequest<PlaylistItemsResponse>(
        `/playlists/${playlistId}/tracks`,
        accessToken
    );
    tracks = tracks.concat(playlistItems.items.map((item) => item.track));
    while (playlistItems.next) {
        offset += limit;
        playlistItems = await SpotifyAPIRequest<PlaylistItemsResponse>(
            `/playlists/${playlistId}/tracks?offset=${offset}`,
            accessToken
        );
        tracks = tracks.concat(playlistItems.items.map((item) => item.track));
    }
    return tracks;
}

export async function GetUserSavedTracks(accessToken: string, max?: number): Promise<TrackItems[]> {
    let offset = 0;
    let limit = 50;
    let tally = 0;
    let tracks: TrackItems[] = [];
    let savedTracks = await SpotifyAPIRequest<SavedUserTrackResponse>(
        `/me/tracks?limit=${limit}&offset=${offset}`,
        accessToken
    );
    savedTracks.items.forEach((track) => tracks.push(track.track));
    tally += savedTracks.items.length;
    while (savedTracks.next) {
        offset += limit;
        savedTracks = await SpotifyAPIRequest<SavedUserTrackResponse>(
            `/me/tracks?limit=${limit}&offset=${offset}`,
            accessToken
        );
        savedTracks.items.forEach((track) => tracks.push(track.track));
        tally += savedTracks.items.length;
        if (max && tally >= max) {
            break;
        }
    }
    console.log('JOBS DONE');
    return tracks;
}
