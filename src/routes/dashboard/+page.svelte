<script lang="ts">
	import type { PageData } from './$types';
	import type { SpotifyUser } from '$lib/spotify/spotifyTypes';
	import { GetUserPlaylists } from '$lib/spotify/API';
	import Playlist from './Playlist.svelte';
	export let data: PageData;
	export const token = data.spotifyToken;
</script>

<div>
	<Playlist {token} {data} />
</div>
