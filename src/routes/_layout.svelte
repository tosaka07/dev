<script>
  import Header from '../components/Header.svelte'
  import Footer from '../components/Footer.svelte'

  export let segment
</script>

<div class="flex flex-col">
  <Header {segment} />

  <main>
    <slot />
  </main>

  <Footer />
</div>
