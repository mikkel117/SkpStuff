<script lang="ts">
  //import Taps from "./Taps/+page.svelte";
  import "../global.css";
  import DirFiles from "./DirFiles.svelte";
  import GetDirs from "../lib/GetDirs.svelte";
  import Nav from "../components/Nav.svelte";
  import type { dirsTypes } from "$lib/Types";
  let getDir: any;
  let files: dirsTypes[] = [];
</script>

<div class="Container">
  <Nav bind:files />
  <section>
    <GetDirs bind:getFiles={getDir} />

    <DirFiles bind:this={getDir} {files} />
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
