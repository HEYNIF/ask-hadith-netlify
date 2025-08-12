<script lang="ts">
	import { fade } from 'svelte/transition';
	import QiblaDirection from '$lib/QiblaDirection.svelte';
</script>

<svelte:head>
	<title>Qibla Direction - Ask Hadith</title>
	<meta name="description" content="Find the direction to the Kaaba with our accurate Qibla compass. Use your device's sensors to locate the Qibla direction for prayer." />
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
			<h1 class="text-4xl md:text-5xl font-bold text-text-900 mb-4 font-english">Qibla Direction</h1>
			<p class="text-xl text-text-600 font-english">Find the direction to the Kaaba for your prayers</p>
		</div>

		<!-- Qibla Direction Component -->
		<div class="flex justify-center">
			<QiblaDirection />
		</div>

		<!-- Additional Information -->
		<div class="mt-12 max-w-2xl mx-auto text-center">
			<div class="bg-surface rounded-2xl shadow-lg border border-text-100 p-6 md:p-8">
				<h3 class="text-xl font-semibold text-text-900 mb-4 font-english">About Qibla</h3>
				<p class="text-text-600 font-english leading-relaxed mb-4">
					The Qibla is the direction Muslims face during prayer, pointing towards the Kaaba in Makkah, Saudi Arabia. 
					This direction is calculated based on your current location and the precise coordinates of the Kaaba.
				</p>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-600 font-english">
					<div class="text-left">
						<p><strong>Kaaba Location:</strong> Makkah, Saudi Arabia</p>
						<p><strong>Coordinates:</strong> 21.4225°N, 39.8262°E</p>
						<p><strong>Significance:</strong> House of Allah</p>
					</div>
					<div class="text-left">
						<p><strong>Prayer Direction:</strong> All prayers face Qibla</p>
						<p><strong>Calculation:</strong> Great circle distance</p>
						<p><strong>Accuracy:</strong> GPS + Compass sensors</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div> 