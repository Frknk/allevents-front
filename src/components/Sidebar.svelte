<script lang="ts">
	import { onMount } from 'svelte';
	import { Settings, Calendar, CreditCard, LogOut } from "lucide-svelte";
	import {User} from '../lib/UserStore';

	// User
	let user;
	let currentPath = '';

    onMount(() => {
        currentPath = window.location.pathname;
		console.log(currentPath);
    });
	$effect(User.subscribe(value => { user = value; }));

	// Props
	let { fullName }: { fullName: string } = $props();

	// Navigation items
	const navItems: { label: string; icon: typeof Calendar; href: string; active?: boolean }[] = [
		{ label: "EVENTOS", icon: Calendar, href: "/user/events" },
		{ label: "PERFIL", icon: Settings, href: "/user/profile" },
		{ label: "AJUSTES", icon: Settings, href: "/user//settings" },
		{ label: "FACTURACIÓN", icon: CreditCard, href: "/user/payments" },
	];

	// Function to set the active item
	function setActiveItem(href) {
		navItems.forEach(item => {
			item.active = item.href === href;
			console.log(item.active);
		});
	}

	// Call setActiveItem with the current path
	setActiveItem(window.location.pathname);

	// Function to handle logout
	function handleLogout() {
		// Add your logout logic here
		try {
			User.signout();
			window.location.href = "/login";
		} catch (error) {
			console.log(error);
		}
	}

</script>

<aside class="w-64 bg-[#E9DEC9] p-6 flex flex-col h-screen border border-black">
	<div class="mb-8">
		<h2 class="text-lg font-bold">{fullName}</h2>
	</div>

	<nav class="flex-1">
		<ul class="space-y-2">
			{#each navItems as item}
				<li>
					<a href={item.href} class="flex items-center p-3 rounded-full border border-black {item.active ? 'bg-black text-white' : 'text-black hover:bg-black/5'}">
						<!-- svelte-ignore svelte_component_deprecated -->
						<svelte:component this={item.icon} class="w-5 h-5 mr-3" />
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
    <hr class="border-0 border-t border-black mb-4" />
	<button class="flex items-center p-3 text-black hover:bg-black/5  mt-auto justify-between rounded-full" onclick={handleLogout}>
		CERRAR SESIÓN
        <LogOut class="w-5 h-5 mr-3" />
	</button>
</aside>
