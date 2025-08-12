<script lang="ts">
	import { fade } from 'svelte/transition';
	import {
		searchKey,
		hadithsByCollection,
		selectedCollection,
		collectionsSorted,
		firstHadithBase64
	} from '../store';
	import SearchBox from '$lib/SearchBox.svelte';
	import HadithList from '$lib/HadithList.svelte';
	import HadithFilters from '$lib/HadithFilters.svelte';
	import type { SearchResponse } from '../models';

	export let data: { resp: SearchResponse; searchKey: string };

	let notFound = false;
	let searching = false;

	$: if (data?.resp?.data?.length > 0 && $selectedCollection == '') {
		$hadithsByCollection.clear();
		$collectionsSorted = [];
		$selectedCollection = '';
		$searchKey = '';
		$firstHadithBase64 = '';

		data.resp.data.forEach((col) => {
			$hadithsByCollection.set(col.collection, col.hadiths);
			$collectionsSorted.push({ collection: col.collection, count: col.count });
		});
		$selectedCollection = data.resp.data[0].collection;
		$searchKey = data.searchKey || '';
		$firstHadithBase64 = data.resp.first_hadith_base64;
	}

	const ogDescription = () => {
		if ($collectionsSorted?.length > 0)
			return (
				'Read ' +
				$collectionsSorted.reduce((acc, curr) => acc + curr.count, 0) +
				" hadiths about '" +
				$searchKey +
				"' from " +
				$collectionsSorted.map((col) => col.collection).join(', ')
			);
		return "Search anything from Hadiths (includes: Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami` at-Tirmidhi, Sunan an-Nasa'i, Sunan Ibn Majah)";
	};

	const ogTitle = () => {
		if ($searchKey) return "Hadiths about '" + $searchKey + "'";
		return 'AskHadith.com - Search Hadiths from Sahih Bukhari, Sahih Muslim and more';
	};

	const ogImage = () => {
		if ($firstHadithBase64) return 'https://www.askhadith.com/api/og?hadith=' + $firstHadithBase64;
		return 'https://www.askhadith.com/favicon.ico';
	};
</script>

<svelte:head>
	<title>{ogTitle()}</title>
	<meta name="description" content={ogDescription()} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://www.askhadith.com/?search={$searchKey}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={ogTitle()} />
	<meta property="og:description" content={ogDescription()} />
	<meta property="og:image" content={ogImage()} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="askhadith.com" />
	<meta property="twitter:url" content="https://www.askhadith.com/?search={$searchKey}" />
	<meta name="twitter:title" content={ogTitle()} />
	<meta name="twitter:description" content={ogDescription()} />
	<meta name="twitter:image" content={ogImage()} />
</svelte:head>

<div class="relative min-h-screen bg-background overflow-hidden">
	<!-- Background Illustration -->
	<img
		src="/prayer-bg.jpeg"
		alt="Praying silhouette"
		class="hidden sm:block pointer-events-none select-none absolute left-1/2 bottom-0 transform -translate-x-1/2 md:w-3/4 w-full opacity-10"
		style="z-index:0;"
	/>
	<!-- Optional: Soft white overlay for extra subtlety -->
	<div class="absolute inset-0 bg-white opacity-30 pointer-events-none" style="z-index:1;"></div>
	<!-- Main Content -->
	<div class="relative z-10 container mx-auto px-4 py-8 md:py-16 max-w-4xl">
		<div class="text-center mb-8 md:mb-12">
			<h1 class="text-3xl md:text-4xl font-bold text-text-900 mb-4 font-english">
				Ask Hadith
			</h1>
			<p class="text-lg text-text-600 font-english">
				Search through authentic Hadith collections
			</p>
		</div>
		<div class="mb-8">
			<SearchBox bind:searching bind:notFound />
		</div>

		<!-- Browse Books Button -->
		<div class="text-center mb-8">
			<a 
				href="/books" 
				class="inline-flex items-center px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
			>
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
				</svg>
				Browse All Books
			</a>
		</div>

		{#if searching}
			<div class="flex justify-center items-center py-12">
				<div class="flex items-center space-x-2 text-primary-600">
					<div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
					<span class="text-lg font-medium">Searching...</span>
				</div>
			</div>
		{:else if notFound}
			<div class="text-center py-12">
				<p class="text-lg text-text-600 mb-2">Nothing found! ☹️</p>
				<p class="text-sm text-text-500">Try different keywords or check your spelling.</p>
			</div>
		{:else if $collectionsSorted.length > 0}
			<div class="space-y-6">
				<HadithFilters />
				<HadithList />
			</div>
		{:else}
			<div class="text-center py-12">
				<div class="max-w-md mx-auto">
					<div class="text-6xl mb-4">📖</div>
					<h2 class="text-xl font-semibold text-text-900 mb-2 font-english">
						Welcome to Ask Hadith
					</h2>
					<p class="text-text-600 font-english">
						Search for authentic Hadiths from Sahih al-Bukhari, Sahih Muslim, and other major collections.
					</p>
				</div>
			</div>
		{/if}
	</div>
</div>
