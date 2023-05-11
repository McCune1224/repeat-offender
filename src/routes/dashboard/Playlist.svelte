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
				class="disabled:text-gray-500"
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
				<div class="">
					<button
						disabled={buttonDisabled ||
							playlist.owner.display_name != data.spotifyUser.display_name}
						on:click={async () => {
							console.log(buttonDisabled);
							await handleGetAllTracksClick(token, playlist);
							console.log(buttonDisabled);
						}}
					>
						{#if playlist.owner.display_name != data.spotifyUser.display_name}
							<p class="text-red-200">
								( You don't have edit permissions for this playlist )
							</p>
						{/if}
						<h3>{playlist.name}</h3>
						<li id={playlist.id}>
							{#if duplicateTracks.length > 0 && currPlaylistID === playlist.id}
								<p>
									{duplicateTracks.length} Duplicates Detected:
								</p>
								<ul
									class="
                                grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                                "
								>
									{#each duplicateTracks as duplicateTrack}
										<li>
											<p>
												{duplicateTrack.name} - {duplicateTrack.artists[0]
													.name}
											</p>
										</li>
									{/each}
								</ul>
								<div>
									<button
										class="
                                bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded
                                    "
									>
										Delete Duplicates
									</button>
								</div>
							{/if}
						</li>
					</button>
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
				class="disabled:text-gray-500"
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
