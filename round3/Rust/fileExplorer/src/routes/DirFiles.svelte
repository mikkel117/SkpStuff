<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { addToStackHistory } from "$lib/store/stackHistoryStore";
  import { files, updateFiles } from "$lib/store/filesStore";
  import Icon from "@iconify/svelte";
  import FileInfo from "./FileInfo.svelte";
  import type { dirsType } from "$lib/Types";

  let isOpen: boolean = false;
  let fileInfoContent: dirsType;
  let clicked: boolean = false;

  let to: NodeJS.Timeout | null = null;

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
<FileInfo bind:isOpen bind:fileInfoContent />

<style>
  .container {
    width: 100%;
    height: calc(100% -20px);
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .container > div {
    font-size: 20px;
    width: 25%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    background-color: var(--secondary-bg-color);
    margin: 10px;
    padding: 10px;
    border-radius: 1rem;
  }

  .container > div:hover {
    opacity: 0.7;
    cursor: pointer;
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

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 1rem;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 1rem;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>
