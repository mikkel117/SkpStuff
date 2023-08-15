<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";

  type timeTypes = {
    day: number;
    hour: number;
    minute: number;
    second: number;
    year: number;
  };
  type dirsTypes = {
    len: Number;
    modified: timeTypes;
    name: string;
    path: string;
    created: timeTypes;
  };

  let files: dirsTypes[] = [];
  onMount(async () => {
    let homeDir = "HomeDir";
    getDir(homeDir);
    /* for (let index = 0; index < files.length; index++) {
      files[index].modified = new Date(files[index].modified);
      files[index].time = new Date(files[index].time);
    } */
  });
  export async function getDir(dir: string) {
    files = await invoke("get_dir", { dir: dir });
    console.log(files[0].name);
  }
</script>

<div class="container">
  {#each files as item}
    <div>
      <p>{item.name}</p>
    </div>
  {:else}
    <p>loading</p>
  {/each}
</div>

<style>
  .container {
    width: 100%;
    max-width: 100%;
    height: calc(100% -20px);
    overflow-y: scroll;
    /* display: flex;
    flex-wrap: wrap; */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 5px;
  }
  div {
    width: 50px;
    display: flex;
    flex-wrap: wrap;
    /* overflow: hidden;
    text-overflow: ellipsis; */
  }
  div:last-child > p {
    padding-bottom: 15px;
  }
</style>
