<script>
  import Post from "./lib/Post.svelte";
  import TagList from "./lib/TagList.svelte";
  let name = "world";
  let posts = [];
  let filteredPosts = [];
  let tagList = [];
  let query = "";
  const url = "https://dummyjson.com/posts/";

  async function getPosts(url) {
    const response = await fetch(url);
    let data = await response.json();
    data = data.posts;
    return data;
  }

  function buildTagList() {
    const allTags = posts.map((post) => post.tags).flat();
    console.log(allTags);
    const tagSet = new Set(allTags);
    tagList = [...tagSet];
  }
  async function init() {
    posts = await getPosts(url);
    buildTagList();
    filteredPosts = posts;
  }

  function filterPost(post) {
    return (
      post.title.includes(query) ||
      post.body.includes(query) ||
      post.tags.includes(query)
    );
  }

  function searchHandler() {
    // filter posts
    console.log(query);
    if (query === "") {
      filteredPosts = posts;
    } else {
      filteredPosts = posts.filter(filterPost);
    }
  }

  init();
</script>

<main>
  <h1>Hello!</h1>
  <section class="search">
    <input type="search" bind:value={query} /><button on:click={searchHandler}
      >Search</button
    >
  </section>
  <TagList tags={tagList} on:click={searchHandler} />

  {#each filteredPosts as post}
    <Post {post} />
    <!-- { JSON.stringify(post) } -->
  {/each}
</main>

<style>
  main {
    font-family: courier;
  }
</style>
