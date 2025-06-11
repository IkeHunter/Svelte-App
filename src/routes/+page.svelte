<script lang="ts">
  // let username = $state('johndoe');

  // let isEditMode = $state(false);
  let peopleWaiting = $state(['abc', 'def', 'ghi']);
</script>

<h1>Waiting queue</h1>
{#snippet userInput(personId: string)}
  <li>ID for person waiting: {personId}</li>
  <!-- <h1>Your username</h1>

  {#if isEditMode}
    <input type="text" bind:value={username} />
  {:else}
    <p>username</p>
  {/if} -->
{/snippet}

<ul>
  {#each peopleWaiting as person}
    {@render userInput(person)}
  {/each}
</ul>

<!-- <button onclick={() => (isEditMode = !isEditMode)}>
  {isEditMode ? 'Save changes' : 'Edit fields'}
</button> -->

<button onclick={() => peopleWaiting.push(new Date().getTime().toString())}>I'm Waiting Too</button>
