import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
    if (cookies.get('access_token')) {
        throw redirect(301, `/dashboard`);
    }
}) satisfies PageServerLoad;
