import type { SearchResponse, HadithModel } from '../../../models';

export async function load({ params, fetch }: { params: any; fetch: any }) {
	const { id } = params;
	
	try {
		// Convert book ID back to collection name and ID
		const collectionMap: { [key: string]: { id: string; name: string } } = {
			'sahih-al-bukhari': { id: 'bukhari', name: 'Sahih al-Bukhari' },
			'sahih-muslim': { id: 'muslim', name: 'Sahih Muslim' },
			'sunan-abi-dawud': { id: 'abudawud', name: 'Sunan Abi Dawud' },
			'jami-at-tirmidhi': { id: 'tirmidhi', name: 'Jami` at-Tirmidhi' },
			'sunan-an-nasai': { id: 'nasai', name: 'Sunan an-Nasa\'i' },
			'sunan-ibn-majah': { id: 'ibnmajah', name: 'Sunan Ibn Majah' }
		};
		
		const collectionInfo = collectionMap[id] || { id: id, name: id.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) };
		const collectionID = collectionInfo.id;
		const collectionName = collectionInfo.name;
		
		console.log('Looking for collection:', collectionName, 'with ID:', collectionID);
		
		// First, try the new collection API
		try {
			const res = await fetch(`https://ask-hadith.vercel.app/api/collection?collection_id=${collectionID}&limit=1000`);
			
			if (res.ok) {
				const data = await res.json();
				console.log('Collection API response:', data);
				
				if (data.hadiths && data.hadiths.length > 0) {
					// Format hadith to match the expected structure
					const formattedHadith = data.hadiths.map((hadith: HadithModel) => ({
						number: hadith.book_ref_no || hadith.hadith_no,
						arabic: hadith.body_en, // Note: Your current data doesn't have Arabic text
						translation: hadith.body_en,
						narrator: hadith.narrator_en,
						grade: hadith.hadith_grade,
						book: hadith.book_en,
						chapter: hadith.chapter_en,
						collection: hadith.collection
					}));
					
					console.log('Total hadith found via Collection API:', formattedHadith.length);
					
					return {
						hadiths: formattedHadith,
						bookId: id,
						collectionName: collectionName
					};
				}
			}
		} catch (error) {
			console.log('Collection API failed, trying fallback:', error);
		}
		
		// Fallback: Search for the specific collection name to get targeted results
		console.log('Using targeted search for:', collectionName);
		let allHadith: any[] = [];
		
		// Search for the specific collection we're looking for
		try {
			const res = await fetch(`https://ask-hadith.vercel.app/api/search?search=${encodeURIComponent(collectionName)}`);
			
			if (res.ok) {
				const data: SearchResponse = await res.json();
				console.log('Search API response for', collectionName, ':', data);
				
				if (data.data && data.data.length > 0) {
					// Find the specific collection we're looking for
					const collection = data.data.find(col => 
						col.collection.toLowerCase().includes(collectionName.toLowerCase()) ||
						collectionName.toLowerCase().includes(col.collection.toLowerCase()) ||
						col.collection.toLowerCase().includes(collectionID.toLowerCase())
					);
					
					if (collection && collection.hadiths && collection.hadiths.length > 0) {
						console.log('Found collection via targeted search:', collection.collection, 'with', collection.hadiths.length, 'hadith');
						
						// Format hadith to match the expected structure
						const formattedHadith = collection.hadiths.map((hadith: HadithModel) => ({
							number: hadith.book_ref_no || hadith.hadith_no,
							arabic: hadith.body_en,
							translation: hadith.body_en,
							narrator: hadith.narrator_en,
							grade: hadith.hadith_grade,
							book: hadith.book_en,
							chapter: hadith.chapter_en,
							collection: hadith.collection
						}));
						
						allHadith = formattedHadith;
					}
				}
			}
		} catch (error) {
			console.error('Error with targeted search:', error);
		}
		
		// If targeted search didn't work, try a few more specific terms
		if (allHadith.length === 0) {
			console.log('Targeted search failed, trying additional terms...');
			const additionalTerms = ['hadith', 'sunnah', 'prophet'];
			
			for (const term of additionalTerms) {
				try {
					const res = await fetch(`https://ask-hadith.vercel.app/api/search?search=${encodeURIComponent(term)}`);
					
					if (res.ok) {
						const data: SearchResponse = await res.json();
						
						if (data.data && data.data.length > 0) {
							// Find the specific collection we're looking for
							const collection = data.data.find(col => 
								col.collection.toLowerCase().includes(collectionID.toLowerCase()) ||
								collectionID.toLowerCase().includes(col.collection.toLowerCase())
							);
							
							if (collection && collection.hadiths && collection.hadiths.length > 0) {
								console.log('Found collection via additional search:', collection.collection, 'with', collection.hadiths.length, 'hadith');
								
								// Format hadith to match the expected structure
								const formattedHadith = collection.hadiths.map((hadith: HadithModel) => ({
									number: hadith.book_ref_no || hadith.hadith_no,
									arabic: hadith.body_en,
									translation: hadith.body_en,
									narrator: hadith.narrator_en,
									grade: hadith.hadith_grade,
									book: hadith.book_en,
									chapter: hadith.chapter_en,
									collection: hadith.collection
								}));
								
								// Add these hadith to our collection, avoiding duplicates
								formattedHadith.forEach(hadith => {
									if (!allHadith.find(existing => existing.number === hadith.number)) {
										allHadith.push(hadith);
									}
								});
								
								// If we found a good number of hadith, we can stop
								if (allHadith.length >= 15) {
									break;
								}
							}
						}
					}
				} catch (error) {
					console.error(`Error fetching with term "${term}":`, error);
				}
			}
		}
		
		// Sort hadith by number
		allHadith.sort((a, b) => {
			const numA = parseInt(a.number) || 0;
			const numB = parseInt(b.number) || 0;
			return numA - numB;
		});
		
		console.log('Total hadith found:', allHadith.length);
		
		return {
			hadiths: allHadith,
			bookId: id,
			collectionName: collectionName
		};
	} catch (error) {
		console.error('Error fetching hadiths:', error);
		return {
			hadiths: [],
			bookId: id,
			collectionName: id
		};
	}
} 