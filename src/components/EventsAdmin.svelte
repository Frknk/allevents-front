<script lang="ts">
    import { onMount } from "svelte";
    import service from "../lib/service";
    import { User } from "../lib/UserStore";
    import EventCreate from "./EventCreate.svelte";
    import EventCard from "./EventCard.svelte";

    let user = User.retrieve();
    let events = { list: [], filters: { categoryId: 10 } };

    onMount(async () => {
        let response = await service.events.list(events.filters);
        let list = response.data.list;
        // @ts-ignore
        list.forEach((e) => {
            e.image = `https://picsum.photos/400/300?random=${e.eventId}`;
            e.location = "Innokind Co-working Center";
        });
        // @ts-ignore
        events.list = [...list];
    });

    /*onMount(async () => {
        if (user.roleId !== 2) {
            console.log("No tienes permisos para acceder a esta pagina");
            window.location.href = "/";
        }
    });*/
</script>

<div class="max-w-2xl">
    <h1 class="text-4xl mb-2 font-bold font-roboto-mono">EVENTOS</h1>
    {#if user.roleId === 2}
    <a 
    href="/user/eventcreate" 
    class="inline-block px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors mb-8"
>
    Crear Evento
</a>
    {/if}
        <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16"
        >
            {#each events.list as item}
                <a href="/events/{item.eventId}" class="hover:shadow-lg">
                    <EventCard bind:event={item} bind:user />
                </a>
            {/each}
        </div>
</div>
