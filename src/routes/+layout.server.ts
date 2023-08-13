import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	if (cookies.get('access_token')) {
		return {
			props: {
				authed: true
			}
		};
	}

	return {
		props: {
			authed: false
		}
	};
}) satisfies LayoutServerLoad;
