<script>
  import UserProfile from "./lib/UserProfile.svelte";
  import { currentRoute, isAuthenticated, user } from "./stores.js";
  import { createClient, loginWithPopup, logout } from "./authService.mjs";
  import { onMount } from "svelte";

  let client;

  onMount(async () => {
    client = await createClient();
    user.set(await client.getUser());
    isAuthenticated.set(await client.isAuthenticated());
  });

  function handleLogin() {
    loginWithPopup(client);
  }
  function handleLogout() {
    logout(client);
  }

  window.addEventListener("popstate", (e) => {
    console.log(e);
    console.log(window.location);
    $currentRoute = window.location.hash;
  });
</script>

<header>
  <nav>
    <a href="#top">Home</a> <a href="#section1">User Profile</a>
    <a href="#section2">section 2</a>
    <div>
      {#if $isAuthenticated}
        {$user?.name}!
        <button on:click={handleLogout}>Log out</button>
      {:else}
        <button on:click={handleLogin}>Login</button>
      {/if}
    </div>
  </nav>
</header>
<main>
  <h1>Router example</h1>
  {#if $currentRoute === "#section1"}
    <div class="card">
      <UserProfile />
    </div>
  {:else if $currentRoute === "#section2"}
    <div class="card">
      <p>Section2</p>
    </div>
  {:else}
    <div class="card">
      <p>Home</p>
    </div>
  {/if}
</main>

<style>
  nav {
    display: flex;
    justify-content: space-around;
  }
</style>
