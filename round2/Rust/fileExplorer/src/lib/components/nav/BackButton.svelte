<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import Icon from "@iconify/svelte";
  import {
    stackHistory,
    removeLastPath,
    addToForwardHistory,
    forwardHistory,
  } from "$lib/store/stackHistoryStore";
  import { updateFiles } from "$lib/store/filesStore";
  import { updateCurrentDir } from "$lib/store/currentDirStore";

  async function changeDirectory() {
    updateFiles(
      await invoke("get_standard_dir_files", {
        dir: $stackHistory[$stackHistory.length - 1],
      })
    );
    updateCurrentDir($stackHistory[$stackHistory.length - 1]);
  }

  async function handleBackClick() {
    if ($stackHistory.length > 1) {
      /* $stackHistory.pop(); */
      addToForwardHistory($stackHistory[$stackHistory.length - 1]);
      removeLastPath();
    }

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
        updateFiles(
          await invoke("get_files_in_dir", {
            filePath: $stackHistory[$stackHistory.length - 1],
          })
        );
        break;
    }
  }
</script>

{#if $stackHistory.length === 1}
  <span
    class="backArrow cantGoBack"
    on:click={() => handleBackClick()}
    on:keydown={() => handleBackClick()}
  >
    <!-- <Icon icon="icon-park-outline:back" width="20" /> -->
    <Icon icon="ion:arrow-undo-outline" width="20" />
  </span>
{:else}
  <span
    class="backArrow"
    on:click={() => handleBackClick()}
    on:keydown={() => handleBackClick()}
  >
    <!-- <Icon icon="icon-park-outline:back" width="20" /> -->
    <Icon icon="ion:arrow-undo-outline" width="20" />
  </span>
{/if}

<style>
  .cantGoBack {
    opacity: 0.2;
  }
  .backArrow {
    transition: opacity 0.5s;
  }

  .backArrow:hover {
    opacity: 0.5;
    cursor: pointer;
  }
</style>
