<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`book/${params.slug}.json`)
    const data = await res.json()

    if (res.status === 200) {
      return { data }
    } else {
      this.error(res.status, data.message)
    }
  }
</script>

<script>
  export let data
</script>

<svelte:head>
  <title>{data.api.summary.title} | tosaka.dev</title>
</svelte:head>

<div
  class="w-full mb-8 bg-center bg-cover"
  style="background-image: url({data.api.summary.cover || '/noimage.jpg'});">
  <div class="h-full w-full py-16 backdrop-sm">
    <div class="article-container">
      <div class="flex flex-col md:flex-row items-center">
        <img
          class="w-64 md:w-40 md:mr-8 mb-8 md:mb-0 shadow-2xl"
          alt={data.api.summary.title}
          src={data.api.summary.cover || '/noimage.jpg'} />
        <div class="flex flex-col">
          <p class="text-xs text-white">{data.api.summary.pubdate}</p>
          <h1 class="text-3xl md:text-4xl font-bold text-white">
            {data.api.summary.title}
          </h1>
          <p class="text-white mb-2">{data.api.summary.author}</p>
          {#if data.api.onix.CollateralDetail.TextContent[0].Text != undefined}
            <p class="text-sm text-white">
              {data.api.onix.CollateralDetail.TextContent[0].Text}
            </p>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<div class="article-container">
  <h2 class="text-base text-gray-600">
    {data.post.localizedReadDate} に読みました
  </h2>
</div>

<div class="article-container content pb-16">
  {@html data.post.html || '<p>感想はありません</p>'}
</div>
