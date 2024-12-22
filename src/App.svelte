<script lang="ts">
  import Header from './components/Header.svelte';
  import Login from './routes/login/login.svelte';
  import { Router } from "@mateothegreat/svelte5-router";
  import Home from './routes/home/home.svelte';
  import type { Route } from "@mateothegreat/svelte5-router";
  import Instance from "@mateothegreat/svelte5-router";
  import Register from './routes/register/register.svelte';
  import User from './routes/user/user.svelte';
  import EventDetails from './components/EventDetails.svelte';

  const routes: Route[] = [
    {path: "", component: Home},
    {path: "login", component: Login},
    {path: "register", component: Register},
    {path: "user", component: User},
    {path: "events", component: EventDetails}
  ]
  
  let instance = $state<Instance>();
</script>

<Header />
<main class="max-w-5xl mx-auto px-6">
  <Router bind:instance {routes} />
</main>
