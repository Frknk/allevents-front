<script lang="ts">
	// Props
	let {
		event,
	}: {
		event: {
			id: number;
			image: string;
			description: string;
			location: string;
			price: number;
			status: string;
		};
	} = $props();
</script>

<div class="bg-white overflow-hidden shadow-md border border-black">
	<img src={event.image} alt={event.description} class="w-full h-48 object-cover" />

	<div class="p-4">
		<p class="text-sm text-gray-600 mb-2">{event.location}</p>
		<h3 class="font-medium text-lg mb-4">{event.description}</h3>

		<div class="flex justify-between items-center">
			<div class="flex items-center gap-2">
				<span class="text-orange-500 font-bold">${event.price}</span>
				<span class="text-sm text-gray-500">per hour</span>
			</div>
			<span class="text-sm text-gray-500">*{event.status}</span>
		</div>
	</div>
</div>