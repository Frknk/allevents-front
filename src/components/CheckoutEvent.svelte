<script lang="ts">
    import { onMount } from "svelte";
    import service from "../lib/service";
    import Footer from "./Footer.svelte";
    import { User } from "../lib/UserStore";

    let id;
    let response;
    let showModal = false;
    let user;
    let quantity = 1;
    let loading = false;
    let paymentMethod = 'card';

    $: User.subscribe(value => { user = value; });
    $: totalPrice = response?.price * quantity || 0;

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

    async function handlePurchase() {
        if (!user?.token) {
            window.location.href = "/register";
            return;
        }
        
        loading = true;
        try {
            // Add your purchase API call here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            window.location.href = `/success/${id}`;
        } catch (error) {
            console.error('Purchase failed:', error);
        } finally {
            loading = false;
        }
    }
</script>

<section class="flex min-h-screen font-inter flex-col">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
        <h1 class="text-3xl font-bold mb-8">Checkout</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Event Details -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <img 
                    src={`https://picsum.photos/400/300?random=${response?.eventId}`}
                    alt="Event"
                    class="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 class="text-xl font-semibold mb-2">{response?.description}</h2>
                <p class="text-gray-600 mb-2">{new Date(response?.createAt).toLocaleDateString()}</p>
            </div>

            <!-- Checkout Form -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold mb-4">Orden</h3>
                
                <!-- Quantity Selector -->
                <div class="flex items-center gap-4 mb-6">
                    <label class="font-medium">Cantidad:</label>
                    <div class="flex items-center border rounded">
                        <button 
                            class="px-3 py-1 border-r hover:bg-gray-100"
                            on:click={() => quantity = Math.max(1, quantity - 1)}
                        >-</button>
                        <span class="px-4 py-1">{quantity}</span>
                        <button 
                            class="px-3 py-1 border-l hover:bg-gray-100"
                            on:click={() => quantity = Math.min(10, quantity + 1)}
                        >+</button>
                    </div>
                </div>

                <!-- Payment Method -->
                <div class="mb-6">
                    <label class="font-medium block mb-2">Método de pago:</label>
                    <div class="space-y-2">
                        <label class="flex items-center gap-2">
                            <input type="radio" bind:group={paymentMethod} value="card">
                            <span>Tarjeta de crédito/débito</span>
                        </label>
                        <label class="flex items-center gap-2">
                            <input type="radio" bind:group={paymentMethod} value="transfer">
                            <span>Transferencia bancaria</span>
                        </label>
                    </div>
                </div>

                <!-- Price Summary -->
                <div class="border-t pt-4 mb-6">
                    <div class="flex justify-between mb-2">
                        <span>Precio por ticket:</span>
                        <span>${response?.price}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span>Cantidad:</span>
                        <span>x{quantity}</span>
                    </div>
                    <div class="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span>${totalPrice}</span>
                    </div>
                </div>

                <!-- Purchase Button -->
                <button
                    class="w-full bg-orange-500 text-white py-3 rounded-full font-medium
                           hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    on:click={handlePurchase}
                    disabled={loading}
                >
                    {#if loading}
                        <span class="inline-block animate-spin mr-2">⚡</span>
                        Procesando...
                    {:else}
                        Comprar Ahora
                    {/if}
                </button>
            </div>
        </div>
    </div>
    <Footer />
</section>

{#if showModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
