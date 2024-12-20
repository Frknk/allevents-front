<script lang="ts">
    import Logo from "./Logo.svelte";
    import {User} from "../lib/UserStore";
    import UserHelper from "../lib/checkAndLoadUserLogged";
    import { onMount } from "svelte";

    let navItems: { title: string; href: string }[] = $state([
		{ title: "EVENTOS", href: "#eventos" },
		{ title: "PROYECTOS", href: "#proyectos" },
		{ title: "PROPIETARIO DEL EVENTO", href: "#propietario" },
		{ title: "BLOG", href: "#blog" },
	]);

    // @ts-ignore
    let isOpen: boolean = $state(false)
    let user
    let authenticated= $state(false);
    $effect(User.subscribe(value => { user = value; }));

    onMount(async () => {
        user = await UserHelper.checkAndLoadUserLogged();
        if(user && user.token) authenticated = true;
    });

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

        <!-- Register/User Button -->
		{#if authenticated}
			<a href="/user" class="hidden md:block bg-orange-500 text-white px-6 py-2 font-medium hover:bg-orange-600 transition-colors">USUARIO</a>
		{:else}
			<a href="/register" class="hidden md:block bg-orange-500 text-white px-6 py-2 font-medium hover:bg-orange-600 transition-colors">REGISTRARME</a>
		{/if}

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
            {#if authenticated}
				<a href="/user" class="block px-3 py-2 text-white bg-orange-500 text-center mt-2 hover:bg-orange-600 transition-colors">USUARIO</a>
			{:else}
				<a href="/register" class="block px-3 py-2 text-white bg-orange-500 text-center mt-2 hover:bg-orange-600 transition-colors">REGISTRARME</a>
			{/if}
        </div>
    </div>
    {/if}
</header>