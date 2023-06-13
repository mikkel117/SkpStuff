<script>
  export let bindings;
  import { Content } from "carbon-components-svelte";
  let { Car, color, vecTest } = bindings;
  import { onMount } from "svelte";
  let data = null;
  onMount(async () => {
    /* vecTest().then((value) => {
      data = value;
      console.log(value);
    }); */

    data = await vecTest();
  });
</script>

{#if data === null}
  <p>loading</p>
{:else}
  <p>{data.results[0].name}</p>
{/if}
