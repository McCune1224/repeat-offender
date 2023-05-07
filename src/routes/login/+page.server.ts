import { SPOTIFY_REDIRECT_URL, SPOTIFY_CLIENT_ID } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';

export const load = async () => {
	if (!SPOTIFY_CLIENT_ID || !SPOTIFY_REDIRECT_URL) {
		throw error(500, 'Missing Spotify Client ID or Redirect URL');
	}
	const spotify_scopes = [
		'user-read-email',
		'user-library-read',
		'user-library-modify',
		'playlist-read-private',
		'playlist-modify-private',
		'playlist-modify-public'
	];
	const params = new URLSearchParams({
		response_type: 'code',
		client_id: SPOTIFY_CLIENT_ID,
		redirect_uri: SPOTIFY_REDIRECT_URL,
		scope: spotify_scopes.join(' ')
	});
	const fullRedirectUrl = `https://accounts.spotify.com/authorize?${params}`;
	throw redirect(301, fullRedirectUrl);
};
