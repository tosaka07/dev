<script>
  import Header from '../components/Header.svelte'

  export let segment
</script>

<div class="flex flex-col">
  <Header {segment} />

  <main>
    <slot />
  </main>
</div>
