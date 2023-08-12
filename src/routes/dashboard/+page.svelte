<script lang="ts">
	import SpotifyWebApi from 'spotify-web-api-js';
	import type { PageData } from './$types';
	import 'spotify-web-api-js';
	import { onMount } from 'svelte';
	import { FilterDuplicateTracks } from '$lib/spotify/client';

	export let data: PageData;
	let user: SpotifyApi.CurrentUsersProfileResponse;
	let userOwnedPlaylists: SpotifyApi.PlaylistObjectSimplified[];
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
	<h1 class="h1">Searching your Playlists for Duplicates...</h1>

	{#if user}
		<p>
			{user.display_name}
		</p>
	{:else}
		<p>Loading...</p>
	{/if}

	{#if userOwnedPlaylists}
		<ul class="grid grid-cols-2">
			{#each userOwnedPlaylists as playlist}
				<li class="card">
					<header class="card-header">{playlist.name}</header>
					<section class="p-4">{playlist.tracks.total}</section>
					<footer class="card-footer">
						<button
							class="btn variant-glass"
							on:click={async () => {
								await FilterDuplicateTracks(spotifyClient, playlist);
							}}
						>
							Check for Duplicates
						</button>
					</footer>
				</li>
			{/each}
		</ul>
	{:else}
		<p>Loading...</p>
	{/if}
</div>
