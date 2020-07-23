<script>
  export let status
  export let error

  const dev = process.env.NODE_ENV === 'development'
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="container py-8">
  <h1 class="text-center text-6xl font-bold">{status}</h1>

  <p class="text-center text-lg mb-4">{error.message}</p>

  {#if dev && error.stack}
    <pre class="overflow-scroll bg-gray-200 p-4 rounded-lg">{error.stack}</pre>
  {/if}
</div>
