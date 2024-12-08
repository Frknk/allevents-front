<script lang="ts">
</script>

<section class="flex flex-col font-roboto-mono">
	<h2 class="mb-8 mt-32 text-5xl">INICIAR SESION</h2>
	<hr class="mb-2 w-full border-0 border-t border-black" />
	<form>
		<div class=" flex flex-row space-x-12 py-6">
			<label for="email" class="w-52">EMAIL: </label>
			<input id="email" class="text-2xl" placeholder="EXAMPLE@EMAIL" />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class=" flex flex-row space-x-12 py-6">
			<label for="password" class="w-52">PASSWORD: </label>
			<input id="password" class="text-2xl" placeholder="123ABC" />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
		<div class="mt-16">
			<a href="/forgot_password" class="font-inter cursor-pointer hover:underline">¿HAS OLVIDADO TU CONTRASEÑA?</a>
		</div>
        <button class="font-inter mt-16 px-16 py-4  rounded-xl border-black border text-sm font-medium bg-black text-white">ACCEDER</button>
	</form>
</section>
