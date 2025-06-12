# Svelte Intro

## Structure

Example Svelte File:

```svelte
<script lang="ts">
  function onclick() {
    console.log('Clicked function from script tag');
  }
  let numberOne = 5;
</script>

<!-- <button onclick={() => console.log('This button has been clicked')}> Click me! </button> -->
<button {onclick}>Click me!</button>

<h1>{numberOne}</h1>
<p>Hello!</p>

<div class="container">
  <p>This is the left</p>
  <p>This is the right</p>
</div>

<style>
  /* Scoped styles for this file only */
  h1 {
    color: blue;
    font-family: 'Courier New', Courier, monospace;
  }

  .container {
    display: flex;
    justify-content: space-between;
  }
</style>
```

Note:

- The file base is HTML, unlike React where file base is js
- Scripts/styles created in a svelte file are only scoped to that file, much like styles in Angular or Css modules in React
- String interpolation is done using single braces `{...}`
- Shorthand syntax can be used to replace function props like `onclick={onclick}` with `{onclick}` if named the same

## Reactivity

Svelte uses signals to manage state, much like Angular. Standard library svelte functions are called "runes" (like React "hooks"), and function similarly to Angular's signal api.

Example usage of `state` and `derived` runes:

```svelte
<script lang="ts">
  let num = $state(0); // Like Angular's signal()
  let message = $derived(num > 0 ? 'Greater than zero' : 'Equal to zero'); // Like Angular's computed()

  function increment() {
    num++;
  }
</script>

<p>
  {message}
  <button onclick={increment}>Increment</button>
</p>
```

You can interact with state variables like any other js value. For instance, if the state value was an array, normal methods like `push` could be called on it like normal. This is unlike react, where you have to have a set function, and unlike angular signals where you have to call a set function on it.

### Binding & Effects

```svelte
<script lang="ts">
  let username = $state('');

  $effect(() => {
    if (username) {
      // Automatically adds username as dependency
      console.log(`Sending to database: ${username}`);
    }
  });
</script>

<h1>Your username</h1>
<input type="text" bind:value={username} />

<p>{username}</p>
```

One way binding on the input would look like this: `value={username}`, and 2-way looks like this: `bind:value={username}`. Like Angular's `[(value)]="username"` syntax.

The effect rune automatically tracks dependencies, unlike React but like Angular. State variables need to be listed if they are to be ignored.

Without using effect, state values can be easily debugged using `$inspect` rune like this:

```svelte
<script>
  let username = $state('');
  $inspect(username);
</script>
```

## Components

```svelte
<!-- lib/components/UserInput.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface UserInputInterface {
    children: Snippet;
    username: string;
  }

  // Accept input to the component
  let { username, children, ...props }: UserInputInterface = $props();
</script>

<h1>Your username</h1>
<input type="text" bind:value={username} />

<!-- Render all children passed in -->
{@render children()}

<p>{username}</p>
```

The `$props()` run is like angular's `input()` signal, but is not generically typed, so need to manually type cast the inputs/props.

Calling the component:

```svelte
<script>
  import UserInput from '$lib/components/UserInput.svelte';
</script>

<UserInput username={'John Doe'}>
  <p>This is teh stuff passed in</p>
</UserInput>
```

## Templating

### Snippets

Use snippets to define components in the same file, without defining them in another file like other components. They cannot have their own `<style>` or `<script>` tags.

```svelte
{#snippet userInput(personId: string)}
  <p>Person id: {personId}</p>
{/snippet}
```

### If/Else

Conditional rendering.

```svelte
<script>
  let isEditMode = $state(false);
  let username = $state('');
</script>

{#if isEditMode}
  <input type="text" bind:value={username} />
{:else}
  <p>username: {username}</p>
{/if}
```

### Each

For each element in array.

```svelte
<script>
  let peopleWaiting = $state(['abc', 'def', 'ghi']);
</script>

{#snippet userInput(personId: string)}
  <li>ID for person waiting: {personId}</li>
{/snippet}

<ul>
  {#each peopleWaiting as person}
    {@render userInput(person)}
  {/each}
</ul>

<button onclick={() => peopleWaiting.push(new Date().getTime().toString())}>I'm Waiting Too</button>
```

## File-based Routing

Types of files:

- `+page.svelte`: Client side, represents the root page for a route (folder)
- `+layout.svelte`: Client side, wraps around the page rendered. Layouts are resolved like an onion from outside in.
- `+page.server.ts`, `+layout.server.ts`: Server load function
- `+page.ts`, `+layout.ts`: Load function, runs twice - once on server, once on client

Data fetching in Svelte:

```txt

+page.server.ts  ->  +page.ts  -> +page.svelte
---------------      --------     ------------
           <- Backend   |   Frontend ->

```

### Passing data from server to client

With `+page.server.ts` -> `+page.svelte`:

```ts
// +page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  console.log(params);

  const blogArticles = [
    { id: '0', text: 'This is the first blog article.' },
    { id: '1', text: 'This is the second blog article.' }
  ];

  const foundArticle = blogArticles.find((article) => article.id === params.articleId);

  if (foundArticle) {
    return { blogPost: foundArticle.text };
  }

  throw error(404, 'Article not found');
};
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
  let { data } = $props();
  let { blogPost } = data;

  $inspect(data); // { blogPost: "..." }
</script>

<h1>Blog article</h1><p>{blogPost}</p>
```
