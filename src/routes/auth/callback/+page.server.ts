import type { PageServerLoad } from '../$types';
import { error } from '@sveltejs/kit';
import { SPOTIFY_CLIENT_ID } from '$env/static/private';
import { SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { SPOTIFY_REDIRECT_URL } from '$env/static/private';

export const load = (async ({ url }) => {
    const results = url.searchParams;
    const errorParam = results.get('error');
    if (errorParam) {
        throw error(401, errorParam);
    }
    const code = results.get('code');
    const state = results.get('state');

    //Base 64 encode client id and client secret
    const encodedStringBtoA = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

    const tokenRequest = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + encodedStringBtoA
        },
        //form data body for token request
        //@ts-ignore
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: SPOTIFY_REDIRECT_URL
        })
    });

    const tokenResponse = await tokenRequest.json();
    console.log(tokenResponse);

    return {
        props: {
            code,
            state
        }
    };
}) satisfies PageServerLoad;
