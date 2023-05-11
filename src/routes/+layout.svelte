<script lang="ts">
	// TailwindCSS import
	import '../app.css';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
</script>

<div>
	<nav
		class="
        sticky top-0 z-50 w-full h-16 flex flex-row justify-between items-center
        bg-zinc-900 text-stone-100 py-4 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24
        "
	>
		<ul>
			<li>
				<h1>Repeat Offender</h1>
			</li>
			<li data-sveltekit-preload-data="off">
				{#if data.loggedIn}
					<a href="/logout">Logout</a>
					<a href="/dashboard">Dashboard</a>
				{:else}
					<a href="/login">Login</a>
				{/if}
			</li>
		</ul>
	</nav>
	<div class="mx-10 text-center">
		<main>
			<slot />
		</main>

		<footer>
			<p>Some footer...</p>
		</footer>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.zinc.900);
		color: theme(colors.white);
	}
</style>
