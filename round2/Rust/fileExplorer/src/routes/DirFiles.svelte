<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { addToStackHistory } from "$lib/store/stackHistoryStore";
  import { files, updateFiles } from "$lib/store/filesStore";
  import Icon from "@iconify/svelte";
  import FileInfo from "./FileInfo.svelte";
  import SlideOut from "./slideOut.svelte";
  import type { dirsType } from "$lib/Types";

  let isOpen: boolean = false;
  let fileInfoContent: dirsType;
  let clicked: boolean = false;
  let infoWidth: string = "0";

  //let to: NodeJS.Timeout | null = null;
  let to: any = null;

  function handleClick(fileInfo: dirsType) {
    if (clicked && to != null) {
      clearTimeout(to);
      clicked = false;
      return;
    }
    clicked = true;

    to = setTimeout(() => {
      clicked = false;
      fileInfoContent = fileInfo;
      isOpen = true;
      infoWidth = "50%";
    }, 200);
  }

  async function handleDoubleClick(file_Path: string, isDir: boolean) {
    if (!isDir) {
      await invoke("open_file", { filePath: file_Path });
    } else {
      updateFiles(await invoke("get_files_in_dir", { filePath: file_Path }));
      addToStackHistory(file_Path);
    }
  }
</script>

<div class="container">
  {#each $files as item}
    <div
      on:click={(e) => handleClick(item)}
      on:keydown={(e) => handleClick(item)}
      on:dblclick={() => handleDoubleClick(item.path, item.is_dir)}
      class:maxHeight={$files.length < 10}
    >
      {#if item.is_dir}
        <Icon icon="material-symbols:folder" width="70" />
      {:else}
        <Icon icon="teenyicons:pdf-solid" width="70" />
      {/if}
      <p>{item.name}</p>
    </div>
  {:else}
    <p>loading</p>
  {/each}
</div>

<!-- {#if isOpen} -->
<div
  class="test"
  class:slideIn={isOpen}
  class:slideOut={!isOpen}
  style="--info-width: {infoWidth}"
>
  <FileInfo bind:isOpen bind:fileInfoContent />
  <!-- <SlideOut bind:isOpen /> -->
</div>

<!-- {/if} -->

<style>
  .test {
    height: 100%;
    background-color: var(--secondary-bg-color);
  }
  .slideIn {
    animation: slide-in 700ms forwards;
  }

  .slideOut {
    animation: slide-out 700ms forwards;
  }

  @keyframes slide-in {
    from {
      width: 0;
    }
    to {
      width: var(--info-width);
    }
  }

  @keyframes slide-out {
    from {
      width: var(--info-width);
    }
    to {
      width: 0;
    }
  }
  .container {
    width: 100%;
    /* height: calc(100% -20px); */
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .maxHeight {
    height: 30%;
  }
  .container > div {
    font-size: 20px;
    width: 25%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: var(--secondary-bg-color);
    margin: 10px;
    padding: 10px;
    border-radius: 1rem;
  }

  .container > div:hover {
    opacity: 0.7;
  }

  .container > div {
    transition: opacity 0.2s ease-in-out;
  }

  div > p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    text-align: center;
  }
  div:last-child {
    padding-bottom: 15px;
  }
</style>
