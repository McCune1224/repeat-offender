import { GetMe } from '$lib/spotify/API';
import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad, RequestEvent } from './$types';

export type spotifyToken = string;

export const load: PageServerLoad = async ({ cookies }) => {
    const spotifyToken = cookies.get('spotify_token');

    if (!spotifyToken) {
        throw redirect(301, '/');
    }

    const spotifyUser = await GetMe(spotifyToken);
    if (!spotifyUser) {
        throw error(500, 'Could not get Spotify user');
    }
    console.log(spotifyUser);

    return {
        spotifyToken,
        spotifyUser
    };
};
