<script lang="ts">
    import EventCard from "./EventCard.svelte";
	import { onMount } from "svelte";
	import service from '../lib/service';

	let categories: any[] = [];
	let events: any[] = [];

	onMount(async()=>{
		await listCategories();
		await listEvents();
	});

	const listCategories = async() => {
		try {
			let response = await service.category.list();
			let list = response.data.list
			list.forEach((el: { name: any; active: boolean; }) => {
				el.active=false;
				el.name = el.name.toUpperCase();
			});
			let obj={id:10, name:'TODOS', active:true, description:null}
			list.unshift(obj);
			categories = list;
		} catch (error) {
			console.log(error)
		}
	}
	
	const listEvents = async() =>{
		try {
			let respponse = await service.events.list({})
			let list = respponse.data.list;
			list.forEach((e: { image: string; eventId: any; location: any; })=>{
				e.image=`https://picsum.photos/400/300?random=${e.eventId}`;
				e.location='Innokind Co-working Center'
			})
			events = list
		} catch (error) {
			console.log(error)
		}
	}

	const selectCategory = (category: { active: boolean }) => {
		//TODO: SOLUCIONAR CAMBIO DE ESTADO
		category.active = !category.active
		console.log(category)
	};
</script>

<section>
    <div class="hidden absolute -z-10 inset-0 bg-[#FFF152]"></div>
    <h2 class=" text-4xl font-roboto-mono mb-8">
        CATEGORIAS
    </h2>
    <div class="flex flex-wrap gap-4 mb-8">
		{#each categories as category}
			<button class="px-8 py-4 rounded-full border-black border text-sm font-medium {category.active ? 'bg-black text-white' : 'bg-white text-black'}"
			 on:click={()=>selectCategory(category)}>
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