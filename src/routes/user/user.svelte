<script lang="ts">
	import Sidebar from "../../components/Sidebar.svelte";
	import Profile from "../../components/Profile.svelte";
	import Protected from "../../components/Protected.svelte";
	import EventsAdmin from "../../components/EventsAdmin.svelte";
	import { onMount } from "svelte";
	import { User } from "../../lib/UserStore";
	import EventCreate from "../../components/EventCreate.svelte";
	import EventEdit from "../../components/EventEdit.svelte";
	import ShowPayments from "../../components/ShowPayments.svelte";

	import { route, Router, type Route } from "@mateothegreat/svelte5-router";

	let user = User.retrieve();
	let fullName = "";
	let email = "";
	let password = "";

	const routes: Route[] = [
		{
			path: "profile",
			component: Profile,
			props: {
				fullName,
				email,
				password,
			},
		},
		{
			path: "payments",
			component: ShowPayments,
		},
		{
			path: "events",
			component: EventsAdmin,
		},
		{
			path: "eventcreate",
			component: EventCreate,
		},
		{
			path: "eventedit",
			component: EventEdit,
		},
		{
			path: "",
			component: snippet,
		},
	];

	$: handleUser(user);

	function handleUser(user) {
		if (user && user.firstname && user.lastname) {
			fullName = `${user.firstname} ${user.lastname}`.toUpperCase();
			email = user.email;
			password = user.password;
		}
	}
	onMount(() => {
		handleUser(user);
	});
</script>

{#snippet snippet()}
	<div class="flex flex-col gap-3 bg-green-400 p-4">
		I'm a snippet!<br />
		Click on a link above to see the params..
	</div>
{/snippet}

<Protected>
	<section class="flex min-h-screen bg-gray-50 font-inter">
		<div class="mt-16 flex">
			<Sidebar {fullName} roleName={user?.rolename}/>
			<div class="flex-1 p-8">
				<Router {routes} />
			</div>
		</div>
	</section>
</Protected>
