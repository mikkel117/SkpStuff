<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import type { dirsTypes } from "$lib/Types";
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  export let isOpen: boolean = false;
  export let fileInfoContent: dirsTypes;
  let infoWidth = "0";
  let imgUrl: string = "";
  $: {
    if (isOpen === true) {
      console.log(fileInfoContent);
      if (fileInfoContent.file_extension === "png") {
        imgUrl = convertFileSrc(fileInfoContent.path);
        console.log(imgUrl);
      }

      infoWidth = "50%";
    }
  }
</script>

<section
  class="fileInfoContainer"
  class:slideIn={isOpen}
  class:slideOut={isOpen === false}
  style="--info-width: {infoWidth}"
>
  {#if isOpen}
    <div
      class="close"
      on:click={() => (isOpen = false)}
      on:keydown={() => (isOpen = false)}
    >
      X
    </div>
    {#if fileInfoContent.file_extension === "png"}
      <img src={imgUrl} alt="" />
    {/if}
  {/if}
</section>

<style>
  .fileInfoContainer {
    width: 0;
    height: 100%;
    background-color: #242631;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .close {
    align-self: end;
    margin: 5px;
    font-size: larger;
    transition: opacity 0.5s;
    cursor: pointer;
  }
  .close:hover {
    opacity: 0.5;
  }

  .fileInfoContainer img {
    width: 100%;
  }

  .slideIn {
    animation: slide-in 1s forwards;
  }

  .slideOut {
    animation: slide-out 1s forwards;
  }

  @keyframes slide-in {
    from {
      width: 0;
    }
    to {
      width: 50%;
    }
  }

  @keyframes slide-out {
    from {
      width: var(--info-width);
    }
    to {
      width: 0;
    }
  }
</style>
