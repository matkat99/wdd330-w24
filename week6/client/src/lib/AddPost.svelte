<script>
  import { postStore } from "../stores.js";
  let title = "";
  let body = "";

  async function submitHandler(e) {
    // e.preventDefault();
    // get form contents
    // format  them as JSON and send to server
    const data = {
      title,
      body
    };
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    };
    const response = await fetch("http://localhost:3000/posts", options);
    const resText = await response.json();
    console.log(resText);
    $postStore = [...$postStore, resText];
    this.reset();
  }
</script>

<h2>Add Post</h2>
<form on:submit|preventDefault={submitHandler} method="post">
  <p>
    <label for="title">Title</label>
    <input type="text" id="title" name="title" bind:value={title} />
  </p>
  <p>
    <label for="body">Body</label>
    <textarea id="body" name="body" bind:value={body}></textarea>
  </p>
  <button>Submit</button>
</form>
