<script lang="ts">
  import "../global.css";
  import DirFiles from "./DirFiles.svelte";
  import GetDirs from "../lib/GetDirs.svelte";
  import TestProps from "./about/TestProps.svelte";
  import { onMount } from "svelte";

  import { invoke } from "@tauri-apps/api/tauri";

  let getDir: any;
</script>

<!-- <TestProps bind:this={testComponent} bind:myNumber /> -->

<GetDirs bind:getFiles={getDir} />

<DirFiles bind:this={getDir} />
