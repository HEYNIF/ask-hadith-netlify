import type { SearchResponse, CollectionResponse } from '../../models';

export async function load({ fetch }: { fetch: any }) {
	try {
		// Try different search terms to get collections
		const searchTerms = ['allah', 'muhammad', 'prayer', 'fasting', 'charity'];
		let books: any[] = [];
		
		for (const term of searchTerms) {
			try {
				const res = await fetch(`https://ask-hadith.vercel.app/api/search?search=${encodeURIComponent(term)}`);
				
				if (res.ok) {
					const data: SearchResponse = await res.json();
					
					if (data.data && data.data.length > 0) {
						// Convert collections to books format
						const foundBooks = data.data.map((collection: CollectionResponse) => ({
							id: collection.collection.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
							name: collection.collection,
							title: collection.collection,
							description: `Collection of authentic Hadith from ${collection.collection}`,
							hadith_count: collection.count,
							collection_id: collection.collection.toLowerCase().replace(/\s+/g, '')
						}));
						
						// Merge books, avoiding duplicates
						foundBooks.forEach(book => {
							if (!books.find(existing => existing.id === book.id)) {
								books.push(book);
							}
						});
						
						// If we found books, break
						if (books.length > 0) {
							break;
						}
					}
				}
			} catch (error) {
				console.error(`Error fetching with term "${term}":`, error);
			}
		}
		
		// If still no books, use fallback with known collection names
		if (books.length === 0) {
			const knownCollections = [
				{ name: 'Sahih al-Bukhari', count: 7563 },
				{ name: 'Sahih Muslim', count: 7563 },
				{ name: 'Sunan Abi Dawud', count: 5274 },
				{ name: 'Jami` at-Tirmidhi', count: 3956 },
				{ name: 'Sunan an-Nasa\'i', count: 5662 },
				{ name: 'Sunan Ibn Majah', count: 4341 }
			];
			
			books = knownCollections.map(collection => ({
				id: collection.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
				name: collection.name,
				title: collection.name,
				description: `Collection of authentic Hadith from ${collection.name}`,
				hadith_count: collection.count,
				collection_id: collection.name.toLowerCase().replace(/\s+/g, '')
			}));
		}
		
		return {
			books: books
		};
	} catch (error) {
		console.error('Error fetching books:', error);
		return {
			books: []
		};
	}
} 