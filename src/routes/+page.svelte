<script lang="ts">
  let username = $state('');

  // $effect(() => {
  //   if (username) {
  //     // Automatically adds username as dependency
  //     console.log(`Sending to database: ${username}`);
  //   }
  // });
  
  $inspect(username)
</script>

<h1>Your username</h1>
<input type="text" bind:value={username} />

<p>{username}</p>

<style>
  /* Scoped styles for this file only */
  h1 {
    color: blue;
    font-family: 'Courier New', Courier, monospace;
  }
</style>
