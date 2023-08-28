<!-- svelte icons https://iconify.design/ -->

<script lang="ts">
  import { stackHistory } from "$lib/Store";
  import { invoke } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import type { dirsTypes } from "$lib/Types";
  export let dirs: any[] = [];
  export let currentDir: string;
  export let files: dirsTypes[] = [];

  onMount(async () => {
    dirs = await invoke("list_of_dir");
    files = await invoke("get_dir", { dir: currentDir });
  });

  async function handleClick(item: any) {
    if (currentDir != item) {
      $stackHistory.push(item);
      files = await invoke("get_dir", { dir: item });
      currentDir = item;
    }
  }
</script>

<section>
  {#each dirs as item}
    <div
      on:click={() => {
        handleClick(item);
      }}
      on:keydown={() => {
        handleClick(item);
      }}
      class:CurrentDir={item === currentDir}
    >
      {#if item === "HomeDir"}
        <Icon icon="material-symbols:home" width="30" />
      {:else if item === "PictureDir"}
        <Icon icon="uiw:picture" width="30" />
      {:else if item === "DownloadDir"}
        <Icon icon="material-symbols:download" width="30" />
      {:else if item === "DocumentDir"}
        <Icon icon="solar:document-bold" width="30" />
      {:else if item === "DesktopDir"}
        <Icon icon="ph:desktop" width="30" />
      {:else if item === "VideoDir"}
        <Icon icon="mdi:video" width="30" />
      {/if}
      <p>{item.slice(0, -3)}</p>
    </div>
  {:else}
    <p>loading</p>
  {/each}
</section>

<style>
  .CurrentDir {
    color: red;
  }
  section {
    width: 10%;
    overflow-y: auto;
    min-width: 10%;
  }

  section div {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 300ms opacity;
  }
  section > div:hover {
    opacity: 0.5;
  }
</style>
