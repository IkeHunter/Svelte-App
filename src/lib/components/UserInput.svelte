<script lang="ts">
  import type { Snippet } from 'svelte';

  interface UserInputInterface {
    children: Snippet;
    username: string;
  }

  let { username, children, ...props }: UserInputInterface = $props();
</script>

<h1>Your username</h1>
<input type="text" bind:value={username} />

{@render children()}

<p>{username}</p>

<style>
  /* Scoped styles for this file only */
  h1 {
    color: blue;
    font-family: 'Courier New', Courier, monospace;
  }
</style>
