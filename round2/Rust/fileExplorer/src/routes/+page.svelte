<script lang="ts">
  //import Taps from "./Taps/+page.svelte";
  import "../global.css";
  import DirFiles from "./DirFiles.svelte";
  import GetDirs from "../lib/GetDirs.svelte";

  let getDir: any;
</script>

<div class="Container">
  <div class="nav">
    <a href="/Taps">taps</a>
  </div>
  <section>
    <GetDirs bind:getFiles={getDir} />

    <DirFiles bind:this={getDir} />
  </section>
</div>

<style>
  .Container {
    height: 100vh;
    overflow-y: clip;
    display: flex;
    flex-direction: column;
  }
  .nav {
    height: 30px;
  }
  section {
    display: flex;
    height: 100%;
    overflow-x: hidden;
  }
</style>
