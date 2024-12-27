<script lang="ts">
    import { onMount } from "svelte";
    import service from "../lib/service";
    import Footer from "./Footer.svelte";
    import { User } from "../lib/UserStore";

    let id;
    let response;
    let showModal = false;
    let user;
    let showDeleteModal = false;
    let isDeleting = false;

    $: User.subscribe((value) => {
        user = value;
    });

    onMount(async () => {
        id = window.location.pathname.split("/").pop();
        response = (await service.getEvent(id)).data;

        if (!response) {
            window.location.href = "/";
        }
    });

    function handlePriceClick() {
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    function handleConfirm() {
        if (user && user.token) {
            window.location.href = `/checkout/${id}`;
        } else {
            window.location.href = "/register";
        }
        closeModal();
    }

    function openDeleteModal() {
        showDeleteModal = true;
    }

    function closeDeleteModal() {
        showDeleteModal = false;
    }

    async function confirmDelete() {
        try {
            isDeleting = true;
            // Wait for delete operation to complete
            await service.deleteEvent(id);
            closeDeleteModal();
            window.location.href = "/";
        } catch (error) {
            console.error("Error deleting event:", error);
            // Optionally add error handling UI here
            alert("Error deleting event. Please try again.");
        } finally {
            isDeleting = false;
        }
    }
</script>

<section class="flex min-h-screen font-inter flex-col">
    <div class="mt-16 flex flex-col">
        <h1 class="font-roboto-mono font-bold text-3xl mb-2">
            {response?.description}
        </h1>
        <p class="mb-4">{new Date(response?.createAt).toLocaleDateString()}</p>
        {#if user.roleId === 2}
            <div class="mb-8">
                <a href={`/user/eventedit/${id}`} class="hover:shadow-lg">
                    <button
                        class="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
                    >
                        Editar
                    </button>
                </a>
                <button
                    on:click={openDeleteModal}
                    class="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
                >
                    Eliminar Evento
                </button>
            </div>
        {/if}
        <hr class="border-black border-t border-0 w-full mb-8" />

        <div class="flex flex-row justify-between">
            <div class="flex flex-col">
                <div class="flex flex-col mb-8">
                    <p class="mb-4 text-sm">CATEGORIA:</p>
                    <p class="text-2xl pl-1">
                        {response?.category.name.toUpperCase()}
                    </p>
                </div>
                <div class="flex flex-col mb-8">
                    <p class="mb-4 text-sm">EVENTO:</p>
                    <p class="text-2xl pl-1">{response?.name.toUpperCase()}</p>
                </div>
                <div class="flex flex-col mb-8">
                    <p class="mb-4 text-sm">PRECIO:</p>
                    <button
                        on:click={handlePriceClick}
                        class="px-2 py-4 rounded-full bg-orange-500 border text-sm font-medium text-white hover:bg-orange-600"
                    >
                        ${response?.price}
                    </button>
                </div>
            </div>
            <div>
                <img
                    src={`https://picsum.photos/400/300?random={response?.eventId}`}
                    alt="Event Img"
                    class="w-96 h-72 object-cover"
                />
            </div>
        </div>
        <hr class="border-black border-t border-0 w-full mb-8" />
        <div class="flex flex-col mb-8">
            <p class="mb-8">
                {response?.comment}
            </p>
            <p>
                {response?.comment2}
            </p>
        </div>
    </div>
    <Footer />
</section>

{#if showModal}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div class="bg-white p-8 rounded-xl max-w-md w-full mx-4">
            <h2 class="text-2xl font-roboto-mono mb-4">Confirmar Compra</h2>
            <p class="mb-6">
                {user && user.token
                    ? "¿Deseas proceder con la compra de este evento?"
                    : "Necesitas registrarte para poder comprar este evento"}
            </p>
            <div class="flex justify-end gap-4">
                <button
                    on:click={closeModal}
                    class="px-4 py-2 border border-black rounded-full hover:bg-gray-100"
                >
                    Cancelar
                </button>
                <button
                    on:click={handleConfirm}
                    class="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
                >
                    {user && user.token ? "Continuar" : "Registrarme"}
                </button>
            </div>
        </div>
    </div>
{/if}

{#if showDeleteModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-xl max-w-md w-full mx-4">
            <h2 class="text-2xl font-bold text-red-600 mb-4">Eliminar Evento</h2>
            <p class="mb-6 text-gray-700">
                ¿Estás seguro que deseas eliminar este evento? Esta acción no se puede deshacer.
            </p>
            <div class="flex justify-end gap-4">
                <button
                    on:click={closeDeleteModal}
                    class="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100"
                    disabled={isDeleting}
                >
                    Cancelar
                </button>
                <button
                    on:click={confirmDelete}
                    class="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:opacity-50"
                    disabled={isDeleting}
                >
                    {#if isDeleting}
                        Eliminando...
                    {:else}
                        Eliminar
                    {/if}
                </button>
            </div>
        </div>
    </div>
{/if}
