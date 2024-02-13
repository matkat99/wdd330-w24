<script>
  import { onMount } from "svelte";
  import { postStore } from "../stores.js";

  function summary(body) {
    return body.substring(0, 60);
  }
  function handleClick(e) {
    e.target.classList.toggle("hide-full-text");
  }
  async function getPosts() {
    const response = await fetch("http://localhost:3000/posts");
    if (response.ok) {
      return response.json();
    }
  }
  async function init() {
    $postStore = await getPosts();
  }

  onMount(init);
</script>

<ul>
  {#each $postStore as post}
    <li>
      <h2>{post.title}</h2>
      <p class="hide-full-text" on:click={handleClick}>{post.body}</p>
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding-left: 0;
    text-align: left;
    max-width: 500px;
    margin: auto;
  }
  li {
    /* opacity: 0; */
    animation: fade-in 1s;
  }
  p {
    text-overflow: ellipsis;
  }
  .hide-full-text {
    overflow: hidden;
    white-space: nowrap;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
