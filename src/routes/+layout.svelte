<script lang="ts">
	import '../app.css';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	let { children } = $props();
</script>

<Header/>
<div class="max-w-5xl mx-auto px-6">
	{@render children()}
</div>
<Footer/>

