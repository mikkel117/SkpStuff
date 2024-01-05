<script lang="ts">
  import type { dirsTypes } from "$lib/Types";
  import { invoke } from "@tauri-apps/api/tauri";
  import { onDestroy, onMount } from "svelte";
  let input: string = "C:/Users/rumbo";
  let files: dirsTypes[] = [];
  let suggestions: any[] = [];
  let isInputFocused: boolean = false;
  let path: string = "HomeDir";
  $: {
    if (input != "") {
      callSearchSuggestion();
    }
    input = input;
  }
  onMount(async () => {
    files = await invoke("get_dir", { dir: path });
  });

  async function callSearchSuggestion() {
    suggestions = await invoke("fuzzy_finder", {
      searchWord: input,
      arrayOfWords: files,
      path: path,
    });
  }
  const onFocus = () => (isInputFocused = true);
  const onBlur = () => {
    setTimeout(() => {
      isInputFocused = false;
    }, 100);
  };

  const test = (item: any) => {
    input = item.path;
    suggestions = [];
  };
</script>

<form id="form">
  <input
    list="test"
    type="text"
    bind:value={input}
    on:focus={onFocus}
    on:blur={onBlur}
  />
  {#if suggestions && isInputFocused}
    <ul>
      {#each suggestions as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => test(item)}>{item.path}</li>
      {/each}
    </ul>
  {/if}
</form>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  input {
    display: block;
    width: 100%;
  }

  /* form:focus-within {
    background-color: black;
  } */
  li {
    border: 1px solid black;
    padding: 10px;
    overflow: hidden;
  }
</style>
