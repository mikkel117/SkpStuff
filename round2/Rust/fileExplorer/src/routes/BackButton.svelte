<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import Icon from "@iconify/svelte";
  import type { dirsTypes } from "$lib/Types";
  import { stackHistory } from "$lib/Store";
  export let files: dirsTypes[] = [];
  export let currentDir: string;

  async function changeDirectory() {
    files = await invoke("get_dir", {
      dir: $stackHistory[$stackHistory.length - 1],
    });
    currentDir = $stackHistory[$stackHistory.length - 1];
  }

  async function handleBackClick() {
    if ($stackHistory.length > 1) {
      $stackHistory.pop();
    }
    console.log($stackHistory.length);

    switch ($stackHistory[$stackHistory.length - 1]) {
      case "HomeDir":
        changeDirectory();
        break;
      case "PictureDir":
        changeDirectory();
        break;
      case "DownloadDir":
        changeDirectory();
        break;
      case "DocumentDir":
        changeDirectory();
        break;
      case "DesktopDir":
        changeDirectory();
        break;
      case "VideoDir":
        changeDirectory();
        break;
      default:
        files = await invoke("get_files_in_dir", {
          filePath: $stackHistory[$stackHistory.length - 1],
        });
        break;
    }
  }
</script>

<div class="backArrowContainer">
  {#if $stackHistory.length === 1}
    <span
      class="backArrow cantGoBack"
      on:click={() => handleBackClick()}
      on:keydown={() => handleBackClick()}
    >
      <Icon icon="icon-park-outline:back" width="20" />
    </span>
  {:else}
    <span
      class="backArrow"
      on:click={() => handleBackClick()}
      on:keydown={() => handleBackClick()}
    >
      <Icon icon="icon-park-outline:back" width="20" />
    </span>
  {/if}
</div>

<style>
  .cantGoBack {
    opacity: 0.2;
  }
  .backArrowContainer {
    width: 100%;
  }
  .backArrow {
    transition: opacity 0.5s;
  }

  .backArrow:hover {
    opacity: 0.5;
    cursor: pointer;
  }
</style>
