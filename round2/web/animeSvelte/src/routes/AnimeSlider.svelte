<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import type { AnimeDataType } from "../../tsTypes/Types";
  export let name: string = "";

  export let endpoint: string = ``;
  let isMounted: boolean = false;
  let data: AnimeDataType = {
    episodes: [],
    pages: [],
  };
  const getData = async () => {
    const res = await fetch(endpoint);
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("error fetching");
    }
  };
  $: {
    if (isMounted) {
      data = {
        episodes: [],
        pages: [],
      };
      fetch(endpoint)
        .then((res) => res.json())
        .then((fetchData) => (data = fetchData));
    }
  }

  onMount(async () => {
    data = await getData();
    console.log(data);

    isMounted = true;
  });
</script>

<h2>{name}</h2>
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

<style lang="scss">
  h2 {
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
</style>
