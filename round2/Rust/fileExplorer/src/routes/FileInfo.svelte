<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import type { dirsTypes } from "$lib/Types";
  export let isOpen: boolean = false;
  /* export fileInfoContent:  */
</script>

<section
  class="fileInfoContainer"
  transition:slide={{ duration: 2000, easing: quintOut, axis: "x" }}
>
  <!-- in:fly={{ x: 200, duration: 300 }}
  out:fly={{ x: 200, duration: 300 }} -->
  <div
    class="close"
    on:click={() => (isOpen = false)}
    on:keydown={() => (isOpen = false)}
  >
    X
  </div>
  <div class="empty" />
</section>

<style>
  .fileInfoContainer {
    height: 100%;
    background-color: #242631;
    display: flex;
    justify-content: center;
    padding: 100px;
  }

  /* .empty {
    padding: 100px;
  } */

  .fileInfoContainer > div {
    /* margin: 10px 10px 0 0; */
  }
</style>
