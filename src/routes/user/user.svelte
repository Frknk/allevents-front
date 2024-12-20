<script lang="ts">
	import Sidebar from "../../components/Sidebar.svelte";
    import Profile from "../../components/Profile.svelte";
	import Protected from "../../components/Protected.svelte";
	import { onMount } from "svelte";
	import { User } from "../../lib/UserStore";

	let user = User.retrieve();
	let fullName = $state("");
	let email = $state("");
	let password = $state("");


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

<Protected>
	<section class="flex min-h-screen bg-gray-50 font-inter">
		<div class="mt-16 flex">
			<Sidebar {fullName} />
			<div class="flex-1 p-8">
				<Profile {fullName} {email} {password} />
			</div>
		</div>
	</section>
</Protected>