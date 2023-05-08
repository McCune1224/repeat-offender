import { GetMe } from '$lib/spotify/API';
import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export type spotifyToken = string;

export const load: PageServerLoad = async ({ cookies }) => {
	const spotifyToken = cookies.get('spotify_token');
	console.log('spotifyToken', spotifyToken);

	if (!spotifyToken) {
		console.log('HIT FROM DASH');
		throw redirect(308, '/');
	}

	const spotifyUser = await GetMe(spotifyToken);
	if (!spotifyUser) {
		throw error(500, 'Could not get Spotify user');
	}

	return {
		spotifyToken,
		spotifyUser
	};
};
