<script lang="ts">
    import Logo from "./Logo.svelte";
    let navItems: { title: string; href: string }[] = $state([
		{ title: "EVENTOS", href: "#eventos" },
		{ title: "PROYECTOS", href: "#proyectos" },
		{ title: "PROPIETARIO DEL EVENTO", href: "#propietario" },
		{ title: "BLOG", href: "#blog" },
	]);

    let isOpen: boolean = $state(false)

</script>

<header class="fixed w-full">
    <nav class="mx-auto flex items-center justify-between h-16 px-4 bg-white">
        <Logo/>
        
        <!-- Desktop Navigation -->
		<div class="hidden md:flex items-center space-x-1">
			{#each navItems as item}
				<a href={item.href} class="px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors">
					{item.title}
				</a>
			{/each}
		</div>

        <!-- Register Button -->
		<a href="/register" class="hidden md:block bg-orange-500 text-white px-6 py-2 font-medium hover:bg-orange-600 transition-colors">REGISTRARME</a>

		<!-- Mobile Menu Button -->
		<button onclick={() => (isOpen = !isOpen)} class="md:hidden p-2 text-gray-700" aria-label="Menu">
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
			</svg>
		</button>
    </nav>
    
    <!-- Mobile Navigation -->
	{#if isOpen}
    <div class="md:hidden bg-white border-t">
        <div class="container mx-auto px-4 py-2">
            {#each navItems as item}
                <a href={item.href} class="block px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors">
                    {item.title}
                </a>
            {/each}
            <a href="/register" class="block px-3 py-2 text-white bg-orange-500 text-center mt-2 hover:bg-orange-600 transition-colors">REGISTRARME</a>
        </div>
    </div>
    {/if}
</header>