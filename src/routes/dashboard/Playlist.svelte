<script lang="ts">
	import {
		GetTrackDuplicates,
		GetPlaylistTracks,
		GetUserPlaylists,
		SpotifyAPIRequest,
		GetAllPlaylistTracks
	} from '$lib/spotify/API';
	import type { Playlist, Track } from '$lib/spotify/spotifyTypes';
	import type { PageServerData } from './$types';
	import Loading from './Loading.svelte';

	export let PaginationOpts = {
		limit: 10,
		offset: 0
	};
	export let token: string;
	export let data: PageServerData;
	let currPlaylistID: string;

	PaginationOpts;

	let currentPage = 1;
	let userPlaylists: Playlist[] = data.initialPlaylist;
	let duplicateTracks: Track[] = [];
	let buttonDisabled = false;

	const handleGetAllTracksClick = async (token: string, playlist: Playlist) => {
		buttonDisabled = true;
		try {
			const tracks = await GetAllPlaylistTracks(token, playlist.id);
			duplicateTracks = GetTrackDuplicates(tracks);
			currPlaylistID = playlist.id;
		} catch (err) {
			console.error(err);
		} finally {
			buttonDisabled = false;
		}
	};

	const changePlaylistPage = async (reverse: boolean = false) => {
		if (reverse) {
			PaginationOpts.offset -= PaginationOpts.limit;
			if (PaginationOpts.offset <= 0) {
				PaginationOpts.offset = 0;
			}

			const previousPagePlaylists = await GetUserPlaylists(
				token,
				PaginationOpts.limit,
				PaginationOpts.offset
			);
			userPlaylists = previousPagePlaylists;
			currentPage -= 1;
			return;
		} else {
			PaginationOpts.offset += PaginationOpts.limit;
			const nextPagePlaylists = await GetUserPlaylists(
				token,
				PaginationOpts.limit,
				PaginationOpts.offset
			);
			userPlaylists = nextPagePlaylists;
			currentPage += 1;
			return;
		}
	};
</script>

<section>
	<div>
		<p>
			{currentPage}
		</p>
		<div>
			<button
				disabled={PaginationOpts.offset === 0}
				on:click={async () => {
					await changePlaylistPage(true);
				}}>Previous</button
			>
			<button
				class="disabled:text-gray-500"
				disabled={userPlaylists.length < PaginationOpts.limit}
				on:click={async () => {
					await changePlaylistPage(false);
				}}>Next</button
			>
		</div>
	</div>

	<div>
		<ul>
			{#each userPlaylists as playlist}
				<div
					class="
                    flex flex-col bg-gray-100 rounded-md p-2 m-2 shadow-md hover:shadow-lg transition duration-300 ease-in-out
                    "
				>
					<button
						class="disabled:text-gray-500"
						disabled={buttonDisabled}
						on:click={async () => {
							console.log(buttonDisabled);
							await handleGetAllTracksClick(token, playlist);
							console.log(buttonDisabled);
						}}
					>
						<h3>{playlist.name}</h3>
						{#if buttonDisabled && currPlaylistID === playlist.id}
							<Loading />
						{/if}
					</button>
					<li id={playlist.id}>
						{#if duplicateTracks.length > 0 && currPlaylistID === playlist.id}
							<h1 class="text-red-200">Duplicates Detected</h1>
							{#each duplicateTracks as duplicateTrack}
								<p>{duplicateTrack.name}</p>
							{/each}
						{/if}
					</li>
				</div>
			{/each}
		</ul>
	</div>
	<div>
		<p>
			{currentPage}
		</p>
		<div>
			<button
				disabled={PaginationOpts.offset === 0}
				on:click={async () => {
					await changePlaylistPage(true);
				}}>Previous</button
			>
			<button
				class="disabled:text-gray-500"
				disabled={userPlaylists.length < PaginationOpts.limit}
				on:click={async () => {
					await changePlaylistPage(false);
				}}>Next</button
			>
		</div>
	</div>
</section>
