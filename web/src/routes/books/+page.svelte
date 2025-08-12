<script lang="ts">
	import { fade } from 'svelte/transition';
	
	export let data: { books: any[] };
	
	let searchTerm = '';
	let filteredBooks = data.books;
	
	$: {
		if (searchTerm.trim() === '') {
			filteredBooks = data.books;
		} else {
			filteredBooks = data.books.filter(book => 
				book.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				book.title?.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
	}
</script>

<svelte:head>
	<title>Books - Ask Hadith</title>
	<meta name="description" content="Browse all Hadith books and collections" />
</svelte:head>

<div in:fade={{ duration: 500 }} class="min-h-screen bg-background">
	<div class="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
		<div class="text-center mb-8 md:mb-12">
			<h1 class="text-3xl md:text-4xl font-bold text-text-900 mb-4 font-english">
				Hadith Books
			</h1>
			<p class="text-lg text-text-600 font-english">
				Browse through authentic Hadith collections
			</p>
		</div>
		
		<!-- Search Bar -->
		<div class="mb-8">
			<div class="relative w-full max-w-2xl mx-auto">
				<div class="relative">
					<input
						type="text"
						class="w-full rounded-2xl border-0 bg-surface shadow-lg p-4 md:p-5 text-base md:text-lg font-english text-text-900 placeholder-text-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:shadow-xl transition-all duration-300 pr-12"
						placeholder="Search books by name..."
						bind:value={searchTerm}
						aria-label="Search Books"
					/>
					<div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-400">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</div>
				</div>
			</div>
		</div>

		<!-- Books Grid -->
		{#if filteredBooks.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each filteredBooks as book}
					<a 
						href="/books/{book.id}" 
						class="bg-surface rounded-2xl shadow-lg border border-text-100 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105"
					>
						<div class="text-center">
							<div class="text-4xl mb-4">📖</div>
							<h3 class="text-lg font-semibold text-text-900 mb-2 font-english">
								{book.name || book.title || 'Unknown Book'}
							</h3>
							{#if book.description}
								<p class="text-sm text-text-600 mb-4 font-english">
									{book.description}
								</p>
							{/if}
							{#if book.hadith_count}
								<span class="inline-block bg-primary-50 text-primary-700 rounded-full px-3 py-1 text-sm font-medium">
									{book.hadith_count} Hadiths
								</span>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		{:else if searchTerm}
			<div class="text-center py-12">
				<p class="text-lg text-text-600 mb-2">No books found matching "{searchTerm}"</p>
				<p class="text-sm text-text-500">Try a different search term.</p>
			</div>
		{:else}
			<div class="text-center py-12">
				<div class="max-w-md mx-auto">
					<div class="text-6xl mb-4">📚</div>
					<h2 class="text-xl font-semibold text-text-900 mb-2 font-english">
						No Books Available
					</h2>
					<p class="text-text-600 font-english">
						There are currently no books to display.
					</p>
				</div>
			</div>
		{/if}
	</div>
</div> 