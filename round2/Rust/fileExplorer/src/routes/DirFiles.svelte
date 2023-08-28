<script lang="ts">
  import BackButton from "./BackButton.svelte";
  import { invoke } from "@tauri-apps/api/tauri";
  import { stackHistory } from "$lib/Store";
  import Icon from "@iconify/svelte";
  import FileInfo from "./FileInfo.svelte";
  import type { dirsTypes } from "$lib/Types";

  let isOpen: boolean = false;
  let fileInfoContent: dirsTypes;
  let clicked: boolean = false;
  export let currentDir: string;
  export let files: dirsTypes[];

  let to: NodeJS.Timeout | null = null;

  function handleClick(fileInfo: dirsTypes) {
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
      files = await invoke("get_files_in_dir", { filePath: file_Path });
      $stackHistory.push(file_Path);
    }
  }
</script>

<div class="container">
  <BackButton bind:currentDir bind:files />
  {#each files as item}
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
<!-- {#if isOpen} -->
<FileInfo bind:isOpen bind:fileInfoContent />

<!-- {/if} -->

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

  /* .container > h1 {
    width: 100%;
    max-height: 50px;
  } */
  .container > div {
    font-size: 20px;
    width: 25%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    background-color: #242631;
    margin: 10px;
    padding: 10px;
    border-radius: 1rem;
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
