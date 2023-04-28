<script lang="ts">
  import { onMount } from "svelte";
  import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-svelte";
  import "../../+page.svelte";
  import type { AnimeDataType } from "../../../../tsTypes/Types";

  export let data;
  let endpoint: string = "";
  let isMounted: boolean = false;
  let page: number = 1;
  let subOrDub: number = 1;
  let userInput: string = "nar";
  let aph: string = "";
  let title: string = "unknown";

  let animeData: AnimeDataType = {
    episodes: [],
    pages: [],
    aphList: [],
  };
  function switchTest() {
    switch (data.slug) {
      case "Recent release":
        title = "Recent release";
        endpoint = `https://gogo-anime-api-sand.vercel.app/api/anime-api/recent-release?type=${subOrDub}&page=${page}`;
        break;
      case "Top airing":
        title = "Top airing";
        endpoint = `https://gogo-anime-api-sand.vercel.app/api/anime-api/top-airing?page=${page}`;
        break;
      case "Popular anime":
        title = "Popular anime";
        endpoint = `https://gogo-anime-api-sand.vercel.app/api/anime-api/popular?page=${page}`;
        break;
      case "movies":
        title = "Movies";
        endpoint = `https://gogo-anime-api-sand.vercel.app/api/anime-api/movies?aph=${aph}&page=${page}`;
        break;
      case "allSearch":
        title = "All Search";
        endpoint = `https://gogo-anime-api-sand.vercel.app/api/anime-api/search?keyw=${userInput}&page=${page}`;
        break;
      default:
        console.log("something");
        break;
    }
  }

  const getData = () => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((resData) => {
        animeData = resData;
        console.log(resData);
      })
      .catch((err) => console.log(err));
  };

  onMount(async () => {
    switchTest();
    getData();
    isMounted = true;
  });

  $: {
    if (isMounted) {
      animeData = {
        episodes: [],
        pages: [],
        aphList: [],
      };
      switchTest();
      getData();
      page = page;
    }
  }

  function nextPage() {
    page++;
  }

  function prePage() {
    if (page > 1) {
      page -= 1;
    }
  }
  function goToFirstPage() {
    if (page > 1) {
      page = 1;
    }
  }

  function changeSubDub() {
    if (subOrDub == 1) {
      subOrDub = 2;
    } else {
      subOrDub = 1;
    }
    switchTest();
    getData();
  }

  function changeAph(value: string) {
    aph = value;
    switchTest();
    getData();
  }
</script>

<div>
  <h3 class="title">{title}</h3>
  {#if data.slug === "Recent release"}
    <div class="animeType">
      <button
        class={`${subOrDub === 1 ? "animeTypeActive" : "animeTypeDeactivated"}`}
        on:click={changeSubDub}>sub</button
      >
      <button
        class={`${subOrDub === 2 ? "animeTypeActive" : "animeTypeDeactivated"}`}
        on:click={changeSubDub}>dub</button
      >
    </div>
  {/if}
  {#if data.slug === "movies"}
    <div class="aphContainer">
      {#each animeData.aphList as item}
        <p
          class={`${
            aph === item.aph ? "active" : aph === item.value ? "active" : ""
          }`}
          on:click={() => {
            changeAph(item.value);
          }}
          on:keypress={() => {
            changeAph(item.value);
          }}
        >
          {item.aph}
        </p>
      {/each}
    </div>
  {/if}
  <div class="animeImgWrapper">
    {#each animeData.episodes as items}
      <div class="animeCard">
        <img src={items.animeImg} alt={items.animeId} />
        <span>{items.animeTitle}</span>
      </div>
    {:else}
      <div class="loadingWrapper">
        <p class="loading">loading...</p>
      </div>
    {/each}
  </div>
  {#if animeData.pages.length > 0}
    <div class="animePages">
      <div
        on:click={goToFirstPage}
        on:keypress={goToFirstPage}
        class="seeAllAnimeArrow"
      >
        <ChevronsLeft />
      </div>
      <div on:click={prePage} on:keypress={prePage} class="seeAllAnimeArrow">
        <ChevronLeft />
      </div>

      {#each animeData.pages as pages}
        <span class={`${page === parseInt(pages.page) ? "onPage" : ""}`}>
          {pages.page}
        </span>
      {/each}

      <div on:click={nextPage} on:keypress={nextPage} class="seeAllAnimeArrow">
        <ChevronRight />
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .loadingWrapper {
    grid-column: 1/5;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .loading {
      text-align: center;
      font-size: 40px;
    }
  }
  .title {
    margin: 10px;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
  }
  .animeImgWrapper {
    margin: 0 auto;
    width: 50%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
    .animeCard {
      display: grid;
      /* transition: opacity 250ms ease-in-out; */
      transition: scale 250ms ease-in-out;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      span {
        grid-row: 1;
        grid-column: 1;
        justify-self: center;
        align-self: center;
        text-align: center;
        background-color: #1e1f26;
        width: 100%;
        display: none;
      }
      img {
        -webkit-user-drag: none;
        grid-column: 1;
        grid-row: 1;
        width: 100%;
        height: auto;
        align-self: center;
      }
      &:hover {
        span {
          display: block;
        }
        scale: 1.1;
      }
    }
  }

  .animePages {
    margin-top: 5px;
    display: flex;
    justify-content: center;
    span {
      font-weight: bold;
      font-size: 1.5rem;
      margin: 5px;
      text-decoration: underline;
      user-select: none;
    }
    .onPage {
      color: gray;
    }
  }
  .seeAllAnimeArrow {
    transition: opacity 200ms ease-in-out;
    align-self: center;
    font-weight: bold;
    font-size: 1.5rem;
    margin: 5px;
    &:hover {
      opacity: 0.5;
    }
  }

  .animeType {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 10px 0 10px 0;
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

  .aphContainer {
    width: 100%;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #161929;
    margin-bottom: 20px;
    overflow: hidden;
    p {
      margin: 10px;
      cursor: default;
      transition: opacity 100ms ease-in-out;
      &:hover {
        opacity: 0.5;
      }
    }
    .active {
      opacity: 0.2;
    }
  }
</style>
