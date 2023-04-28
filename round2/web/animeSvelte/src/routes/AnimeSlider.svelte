<script lang="ts">
  import { onMount } from "svelte";
  import type { AnimeDataType } from "../../tsTypes/Types";
  export let name: string = "";

  export let endpoint: string = ``;
  let isMounted: boolean = false;
  let data: AnimeDataType = {
    episodes: [],
    pages: [],
    aphList: [],
  };
  let error: string = "";
  const getData: any = async () => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  $: {
    if (isMounted) {
      data = {
        episodes: [],
        pages: [],
        aphList: [],
      };
      fetch(endpoint)
        .then((res) => res.json())
        .then((fetchData) => (data = fetchData))
        .catch((error) => (error = error.message));
    }
  }

  onMount(async () => {
    data = await getData();
    isMounted = true;
  });
</script>

<h3>{name}</h3>
<div class="animeSlider">
  {#each data.episodes as items}
    <div class="animecard">
      <img src={items.animeImg} alt="" />
      <span>{items.animeTitle}</span>
    </div>
  {:else}
    <div class="loadingWrapper">
      <p class="loading">loading...</p>
    </div>
  {/each}
</div>
<a href={`/seeAll/${name}`} class="seeAll">see all</a>

<style lang="scss">
  h3 {
    grid-column: 2;
  }
  .loadingWrapper {
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

  .animeSlider {
    grid-column: 1/5;
    display: flex;
    gap: 10px;
    margin: 0 10px 10px 10px;
    padding: 10px;
    height: 300px;
    overflow-x: scroll;
    overflow-y: hidden;
    div:not(.loadingWrapper) {
      transition: all 200ms ease-in-out;
      position: relative;
      text-align: center;
      img {
        height: 100%;
        -webkit-user-drag: none;
      }
      span {
        font-size: larger;
        padding: 5px;
        display: none;
        position: absolute;
        width: 100%;
        top: 50%;
        left: 50%;
        background-color: #1e1f26;
        transform: translate(-50%, -50%);
      }
      &:hover {
        span {
          display: block;
        }
        transform: scale(1.1);
      }
    }
  }
  .seeAll {
    grid-column: 3;
    grid-row: 1;
    justify-self: end;
    align-self: flex-end;
    padding-right: 10px;
    text-decoration: underline;
    color: #fab0db;
    font-weight: bold;
    transition: opacity 200ms ease-in-out;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
</style>
