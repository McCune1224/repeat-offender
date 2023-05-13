<script>
	import QuestionCard from './QuestionCard.svelte';
</script>

<div>
	<section class="text-center">
		<h1
			class="py-32 font-extrabold font-mono italic
            outline-black text-9xl bg-gradient-to-r
            from-amber-500 to-pink-500 bg-clip-text text-transparent"
		>
			REPEAT OFFENDER
		</h1>
		<h3
			class="text-3xl font-bold font-mono italic 
            mb-10 mx-10 px-10 sm:px-12 md:px-16 lg:px-20 xl:px-24"
		>
			Duplicate Tracks Begone
		</h3>
		<button
			class="
            bg-gradient-to-r from-amber-500 to-pink-500
            hover:from-amber-600 hover:to-pink-600
            text-white font-bold py-2 px-4 rounded
            "
			><a
				class="
                text-4xl text-white font-bold py-2 px-4 rounded
                "
				href="/login">Sign into Spotify to Get started!</a
			></button
		>
		<p
			class=" py-20 text-xl font-bold font-mono italic
            mb-10 mx-10 px-10 sm:px-12 md:px-16 lg:px-20 xl:px-24"
		>
			This web-based application offers a hassle-free way to scan and remove duplicate tracks
			from your Spotify playlist in just a few clicks. With Repeat Offender, you can easily
			keep your playlist organized and avoid redundancy, making your music listening
			experience even more enjoyable.
		</p>
	</section>
	<section>
		<h2
			class="text-5xl font-bold font-mono italic mb-10 mx-10 px-10 sm:px-12 md:px-16 lg:px-20 xl:px-24 text-center"
		>
			FAQ
		</h2>

		<ul
			class="grid grid-cols-2
        sm:grid-cols-2 md:grid-cols-2
            lg:grid-cols-2 xl:grid-cols-2
            gap-4 px-10 sm:px-12 md:px-16 lg:px-20 xl:px-24 text-center"
		>
			<QuestionCard
				title="How do I use this?"
				description="Sign into Spotify, select a playlist, 
                    and click the 'Find Duplicates' button. 
                    Repeat Offender will then scan your playlist for duplicate 
                    tracks and display them for you to review. 
                    You can then click the 'Remove Duplicates' button to remove all repeat offenders from your playlist."
			/>
			<QuestionCard
				title="Why do I need to sign into Spotify?"
				description="Repeat Offender needs to access your Spotify account to read your playlists
                    and remove duplicate tracks from them. We do not store any of your data."
			/>
			<QuestionCard
				title="Does this work with other music streaming services? (Amazon Music, Apple Music, etc...)"
				description="Currently, Repeat Offender is only compatible with Spotify.
                    With that said, if I get enough requests for other services, I will work towards adding them."
			/>
			<QuestionCard
				title="What data do you store?"
				description="The app only stores access credentials for Spotify in your browser's local storage that the site uses to fetch Spotify Data. 
                No data is stored on an external server/database."
			/>
			<QuestionCard
				title="How do I revoke this site's access to my Spotify account?"
				description="You can revoke access to your Spotify account by going to your Spotify account settings and clicking 'Remove' under the 'Apps with access to your account' section."
			/>
			<QuestionCard
				title="How do I contact the creator of this site?"
				description="Best way to reach me is by Twitter @KusaAlexM."
			/>
			<QuestionCard
				title="Doesn't Spotify already have a feature to remove duplicate tracks?"
				description="Sorta, but not really. Spotify will warn you when 
                    you try to add a duplicate track to a playlist, 
                    but it won't remove duplicates that are already in your playlist."
			/>
		</ul>
	</section>
</div>
