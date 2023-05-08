<script lang="ts">
	import type { PageData } from './$types';
	import type { SpotifyUser } from '$lib/spotify/spotifyTypes';
	import { GetUserPlaylists } from '$lib/spotify/API';
	import Playlist from './Playlist.svelte';
	export let data: PageData;
	export const user: SpotifyUser = data.spotifyUser;
	export const token = data.spotifyToken;
</script>

<div>
	<h1>Dashboard</h1>
	<Playlist {token} />
</div>
