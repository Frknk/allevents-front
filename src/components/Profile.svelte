<script lang="ts">
	// Props
	let {
		fullName,
		email,
		password,
	}: {
		fullName: string;
		email: string;
		password: string;
	} = $props();

	// State for password visibility
	let showPassword: boolean = $state(false);

	/** Handle form submission */
	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		// Add your save logic here
	};
</script>

<div class="max-w-2xl">
	<h1 class="text-3xl font-bold mb-8">PERFIL</h1>

	<form onsubmit={handleSubmit} class="space-y-6">
        <hr class="mb-2 w-full border-0 border-t border-black" />
        <div class=" flex flex-row space-x-12 py-2">
			<label for="nombre-completo" class="w-52">NOMBRE COMPLETO: </label>
			<input id="nombre-completo" class="text-2xl" placeholder="JULIO DERI" />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class=" flex flex-row space-x-12 py-2">
			<label for="email" class="w-52">EMAIL: </label>
			<input id="email" class="text-2xl" placeholder="EXAMPLE@EMAIL" />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class=" flex flex-row space-x-12 py-2">
			<label for="password" class="w-52">PASSWORD: </label>
			<input id="password" class="text-2xl" placeholder="123ABC" />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class="mb-8">
			<a href="/forgot_password" class="font-inter cursor-pointer hover:underline">¿HAS OLVIDADO TU CONTRASEÑA?</a>
		</div>
        <button class="font-inter mt-8 px-16 py-4  rounded-xl border-black border text-sm font-medium bg-black text-white">GUARDAR CAMBIO</button>
	</form>
</div>
