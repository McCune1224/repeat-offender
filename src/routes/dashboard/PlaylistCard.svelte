<script lang="ts">
	import type { SpotifyImage, TrackItems } from '$lib/spotify/spotifyTypes';
	import placeholder from '$lib/images/placeholder.png';
	import {
		DeleteDuplicateTracksFromPlaylist,
		DeleteDuplicateSavedTracks
	} from '$lib/spotify/API';

	import SpotifyWebApi from 'spotify-web-api-js';
	import { onMount } from 'svelte';

	export let title: string;
	export let playlistID: string;
	export let items: Array<TrackItems>;
	export let image: SpotifyImage | null;
	export let token: string;
	const spotifyApi = new SpotifyWebApi();

	onMount(async () => {
		spotifyApi.setAccessToken(token);
	});
</script>

<div>
	<ul class="grid grid-cols-4 gap-5 border-2 bg-zinc-800 border-white">
		{#if image}
			<img class="col-span-1" height={200} width={200} src={image.url} alt="Playlist Cover" />
		{:else}
			<img
				class="col-span-1"
				height={200}
				width={200}
				src={placeholder}
				alt="Playlist Cover"
			/>
		{/if}
		<p class="col-span-3 text-6xl font-bold text-center self-center">
			{title}
		</p>

		<div class="col-span-4" />
		{#each items as item}
			<li
				class="text-lg
            text-white"
			>
				{item.name} - {item.artists[0].name}
			</li>
		{/each}
		{#if title === 'Liked Songs'}
			<button
				class="col-span-4
            text-black
            bg-emerald-200
            hover:bg-emerald-300
            active:bg-emerald-400
            font-bold py-5 px-4"
				on:click={async () => {
					console.log('DELETE FOR LIKED SONGS');
				}}
			>
				Delete Duplicates</button
			>
		{:else}
			<button
				class="col-span-4
            text-black
            bg-emerald-200
            hover:bg-emerald-300
            active:bg-emerald-400
            font-bold py-5 px-4"
				on:click={async () => {
					console.log('DELTE FOR PLAYLIST');
				}}
			>
				Delete Duplicates</button
			>
		{/if}
	</ul>
</div>
