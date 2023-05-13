import { GetMe, GetUserPlaylists } from '$lib/spotify/API';
import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export type spotifyToken = string;

export const load: PageServerLoad = async ({ cookies }) => {
    const spotifyToken = cookies.get('spotify_token');

    if (!spotifyToken) {
        console.log('NO SPOTIFY TOKEN');
        throw error(500, 'No Spotify token');
    }

    const spotifyUser = await GetMe(spotifyToken);
    if (!spotifyUser) {
        throw error(500, 'Could not get Spotify user');
    }

    const initialPlaylist = await GetUserPlaylists(spotifyToken);

    return {
        spotifyToken,
        spotifyUser,
        initialPlaylist
    };
};
