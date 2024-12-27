<script lang="ts">
    import { onMount } from "svelte";
    import service from "../lib/service";

    let paymentMethods = [];

    onMount(async () => {
        try {
            const response = await service.getPaymodes();
            paymentMethods = response.data.list;
        } catch (error) {
            console.error("Error fetching payment methods:", error);
        }
    });
</script>

<!-- ...existing code... -->

<h1 class="text-4xl mb-2 font-bold font-roboto-mono">Métodos de Pago</h1>
<hr class="mb-2 w-full border-0 border-t border-black" />
<ul class="list-disc pl-5">
    {#each paymentMethods as method}
        <li class="mb-2 text-lg text-gray-700">{method.name}</li>
    {/each}
</ul>
<hr class="mb-2 w-full border-0 border-t border-black" />

<!-- ...existing code... -->