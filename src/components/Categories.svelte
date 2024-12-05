<script lang="ts">
    import EventCard from "./EventCard.svelte";
	const categories = [
		{ id: 1, name: "TODO", active: true },
		{ id: 2, name: "SOCIAL", active: false },
		{ id: 3, name: "EDUCATIVO", active: false },
		{ id: 4, name: "DEPORTIVO", active: false },
		{ id: 5, name: "CULTURAL", active: false },
		{ id: 6, name: "MÁS", active: false },
	];
    const events = [
	{
		id: 1,
		image: "https://picsum.photos/400/300?random=1",
		title: "The Job Hunting Accelerator Bootcamp - Land Your Dream Job",
		location: "Innokind Co-working Center",
		price: 65,
		status: "Pending",
	},
	{
		id: 2,
		image: "https://picsum.photos/400/300?random=2",
		title: "The Job Hunting Accelerator Bootcamp - Land Your Dream Job",
		location: "Innokind Co-working Center",
		price: 65,
		status: "Pending",
	},
	{
		id: 3,
		image: "https://picsum.photos/400/300?random=3",
		title: "The Job Hunting Accelerator Bootcamp - Land Your Dream Job",
		location: "Innokind Co-working Center",
		price: 65,
		status: "Pending",
	},
	{
		id: 4,
		image: "https://picsum.photos/400/300?random=4",
		title: "The Job Hunting Accelerator Bootcamp - Land Your Dream Job",
		location: "Innokind Co-working Center",
		price: 65,
		status: "Pending",
	},
	{
		id: 5,
		image: "https://picsum.photos/400/300?random=5",
		title: "The Job Hunting Accelerator Bootcamp - Land Your Dream Job",
		location: "Innokind Co-working Center",
		price: 65,
		status: "Pending",
	},
	{
		id: 6,
		image: "https://picsum.photos/400/300?random=6",
		title: "The Job Hunting Accelerator Bootcamp - Land Your Dream Job",
		location: "Innokind Co-working Center",
		price: 65,
		status: "Pending",
	},
    ];
</script>

<section>
    <div class="hidden absolute -z-10 inset-0 bg-[#FFF152]"></div>
    <h2 class=" text-4xl font-roboto-mono mb-8">
        CATEGORIAS
    </h2>
    <div class="flex flex-wrap gap-4 mb-8">
		{#each categories as category}
			<button class="px-8 py-4 rounded-full border-black border text-sm font-medium {category.active ? 'bg-black text-white' : 'bg-white text-black'}">
				{category.name}
			</button>
		{/each}
	</div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
		{#each events as event}
			<EventCard {event} />
		{/each}
	</div>
</section>