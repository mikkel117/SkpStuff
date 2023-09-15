<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { stackHistory, addToStackHistory } from "$lib/Store";
  import type { dirsTypes } from "$lib/Types";
  export let files: dirsTypes[] = [];
  let inputTxt: string = "";
  let path: string = "";
  let searchSuggestion: dirsTypes[] = [];

  $: {
    /* console.log($stackHistory); */
    updateSearchBar();
    $stackHistory = $stackHistory;
  }

  $: {
    if (inputTxt != "") {
      callSearchSuggestion();
    }
    inputTxt = inputTxt;
  }

  async function callSearchSuggestion() {
    let suggestions = await invoke("fuzzy_finder", {
      searchWord: inputTxt,
      arrayOfWords: files,
      path: path,
    });
    console.log(suggestions);
  }

  async function updateSearchBar() {
    path = $stackHistory[$stackHistory.length - 1];
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

<form on:submit|preventDefault={handleSubmit}>
  <input type="text" autocomplete="on" bind:value={inputTxt} />
</form>

<style>
  form,
  input {
    width: 100%;
  }
</style>
