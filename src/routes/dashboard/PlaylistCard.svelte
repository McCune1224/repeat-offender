<script lang="ts">
	import type { SpotifyImage } from '$lib/spotify/spotifyTypes';
	import placeholder from '$lib/images/placeholder.png';

	export let title: string;
	export let items: Array<string>;
	export let image: SpotifyImage | null;
</script>

<div
	class="
        rounded-lg
    "
>
	<ul class="grid grid-cols-5 gap-5 border-2 border-black">
		<!-- {#if image} -->
		<!-- 	<img class="col-span-1" height={200} width={200} src={image.url} alt="Playlist Cover" /> -->
		<!-- {:else} -->
		<!-- 	<img -->
		<!-- 		class="col-span-1" -->
		<!-- 		height={200} -->
		<!-- 		width={200} -->
		<!-- 		src={placeholder} -->
		<!-- 		alt="Playlist Cover" -->
		<!-- 	/> -->
		<!-- {/if} -->
		<p class="col-span-5 text-6xl font-bold text-center">
			{title}
		</p>

		<div class="border-b border-4 border-dashed col-span-5" />
		{#each items as item}
			<li class="text-lg">
				{item}
			</li>
		{/each}
		<button
			class="col-span-5
            bg-gradient-to-r from-amber-500 to-pink-500
            hover:from-amber-600 hover:to-pink-600
            font-bold py-5 px-4"
			on:click={() => {
				console.log('Delete Duplicates for ' + title + ' clicked');
			}}
		>
			Delete {items.length / 2} Duplicates</button
		>
	</ul>
</div>
