<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	
	export let data: { hadiths: any[]; bookId: string; collectionName: string };
	
	let searchTerm = '';
	let filteredHadiths = data.hadiths;
	
	$: {
		if (searchTerm.trim() === '') {
			filteredHadiths = data.hadiths;
		} else {
			filteredHadiths = data.hadiths.filter(hadith => 
				hadith.number?.toString().includes(searchTerm) ||
				hadith.translation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				hadith.narrator?.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
	}
</script>

<svelte:head>
	<title>{data.collectionName} - Ask Hadith</title>
	<meta name="description" content="Hadith from {data.collectionName}" />
</svelte:head>

<div in:fade={{ duration: 500 }} class="min-h-screen bg-background">
	<div class="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
		<div class="text-center mb-8 md:mb-12">
			<h1 class="text-3xl md:text-4xl font-bold text-text-900 mb-4 font-english">
				{data.collectionName}
			</h1>
			<p class="text-lg text-text-600 font-english">
				Browse Hadith from this collection
			</p>
		</div>
		
		<!-- Search Bar -->
		<div class="mb-8">
			<div class="relative w-full max-w-2xl mx-auto">
				<div class="relative">
					<input
						type="text"
						class="w-full rounded-2xl border-0 bg-surface shadow-lg p-4 md:p-5 text-base md:text-lg font-english text-text-900 placeholder-text-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:shadow-xl transition-all duration-300 pr-12"
						placeholder="Search hadith by number, text, or narrator..."
						bind:value={searchTerm}
						aria-label="Search Hadith"
					/>
					<div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-400">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</div>
				</div>
			</div>
		</div>

		<!-- Hadith List -->
		{#if filteredHadiths.length > 0}
			<div class="space-y-6">
				{#each filteredHadiths as hadith}
					<div class="bg-surface rounded-2xl shadow-lg border border-text-100 p-6 md:p-8 transition-all duration-300 hover:shadow-xl">
						<!-- Hadith Number -->
						<div class="mb-4">
							<span class="bg-primary-50 text-primary-700 rounded-full px-3 py-1 text-sm font-semibold">
								Hadith #{hadith.number || 'N/A'}
							</span>
						</div>
						
						<!-- Translation -->
						{#if hadith.translation}
							<div class="mb-4">
								<p class="text-base md:text-lg font-english text-text-700 leading-relaxed">
									{hadith.translation}
								</p>
							</div>
						{/if}
						
						<!-- Additional Info -->
						<div class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-text-100">
							{#if hadith.narrator}
								<span class="bg-text-50 text-text-700 rounded-full px-3 py-1 text-sm font-medium">
									Narrator: {hadith.narrator}
								</span>
							{/if}
							{#if hadith.grade}
								<span class="bg-secondary-50 text-secondary-700 rounded-full px-3 py-1 text-sm font-medium">
									Grade: {hadith.grade}
								</span>
							{/if}
							{#if hadith.book}
								<span class="bg-text-50 text-text-700 rounded-full px-3 py-1 text-sm font-medium">
									Book: {hadith.book}
								</span>
							{/if}
							{#if hadith.chapter}
								<span class="bg-text-50 text-text-700 rounded-full px-3 py-1 text-sm font-medium">
									Chapter: {hadith.chapter}
								</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{:else if searchTerm}
			<div class="text-center py-12">
				<p class="text-lg text-text-600 mb-2">No hadith found matching "{searchTerm}"</p>
				<p class="text-sm text-text-500">Try a different search term.</p>
			</div>
		{:else}
			<div class="text-center py-12">
				<div class="max-w-md mx-auto">
					<div class="text-6xl mb-4">📖</div>
					<h2 class="text-xl font-semibold text-text-900 mb-2 font-english">
						No Hadith Available
					</h2>
					<p class="text-text-600 font-english">
						There are currently no hadith to display for this collection.
					</p>
				</div>
			</div>
		{/if}
		
		<!-- Back Button -->
		<div class="text-center mt-8">
			<a 
				href="/books" 
				class="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200"
			>
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
				</svg>
				Back to Books
			</a>
		</div>
	</div>
</div> 