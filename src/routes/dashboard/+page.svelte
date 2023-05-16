<script lang="ts">
	import type { PageData } from './$types';
	import type {
		PlaylistItems,
		PlaylistResponse,
		SpotifyUser,
		TrackItems
	} from '$lib/spotify/spotifyTypes';
	import {
		GetAllModifiableUserPlaylists,
		GetAllPlaylistTracks,
		GetTrackDuplicates,
		GetUserSavedTracks
	} from '$lib/spotify/API';
	import { onMount } from 'svelte';
	import PlaylistCard from './PlaylistCard.svelte';
	export let data: PageData;
	export const token = data.spotifyToken;

	const user = data.spotifyUser;
	let playlists: PlaylistItems[] = [];

	interface Offender {
		playlist: PlaylistItems;
		repeatTracks: TrackItems[];
	}

	let offenders: Offender[] = [];
	let likedSongs: TrackItems[] = [];
	let likedDuplicates: TrackItems[] = [];
	let totalPlaylists = 0;
	let currentlyAnalyzedPlaylists = 0;

	onMount(async () => {
		//Get all Playlists that user owns
		playlists = await GetAllModifiableUserPlaylists(token);
		totalPlaylists = playlists.length + 1;

		// The +1 is to also include liked songs

		// Go through every playlist
		playlists.forEach(async (playlist) => {
			//Get the tracks for the playlist
			const tracks = await GetAllPlaylistTracks(token, playlist.id);
			const duplicates = GetTrackDuplicates(tracks);
			// Sort alphabetically before pushing to offenders
			duplicates.sort((a, b) => a.id.localeCompare(b.id));
			if (duplicates.length > 0) {
				offenders.push({
					playlist: playlist,
					repeatTracks: duplicates
				});
			}
			currentlyAnalyzedPlaylists++;
		});

		//Liked songs need to be done separately as they're not under the same endpoint
		// as the other playlists
		likedSongs = await GetUserSavedTracks(token, 200);
		/* likedSongs = await GetUserSavedTracks(token); */

		//Go through all liked songs and find duplicates
		likedDuplicates = GetTrackDuplicates(likedSongs);
		likedDuplicates.sort((a, b) => a.id.localeCompare(b.id));
		currentlyAnalyzedPlaylists += 1;

		//Jobs Done
	});
</script>

<div>
	{#if totalPlaylists != 0 && currentlyAnalyzedPlaylists != totalPlaylists}
		<h3 class="py-10 text-6xl font-bold text-center animate-pulse">
			Analyzing {currentlyAnalyzedPlaylists}/{totalPlaylists} Playlists
		</h3>
	{/if}

	{#if currentlyAnalyzedPlaylists == totalPlaylists && totalPlaylists != 0}
		<h3 class="text-6xl font-bold text-center py-10">
			Found {offenders.length} playlists with duplicates
		</h3>
		{#if offenders.length > 0}
			{#each offenders as repeatOffender}
				<!-- {#if repeatOffender.playlist.images.length > 0} -->
				<!-- 	<img src={repeatOffender.playlist.images[0].url} alt="Playlist Icon" /> -->
				<!-- {/if} -->
				<div class="py-10">
					<PlaylistCard
						title={repeatOffender.playlist.name}
						playlistID={repeatOffender.playlist.id}
						items={repeatOffender.repeatTracks}
						image={repeatOffender.playlist.images[0]}
						{token}
					/>
				</div>
			{/each}
			{#if likedDuplicates.length > 0}
				<PlaylistCard
					title="Liked Songs"
					playlistID=""
					items={likedDuplicates}
					image={null}
					{token}
				/>
			{/if}
		{:else}
			<h3
				class="text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-pink-500"
			>
				No duplicates found in your Library :)
			</h3>
		{/if}
	{/if}
</div>
