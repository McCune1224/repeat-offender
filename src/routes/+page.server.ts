import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');
	if (token) {
        console.log("HIT FROM ROOT")
		throw redirect(308, '/dashboard');
	}
};
