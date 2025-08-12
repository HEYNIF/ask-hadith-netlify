<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	let count = 0;
	let target = 33; // Default for SubhanAllah
	let isCounting = false;
	let showPresets = false;
	let lastTapTime = 0;
	let tapCount = 0;

	// Preset counts for common dhikr
	const presets = [
		{ name: 'SubhanAllah', count: 33, color: 'bg-primary-500' },
		{ name: 'Alhamdulillah', count: 33, color: 'bg-secondary-500' },
		{ name: 'Allahu Akbar', count: 33, color: 'bg-green-500' },
		{ name: 'La ilaha illallah', count: 100, color: 'bg-purple-500' },
		{ name: 'Astaghfirullah', count: 100, color: 'bg-red-500' },
		{ name: 'Custom', count: 0, color: 'bg-text-500' }
	];

	// Load saved count from localStorage
	onMount(() => {
		const savedCount = localStorage.getItem('tasbeehCount');
		const savedTarget = localStorage.getItem('tasbeehTarget');
		if (savedCount) count = parseInt(savedCount);
		if (savedTarget) target = parseInt(savedTarget);
	});

	// Save count to localStorage
	const saveCount = () => {
		localStorage.setItem('tasbeehCount', count.toString());
		localStorage.setItem('tasbeehTarget', target.toString());
	};

	// Increment counter
	const increment = () => {
		if (count < target) {
			count++;
			isCounting = true;
			saveCount();
			
			// Reset animation after a short delay
			setTimeout(() => {
				isCounting = false;
			}, 200);

			// Check if target reached
			if (count === target) {
				showCompletionMessage();
			}
		}
	};

	// Reset counter
	const reset = () => {
		count = 0;
		isCounting = false;
		saveCount();
	};

	// Set custom target
	const setTarget = (newTarget: number) => {
		if (newTarget === 0) {
			// Custom target - prompt user
			const customTarget = prompt('Enter custom count:');
			if (customTarget && !isNaN(parseInt(customTarget))) {
				target = parseInt(customTarget);
				count = 0;
				saveCount();
			}
		} else {
			target = newTarget;
			count = 0;
			saveCount();
		}
		showPresets = false;
	};

	// Show completion message
	const showCompletionMessage = () => {
		// You can enhance this with a more beautiful notification
		setTimeout(() => {
			alert(`Mashallah! You've completed ${target} dhikr!`);
		}, 100);
	};

	// Handle double tap for quick increment
	const handleTap = () => {
		const now = Date.now();
		if (now - lastTapTime < 300) {
			// Double tap detected
			tapCount++;
			if (tapCount >= 3) {
				// Triple tap - increment by 10
				for (let i = 0; i < 10 && count < target; i++) {
					count++;
				}
				saveCount();
				tapCount = 0;
			}
		} else {
			tapCount = 1;
		}
		lastTapTime = now;
		increment();
	};

	// Calculate progress percentage
	$: progress = (count / target) * 100;
	$: progressColor = count === target ? 'bg-green-500' : 'bg-primary-500';
</script>

<div class="max-w-md mx-auto bg-surface rounded-2xl shadow-xl border border-text-100 p-6 md:p-8">
	<!-- Header -->
	<div class="text-center mb-6">
		<div class="text-4xl mb-3">📿</div>
		<h2 class="text-2xl font-bold text-text-900 font-english">Tasbeeh Counter</h2>
		<p class="text-text-600 font-english">Count your dhikr with ease</p>
	</div>

	<!-- Progress Bar -->
	<div class="mb-6">
		<div class="flex justify-between text-sm text-text-600 mb-2 font-english">
			<span>Progress</span>
			<span>{count} / {target}</span>
		</div>
		<div class="w-full bg-text-100 rounded-full h-3 overflow-hidden">
			<div 
				class="h-3 rounded-full transition-all duration-300 ease-out {progressColor}"
				style="width: {progress}%"
			></div>
		</div>
	</div>

	<!-- Main Counter Display -->
	<div class="text-center mb-6">
		<div 
			in:scale={{ duration: 200 }}
			class="text-6xl md:text-7xl font-bold text-primary-600 font-english transition-all duration-200 {isCounting ? 'scale-110' : 'scale-100'}"
		>
			{count}
		</div>
		<p class="text-text-500 font-english">Current Count</p>
	</div>

	<!-- Main Counter Button -->
	<button
		on:click={handleTap}
		class="w-full bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 mb-6"
		disabled={count >= target}
	>
		{count >= target ? 'Target Reached! 🎉' : 'Tap to Count'}
	</button>

	<!-- Preset Buttons -->
	<div class="mb-6">
		<button
			on:click={() => showPresets = !showPresets}
			class="w-full bg-text-100 hover:bg-text-200 text-text-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200 mb-3"
		>
			{showPresets ? 'Hide Presets' : 'Show Presets'}
		</button>
		
		{#if showPresets}
			<div class="grid grid-cols-2 gap-2" in:fade={{ duration: 200 }}>
				{#each presets as preset}
					<button
						on:click={() => setTarget(preset.count)}
						class="p-3 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:scale-105 {preset.color}"
					>
						{preset.name}
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Action Buttons -->
	<div class="flex gap-3">
		<button
			on:click={reset}
			class="flex-1 bg-text-100 hover:bg-text-200 text-text-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200"
		>
			Reset
		</button>
		<button
			on:click={() => setTarget(33)}
			class="flex-1 bg-secondary-500 hover:bg-secondary-600 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200"
		>
			Quick Reset
		</button>
	</div>

	<!-- Instructions -->
	<div class="mt-6 p-4 bg-text-50 rounded-xl text-sm text-text-600 font-english">
		<p class="mb-2"><strong>Tips:</strong></p>
		<ul class="space-y-1 text-xs">
			<li>• Tap to count one by one</li>
			<li>• Double tap quickly to count faster</li>
			<li>• Triple tap to add 10 at once</li>
			<li>• Choose from preset counts or set custom</li>
		</ul>
	</div>
</div> 