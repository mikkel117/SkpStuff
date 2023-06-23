<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";

  export let dirs: any[] = [];
  export let getFiles: any;
  onMount(async () => {
    dirs = await invoke("list_of_dir");
  });
</script>

{#each dirs as item}
  <h2
    on:click={() => {
      getFiles.getDir(item);
    }}
  >
    {item}
  </h2>
{:else}
  <p>loading</p>
{/each}
