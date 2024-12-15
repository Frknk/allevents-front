<script>
    import EventCard from "./EventCard.svelte";
	import { onMount } from "svelte";
	import service from '../lib/service';
	import {User} from '../lib/UserStore';
	import UserHelper from '../lib/checkAndLoadUserLogged';

	// @ts-ignore
	let categories=[];
	let event={list:[], filters:{categoryId:10}};
	let user;
  	let authenticated=false;
  	$: User.subscribe(value => { user = value; });

	onMount(async()=>{
		user = await UserHelper.checkAndLoadUserLogged();
		if(user && user.token) authenticated=true;
		await listCategories();
		await listEvents();
	});

	const listCategories = async() => {
		try {
			let response = await service.category.list();
			let list = response.data.list
			// @ts-ignore
			list.forEach(el => {
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
			let respponse = await service.events.list(event.filters)
			let list = respponse.data.list;
			// @ts-ignore
			list.forEach(e=>{
				e.image=`https://picsum.photos/400/300?random=${e.eventId}`;
				e.location='Innokind Co-working Center'
			});
			// @ts-ignore
			event.list = [...list]
		} catch (error) {
			console.log(error)
		}
	}

	// @ts-ignore
	const selectCategory = (category,index) => {
		categories.forEach(e=>{e.active=false})
		categories[index].active=true;
		categories=categories;
		event.filters.categoryId=category.id;
		listEvents();
	};
</script>

<section>
    <div class="hidden absolute -z-10 inset-0 bg-[#FFF152]"></div>
    <h2 class=" text-4xl font-roboto-mono mb-8">
        CATEGORIAS
    </h2>
    <div class="flex flex-wrap gap-4 mb-8">
		{#each categories as category,i}
			<button 
				class="px-8 py-4 rounded-full border-black border text-sm font-medium {category.active ? 'bg-black text-white' : 'bg-white text-black'} hover:bg-black hover:text-white hover:cursor-pointer"
				class:bg-black={category.active}
				class:text-white={category.active}
				class:bg-white={!category.active}
				class:text-black={!category.active}
			 	on:click={()=>selectCategory(category,i)}>
				{category.name}
			</button>
		{/each}
	</div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
		{#each event.list as item}
			<EventCard bind:event={item}/>
		{/each}
	</div>
</section>