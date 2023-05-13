<script lang="ts">
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
	<div class="mx-10 flex flex-col h-screen">
		<main class="mb-auto">
			<slot />
		</main>

		<footer class="h-10 text-center text-gray-400">
			<h4 class="">
				Built by
				<b
					class="font-extrabold italic
            outline-black text-lg bg-gradient-to-r
            from-amber-500 to-pink-500 bg-clip-text text-transparent"
				>
					Alex McCune</b
				>
			</h4>
			<ul class="flex justify-center gap-5">
				<li class="hover:text-zinc-300">
					<a target="_blank" href="https://github.com/mccune1224">GitHub</a>
				</li>
				<li class="hover:text-sky-300">
					<a target="_blank" href="https://twitter.com/KusAlexM">Twitter</a>
				</li>
				<li class="hover:text-blue-400">
					<a target="_blank" href="https://www.linkedin.com/in/alexander-mccune/"
						>LinkedIn</a
					>
				</li>
			</ul>
		</footer>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.zinc.200);
		/* color: theme(colors.white); */
	}
</style>
