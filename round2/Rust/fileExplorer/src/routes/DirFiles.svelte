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
    console.log(files);
  }
</script>

{#each files as item}
  <p>{item.name}</p>
{:else}
  <p>loading</p>
{/each}
