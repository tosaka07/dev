<script context="module" lang="ts">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
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
  <title>Blog | tosaka.dev</title>
</svelte:head>

<div class="container py-10">
  <h1 class="text-4xl font-bold">Blog</h1>
  <p class="mb-8 text-lg text-gray-600">プログラミングや雑記を残してます。</p>
  {#each list as postsByMonth}
    <div>
      <h2 class="mb-6 text-2xl font-bold">{postsByMonth.key}</h2>
      {#each postsByMonth.posts as post}
        <a
          rel="prefetch"
          class="flex flex-col sm:flex-row mb-10"
          href="/blog/{post.slug}">
          {#if post.image != undefined}
            <div class="sm:mr-8">
              <figure
                class="aspect-ratio-16/9 sm:w-200px bg-gray-300 border
                rounded-sm bg-cover bg-no-repeat bg-center"
                style="background-image: url('{post.image}');" />
            </div>
          {/if}
          <div>
            <div>
              <span class="text-xs text-gray-600">{post.printDate}</span>
              {#each post.tags as tag}
                <span class="text-xs text-purple-700 font-bold pl-1">
                  {tag}
                </span>
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
  {/each}
</div>
