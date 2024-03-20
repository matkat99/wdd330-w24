<script>
  import { user } from "../stores";
</script>

<h2>User Profile</h2>
<div class="profile">
  <img src={$user.picture} alt="" />
  <div>
    <h3>{$user.name}</h3>
    <p>Email: {$user.email}</p>
  </div>
</div>

<!-- {JSON.stringify($user)} -->

<style>
  .profile {
    display: flex;
  }
</style>
