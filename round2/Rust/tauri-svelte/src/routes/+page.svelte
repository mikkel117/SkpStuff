<script>
  import Greet from "../lib/Greet.svelte";
  import { readDir, BaseDirectory } from "@tauri-apps/api/fs";
  /* const getData = async (number) => {
    let test = await invoke("plus", { number });
    console.log(test);
  }; */
  import { onMount } from "svelte/types/runtime/internal/lifecycle";
  let entries = null;
  onMount(async () => {
    entries = await readDir("users", {
      dir: BaseDirectory.AppData,
      recursive: true,
    });
  });

  /* const processEntries = (entries) => {
    for (const entry of entries) {
      console.log(`Entry: ${entry.path}`);
      if (entry.children) {
        processEntries(entry.children);
      }
    }
  }; */
</script>

<h1>Welcome to SvelteKit</h1>
<button on:click={processEntries}>click me</button>
<Greet />
