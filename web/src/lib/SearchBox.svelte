<script lang="ts">
	import {
		searchKey,
		hadithsByCollection,
		selectedCollection,
		collectionsSorted,
		firstHadithBase64
	} from '../store';
	import SearchSvg from './svgs/search.svelte';
	import type { SearchResponse } from '../models';
	import { slide } from 'svelte/transition';

	export let searching: boolean;
	export let notFound: boolean;

	const searchHadiths = async () => {
		if ($searchKey.length < 2) {
			return;
		}
		searching = true;
		notFound = false;

		$hadithsByCollection = new Map();
		$collectionsSorted = [];

		try {
			const response = await fetch(`https://ask-hadith.vercel.app/api/search?search=${$searchKey}`);
			// const response = await fetch(`http://localhost:3000/api/search?search=${$searchKey}`);

			const resp: SearchResponse = await response.json();
			if (resp == null || resp.data.length == 0) {
				notFound = true;
				searching = false;
				return;
			}
			const collections = resp.data;
			$firstHadithBase64 = resp.first_hadith_base64;

			collections.forEach((col) => {
				$hadithsByCollection.set(col.collection, col.hadiths);
				$collectionsSorted = [
					...$collectionsSorted,
					{ collection: col.collection, count: col.count }
				];
			});

			$selectedCollection = collections[0].collection;
		} catch (error) {
			console.log(error);
			notFound = true;
		}

		window.history.pushState({}, '', `?search=${$searchKey}`);
		searching = false;
	};

	const handleKeyup = (e: { keyCode: number; preventDefault: () => void }) => {
		if (e.keyCode == 13) {
			const current = document.activeElement;
			if (current instanceof HTMLElement) current.blur();
			e.preventDefault();
			searchHadiths();
		}
	};
	let showInstructions = false;
</script>

<div class="mx-auto flex-col items-center justify-center w-full">
	<div class="relative w-full max-w-2xl mx-auto">
		<div class="relative">
			<input
				type="text"
				class="w-full rounded-2xl border-0 bg-surface shadow-lg p-4 md:p-5 text-base md:text-lg font-english text-text-900 placeholder-text-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:shadow-xl transition-all duration-300 pr-12"
				placeholder="Search for a Hadith, topic, or reference..."
				bind:value={$searchKey}
				on:keyup={handleKeyup}
				aria-label="Search Hadiths"
			/>
			<button
				class="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white p-2 md:p-3 shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50"
				on:click={searchHadiths}
				aria-label="Search Hadiths"
				disabled={searching}
			>
				<SearchSvg class="w-5 h-5 md:w-6 md:h-6" />
			</button>
		</div>
	</div>

	<div
		class="mx-auto mt-6 flex max-w-sm flex-col items-center justify-center text-sm text-text-600"
	>
		<button
			class="mb-3 flex items-center rounded-lg font-medium hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-colors duration-200"
			on:click={() => (showInstructions = !showInstructions)}
		>
			{showInstructions ? 'Hide Instructions' : 'Show Instructions'}
			<svg
				class="ml-2 h-4 w-4 transition-transform duration-200"
				class:rotate-180={showInstructions}
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
			</svg>
		</button>
		{#if showInstructions}
			<div class="rounded-xl bg-surface shadow-lg p-4 border border-text-100 text-text-700 transition-all duration-300">
				<p class="text-sm leading-relaxed">
					Type a topic, keyword, or reference number to search the Hadith collections.<br />
					Examples: <span class="font-semibold text-primary-600">mercy</span>, <span class="font-semibold text-primary-600">bukhari 1029</span>, <span class="font-semibold text-primary-600">fasting</span>
				</p>
			</div>
		{/if}
	</div>
</div>
