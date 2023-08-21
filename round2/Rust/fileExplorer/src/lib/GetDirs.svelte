<!-- svelte icons https://iconify.design/ -->

<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  export let dirs: any[] = [];
  export let getFiles: any;

  onMount(async () => {
    dirs = await invoke("list_of_dir");
  });
</script>

<section>
  {#each dirs as item}
    <div
      on:click={() => {
        getFiles.getDir(item);
      }}
      on:keydown={() => {
        getFiles.getDir(item);
      }}
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
