<script lang="ts">
	import {
		GetTrackDuplicates,
		GetPlaylistTracks,
		GetUserPlaylists,
		SpotifyAPIRequest
	} from '$lib/spotify/API';
	import type { Playlist, Track } from '$lib/spotify/spotifyTypes';
	import { onMount } from 'svelte';
	import CardButton from './CardButton.svelte';

	export let token: string;

	let currentPage = 1;
	let userPlaylists: Playlist[] = [];
	let duplicateTracks: Track[] = [];
	const defaultLimit = 10;
	let defaultOffset = 0;

	const changePlaylistPage = async (reverse: boolean = false) => {
		if (reverse) {
			defaultOffset -= defaultLimit;
			if (defaultOffset <= 0) {
				defaultOffset = 0;
			}

			const previousPagePlaylists = await GetUserPlaylists(
				token,
				defaultLimit,
				defaultOffset
			);
			userPlaylists = previousPagePlaylists;
			currentPage -= 1;
			return;
		} else {
			defaultOffset += defaultLimit;
			const nextPagePlaylists = await GetUserPlaylists(token, defaultLimit, defaultOffset);
			userPlaylists = nextPagePlaylists;
			currentPage += 1;
			return;
		}
	};

	onMount(async () => {
		userPlaylists = await GetUserPlaylists(token);
	});
</script>

<section>
	<p
		class="
        text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center
        text-stone-100 mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12"
	>
		{currentPage}
	</p>
	<div
		class="
    text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center
    flex flex-row justify-center items-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 xl:space-x-12
        "
	>
		<button
			class="disabled:text-gray-500"
			disabled={defaultOffset === 0}
			on:click={async () => {
				await changePlaylistPage(true);
			}}>Previous</button
		>
		<button
			class="disabled:text-gray-500"
			disabled={userPlaylists.length < defaultLimit}
			on:click={async () => {
				await changePlaylistPage(false);
			}}>Next</button
		>
	</div>

	<div>
		<ul
			class="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
            gap-4 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-lg shadow-lg
            bg-stone-900
            "
		>
			{#each userPlaylists as playlist}
				<CardButton
					on:click={async () => {
						const tracks = await GetPlaylistTracks(token, playlist.id);
						duplicateTracks = GetTrackDuplicates(tracks);
					}}
				>
					<li id={playlist.id}>
						{playlist.name}
						{#if playlist.images.length > 0}
							<img
								src={playlist.images[0].url}
								alt={playlist.name}
								class="rounded-lg shadow-lg w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80"
							/>
						{/if}
						{#if duplicateTracks.length > 0}
							<h1>Duplicates Detected</h1>
							{#each duplicateTracks as track}
								<p>{track.name}</p>
							{/each}
						{/if}
					</li>
				</CardButton>
			{/each}
		</ul>
	</div>
</section>
