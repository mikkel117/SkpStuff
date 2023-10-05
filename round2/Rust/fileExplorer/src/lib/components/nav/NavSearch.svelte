<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import {
    stackHistory,
    addToStackHistory,
  } from "$lib/store/stackHistoryStore";
  import { files, updateFiles } from "$lib/store/filesStore";
  import type { dirsType, SearchSuggestionType } from "$lib/Types";
  //export let files: dirsType[];
  let inputTxt: string = "";
  let path: string = "";
  let searchSuggestion: SearchSuggestionType[] = [];
  let isInputFocused: boolean = false;

  $: {
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
    /* searchSuggestion = await invoke("fuzzy_finder", {
      searchWord: inputTxt,
      arrayOfWords: $files,
      path: path,
    });
    console.log(searchSuggestion); */
    searchSuggestion = await invoke("new_fuzzy_finder_test", {
      fullPath: inputTxt,
      path: path,
    });
    console.log(searchSuggestion);
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
    updateFiles(await invoke("get_files_in_dir", { filePath: inputTxt }));
    addToStackHistory(inputTxt);
  }

  const onFocus = () => (isInputFocused = true);
  const onBlur = () => {
    setTimeout(() => {
      isInputFocused = false;
    }, 100);
  };

  const clickOnSearchSuggestion = (item: SearchSuggestionType) => {
    inputTxt = item.path;
    console.log(item);

    searchSuggestion = [];
    handleSubmit();
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    autocomplete="on"
    bind:value={inputTxt}
    on:focus={onFocus}
    on:blur={onBlur}
  />
  {#if searchSuggestion && isInputFocused}
    <div class="searchSuggestions">
      {#each searchSuggestion as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => clickOnSearchSuggestion(item)}>{item.path}</li>
      {/each}
    </div>
  {/if}
</form>

<style>
  form,
  input {
    width: 100%;
    border: none;
  }

  form {
    position: relative;
  }

  .searchSuggestions {
    position: absolute;
    width: 100%;
    max-height: 200px;
    z-index: 100;
    background-color: var(--secondary-bg-color);
    color: white;
    overflow: auto;
    scroll-behavior: smooth;
  }
  li {
    font-size: large;
    list-style-type: none;
    border: 1px solid black;
    padding: 10px;
  }

  li:hover {
    background-color: var(--main-bg-color);
    opacity: 0.5;
  }
</style>
