<script lang="ts">
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	//check url for error parameter
	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const error = urlParams.get('error');
		const t: ToastSettings = {
			message: ''
		};
		if (error) {
			let errorMessage = '';
			switch (error) {
				case 'invalid_grant':
					errorMessage = 'You must accept the authorization request to use Repeat-Offender';
				// error message sent from dashboard (normally occurs when token expires and gets redirected here)
				case 'not_logged_in':
					errorMessage = 'Must be logged in to use.';
				default:
					errorMessage = 'An unknown error occurred';
			}
			t.message = errorMessage;
			toastStore.trigger(t);
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
