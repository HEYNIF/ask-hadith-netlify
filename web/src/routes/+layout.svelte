<script>
	import '../app.css';
	import Nav from '$lib/Nav.svelte';
</script>

<div class="min-h-screen bg-slate-50 dark:bg-gray-900">
	<Nav />

	<slot />

	<!-- Footer removed as requested -->
</div>
