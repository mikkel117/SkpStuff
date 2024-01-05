<script lang="ts">
  import { arrayTest } from "$lib/storeTest";
  import { onDestroy, onMount } from "svelte";
  export let number: number = 1;

  type dataType = {
    id: number;
    checked: boolean;
  };

  let data: dataType;

  let index: number;

  onMount(() => {
    index = $arrayTest.findIndex((x) => x.id === number);

    if (index === -1) {
      let startData = {
        id: number,
        checked: false,
      };
      $arrayTest.push(startData);
      data = startData;
      index = $arrayTest.findIndex((x) => x.id === number);
    } else {
      data = $arrayTest[index];
    }
  });

  $: {
    if (data != null) {
      $arrayTest[index].checked = data.checked;
      console.log($arrayTest[index]);
    }
  }
</script>

<a href="/">HOME</a>
<h2>tap test {number}</h2>
{#if data}
  <p>id: {data.id}, checked: {data.checked}</p>
  <input type="checkbox" bind:checked={data.checked} />
{/if}

<!-- {#if test}
  {#each test as item}
    <div class:isDone={item.completed}>{item.name}</div>
  {/each}
{/if} -->

<style>
  /* .isDone {
    text-decoration-line: line-through;
  } */
</style>
