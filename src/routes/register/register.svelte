<script lang="ts">
	import SimpleFooter from "../../components/SimpleFooter.svelte";
	import service from "../../lib/service";
	let firstName = "";
	let lastName = "";
	let identityNumber = "";
	let email = "";
	let password = "";
	let repassword = "";
	let errorMessage = "";

	const register = async () => {
		const userData = { firstName, lastName, identityNumber, email, password, repassword };
		try {
			const response = await service.register(userData);
			return response;
		} catch (error) {
			errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
			return null;
		}
	};

	async function handleRegister(event) {
		event.preventDefault();
		const response = await register();
		if (response && response.data) {
			window.location.href = "/login";
		} else {
			errorMessage = "Registration failed. Please check your details.";
		}
	}
</script>

<section class="flex flex-col font-roboto-mono">
	<h2 class="mb-8 mt-32 text-5xl">REGISTRO</h2>
	<hr class="mb-2 w-full border-0 border-t border-black" />
	{#if errorMessage}
		<div class="error-message">{errorMessage}</div>
	{/if}
	<form on:submit={handleRegister}>
		<div class=" flex flex-row space-x-12 py-6">
			<label for="first-name" class="w-52">NOMBRE: </label>
			<input id="first-name" class="text-2xl" placeholder="JULIO" bind:value={firstName} />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class=" flex flex-row space-x-12 py-6">
			<label for="last-name" class="w-52">APELLIDO: </label>
			<input id="last-name" class="text-2xl" placeholder="DERI" bind:value={lastName} />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class=" flex flex-row space-x-12 py-6">
			<label for="identity-number" class="w-52">IDENTIFICACIÓN: </label>
			<input id="identity-number" class="text-2xl" placeholder="77433136" bind:value={identityNumber} />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class=" flex flex-row space-x-12 py-6">
			<label for="email" class="w-52">EMAIL: </label>
			<input id="email" class="text-2xl" placeholder="EXAMPLE@EMAIL" bind:value={email} />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class=" flex flex-row space-x-12 py-6">
			<label for="password" class="w-52">PASSWORD: </label>
			<input id="password" type="password" class="text-2xl" placeholder="123ABC" bind:value={password} />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class=" flex flex-row space-x-12 py-6">
			<label for="repassword" class="w-52">CONFIRMAR PASSWORD: </label>
			<input id="repassword" type="password" class="text-2xl" placeholder="123ABC" bind:value={repassword} />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class="mt-16">
			<input id="terms" type="checkbox" class="text-2xl" />
			<label for="terms" class="font-inter">Acepto Términos de Uso y Política de Privacidad </label>
		</div>
        <button type="submit" class="font-inter mt-16 px-16 py-4  rounded-xl border-black border text-sm font-medium bg-black text-white">REGISTRARME</button>
	</form>
	<div class="mt-16">
		<a href="/login" class="font-inter cursor-pointer hover:underline">¿YA ESTAS REGISTRADO	?</a>
	  </div>
</section>
<SimpleFooter />

<style>
	.error-message {
		color: red;
		margin-bottom: 1rem;
	}
</style>
