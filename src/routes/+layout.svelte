<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppBar, Toast } from '@skeletonlabs/skeleton';
</script>

<Toast />
<AppBar>
	<svelte:fragment slot="lead">(icon)</svelte:fragment>
	<p>Repeat-Offender</p>
	<svelte:fragment slot="trail">
		<button class="btn variant-soft-secondary">Insert auth logic here</button>
	</svelte:fragment>
</AppBar>
<slot />
