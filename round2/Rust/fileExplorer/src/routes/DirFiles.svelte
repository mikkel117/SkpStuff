<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  type timeTypes = {
    day: number;
    month: number;
    hour: number;
    minute: number;
    second: number;
    year: number;
  };
  type dirsTypes = {
    len: Number;
    modified: timeTypes;
    is_dir: boolean;
    name: string;
    path: string;
    created: timeTypes;
  };

  let currentDir: string = "";

  let files: dirsTypes[] = [];
  onMount(async () => {
    currentDir = "HomeDir";
    getDir(currentDir);
    /* for (let index = 0; index < files.length; index++) {
      files[index].modified = new Date(files[index].modified);
      files[index].time = new Date(files[index].time);
    } */
  });
  export async function getDir(dir: string) {
    files = await invoke("get_dir", { dir: dir });
    currentDir = dir;
    console.log(files);
  }
</script>

<div class="container">
  <h1>{currentDir.slice(0, -3)}</h1>
  {#each files as item}
    <div>
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

<style>
  .container {
    width: 100%;
    height: calc(100% -20px);
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    container-type: inline-size;
  }

  .container > h1 {
    width: 100%;
    max-height: 50px;
  }
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
