<script lang="ts">
	import { onMount } from "svelte";
	import { User } from "../lib/UserStore";

	let user;
	let authenticated = $state(false);
	let loading = $state(true);
    let { children } = $props() 

	$effect(User.subscribe(value => { user = value; }));

	onMount(() => {
		if (user && user.token) {
			authenticated = true;
			loading = false;
		} else {
			// Redirect to login
			window.location.href = "/login";
		}
	});
</script>

{#if loading}
	<div class="flex justify-center items-center min-h-screen">
		<p>Loading...</p>
	</div>
{:else}
{@render children()}




{/if}
