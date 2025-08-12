<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	// Kaaba coordinates (Makkah, Saudi Arabia)
	const KAABA_LAT = 21.4225;
	const KAABA_LNG = 39.8262;

	let userLat = 0;
	let userLng = 0;
	let qiblaDirection = 0;
	let compassRotation = 0;
	let isLocationAvailable = false;
	let isCompassAvailable = false;
	let showInstructions = false;
	let errorMessage = '';
	let deviceHeading = 0;
	let isCalibrating = false;

	// Calculate Qibla direction using great circle formula
	const calculateQiblaDirection = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
		const dLng = lng2 - lng1;
		const lat1Rad = lat1 * Math.PI / 180;
		const lat2Rad = lat2 * Math.PI / 180;
		const dLngRad = dLng * Math.PI / 180;

		const y = Math.sin(dLngRad) * Math.cos(lat2Rad);
		const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLngRad);
		
		let qibla = Math.atan2(y, x) * 180 / Math.PI;
		return (qibla + 360) % 360;
	};

	// Get user location
	const getUserLocation = (): Promise<void> => {
		return new Promise((resolve, reject) => {
			if (!navigator.geolocation) {
				reject(new Error('Geolocation is not supported by this browser.'));
				return;
			}

			navigator.geolocation.getCurrentPosition(
				(position) => {
					userLat = position.coords.latitude;
					userLng = position.coords.longitude;
					isLocationAvailable = true;
					
					// Calculate initial Qibla direction
					qiblaDirection = calculateQiblaDirection(userLat, userLng, KAABA_LAT, KAABA_LNG);
					console.log('Qibla direction calculated:', qiblaDirection);
					resolve();
				},
				(error) => {
					errorMessage = `Location error: ${error.message}`;
					reject(error);
				},
				{
					enableHighAccuracy: true,
					timeout: 15000,
					maximumAge: 60000
				}
			);
		});
	};

	// Handle device orientation with better error handling
	const handleOrientation = (event: DeviceOrientationEvent) => {
		if (!isLocationAvailable) return;

		let alpha = event.alpha;
		let beta = event.beta;
		let gamma = event.gamma;

		// Handle different device orientations
		if (alpha !== null && beta !== null && gamma !== null) {
			// iOS devices
			if (typeof event.webkitCompassHeading !== 'undefined') {
				deviceHeading = event.webkitCompassHeading;
			} else if (alpha !== null) {
				// Android and other devices
				deviceHeading = alpha;
			}

			// Calculate compass rotation relative to Qibla
			compassRotation = (qiblaDirection - deviceHeading + 360) % 360;
			
			// Update compass display
			compassRotation = compassRotation;
		}
	};

	// Request device orientation permission with better handling
	const requestOrientationPermission = async () => {
		try {
			// Check if device orientation is supported
			if (typeof DeviceOrientationEvent === 'undefined') {
				errorMessage = 'Device orientation not supported on this device.';
				return;
			}

			// For iOS 13+ and some Android devices
			if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
				try {
					const permission = await (DeviceOrientationEvent as any).requestPermission();
					if (permission === 'granted') {
						isCompassAvailable = true;
						window.addEventListener('deviceorientation', handleOrientation, true);
						console.log('Device orientation permission granted');
					} else {
						errorMessage = 'Device orientation permission denied. Use manual controls.';
					}
				} catch (error) {
					console.log('Permission request failed, trying fallback:', error);
					// Fallback: try to add listener anyway
					try {
						window.addEventListener('deviceorientation', handleOrientation, true);
						isCompassAvailable = true;
						console.log('Fallback device orientation enabled');
					} catch (fallbackError) {
						errorMessage = 'Device orientation not available. Use manual controls.';
					}
				}
			} else {
				// For devices that don't require permission
				try {
					window.addEventListener('deviceorientation', handleOrientation, true);
					isCompassAvailable = true;
					console.log('Device orientation enabled without permission');
				} catch (error) {
					errorMessage = 'Device orientation not available. Use manual controls.';
				}
			}
		} catch (error) {
			console.error('Error setting up device orientation:', error);
			errorMessage = 'Failed to initialize compass. Use manual controls.';
		}
	};

	// Manual compass rotation (for testing and fallback)
	const rotateCompass = (direction: 'left' | 'right') => {
		if (direction === 'left') {
			compassRotation = (compassRotation - 15 + 360) % 360;
		} else {
			compassRotation = (compassRotation + 15) % 360;
		}
	};

	// Calibrate compass
	const calibrateCompass = () => {
		isCalibrating = true;
		// Simulate calibration process
		setTimeout(() => {
			isCalibrating = false;
			// Reset to calculated Qibla direction
			compassRotation = 0;
		}, 2000);
	};

	onMount(async () => {
		try {
			console.log('Initializing Qibla Direction...');
			await getUserLocation();
			await requestOrientationPermission();
		} catch (error) {
			console.error('Error initializing Qibla direction:', error);
			errorMessage = 'Failed to initialize. Please check your location permissions.';
		}
	});

	onDestroy(() => {
		window.removeEventListener('deviceorientation', handleOrientation, true);
	});
</script>

<div class="max-w-md mx-auto bg-surface rounded-2xl shadow-xl border border-text-100 p-6 md:p-8">
	<!-- Header -->
	<div class="text-center mb-6">
		<div class="text-4xl mb-3">🕋</div>
		<h2 class="text-2xl font-bold text-text-900 font-english">Qibla Direction</h2>
		<p class="text-text-600 font-english">Find the direction to the Kaaba</p>
	</div>

	<!-- Compass Display -->
	<div class="text-center mb-6">
		<div class="relative inline-block">
			<!-- Compass Background -->
			<div class="w-48 h-48 rounded-full bg-gradient-to-br from-primary-50 to-secondary-50 border-4 border-primary-200 relative">
				<!-- Cardinal Directions -->
				<div class="absolute inset-0 flex items-center justify-center">
					<div class="absolute top-2 text-xs font-bold text-primary-700">N</div>
					<div class="absolute bottom-2 text-xs font-bold text-primary-700">S</div>
					<div class="absolute left-2 text-xs font-bold text-primary-700">W</div>
					<div class="absolute right-2 text-xs font-bold text-primary-700">E</div>
				</div>
				
				<!-- Qibla Arrow -->
				<div 
					class="absolute inset-0 flex items-center justify-center transition-transform duration-300"
					style="transform: rotate({compassRotation}deg)"
				>
					<div class="w-2 h-24 bg-red-500 rounded-full relative">
						<!-- Arrow Head -->
						<div class="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-10 border-l-transparent border-r-transparent border-b-red-500"></div>
					</div>
				</div>
				
				<!-- Center Dot -->
				<div class="absolute inset-0 flex items-center justify-center">
					<div class="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
				</div>
			</div>
			
			<!-- Qibla Label -->
			<div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
				Qibla
			</div>
		</div>
	</div>

	<!-- Information Display -->
	<div class="text-center mb-6 space-y-2">
		{#if isLocationAvailable}
			<div class="text-sm text-text-600 font-english">
				<span class="font-semibold">Your Location:</span> {userLat.toFixed(4)}, {userLng.toFixed(4)}
			</div>
			<div class="text-sm text-text-600 font-english">
				<span class="font-semibold">Qibla Direction:</span> {qiblaDirection.toFixed(1)}° {qiblaDirection > 0 && qiblaDirection < 180 ? 'East' : 'West'} of North
			</div>
		{/if}
		
		{#if isCompassAvailable}
			<div class="text-sm text-green-600 font-english">
				✅ Compass Active
			</div>
		{:else}
			<div class="text-sm text-orange-600 font-english">
				⚠️ Use Manual Controls
			</div>
		{/if}

		{#if isCalibrating}
			<div class="text-sm text-blue-600 font-english">
				🔄 Calibrating Compass...
			</div>
		{/if}
	</div>

	<!-- Manual Controls -->
	<div class="flex justify-center gap-4 mb-6">
		<button
			on:click={() => rotateCompass('left')}
			class="px-4 py-2 bg-text-100 hover:bg-text-200 text-text-700 rounded-lg transition-colors duration-200"
		>
			↶ Rotate Left
		</button>
		<button
			on:click={() => rotateCompass('right')}
			class="px-4 py-2 bg-text-100 hover:bg-text-200 text-text-700 rounded-lg transition-colors duration-200"
		>
			↷ Rotate Right
		</button>
	</div>

	<!-- Calibrate Button -->
	<div class="text-center mb-6">
		<button
			on:click={calibrateCompass}
			class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200"
			disabled={isCalibrating}
		>
			{isCalibrating ? 'Calibrating...' : 'Calibrate Compass'}
		</button>
	</div>

	<!-- Error Messages -->
	{#if errorMessage}
		<div class="text-center mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
			<p class="text-red-600 text-sm font-english">{errorMessage}</p>
		</div>
	{/if}

	<!-- Instructions -->
	<div class="text-center">
		<button
			on:click={() => showInstructions = !showInstructions}
			class="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
		>
			{showInstructions ? 'Hide Instructions' : 'Show Instructions'}
		</button>
		
		{#if showInstructions}
			<div class="mt-4 p-4 bg-text-50 rounded-xl text-sm text-text-600 font-english" in:fade={{ duration: 200 }}>
				<p class="mb-2"><strong>How to use:</strong></p>
				<ul class="space-y-1 text-xs text-left">
					<li>• Hold your device flat and level</li>
					<li>• The red arrow points to the Kaaba</li>
					<li>• Rotate your device until the arrow points up</li>
					<li>• You're now facing the Qibla direction</li>
					<li>• Use manual controls if compass isn't working</li>
					<li>• Calibrate if readings seem inaccurate</li>
				</ul>
			</div>
		{/if}
	</div>
</div> 