<script lang="ts">
  let { data } = $props();
  let { blogPost } = data;

  $inspect(data);
</script>

<h1>Blog article</h1>
<p>{blogPost}</p>
