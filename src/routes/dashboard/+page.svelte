<script lang="ts">
	import SpotifyWebApi from 'spotify-web-api-js';
	import type { PageData } from './$types';
	import 'spotify-web-api-js';
	import { onMount } from 'svelte';
	import { FilterDuplicateTracks } from '$lib/spotify/client';
	import LoadingButton from './LoadingButton.svelte';
	import PlaylistCard from './PlaylistCard.svelte';

	export let data: PageData;
	let user: SpotifyApi.CurrentUsersProfileResponse;
	let userOwnedPlaylists: SpotifyApi.PlaylistObjectSimplified[];
	let title = 'Dashboard';
	const spotifyClient = new SpotifyWebApi();
	spotifyClient.setAccessToken(data.props.access_token as string);

	onMount(async () => {
		user = await spotifyClient.getMe();

		let initialPlaylists = await spotifyClient.getUserPlaylists(user.id);
		userOwnedPlaylists = initialPlaylists.items;
		// Filter userOwnedPlaylists to only include playlists owned by the user
		userOwnedPlaylists = userOwnedPlaylists.filter((playlist) => playlist.owner.id === user.id);
	});
</script>

<div>
	<h1 class="h1">{title}</h1>

	{#if user}
		<p>
			{user.display_name}
			<button class="btn variant-soft-primary"> Check Entire Library for Repeats</button>
		</p>
	{:else}
		<p>Loading...</p>
	{/if}

	{#if userOwnedPlaylists}
		<ul class="grid grid-cols-2 gap-2">
			{#each userOwnedPlaylists as playlist}
				<PlaylistCard {playlist} client={spotifyClient} />
			{/each}
		</ul>
	{:else}
		<p>Loading...</p>
	{/if}
</div>
