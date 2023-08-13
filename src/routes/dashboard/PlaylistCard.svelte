<script lang="ts">
	import { FilterDuplicateTracks, RemoveDuplicates } from '$lib/spotify/client';
	import type SpotifyWebApi from 'spotify-web-api-js';
	import LoadingButton from './LoadingButton.svelte';
	export let playlist: SpotifyApi.PlaylistObjectSimplified;
	export let client: SpotifyWebApi.SpotifyWebApiJs;
	let analyzed: boolean = false;
	let duplicateTracks: SpotifyApi.PlaylistTrackObject[];
	let duplicateTally: Map<string, number> = new Map();
</script>

<li class="card variant-ghost-secondary text-center">
	<header class="h4 card-header">{playlist.name}</header>
	<section class="h5 p-4" />
	<LoadingButton
		click={async () => {
			duplicateTracks = await FilterDuplicateTracks(client, playlist);
			duplicateTracks.forEach((track) => {
				if (duplicateTally.has(track.track.name)) {
					//@ts-ignore - Using .has() above ensures that this will never be undefined (unless there is a bug)
					duplicateTally.set(track.track.name, duplicateTally.get(track.track.name) + 1);
				} else {
					duplicateTally.set(track.track.name, 1);
				}
			});
			if (duplicateTracks) {
				analyzed = true;
			}
		}}
		text="Check for Repeats"
		disabled={analyzed}
	/>

	<footer class="h5 card-footer">
		{#if analyzed}
			<p>
				{duplicateTracks.length} Removable Repeats Found
			</p>
			{#if duplicateTally.size > 0}
				{#each duplicateTracks as track}
					<p>
						{track.track.name} - {track.track.artists[0].name}
					</p>
				{/each}
				<button
					on:click={async () => {
						await RemoveDuplicates(client, playlist.id, duplicateTracks);
						analyzed = false;
						duplicateTracks = [];
						duplicateTally = new Map();
					}}
					class="
                    btn variant-soft-primary"
				>
					Remove Repeats
				</button>
			{/if}
		{/if}
	</footer>
</li>
