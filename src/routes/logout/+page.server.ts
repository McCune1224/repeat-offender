import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	if (!cookies.get('spotify_token')) {
		console.log('NO SPOTIFY TOKEN', cookies.get('spotify_token'));
		throw redirect(301, '/');
	}
	cookies.delete('spotify_token');

	throw redirect(301, '/');
};
