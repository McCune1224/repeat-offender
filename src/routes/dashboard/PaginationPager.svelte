<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { pageNumber } from './store';

	export let nextDisabled = false;
	export let nextPage = async () => {};
	export let prevPage = async () => {};

	let pageNumberTracker: number;
	pageNumber.subscribe((newPageNumber) => {
		pageNumberTracker = newPageNumber;
	});

	const handleNextPageClick = async () => {
		try {
			await nextPage();
			pageNumber.update((n) => n + 1);
		} catch (err) {
			console.error(err);
		}
	};

	const handlePrevPageClick = async () => {
		try {
			await prevPage();
			pageNumber.update((n) => n - 1);
		} catch (err) {
			console.error(err);
		}
	};
</script>

<div>
	<p>{pageNumberTracker}</p>
	<button
		class="disabled:text-gray-500"
		disabled={pageNumberTracker === 1}
		on:click={handlePrevPageClick}>Previous</button
	>
	<button class="disabled:text-gray-500" disabled={nextDisabled} on:click={handleNextPageClick}
		>Next</button
	>
</div>
