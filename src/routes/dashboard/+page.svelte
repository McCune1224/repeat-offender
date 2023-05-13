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
			console.log(`GOT ${duplicates.length} DUPLICATES FOR ${playlist.name}`);
			currentlyAnalyzedPlaylists++;
		});

		//Get all liked songs
		/* likedSongs = await GetUserSavedTracks(token, 50); */
		likedSongs = await GetUserSavedTracks(token, 50);

		//Go through all liked songs and find duplicates
		const likedDuplicates = GetTrackDuplicates(likedSongs);
		currentlyAnalyzedPlaylists += 1;
		console.log(`LIKED SONGS HAS ${likedDuplicates.length} DUPLICATES`);

		//Jobs Done
	});

	/* TODO:
        1. Make card component to display each Playlist and its respective duplicates in 
        2. CSS :(
    */
</script>

<div>
	<h1>Greetings {user.display_name}</h1>
	<h2>Liked Songs</h2>
	{#if totalPlaylists != 0}
		<h3>Found {totalPlaylists} to analyze</h3>
		<h3>Analyzing {currentlyAnalyzedPlaylists}/{totalPlaylists} Playlists</h3>
	{/if}

	<h2>Playlists</h2>
	{#each playlists as playlist}
		<p>{playlist.name}</p>
	{:else}
		<p>Fetching Spotify Playlists...</p>
	{/each}

	<h2>Liked Songs</h2>
	{#each likedSongs as song}
		<p>{song.name}</p>
	{:else}
		<p>Loading...</p>
	{/each}
</div>
