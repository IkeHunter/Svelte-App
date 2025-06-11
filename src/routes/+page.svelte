<script lang="ts">
  let number = $state(0); // state "rune"
  // let userInfo = $derived(number === 0 ? 'Click on the button' : `You've clicked ${number} times`);
  let userInfo = $derived.by(() => {
    if (number === 0) {
      return 'Click on the button';
    } else if (number === 1) {
      return `You've clicked exactly ${number} time`;
    } else {
      return `You've clicked ${number} times`;
    }
  });

  function onclick() {
    number++;
  }
</script>

<!-- <button onclick={() => console.log('This button has been clicked')}> Click me! </button> -->
<button {onclick}> Click me! </button>

<h1>{userInfo}</h1>
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
