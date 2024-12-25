<script lang="ts">
    import { onMount } from "svelte";
    import service from "../lib/service";

    let id;
    let response;

    onMount(async () => {
        id = window.location.pathname.split("/").pop();
        response = (await service.getEvent(id)).data;
        console.log(response.name);

        if (!response) {
            window.location.href = "/";
        }
    });
</script>

<section class="flex min-h-screen font-inter flex-col">
    <div class="mt-16 flex flex-col">
        <h1 class="font-roboto-mono font-bold text-3xl mb-4">{response?.description}</h1>
        <hr class="border-black border-t border-0 w-full mb-8">

        <div class="flex flex-row justify-between">
            <div class="flex flex-col">
                
                <div class="flex flex-col mb-8">
                    <p class="mb-4 text-sm">CATEGORIA:</p>
                    <p class="text-2xl pl-1">{response?.category.name.toUpperCase()}</p>
                </div>
                <div class="flex flex-col mb-8">
                    <p class="mb-4 text-sm">EVENTO:</p>
                    <p class="text-2xl pl-1">{response?.name.toUpperCase()}</p>
                </div>
                <div class="flex flex-col mb-8">
                    <p class="mb-4 text-sm">PRECIO:</p>
                    <button class="px-2 py-4 rounded-full bg-orange-500 border text-sm font-medium text-white">${response?.price}</button>
                </div>
            </div>
            <div>
                <img src={`https://picsum.photos/400/300?random={response?.eventId}`} alt="Event Img" class="w-96 h-72 object-cover">
            </div>
        </div>
        <hr class="border-black border-t border-0 w-full mb-8">

        <p>{JSON.stringify(response, null, 2)}</p>
    </div>
</section>
