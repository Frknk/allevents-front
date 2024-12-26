<script lang="ts">
    import service from "../lib/service";
    import { onMount } from "svelte";

    let categories = [];
    let message = ""
    let formData = {
        name: "",
        description: "",
        eventDate: "",
        comment: "",
        comment2: "",
        price: 0,
        locationId: 0,
        state: 0,
        category: 0
    };

    onMount(async () => {
        const response = await service.category.list();
        categories = response.data.list;
    });

    async function handleSubmit() {
        console.log("clicked")
        try {
            const response = await service.createEvent(formData);
            if(response) {
                message = "Event created successfully";
            }
        } catch (error) {
            console.error("Error creating event:", error);
        }
    }
</script>

<div class="max-w-2xl p-6 ">
    <h2 class="text-2xl mb-2 font-bold font-roboto-mono">Crear Nuevo Evento</h2>

    {#if message}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{message}</span>
        </div>
    {/if}
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <hr class="mb-2 w-full border-0 border-t border-black" />
        <div class="flex flex-row space-x-12 py-2">
            <label class="w-52">Name</label>
            <input 
                type="text" 
                bind:value={formData.name}
                required
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
        </div>
        <hr class="mb-2 w-full border-0 border-t border-black" />
        <div class="flex flex-row space-x-12 py-2">
            <label class="w-52">Description</label>
            <textarea 
                bind:value={formData.description}
                required
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            ></textarea>
        </div>
        <hr class="mb-2 w-full border-0 border-t border-black" />
        <div class="flex flex-row space-x-12 py-2">
            <label class="w-52">Event Date</label>
            <input 
                type="datetime-local" 
                bind:value={formData.eventDate}
                required
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
        </div>
        <hr class="mb-2 w-full border-0 border-t border-black" />
        <div class="flex flex-row space-x-12 py-2">
            <label class="w-52">Price</label>
            <input 
                type="number" 
                bind:value={formData.price}
                required
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
        </div>
        <hr class="mb-2 w-full border-0 border-t border-black" />
        <div class="flex flex-row space-x-12 py-2">
            <label class="w-52">Category</label>
            <select 
                bind:value={formData.category}
                required
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
                <option value="">Select a category</option>
                {#each categories as category}
                    <option value={category.id}>{category.name}</option>
                {/each}
            </select>
        </div>
        <hr class="mb-2 w-full border-0 border-t border-black" />
        <div class="flex flex-row space-x-12 py-2">
            <label class="w-52">Location ID</label>
            <input 
                type="number" 
                bind:value={formData.locationId}
                required
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
        </div>
        <hr class="mb-2 w-full border-0 border-t border-black" />
        <div class="flex flex-row space-x-12 py-2">
            <label class="w-52">Comment</label>
            <input 
                type="text" 
                bind:value={formData.comment}
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
        </div>
        <hr class="mb-2 w-full border-0 border-t border-black" />
        <div class="flex flex-row space-x-12 py-2">
            <label class="w-52">Comment 2</label>
            <input 
                type="text" 
                bind:value={formData.comment2}
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
        </div>
        <hr class="mb-2 w-full border-0 border-t border-black" />
        <div class="flex flex-row space-x-12 py-2">
            <label class="w-52">State</label>
            <input 
                type="number" 
                bind:value={formData.state}
                required
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
        </div>
        <hr class="mb-2 w-full border-0 border-t border-black" />
        <button 
            type="submit"
            class="font-inter mt-8 px-16 py-4 rounded-xl border-black border text-sm font-medium bg-black text-white"
        >
            Create Event
        </button>
    </form>
</div>
