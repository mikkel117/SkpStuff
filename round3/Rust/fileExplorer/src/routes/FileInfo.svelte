<script lang="ts">
  /*   import { fade, fly, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing"; */
  import type { dirsType } from "$lib/Types";
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  import Icon from "@iconify/svelte";
  export let isOpen: boolean = false;
  export let fileInfoContent: dirsType | null;
  let infoWidth = "0";
  let convertedFilePath: string = "";
  $: {
    if (isOpen === true) {
      console.log(fileInfoContent);
      if (convertedFilePath != null) {
        convertedFilePath = convertFileSrc(fileInfoContent!.path);
      }

      infoWidth = "50%";
    } else {
      fileInfoContent = null;
    }
  }
</script>

<section
  class="fileInfoContainer"
  class:slideIn={isOpen}
  class:slideOut={isOpen === false}
  style="--info-width: {infoWidth}"
>
  {#if fileInfoContent}
    <div
      class="close"
      on:click={() => (isOpen = false)}
      on:keydown={() => (isOpen = false)}
    >
      X
    </div>
    {#if fileInfoContent.file_extension === "png" || fileInfoContent.file_extension === "jpg"}
      <img src={convertedFilePath} alt="" />
    {:else if fileInfoContent.file_extension === "pdf" || fileInfoContent.file_extension === "txt"}
      <iframe
        src={convertedFilePath}
        frameborder="0"
        title={fileInfoContent.name}
      />
    {:else if fileInfoContent.is_dir}
      <div class="iconWrapper">
        <Icon icon="material-symbols:folder" width="100%" />
      </div>
    {:else}
      <div class="iconWrapper">
        <Icon icon="teenyicons:pdf-solid" width="100%" />
      </div>
    {/if}
    <div class="border" />
    <p class="fileName">{fileInfoContent.name}</p>
    <div class="border" />
    <div class="fileFormat-Size">
      <p>Format: {fileInfoContent.file_extension}</p>
      <p>Size: {fileInfoContent.len}</p>
    </div>
    <div class="border" />
    <div>
      <p>
        Created : <span>
          {fileInfoContent.created.day}.
          {fileInfoContent.created.month}.
          {fileInfoContent.created.year}.
          {fileInfoContent.created.hour}:
          {fileInfoContent.created.minute}:
          {fileInfoContent.created.seconds}
        </span>
      </p>
      <p>
        Modified : <span>
          {fileInfoContent.modified.day}.
          {fileInfoContent.modified.month}.
          {fileInfoContent.modified.year}.
          {fileInfoContent.modified.hour}:
          {fileInfoContent.modified.minute}:
          {fileInfoContent.modified.seconds}
        </span>
      </p>
    </div>
    <div class="border" />

    <div class="bottomWrapper">
      <div class="bottomContainer">
        <span>
          <Icon icon="ic:outline-edit" width="30" />
          <p>Rename</p>
        </span>
        <div class="bottomContainerBorder" />
        <span>
          <Icon icon="material-symbols:delete" width="30" />
          <p>Delete</p>
        </span>
      </div>
    </div>
  {/if}
</section>

<style>
  .fileInfoContainer {
    height: 100%;
    background-color: #242631;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
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
  .border {
    margin: 5px 0 5px 0;
    width: 100%;
    border-bottom: 2px solid gray;
  }
  .fileName {
    align-self: center;
    width: 90%;
    text-align: center;
  }

  .fileInfoContainer img,
  .fileInfoContainer iframe,
  .iconWrapper {
    align-self: center;
    width: 80%;
  }

  .iconWrapper {
    width: 50%;
  }

  .bottomWrapper {
    display: flex;
    align-items: end;
    justify-content: center;
    height: 100%;
  }

  .bottomContainer {
    border: 1px gray solid;
    padding: 15px;
    display: flex;
  }
  .bottomContainerBorder {
    border: 1px gray solid;
  }

  .bottomContainer span {
    margin: 10px;
    text-align: center;
    transition: opacity 0.5s;
  }

  .bottomContainer span:hover {
    opacity: 0.5;
    cursor: pointer;
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
