<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import Icon from "@iconify/svelte";
  import { stackHistory } from "$lib/Store";
  import type { dirsTypes } from "$lib/Types";

  export let files: dirsTypes[] = [];

  async function handleBackClick() {
    $stackHistory.pop();
    files = await invoke("get_files_in_dir", {
      filePath: $stackHistory[$stackHistory.length - 1],
    });
  }
</script>

<nav>
  <div
    class="backArrow"
    on:click={() => handleBackClick()}
    on:keydown={() => handleBackClick()}
  >
    <Icon icon="icon-park-outline:back" width="20" />
  </div>
</nav>

<style>
  nav {
    display: flex;
  }

  .backArrow {
    transition: opacity 0.5s;
  }

  .backArrow:hover {
    opacity: 0.5;
    cursor: pointer;
  }
</style>
