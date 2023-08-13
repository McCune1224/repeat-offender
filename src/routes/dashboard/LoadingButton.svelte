<script lang="ts">
	export let text: string = 'Check for Duplicates';
	export let click: () => {};
	let loading: boolean = false;
    export let disabled: boolean = false;
</script>

<button
	disabled={loading || disabled}
	class="btn variant-soft-primary"
	on:click={async () => {
		loading = true;
		await click();
		loading = false;
	}}
>
	{#if loading}
		<div class="flex items-center justify-center">
			<div class="border-secondary-50-900-token h-4 w-4 animate-spin rounded-full border-b-2" />
		</div>
	{:else}
		{text}
	{/if}
</button>
