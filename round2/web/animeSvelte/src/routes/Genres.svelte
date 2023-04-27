<script lang="ts">
  import { onMount } from "svelte";
  import type { genreType } from "../../tsTypes/Types";

  /* type test = {
    genres: 
}*/
  let data: genreType[] = [];
  let error: any = "";
  let endpoint: string = `https://gogo-anime-api-sand.vercel.app/api/anime-api/get-genres`;
  onMount(async () => {
    /* fetch(`https://gogo-anime-api-sand.vercel.app/api/anime-api/get-genres`)
      .then((res) => res.json())
      .then((data) => {
        data = data.genres;
      })
      .catch((err) => {
        console.log(err);
      }); */
    try {
      const response = await fetch(endpoint);
      const jsonData = await response.json();
      data = jsonData.genres;
    } catch (err) {
      error = err;
      console.log("error " + err);
    }
  });
</script>

<div class="genres">
  {#each data as item}
    {#if item.genre !== "Hentai" && item.genre !== "Yaoi" && item.genre !== "Yuri" && item.genre !== "Erotica"}
      <a href="/">{item.genre}</a>
    {/if}
  {:else}
    <div class="loadingWrapper">
      <h1 class="loading">loading...</h1>
    </div>
  {/each}
</div>

<style lang="scss">
  .genres {
    margin: 0 auto;
    padding: 10px;
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    background-color: #161929;
    justify-content: center;
    a {
      color: white;
      text-decoration: none;
      padding: 10px;
      background-color: #232946;
      transition: opacity 100ms ease-in-out;
      &:hover {
        opacity: 0.5;
      }
    }
  }
</style>
