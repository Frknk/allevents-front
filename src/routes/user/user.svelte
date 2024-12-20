<script lang="ts">
	import Sidebar from "../../components/Sidebar.svelte";
    import Profile from "../../components/Profile.svelte";
	import { User } from "../../lib/UserStore";
	import { onMount } from "svelte";

	let user;
	let fullName = $state("");
	let email = $state("");
	let password = $state("");

	$effect(User.subscribe(value => { user = value; }));

	onMount(() => {
		if (user) {
			fullName = `${user.firstname} ${user.lastname}`.toUpperCase();
			email = user.email;
			password = user.password;
		}
	});
</script>

<section class="flex min-h-screen bg-gray-50 font-inter">
	<div class="mt-16 flex">
		<Sidebar {fullName} />
		<div class="flex-1 p-8">
			<Profile {fullName} {email} {password} />
		</div>
	</div>
</section>