<script lang="ts">
  //import Taps from "./Taps/+page.svelte";
  import "../global.css";
  import DirFiles from "./DirFiles.svelte";
  import Dirs from "../lib/Dirs.svelte";
  import Nav from "../components/Nav.svelte";
  import type { dirsTypes } from "$lib/Types";
  let files: dirsTypes[] = [];
  let currentDir: string = "HomeDir";
</script>

<div class="Container">
  <Nav />
  <section>
    <Dirs bind:currentDir bind:files />

    <DirFiles bind:files bind:currentDir />
  </section>
</div>

<style>
  .Container {
    height: 100vh;
    overflow-y: clip;
    display: flex;
    flex-direction: column;
  }
  section {
    display: flex;
    height: 100%;
    overflow-x: hidden;
  }
</style>
