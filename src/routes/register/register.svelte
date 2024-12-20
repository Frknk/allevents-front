<script lang="ts">
	import SimpleFooter from "../../components/SimpleFooter.svelte";
</script>

<section class="flex flex-col font-roboto-mono">
	<h2 class="mb-8 mt-32 text-5xl">REGISTRO</h2>
	<hr class="mb-2 w-full border-0 border-t border-black" />
	<form>
		<div class=" flex flex-row space-x-12 py-6">
			<label for="nombre-completo" class="w-52">NOMBRE COMPLETO: </label>
			<input id="nombre-completo" class="text-2xl" placeholder="JULIO DERI" />
		</div>
		<hr class="mb-2 w-full border-0 border-t border-black" />
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
			<input id="terms" type="checkbox" class="text-2xl" />
			<label for="terms" class="font-inter">Acepto Términos de Uso y Política de Privacidad </label>
		</div>
        <button class="font-inter mt-16 px-16 py-4  rounded-xl border-black border text-sm font-medium bg-black text-white">REGISTRARME</button>
	</form>
</section>
<SimpleFooter />
