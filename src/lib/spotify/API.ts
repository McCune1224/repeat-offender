import { error } from '@sveltejs/kit';
import type { Playlist, SpotifyUser } from './spotifyTypes';

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

export async function GetUserPlaylists(accessToken: string): Promise<Playlist> {
	return await SpotifyAPIRequest<Playlist>('/me/playlists', accessToken);
}
