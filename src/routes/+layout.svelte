<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppBar, Toast } from '@skeletonlabs/skeleton';
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;
</script>

<Toast />
<AppBar>
	<svelte:fragment slot="lead">
		<p class="text-3xl font-bold text-white">Repeat-Offender</p>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<button class="btn variant-ringed-tertiary justify-end">
			{#if data.props.authed}
				<a href="/auth/logout">Logout</a>
			{:else}
				<a href="/auth">Log In</a>
			{/if}
		</button>
	</svelte:fragment>
</AppBar>
<slot />
