import { error } from '@sveltejs/kit';
import type { Playlist, PlaylistResponse, SpotifyUser, Track, TrackResponse } from './spotifyTypes';

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
): Promise<Playlist[]> {
	const currUser = await GetMe(accessToken);

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
): Promise<Track[]> {
	const tracksResponse = await SpotifyAPIRequest<TrackResponse>(
		`/playlists/${playlistId}/tracks`,
		accessToken
	);
	const tracks = tracksResponse.items.map((trackResponse) => trackResponse.track);
	return tracks;
}

export function GetTrackDuplicates(items: Array<Track>): Array<Track> {
	const duplicates: Array<Track> = [];
	const seen = new Set<string>();
	items.forEach((item) => {
		if (seen.has(item.id)) {
			duplicates.push(item);
		} else {
			seen.add(item.id);
		}
	});
	return duplicates;
}
