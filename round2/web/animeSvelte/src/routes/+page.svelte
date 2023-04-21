<script lang="ts">
  //import { onMount } from "svelte";
  //import RecentEpisodes from "./RecentEpisodes.svelte";
  import { writable } from "svelte/store";
  import AnimeSlider from "./AnimeSlider.svelte";

  /* const view = writable({
    subOrDub: 1,
  }); */

  let subOrDub: number = 1;

  function handleClick() {
    if (subOrDub == 1) {
      subOrDub = 2;
    } else {
      subOrDub = 1;
    }
  }
</script>

<div>
  <div class="animeWrapper">
    <button on:click={handleClick}>click me</button>
    <AnimeSlider
      endpoint={`https://gogo-anime-api-sand.vercel.app/api/anime-api/recent-release?type=${subOrDub}&page=1`}
      name="Recent release"
    />
  </div>
  <!-- <div class="animeWrapper">
    <AnimeSlider
      endpoint="https://gogo-anime-api-sand.vercel.app/api/anime-api/top-airing"
      name="Top airing"
    />
  </div>
  <div class="animeWrapper">
    <AnimeSlider
      endpoint="https://gogo-anime-api-sand.vercel.app/api/anime-api/popular?page=1"
      name="Popular anime"
    />
  </div>
  <div class="animeWrapper">
    <AnimeSlider
      endpoint="https://gogo-anime-api-sand.vercel.app/api/anime-api/movies?page=1"
      name="movies"
    />
  </div> -->
</div>

<style lang="scss">
  :global(*) {
    margin: 0;
    padding: 0;
  }

  :global(body) {
    background-color: var(--mainBg);
    color: var(--mainTextColor);
  }

  :global(html) {
    width: 100%;
    height: 100%;
  }

  :global(:root) {
    --mainBg: #232946;
    --navBg: #484266;
    --tagsBg: #161929;
    --buttonBg: #fab0db;
    --mainTextColor: white;
  }

  .animeWrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    height: 350px;
    text-align: center;
  }
</style>
