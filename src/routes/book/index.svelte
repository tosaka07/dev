<script context="module" lang="ts">
  export function preload({ params, query }) {
    return this.fetch(`book.json`)
      .then((r) => r.json())
      .then((list) => {
        return { list }
      })
  }
</script>

<script lang="ts">
  export let list
</script>

<svelte:head>
  <title>Book | tosaka.dev</title>
</svelte:head>

<div class="container py-10">
  <h1 class="mb-8 text-4xl font-bold">Book</h1>
  <ul
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-10">
    {#each list as pair}
      <li>
        <a
          class="h-full flex flex-col flex-end justify-end"
          href="/book/{pair.post.isbn}">
          <img
            class="rounded-sm block w-full mb-4 shadow-xl"
            alt={pair.api.summary.title}
            src={pair.api.summary.cover || 'noimage.jpg'} />
          <p class="text-base font-bold truncate">{pair.api.summary.title}</p>
          <p class="text-xs text-gray-600">{pair.post.formattedReadDate}</p>
        </a>
      </li>
    {/each}
  </ul>
</div>
