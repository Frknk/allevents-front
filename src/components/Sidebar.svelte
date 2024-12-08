<script lang="ts">
	import { Settings, Calendar, CreditCard, LogOut } from "lucide-svelte";

	// Props
	let { fullName }: { fullName: string } = $props();

	// Navigation items
	const navItems = [
		{ label: "EVENTOS", icon: Calendar, href: "#" },
		{ label: "PERFIL", icon: Settings, href: "#", active: true },
		{ label: "AJUSTES", icon: Settings, href: "/settings" },
		{ label: "FACTURACIÓN", icon: CreditCard, href: "#" },
	];



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
	<button class="flex items-center p-3 text-black hover:bg-black/5  mt-auto justify-between rounded-full">
		CERRAR SESIÓN
        <LogOut class="w-5 h-5 mr-3" />
	</button>
</aside>
