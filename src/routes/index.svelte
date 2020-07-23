<script lang="ts">
  // import { Post } from '../interfaces/Post'
  interface Post {
    title: string
  }

  let posts: Post[] = [
    { title: '' },
    { title: '' },
    { title: '' },
    { title: '' },
    { title: '' },
    { title: '' },
  ]
</script>

<svelte:head>
  <title>Home | tosaka.dev</title>
</svelte:head>

<div class="container py-10">
  <div>
    <h2 class="mb-6 text-2xl font-bold">2020年4月</h2>
    {#each posts as post}
      <a class="flex flex-col sm:flex-row mb-10" href="/blog/how-to-use-sapper">
        <div class="overflow-hidden sm:mr-8">
          <div
            class="aspect-ratio-16/9 sm:w-200px bg-gray-300 border rounded-sm
            bg-cover bg-no-repeat bg-center"
            style="background-image: url('successkid.jpg');">
            <figure
              class="overflow-hidden bg-cover bg-no-repeat bg-center"
              style="background-image: url('successkid.jpg');" />
          </div>
        </div>
        <div>
          <div>
            <span class="text-xs text-gray-600">2020/10/20</span>
            <span class="text-xs text-purple-700 font-bold pl-1">
              プレスリリース
            </span>
          </div>
          <div>
            <h3 class="text-lg font-bold">タイトル</h3>
            <p class="text-base">説明</p>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>
