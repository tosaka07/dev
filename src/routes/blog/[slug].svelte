<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`blog/${params.slug}.json`)
    const data = await res.json()

    if (res.status === 200) {
      return { post: data }
    } else {
      this.error(res.status, data.message)
    }
  }
</script>

<script>
  export let post
</script>

<svelte:head>
  <title>{post.title} | tosaka.dev</title>
</svelte:head>

<div class="article-container py-12">
  <div class="mb-2 mx-auto">
    <div class="flex">
      {#each post.tags as tag}
        <div class="mr-2 text-sm text-purple-700 font-bold last:mr-0">
          {tag}
        </div>
      {/each}
    </div>
    <!-- <div class="separator" /> -->
    <span class="text-sm text-gray-600">{post.printDate}</span>

  </div>
  <h1 class="text-3xl md:text-4xl font-extrabold">{post.title}</h1>
</div>

{#if post.hero == 'full' && post.image != undefined}
  <div class="w-full mb-16">
    <img class="w-full" alt="Success Kid" src={post.image} />
  </div>
{/if}

{#if post.hero == 'container' && post.image != undefined}
  <div class="article-container mb-16">
    <div class="border mb-12" />
    <img class="w-full" alt="" src={post.image} />
  </div>
{/if}

{#if post.image == undefined}
  <div class="article-container mb-16">
    <div class="border mb-12" />
  </div>
{/if}

<div class="article-container content pb-16">
  {@html post.html}
</div>
