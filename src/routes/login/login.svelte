<script lang="ts">
  import { User } from "../../lib/UserStore.js";
  import service from "../../lib/service";
  let email = "";
  let password = "";
  let errorMessage = "";

  const login = async () => {
    const userData = { email, password };
    try {
      const response = await service.login(userData);
      return response;
    } catch (error) {
      errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      return null;
    }
  };

  async function handleSignIn(event) {
    event.preventDefault();
    const response = await login();
    if (response && response.data && response.data.token) {
      User.signin(response.data);
      window.location.href = "/";
    } else {
      errorMessage = "Invalid email or password.";
    }
  }
</script>

<section class="flex flex-col font-roboto-mono">
  <h2 class="mb-8 mt-32 text-5xl">INICIAR SESION</h2>
  <hr class="mb-2 w-full border-0 border-t border-black" />
  {#if errorMessage}
    <div class="error-message">{errorMessage}</div>
  {/if}
  <form on:submit={handleSignIn}>
    <div class="flex flex-row space-x-12 py-6">
      <label for="email" class="w-52">EMAIL: </label>
      <input id="email" class="text-2xl" placeholder="EXAMPLE@EMAIL" bind:value={email} />
    </div>
    <hr class="mb-2 w-full border-0 border-t border-black" />
    <div class="flex flex-row space-x-12 py-6">
      <label for="password" class="w-52">PASSWORD: </label>
      <input id="password" type="password" class="text-2xl" placeholder="123ABC" bind:value={password} />
    </div>
    <hr class="mb-2 w-full border-0 border-t border-black" />
    <div class="mt-16">
      <a href="/forgot_password" class="font-inter cursor-pointer hover:underline">¿HAS OLVIDADO TU CONTRASEÑA?</a>
    </div>
    <button type="submit" class="font-inter mt-16 px-16 py-4 rounded-xl border-black border text-sm font-medium bg-black text-white">ACCEDER</button>
  </form>
</section>

<style>
  .error-message {
    color: red;
    margin-bottom: 1rem;
  }
</style>
