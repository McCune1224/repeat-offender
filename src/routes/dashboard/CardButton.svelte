<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let styles: string = `flex flex-col justify-between items-center p-4 
                                sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-lg shadow-lg bg-stone-800 
                                hover:bg-stone-700 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110`;
	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<button class={styles} on:click={handleClick}>
	<slot />
</button>
