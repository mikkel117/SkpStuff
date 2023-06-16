<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";

  let files: any[] = [];

  onMount(async () => {
    let homeDir = "HomeDir";
    files = await invoke("get_dir", { dir: homeDir });
  });

  const test = async () => {};
</script>

<button
  on:click={async () => {
    test();
  }}>click me</button
>

{#each files as item}
  <p>{item}</p>
{:else}
  <p>loading</p>
{/each}
