<script lang="ts">
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	//check url for error parameter
	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const error = urlParams.get('error');
		if (error) {
			let errorMessage = '';
			switch (error) {
				case 'invalid_grant':
					errorMessage = 'You must accept the authorization request to use Repeat-Offender';
					break;
				default:
					errorMessage = 'An unknown error occurred';
					break;
			}
			const t: ToastSettings = {
				message: errorMessage
			};
			toastStore.trigger(t);
			window.location.href = '/';
			return;
		}
	});
</script>

<div class="container mx-auto flex h-full items-center justify-center">
	<div class="space-y-5">
		<h1 class="h1">Repeat-Offender</h1>
		<p>Remove Duplicates from your Spotify Playlists in a heartbeat!</p>
		<button class="variant-form-material btn">
			<a href="/auth">
				<p>Log in to Spotify to get Started!</p>
			</a>
		</button>
	</div>
</div>
