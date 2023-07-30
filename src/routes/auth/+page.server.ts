import type { PageServerLoad } from './$types';

import { SPOTIFY_CLIENT_ID } from '$env/static/private';
import { SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { SPOTIFY_REDIRECT_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ }) => {
    const state = 'some-random-state';
    const scopes =
        'playlist-read-private playlist-modify-private playlist-modify-public user-library-read user-library-modify';
    const base_url = 'https://accounts.spotify.com/authorize';
    const query = new URLSearchParams({
        client_id: SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: SPOTIFY_REDIRECT_URL,
        state,
        scope: scopes
    });

    const url = `${base_url}?${query.toString()}`;

    throw redirect(301, url);
}) satisfies PageServerLoad;
