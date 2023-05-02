<script>
	// TailwindCSS import
	import '../app.css';
	import Navbar from './Navbar.svelte';
</script>

<div>
	<main>
		<slot />
	</main>

	<footer>
		<p>Some footer...</p>
	</footer>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.zinc.900);
		color: theme(colors.white);
	}
</style>
