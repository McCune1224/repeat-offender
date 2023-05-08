<script lang="ts">
	import { GetUserPlaylists, SpotifyAPIRequest } from '$lib/spotify/API';
	import type { Playlist } from '$lib/spotify/spotifyTypes';
	import { onMount } from 'svelte';

	export let token: string;

	let playlistResponse: any;
	let currentPage = 1;
	let playlistItems: Playlist[] = [];
	const limit = 10;
	let offset = 0;

	const nextPlaylistPage = async (reverse: boolean = false) => {
		if (reverse) {
			offset -= limit;
			if (offset <= 0) {
				offset = 0;
			}

			const previousPageResponse = await SpotifyAPIRequest<any>(
				`/me/playlists?limit=${limit}&offset=${offset}`,
				token
			);

			console.log(previousPageResponse);
			playlistItems = previousPageResponse.items;
			console.log();
			currentPage -= 1;
			return;
		} else {
			offset += limit;
			const nextPageResponse = await SpotifyAPIRequest<any>(
				`/me/playlists?limit=${limit}&offset=${offset}`,
				token
			);
			console.log(nextPageResponse);
			playlistItems = nextPageResponse.items;
			currentPage += 1;
			return;
		}
	};

	onMount(async () => {
		console.log('FETCHING PLAYLISTS');
		playlistResponse = await GetUserPlaylists(token);
		playlistItems = playlistResponse.items;
		console.log('FETCHED');
		console.log(playlistItems);
	});
</script>

<!-- Pagination feature -->
<section>
	<p class="text-4xl">{currentPage}</p>
	<button
		class="disabled:text-gray-500"
		disabled={offset === 0}
		on:click={async () => {
			await nextPlaylistPage(true);
		}}>Previous</button
	>
	<button
		class="disabled:text-gray-500"
		disabled={playlistItems.length < limit}
		on:click={async () => {
			await nextPlaylistPage(false);
		}}>Next</button
	>

	<div class="bg-slate-800">
		<ul>
			{#each playlistItems as playlist}
				<li class="py-2">
					<p>{playlist.name}</p>
					<p>{playlist.id}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>
