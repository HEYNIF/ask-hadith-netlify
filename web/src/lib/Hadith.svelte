<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import BookmarkSvg from '$lib/svgs/bookmark.svelte';
	import type { HadithModel } from '../models';
	import { searchKey } from '../store';

	export let hadith: HadithModel;

	let copied = false;
	let bookmarked = false;

	const copyText = () => {
		let text = '';
		if (hadith.hadith_no) {
			text += hadith.narrator_en + '\n';
		}
		text +=
			hadith.body_en +
			'\n' +
			'\n' +
			hadith.collection +
			' (Book: ' +
			hadith.book_no +
			', Hadith: ' +
			hadith.book_ref_no +
			') ';
		if (hadith.hadith_no) {
			text += 'Hadith No: ' + hadith.hadith_no;
		}
		text += '\n' + 'Book:' + hadith.book_en + '\n';
		if (hadith.chapter_en) {
			text += 'Chapter:' + hadith.chapter_en + '\n';
		}
		if (hadith.hadith_grade) {
			text += 'Grade:' + hadith.hadith_grade + '\n';
		}

		const urlEncodedSearchKey = encodeURIComponent($searchKey);

		text += `https://askhadith.com/book?collection_id=${hadith.collection_id}&book=${hadith.book_no}&ref_no=${hadith.book_ref_no}&search_key=${urlEncodedSearchKey}`;

		navigator.clipboard.writeText(text);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 3000);
	};

	const getLocalBookmarkedHadiths = (): HadithModel[] => {
		let hadiths = JSON.parse(localStorage.getItem('bookmarkedHadiths') || '[]');
		if (!hadiths || !Array.isArray(hadiths) || hadiths.length === 0) {
			hadiths = [];
		}
		return hadiths;
	};

	const bookmarkHadith = () => {
		let hadiths = getLocalBookmarkedHadiths();
		hadiths.push(hadith);
		localStorage.setItem('bookmarkedHadiths', JSON.stringify(hadiths));
		bookmarked = true;
	};

	const unBookmarkHadith = () => {
		let hadiths = getLocalBookmarkedHadiths();
		for (let i = 0; i < hadiths.length; i++) {
			if (
				hadiths[i].book_no === hadith.book_no &&
				hadiths[i].book_ref_no === hadith.book_ref_no &&
				hadiths[i].collection_id === hadith.collection_id
			) {
				hadiths.splice(i, 1);
				break;
			}
		}
		localStorage.setItem('bookmarkedHadiths', JSON.stringify(hadiths));
		bookmarked = false;
	};

	const isBookmarked = (): boolean => {
		let hadiths = getLocalBookmarkedHadiths();
		for (let i = 0; i < hadiths.length; i++) {
			if (
				hadiths[i].book_no === hadith.book_no &&
				hadiths[i].book_ref_no === hadith.book_ref_no &&
				hadiths[i].collection_id === hadith.collection_id
			) {
				return true;
			}
		}
		return false;
	};

	onMount(() => {
		bookmarked = isBookmarked();
	});
</script>

<div
	in:fade={{ duration: 300 }}
	class="bg-surface rounded-2xl shadow-lg border border-text-100 p-6 md:p-8 mb-6 max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl"
>
	<!-- Narrator Section -->
	{#if hadith.narrator_en}
		<div class="mb-4">
			<span class="text-sm font-bold text-primary-600 tracking-wide font-english">{hadith.narrator_en}</span>
		</div>
	{/if}

	<!-- Action Buttons -->
	<div class="flex justify-end gap-2 mb-4">
		<button
			class="rounded-full bg-text-50 hover:bg-text-100 active:bg-text-200 text-text-600 p-3 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-300"
			on:click={copyText}
			aria-label="Copy Hadith"
			title="Copy Hadith"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16h8M8 12h8m-7 8h6a2 2 0 002-2V7a2 2 0 00-2-2h-6a2 2 0 00-2 2v13a2 2 0 002 2z" />
			</svg>
			{#if copied}
				<span class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-text-800 text-white text-xs px-2 py-1 rounded">Copied!</span>
			{/if}
		</button>
		<button
			class="rounded-full bg-text-50 hover:bg-text-100 active:bg-text-200 text-text-600 p-3 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-300"
			on:click={bookmarked ? unBookmarkHadith : bookmarkHadith}
			aria-label={bookmarked ? 'Remove Bookmark' : 'Bookmark Hadith'}
			title={bookmarked ? 'Remove Bookmark' : 'Bookmark Hadith'}
		>
			<BookmarkSvg class="h-5 w-5" filled={bookmarked} />
		</button>
	</div>

	<!-- Hadith Content -->
	<div class="text-lg md:text-xl font-english text-text-900 leading-relaxed mb-6">
		{hadith.body_en}
	</div>

	<!-- Tags Section -->
	<div class="flex flex-wrap gap-2">
		<span class="bg-primary-50 text-primary-700 rounded-full px-3 py-1 text-sm font-medium">
			{hadith.collection} (Book: {hadith.book_no}, Hadith: {hadith.book_ref_no})
		</span>
		{#if hadith.hadith_no}
			<span class="bg-secondary-50 text-secondary-700 rounded-full px-3 py-1 text-sm font-medium">
				Hadith No: {hadith.hadith_no}
			</span>
		{/if}
		<span class="bg-text-50 text-text-700 rounded-full px-3 py-1 text-sm font-medium">
			Book: {hadith.book_en}
		</span>
		{#if hadith.chapter_en}
			<span class="bg-text-50 text-text-700 rounded-full px-3 py-1 text-sm font-medium">
				Chapter: {hadith.chapter_en}
			</span>
		{/if}
		{#if hadith.hadith_grade}
			<span class="bg-secondary-100 text-secondary-800 rounded-full px-3 py-1 text-sm font-semibold">
				Grade: {hadith.hadith_grade}
			</span>
		{/if}
	</div>
</div>
