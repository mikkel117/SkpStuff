<script lang="ts">
  import Icon from "@iconify/svelte";
  import {
    addToForwardHistory,
    forwardHistory,
  } from "$lib/store/stackHistoryStore";
  import { updateFiles } from "$lib/store/filesStore";
  import { updateCurrentDir } from "$lib/store/currentDirStore";

  /* async function changeDirectory() {
    updateFiles(
      await invoke("get_dir", {
        dir: $stackHistory[$stackHistory.length - 1],
      })
    );
    updateCurrentDir($stackHistory[$stackHistory.length - 1]);
  }
  
  async function handleBackClick() {
    if ($stackHistory.length > 1) {
      addToForwardHistory($stackHistory[$stackHistory.length - 1]);
      removeLastPath();
      console.log($forwardHistory);
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
  }  */
</script>

<span>
  <Icon icon="ion:arrow-redo-outline" width="20" />
</span>

<style>
  span:hover {
    opacity: 0.5;
    cursor: pointer;
  }
</style>
