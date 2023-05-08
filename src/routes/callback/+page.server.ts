import { error, redirect } from '@sveltejs/kit';
import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIRECT_URL
} from '$env/static/private';
import type { PageServerLoad } from './$types';

// iunno I just kinda want the type incase I want to use it later
type SpotifyTokenResponse = {
	access_token: string;
	token_type: string;
	scope: string;
	expires_in: number;
	refresh_token: string;
};

export const load: PageServerLoad = async ({ cookies, fetch, url }) => {
	// Get params from redirect
	const params = url.searchParams;
	const code = params.get('code');

	// Error if missing code param
	if (!code) {
		console.log('Missing code', code);
		throw error(500, 'Missing Spotify Code');
	}

	// Exchange code for token
	const authHeaderBuffer = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;
	const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(authHeaderBuffer).toString('base64')}`
		},
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			code,
			redirect_uri: SPOTIFY_REDIRECT_URL
		})
	});

	// Response from Exchange
	const tokenResponseJson = await tokenResponse.json();
	if (tokenResponseJson.error) {
		console.log('Error from Spotify: ', tokenResponseJson.error);
		throw error(500, tokenResponseJson.error_description);
	}
	const validTokenResponse: SpotifyTokenResponse = {
		access_token: tokenResponseJson['access_token'],
		token_type: tokenResponseJson['token_type'],
		scope: tokenResponseJson['scope'],
		expires_in: tokenResponseJson['expires_in'],
		refresh_token: tokenResponseJson['refresh_token']
	};

	// set token in cookie
	if (cookies.get('spotify_token')) {
		cookies.delete('spotify_token');
	}
	cookies.set('spotify_token', validTokenResponse.access_token, {
		path: '/',
		expires: new Date(Date.now() + 1000 * validTokenResponse.expires_in)
	});
	console.log('spotify_token', validTokenResponse.access_token);
	console.log('HIT FROM CALLBACK');
	throw redirect(308, '/dashboard');
};
