<script lang="ts">
  //import { onMount } from "svelte";
  //import RecentEpisodes from "./RecentEpisodes.svelte";
  import { writable } from "svelte/store";
  import AnimeSlider from "./AnimeSlider.svelte";
  import Genres from "./Genres.svelte";

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
    <div class="animeType">
      <button
        class={`${subOrDub === 1 ? "animeTypeActive" : "animeTypeDeactivated"}`}
        on:click={handleClick}>sub</button
      >
      <button
        class={`${subOrDub === 2 ? "animeTypeActive" : "animeTypeDeactivated"}`}
        on:click={handleClick}>dub</button
      >
    </div>
    <AnimeSlider
      endpoint={`https://gogo-anime-api-sand.vercel.app/api/anime-api/recent-release?type=${subOrDub}&page=1`}
      name="Recent release"
    />
  </div>
  <div class="animeWrapper">
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
  </div>

  <div class="genresWrapper">
    <Genres />
  </div>
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

  .animeType {
    justify-self: start;
    align-self: flex-end;
    margin-left: 20px;
    color: white;
    font-weight: bold;
    button {
      user-select: none;
      padding: 5px;
      border: 1px solid #eebbc3;
      color: white;
      background-color: gray;
      transition: opacity 200ms ease-in-out;
      &:hover {
        opacity: 0.5;
      }
      &:nth-child(2) {
        margin-left: 5px;
      }
    }
    .animeTypeActive {
      background-color: gray;
      font-weight: bold;
      opacity: 1;
    }
    .animeTypeDeactivated {
      opacity: 0.2;
    }
  }
</style>
