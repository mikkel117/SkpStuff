<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { stackHistory, addToStackHistory } from "$lib/Store";
  import BackButton from "../routes/BackButton.svelte";
  import type { dirsTypes } from "$lib/Types";
  export let files: dirsTypes[] = [];
  export let currentDir: string = "HomeDir";
  let inputTxt: string = "";

  $: {
    /* console.log($stackHistory); */
    updateSearchBar();
    $stackHistory = $stackHistory;
  }

  $: {
    if (inputTxt != "") {
      foo();
    }
    inputTxt = inputTxt;
  }

  async function foo() {
    await invoke("search_suggestion", {
      data: files,
      keyWord: inputTxt,
    });
  }

  async function updateSearchBar() {
    let path: string = $stackHistory[$stackHistory.length - 1];
    if (
      path === "HomeDir" ||
      path === "PictureDir" ||
      path === "DownloadDir" ||
      path === "DocumentDir" ||
      path === "DesktopDir" ||
      path === "VideoDir"
    ) {
      inputTxt = await invoke("get_dir_path", {
        dirPath: $stackHistory[$stackHistory.length - 1],
      });
    } else {
      inputTxt = path;
    }
  }

  async function handleSubmit() {
    files = await invoke("get_files_in_dir", { filePath: inputTxt });
    addToStackHistory(inputTxt);
  }
</script>

<div class="nav">
  <BackButton bind:files bind:currentDir />
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" autocomplete="on" bind:value={inputTxt} />
  </form>
</div>

<style>
  .nav {
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  form,
  input {
    width: 100%;
  }
</style>
