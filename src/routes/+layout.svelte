<script>
	// TailwindCSS import
	import '../app.css';
</script>

<div>
	<main>
		<a href="/login">Login to Spotify</a>
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
