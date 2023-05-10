import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const prerender = false;

export const load: LayoutServerLoad = async ({ cookies }) => {
	const spotifyToken = cookies.get('spotify_token');
	if (!spotifyToken) {
		return {
			loggedIn: false
		};
	}
	return {
		loggedIn: true
	};
};
