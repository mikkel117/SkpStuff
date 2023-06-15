<script lang="ts">
  import { homeDir } from "@tauri-apps/api/path";
  import { invoke } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";
  /* onMount(async () => {
    const homeDirPath = await homeDir();
    await invoke("foo_bar", { homeDirPath });
  }); */

  async function test() {
    /*     const homeDirPath = await homeDir();
    console.log(homeDirPath.toString());

    await invoke("foo_bar", { homeDirPath }); */
    await invoke("foo_bar");
  }
</script>

<h1>Welcome to SvelteKit</h1>
<button
  on:click={() => {
    test();
  }}>click me</button
>

<a href="/about">about</a>
