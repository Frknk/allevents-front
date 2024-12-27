<script lang="ts">
    import { onMount } from "svelte";
    import service from "../lib/service";
    import { User } from "../lib/UserStore";

    let id;
    let user = User.retrieve();
    let categories = [];
    let message = "";
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
        id = window.location.pathname.split("/").pop();
        const eventResponse = await service.getEvent(id);
        const categoryResponse = await service.category.list();
        categories = categoryResponse.data.list;

        if (eventResponse) {
            formData = {
                name: eventResponse?.data.name,
                description: eventResponse?.data.description,
                eventDate: eventResponse?.data.eventDate,
                comment: eventResponse?.data.comment,
                comment2: eventResponse?.data.comment2,
                price: eventResponse?.data.price,
                locationId: eventResponse?.data.locationId,
                state: eventResponse?.data.state,
                category: eventResponse?.data.category.id
            };
        }

        if (user.roleId !== 2) {
            console.log("No tienes permisos para acceder a esta pagina");
            window.location.href = "/";
        }
    });

    async function handleSubmit() {
        try {
            const response = await service.editEvent(id, formData);
            if (response) {
                message = "Event updated successfully";
            }
        } catch (error) {
            console.error("Error updating event:", error);
        }
    }
</script>

<div class="max-w-2xl p-6">
    <h2 class="text-2xl mb-2 font-bold font-roboto-mono">Editar Evento</h2>

    {#if message}
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{message}</span>
        </div>
    {/if}
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div class="flex flex-row space-x-12 py-2">
            <label for="name" class="w-52">NOMBRE</label>
            <input 
                id="name"
                type="text" 
                bind:value={formData.name}
                placeholder="Enter event name"
                required
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
        </div>
        <div class="flex flex-row space-x-12 py-2">
            <label for="description" class="w-52">DESCRIPCION</label>
            <textarea 
                id="description"
                bind:value={formData.description}
                placeholder="Enter event description"
                required
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            ></textarea>
        </div>
        <div class="flex flex-row space-x-12 py-2">
            <label for="eventDate" class="w-52">FECHA EVENTO</label>
            <input 
                id="eventDate"
                type="datetime-local" 
                bind:value={formData.eventDate}
                placeholder="Enter event date"
                required
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
        </div>
        <div class="flex flex-row space-x-12 py-2">
            <label for="price" class="w-52">PRECIO</label>
            <input 
                id="price"
                type="number" 
                bind:value={formData.price}
                placeholder="Enter event price"
                required
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
        </div>
        <div class="flex flex-row space-x-12 py-2">
            <label for="category" class="w-52">CATEGORIA</label>
            <select 
                id="category"
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
        <div class="flex flex-row space-x-12 py-2">
            <label for="locationId" class="w-52">ID LOCACION</label>
            <input 
                id="locationId"
                type="number" 
                bind:value={formData.locationId}
                placeholder="Enter location ID"
                required
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
        </div>
        <div class="flex flex-row space-x-12 py-2">
            <label for="comment" class="w-52">COMENTARIO</label>
            <input 
                type="text" 
                bind:value={formData.comment}
                placeholder="Enter comment"
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
        </div>
        <div class="flex flex-row space-x-12 py-2">
            <label for="comment2" class="w-52">COMENTARIO 2</label>
            <input 
                id="comment2"
                type="text" 
                bind:value={formData.comment2}
                placeholder="Enter second comment"
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
        </div>
        <div class="flex flex-row space-x-12 py-2">
            <label for="state" class="w-52">ESTADO</label>
            <input 
                id="state"
                type="number" 
                bind:value={formData.state}
                placeholder="Enter state"
                required
                class="text-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
        </div>
        <button 
            type="submit"
            class="font-inter mt-8 px-16 py-4 rounded-xl border-black border text-sm font-medium bg-black text-white"
        >
            ACTUALIZAR EVENTO
        </button>
    </form>
</div>
