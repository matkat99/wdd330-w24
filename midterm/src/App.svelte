<script>
  import Identifications from "./lib/Identifications.svelte";
  import PlaceList from "./lib/PlaceList.svelte";
</script>

<main>
  <h1>Critter Searcher</h1>

  <div class="card">
    <PlaceList />
  </div>
  <div class="identifications">
    <Identifications />
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
