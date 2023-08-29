<script lang="ts">
  import { stackHistory } from "$lib/Store";
  import BackButton from "../routes/BackButton.svelte";
  import type { dirsTypes } from "$lib/Types";
  export let files: dirsTypes[] = [];
  export let currentDir: string = "HomeDir";
  let inputTxt: string = "";

  $: {
    console.log($stackHistory);
  }
</script>

<div class="nav">
  <BackButton bind:files bind:currentDir />
  <input type="text" bind:value={inputTxt} />
</div>

<style>
  .nav {
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
