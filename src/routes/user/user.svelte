<script lang="ts">
	import Sidebar from "../../components/Sidebar.svelte";
    import Profile from "../../components/Profile.svelte";

	// User information
	let fullName: string = $state("JULIO DERI");
	let email: string = $state("EXAMPLE@GMAIL");
	let password: string = $state("123ABC");
	

</script>

<section class="flex min-h-screen bg-gray-50">
	<div class=" mt-16 flex"><Sidebar {fullName} />
	<div class="flex-1 p-8">
		<Profile {fullName} {email} {password} />
	</div>
	</div>
</section>