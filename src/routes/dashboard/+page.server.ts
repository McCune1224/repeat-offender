import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    if (!cookies.get('access_token')) {
        throw redirect(301, `/?error=not_logged_in`);
    }

    return {
        props: {
            access_token: cookies.get('access_token')
        }
    };
}) satisfies PageServerLoad;
