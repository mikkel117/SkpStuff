<script lang="ts">
  import { onMount } from "svelte";
  import type { AnimeDataType } from "../../tsTypes/Types";
  import { each } from "svelte/internal";
  let userInput: string = "";
  let isMounted: boolean = false;
  let focused: boolean = false;

  let data: AnimeDataType = {
    episodes: [],
    pages: [],
    aphList: [],
  };

  const FetchSearch: any = () => {
    fetch(
      `https://gogo-anime-api-sand.vercel.app/api/anime-api/search?keyw=${userInput}`
    )
      .then((response) => response.json())
      .then((resData) => {
        data = resData;
      })
      .catch((err) => console.log(err));
  };

  $: {
    if (isMounted && userInput.length > 2) {
      FetchSearch();
    }
  }

  onMount(async () => {
    isMounted = true;
  });

  function onFocus() {
    focused = true;
  }
  function onBlur() {
    setTimeout(() => {
      focused = false;
    }, 200);
  }
</script>

<div class="animeSearch">
  <input
    type="text"
    bind:value={userInput}
    on:focus={onFocus}
    on:blur={onBlur}
  />
  {#if focused}
    <div class="dropInputContent">
      {#each data.episodes as items}
        <p>
          <span>{items.animeTitle}</span>
          <img src={items.animeImg} alt={items.animeId} />
        </p>
      {/each}
      {#if data.pages.length > 0}
        <a href="/seeAll/allSearch" class="seeAllSearch">see all</a>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .animeSearch {
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    input {
      width: 70%;
      height: 50%;
      border-radius: 10px;
      padding: 0 10px;
      z-index: 1;
      grid-column: 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .dropInputContent {
      top: 85%;
      position: absolute;
      background-color: #f1f1f1;
      width: 80%;
      font-size: large;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
      max-height: 300px;
      overflow-y: scroll;
      p {
        display: grid;
        grid-template-rows: auto 1fr;
        color: black;
        padding: 12px 16px;
        border: 1px solid black;
        justify-items: center;
        align-items: center;
        span {
          user-select: none;
          font-size: larger;
          font-weight: bold;
        }
        img {
          transition: all 250ms ease-in-out;
          width: 70%;
          height: auto;
        }
        &:hover {
          img {
            box-shadow: 6px 6px 6px 6px black;
          }
        }
      }
      .seeAllSearch {
        display: block;
        //width: 100%;
        border: 1px solid black;
        text-align: center;
        padding: 10px;
        background-color: #705c85;
        text-decoration: none;
        font-size: large;
        font-weight: bold;
        color: black;

        transition: all 250ms ease-in-out;
        &:hover {
          opacity: 0.5;
        }
      }
    }
  }
</style>
