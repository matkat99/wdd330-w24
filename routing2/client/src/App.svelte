<script>
  import { onMount } from "svelte";
  import UserProfile from "./lib/UserProfile.svelte";
  import { currentRoute, isAuthenticated, user } from "./stores.js";
  import auth from "./authService.mjs";

  let auth0Client;
  let results = {};

  onMount(async () => {
    // create an Auth0 client
    auth0Client = await auth.createClient();
    // check to see if we are currently authenticated
    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
  });

  //example of sending a request to the API using the token from Auth0
  async function privateRoute(url, method = "GET") {
    const token = await auth0Client.getTokenSilently();
    const options = {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const res = await fetch(import.meta.env.VITE_API_SERVER_URL + url, options);
    const data = await res.json();
    console.log(data);
    results = data;
  }

  //exmaple of making a request to a public API route.
  async function publicRoute(url) {
    const res = await fetch(import.meta.env.VITE_API_SERVER_URL + url);
    const data = await res.json();
    console.log(data);
    results = data;
  }

  // create helper functions for login/logout

  function login() {
    auth.loginWithPopup(auth0Client);
  }

  function logout() {
    auth.logout(auth0Client);
  }

  window.addEventListener("popstate", (e) => {
    console.log(e);
    console.log(window.location);
    if (!$isAuthenticated && window.location.hash === "#profile") {
      login();
    } else {
      $currentRoute = window.location.hash;
    }
  });
</script>

<header>
  <nav>
    <div>
      <a href="#top">Home</a> <a href="#section1">Section 1</a>
      <a href="#section2">section 2</a>
    </div>
    <div>
      {#if $isAuthenticated}
        <a href="#profile">{$user?.name}</a>
        <button on:click={logout}>Logout</button>
      {:else}
        <button on:click={login}>Login</button>
      {/if}
    </div>
  </nav>
</header>
<main>
  <h1>Router example</h1>
  {#if $currentRoute === "#profile"}
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
      <button on:click={() => privateRoute("api/private")}>Private API</button>
      <button on:click={() => publicRoute("api/public")}>Public API</button>
      <p>{JSON.stringify(results)}</p>
    </div>
  {/if}
</main>

<style>
  nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  nav button {
    padding: 0 0.5em;
    border: 0;
    background-color: white;
    cursor: pointer;
  }
  nav button:hover {
    color: blue;
  }
  nav a {
    padding-right: 0.5em;
  }
</style>
