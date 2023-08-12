<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<h1 class="h1">ZOOWIEMAMA WE GOT A COOKIE</h1>

    <p>
        le epic spotify token: {data.props.access_token}
    </p>
</div>
