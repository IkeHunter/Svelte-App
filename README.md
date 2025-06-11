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
