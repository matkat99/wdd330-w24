<script>
  import { identifications } from "./stores.mjs";
</script>

{#if $identifications.total_results == 0}
  <p>No results found</p>
{/if}
<ul>
  {#each $identifications.results as id (id)}
    <li>
      <img src={id.observation.taxon.default_photo.medium_url} />
      <p>{id.observation.taxon.preferred_common_name}</p>
    </li>
  {/each}
</ul>
