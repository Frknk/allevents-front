<script lang="ts">
	import service from "../lib/service";
	import {User} from "../lib/UserStore";
	
	let firstName = "";
	let lastName = "";
	let identityNumber = "";
	let email = "";
	let password = "";
	let phone = "";
	let address = "";
	let errorMessage = "";
	let successMessage = "";

	const user = User.retrieve();
 
	const updateProfile = async () => {
		const userData = { firstName, lastName, identityNumber, email, password, phone, address };
		try {
			const response = await service.updateUser(1, userData); // Assuming user ID is 1 for this example
			return response;
		} catch (error) {
			errorMessage = error.response?.data?.message || "Update failed. Please try again.";
			return null;
		}
	};

	async function handleSubmit(event) {
		event.preventDefault();
		const response = await updateProfile();
		if (response && response.data) {
			successMessage = "Profile updated successfully.";
		} else {
			errorMessage = "Update failed. Please check your details.";
		}
	}
</script>

<div class="max-w-2xl">
	<h1 class="text-4xl mb-2 font-bold font-roboto-mono">PERFIL</h1>
	<p class="mb-8 ">Necesitaras iniciar sesion nuevamente</p>
	{#if errorMessage}
		<div class="error-message">{errorMessage}</div>
	{/if}
	{#if successMessage}
		<div class="success-message">{successMessage}</div>
	{/if}
	<form on:submit={handleSubmit} class="space-y-6">
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class=" flex flex-row space-x-12 py-2">
			<label for="first-name" class="w-52">NOMBRE: </label>
			<input id="first-name" class="text-2xl" placeholder={user.firstname} bind:value={firstName} />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class=" flex flex-row space-x-12 py-2">
			<label for="last-name" class="w-52">APELLIDO: </label>
			<input id="last-name" class="text-2xl" placeholder={user.lastname} bind:value={lastName} />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class=" flex flex-row space-x-12 py-2">
			<label for="identity-number" class="w-52">IDENTIFICACIÓN: </label>
			<input id="identity-number" class="text-2xl" placeholder={user.identitynumber} bind:value={identityNumber} />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class=" flex flex-row space-x-12 py-2">
			<label for="email" class="w-52">EMAIL: </label>
			<input id="email" class="text-2xl" placeholder={user.email} bind:value={email} />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class=" flex flex-row space-x-12 py-2">
			<label for="password" class="w-52">PASSWORD: </label>
			<input id="password" type="password" class="text-2xl" placeholder="123ABC" bind:value={password} />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class=" flex flex-row space-x-12 py-2">
			<label for="phone" class="w-52">TELÉFONO: </label>
			<input id="phone" class="text-2xl" placeholder="123456789" bind:value={phone} />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class=" flex flex-row space-x-12 py-2">
			<label for="address" class="w-52">DIRECCIÓN: </label>
			<input id="address" class="text-2xl" placeholder="123 Main St" bind:value={address} />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class="mb-8">
			<a href="/forgot_password" class="font-inter cursor-pointer hover:underline">¿HAS OLVIDADO TU CONTRASEÑA?</a>
		</div>
		<button type="submit" class="font-inter mt-8 px-16 py-4 rounded-xl border-black border text-sm font-medium bg-black text-white">GUARDAR CAMBIO</button>
	</form>
</div>

<style>
	.error-message {
		color: red;
		margin-bottom: 1rem;
	}
	.success-message {
		color: green;
		margin-bottom: 1rem;
	}
</style>
