<script>
  export let bindings;
  let { getAllPokemon, getPokemon, switchPage } = bindings;
  import { onMount } from "svelte";
  let data = null;
  let pokemonInfo = null;
  onMount(async () => {
    data = await getAllPokemon();
  });

  const getData = async (url) => {
    pokemonInfo = await getPokemon(url);
    myDialog.showModal();
  };

  const changePage = async (url) => {
    data = await switchPage(url);
  };

  const close = () => {
    pokemonInfo = null;
    myDialog.close();
  };
</script>

<dialog id="myDialog">
  {#if pokemonInfo === null}
    <p>loading</p>
    <button on:click={close} class="dialogButton">close</button>
  {:else}
    <div class="dialogContent">
      <img src={pokemonInfo.sprites.front_default} alt="" class="dialogImage" />
      <button on:click={close} class="dialogButton">close</button>
    </div>
  {/if}
</dialog>
{#if data === null}
  <p>loading</p>
{:else}
  <div class="pokemonWrapper">
    {#each data.results as data}
      <p
        on:click={getData(data.url)}
        on:keypress={getData(data.url)}
        class="pokemon"
      >
        {data.name}
      </p>
    {:else}
      <div>
        <p>error</p>
      </div>
    {/each}
  </div>
  <div class="pageChange">
    {#if data.previous != null}
      <p
        on:click={changePage(data.previous)}
        on:keypress={changePage(data.previous)}
        class="changePage"
      >
        previous
      </p>
    {/if}

    {#if data.next != null}
      <p
        on:click={changePage(data.next)}
        on:keypress={changePage(data.next)}
        class="changePage"
      >
        next
      </p>
    {/if}
  </div>
{/if}

<style>
  :global(*) {
    margin: 0;
    padding: 0;
  }

  :global(body) {
    background-color: #232946;
    color: white;
  }

  :global(html) {
    width: 100%;
    height: 100%;
  }

  dialog {
    margin: auto;
    min-width: 200px;
    min-height: 200px;
  }

  .dialogContent {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .dialogImage {
    grid-column: 1/3;
    justify-self: center;
  }

  .dialogButton {
    grid-row: 2;
    grid-column: 1/3;
  }
  .pokemonWrapper {
    width: 50%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
  }
  .changePage {
    margin: 10px;
  }

  .pokemon,
  .changePage {
    transition: 100ms linear;
  }

  .pokemon:hover,
  .changePage:hover {
    opacity: 0.5;
  }
</style>
