<script>
  import UserInput from '$lib/components/UserInput.svelte';
  
  let data = $props();
  $inspect(data);
</script>

<UserInput username={'John Doe'}>
  <h1>This is teh stuff passed in</h1>
</UserInput>
