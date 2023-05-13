<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<li
	class="
    "
>
	<h3
		class="
        text-2xl font-semibold text-zinc-100
        "
	>
		{title}
	</h3>
	<p
		class="
        text-lg text-zinc-300 mt-1 mb-2 px-2 py-1 rounded-md inline-block max-w-full
        "
	>
		{description}
	</p>
</li>
