// Generic helper funciton to send a request to specified url with a token

import type SpotifyWebApi from 'spotify-web-api-js';

export async function GetAllTrackItems(client: SpotifyWebApi.SpotifyWebApiJs, playlistID: string) {
    const trackItems: SpotifyApi.PlaylistTrackObject[] = [];

    let response = await client.getPlaylistTracks(playlistID);
    response.items.forEach((item) => {
        trackItems.push(item);
    });

    while (response.next) {
        const nextResponse = await client.getPlaylistTracks(playlistID, {
            offset: response.offset + response.limit
        });
        nextResponse.items.forEach((item) => {
            trackItems.push(item);
        });
        response = nextResponse;
    }
    return trackItems;
}

export async function FilterDuplicateTracks(
    client: SpotifyWebApi.SpotifyWebApiJs,
    playlist: SpotifyApi.PlaylistObjectSimplified
) {
    const allTracks = await GetAllTrackItems(client, playlist.id);
    const duplicateTracksTally: Map<string, number> = new Map();
    const duplicateTracks: SpotifyApi.PlaylistTrackObject[] = [];

    allTracks.forEach((track) => {
        if (duplicateTracksTally.has(track.track.id)) {
            duplicateTracksTally.set(track.track.id, duplicateTracksTally.get(track.track.id)! + 1);
            duplicateTracks.push(track);
        } else {
            duplicateTracksTally.set(track.track.id, 1);
        }
    });
    return duplicateTracks;
}

export async function RemoveDuplicates(
    client: SpotifyWebApi.SpotifyWebApiJs,
    playlistID: string,
    duplicateTracks: SpotifyApi.PlaylistTrackObject[]
) {
    const trackURIs: string[] = [];
    duplicateTracks.forEach((track) => {
        trackURIs.push(track.track.uri);
    });
    client.removeTracksFromPlaylist(playlistID, trackURIs);

    // Spotify API is very cool and based and will remove ALL instances of a track even if you only specify one track
    // So need to add back in the first instance of each track so that the playlist maintains a single instance of each track
    let uniqueDuplicateTracks = new Set<string>();
    duplicateTracks.forEach(async (track) => {
        uniqueDuplicateTracks.add(track.track.uri);
    });

    uniqueDuplicateTracks.forEach(async (trackID) => {
        let response = await client.addTracksToPlaylist(playlistID, [trackID]);
    });
}
