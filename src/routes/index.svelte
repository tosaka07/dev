<script context="module" lang="ts">
  export function preload({ params, query }) {
    return this.fetch(`index.json`)
      .then((r) => r.json())
      .then((obj) => {
        return { obj };
      });
  }
</script>

<script lang="ts">
  export let obj;
</script>

<svelte:head>
  <title>Home | tosaka.dev</title>
</svelte:head>

<div class="container py-10">
  <div class="flex items-baseline justify-between">
    <h2 class="text-4xl mb-8 font-bold">Book</h2>
    <a class="text-lg font-bold text-gray-600" href="/book">See all ></a>
  </div>

  <ul class="flex overflow-scroll mb-16">
    {#each obj.books as pair}
      <li>
        <a class="h-full w-40 md:w-48 mr-4 flex flex-col flex-end justify-end" href="/book/{pair.post.slug}">
          <img
            class="rounded-sm block w-full mb-4 shadow-xl"
            alt="{pair.api.summary.title}"
            src="{pair.api.summary.cover || 'noimage.jpg'}"
          />
          <p class="text-base font-bold truncate">{pair.api.summary.title}</p>
          <p class="text-xs text-gray-600">{pair.post.localizedReadAt}</p>
        </a>
      </li>
    {/each}
  </ul>

  <div class="flex items-baseline justify-between">
    <h2 class="text-4xl mb-8 font-bold">Blog</h2>
    <a class="text-lg font-bold text-gray-600" href="/blog">See all &gt;</a>
  </div>

  <div class="mb-16">
    {#each obj.blogs as post}
      <a rel="prefetch" class="flex flex-col sm:flex-row mb-10" href="/blog/{post.slug}">
        {#if post.image != undefined}
          <div class="sm:mr-8">
            <figure
              class="aspect-ratio-16/9 sm:w-200px bg-gray-300 border rounded-sm bg-cover bg-no-repeat bg-center"
              style="background-image: url('{post.image}');"
            ></figure>
          </div>
        {/if}
        <div>
          <div>
            <span class="text-xs text-gray-600">{post.printDate}</span>
            {#each post.tags as tag}
              <span class="text-xs text-purple-700 font-bold pl-1">{tag}</span>
            {/each}
          </div>
          <div>
            <h3 class="text-lg font-bold">{post.title}</h3>
            <p class="text-base">{post.excerpt}</p>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>
