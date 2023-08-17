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
  }
</script>

<div class="container">
  <h1>{currentDir.slice(0, -3)}</h1>
  {#each files as item}
    <div>
      <Icon icon="teenyicons:pdf-solid" width="50" />
      <p>{item.name}</p>
    </div>
  {:else}
    <p>loading</p>
  {/each}

  <!-- {#if files.length !== 0}
    <div>
      <Icon icon="teenyicons:pdf-solid" width="50" />
      <p>{files[0].name}</p>
    </div>
    <div>
      <Icon icon="teenyicons:pdf-solid" width="50" />
      <p>{files[1].name}</p>
    </div>
    <div>
      <Icon icon="teenyicons:pdf-solid" width="50" />
      <p>{files[2].name}</p>
    </div>
    <div>
      <Icon icon="teenyicons:pdf-solid" width="50" />
      <p>{files[3].name}</p>
    </div>
  {/if} -->
</div>

<style>
  .container {
    width: 100%;
    height: calc(100% -20px);
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .container > h1 {
    width: 100%;
    max-height: 50px;
  }
  .container > div {
    /* flex: 1 1 30%; */
    font-size: 15px;
    width: 30%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    background-color: #242631;
    margin: 10px;
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
