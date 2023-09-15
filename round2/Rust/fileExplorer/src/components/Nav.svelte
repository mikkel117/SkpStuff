<script lang="ts">
  import BackButton from "../routes/BackButton.svelte";
  import NavSearch from "./NavSearch.svelte";
  import type { dirsTypes } from "$lib/Types";
  export let files: dirsTypes[] = [];
  export let currentDir: string = "HomeDir";
</script>

<div class="nav">
  <BackButton bind:files bind:currentDir />
  <NavSearch bind:files />
</div>

<style>
  .nav {
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
