<script lang="ts">
	import { fade } from 'svelte/transition';
	import TasbeehCounter from '$lib/TasbeehCounter.svelte';
</script>

<svelte:head>
	<title>Tasbeeh Counter - Ask Hadith</title>
	<meta name="description" content="Count your dhikr with our beautiful Tasbeeh Counter. Track your daily spiritual practice with ease." />
</svelte:head>

<div in:fade={{ duration: 500 }} class="min-h-screen bg-background">
	<div class="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
		<!-- Header with Back Button -->
		<div class="text-center mb-8 md:mb-12">
			<div class="flex items-center justify-center mb-6">
				<a
					href="/"
					class="inline-flex items-center px-4 py-2 bg-text-100 hover:bg-text-200 text-text-700 font-medium rounded-lg transition-colors duration-200 mr-4"
				>
					<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
					</svg>
					Back to Home
				</a>
			</div>
			<h1 class="text-4xl md:text-5xl font-bold text-text-900 mb-4 font-english">Tasbeeh Counter</h1>
			<p class="text-xl text-text-600 font-english">Count your dhikr and track your spiritual practice</p>
		</div>

		<!-- Tasbeeh Counter Component -->
		<div class="flex justify-center">
			<TasbeehCounter />
		</div>

		<!-- Additional Information -->
		<div class="mt-12 max-w-2xl mx-auto text-center">
			<div class="bg-surface rounded-2xl shadow-lg border border-text-100 p-6 md:p-8">
				<h3 class="text-xl font-semibold text-text-900 mb-4 font-english">About Dhikr</h3>
				<p class="text-text-600 font-english leading-relaxed mb-4">
					Dhikr (remembrance of Allah) is a fundamental practice in Islam. The Prophet Muhammad ﷺ taught us to recite specific phrases 
					with recommended counts to maintain spiritual connection and seek Allah's blessings.
				</p>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-600 font-english">
					<div class="text-left">
						<p><strong>SubhanAllah:</strong> Glorification of Allah</p>
						<p><strong>Alhamdulillah:</strong> Praise to Allah</p>
						<p><strong>Allahu Akbar:</strong> Allah is the Greatest</p>
					</div>
					<div class="text-left">
						<p><strong>La ilaha illallah:</strong> There is no god but Allah</p>
						<p><strong>Astaghfirullah:</strong> I seek forgiveness from Allah</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div> 