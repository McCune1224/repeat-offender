import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	cookies.set('access_token', '', { path: '/' });
	throw redirect(301, `/`);
}) satisfies PageServerLoad;
