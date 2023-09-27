<!-- svelte icons https://iconify.design/ -->

<script lang="ts">
  import { addToStackHistory } from "$lib/store/stackHistoryStore";
  import { updateFiles } from "$lib/store/filesStore";

  import { currentDir, updateCurrentDir } from "$lib/store/currentDirStore";
  import { invoke } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  export let dirs: any[] = [];
  onMount(async () => {
    dirs = await invoke("list_of_dir");

    updateFiles(await invoke("get_dir", { dir: $currentDir }));
  });

  async function handleClick(item: any) {
    if (currentDir != item) {
      addToStackHistory(item);
      updateCurrentDir(item);

      updateFiles(await invoke("get_dir", { dir: item }));
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
      class:CurrentDir={item === $currentDir}
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
