<script lang="ts">
  /* import { quintOut } from "svelte/easing"; */
  import type { dirsType } from "$lib/Types";
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  import { invoke } from "@tauri-apps/api/tauri";
  import Icon from "@iconify/svelte";
  export let isOpen: boolean = false;
  export let fileInfoContent: dirsType | null;
  let infoWidth: string = "0";
  let convertedFilePath: string = "";
  let showSize: boolean = false;
  let size: Number = 0;
  let unit: string = "B";
  let LoadingSize: boolean = false;
  let sizeError: string = "";

  $: {
    if (isOpen === true) {
      if (convertedFilePath != null) {
        convertedFilePath = convertFileSrc(fileInfoContent!.path);
      }
      infoWidth = "60%";
    } else {
      fileInfoContent = null;
    }
  }

  $: {
    if (fileInfoContent != null) {
      showSize = false;
      size = 0;
      LoadingSize = false;
    }
  }

  function close() {
    isOpen = false;
    loaded = new Map();
    showSize = false;
    size = 0;
  }

  let loaded = new Map();

  function lazyLoadImage(node: any, data: any) {
    if (loaded.has(data.src)) {
      node.setAttribute("src", data.src);
    } else {
      setTimeout(() => {
        const img = new Image();
        img.src = data.src;
        img.onload = () => {
          node.setAttribute("src", data.src);
          loaded.set(data.src, true);
        };
      }, 550);
    }
    return {
      destroy() {},
    };
  }

  function lazyLoadIframe(node: any, data: any) {
    if (loaded.has(data.src)) {
      node.setAttribute("src", data.src);
    } else {
      setTimeout(() => {
        const iframe = document.createElement("iframe");
        iframe.src = data.src;
        iframe.onload = () => {
          node.setAttribute("src", data.src);
          loaded.set(data.src, true);
        };

        node.appendChild(iframe);
      }, 550);
    }
    return {
      destroy() {},
    };
  }

  async function seeSize() {
    if (fileInfoContent!.is_dir) {
      try {
        LoadingSize = true;
        let dirSize: any = await invoke("get_dir_size", {
          filePath: fileInfoContent!.path,
        });
        if (dirSize.file_path === fileInfoContent!.path) {
          size = dirSize.size;
          unit = dirSize.unit;
        }
      } catch (error: any) {
        sizeError = error;
      }
      LoadingSize = false;
    } else {
      size = fileInfoContent!.len;
    }
    showSize = true;
  }

  function deleteFile() {
    invoke("remove_file", { path: fileInfoContent!.path });
  }
</script>

<section
  class="fileInfoContainer"
  class:slideIn={isOpen}
  class:slideOut={isOpen === false}
  style="--info-width: {infoWidth}"
>
  {#if fileInfoContent}
    <div class="close" on:click={() => close()} on:keydown={() => close()}>
      X
    </div>
    <div class="fileInfoHeader">
      {#if fileInfoContent.file_extension === "jpg" || fileInfoContent.file_extension === "png" || fileInfoContent.file_extension === "jpeg" || fileInfoContent.file_extension === "gif"}
        <img
          use:lazyLoadImage={{
            src: convertedFilePath,
          }}
          alt={fileInfoContent.name}
        />
      {:else if fileInfoContent.file_extension === "pdf" || fileInfoContent.file_extension === "txt"}
        <iframe
          use:lazyLoadIframe={{
            src: convertedFilePath,
          }}
          frameborder="0"
          title={fileInfoContent.name}
        />
      {:else if fileInfoContent.is_dir}
        <div class="iconWrapper">
          <Icon icon="material-symbols:folder" width="100%" />
        </div>
      {:else}
        <div class="iconWrapper">
          <Icon icon="pepicons-pencil:file" width="100%" />
        </div>
      {/if}
    </div>
    <div class="border" />
    <p class="fileName">{fileInfoContent.name}</p>
    <div class="border" />
    <div class="fileFormat-Size">
      <p>Format: {fileInfoContent.file_extension}</p>
      <p>
        {#if sizeError === ""}
          Size :
          {#if showSize}
            {size}
            <span>{unit}</span>
          {:else if !LoadingSize}
            <button on:click={seeSize}>see size</button>
          {:else}
            <span>Loading...</span>
          {/if}
        {:else}
          <span class="error">{sizeError}</span>
        {/if}
      </p>
    </div>
    <div class="border" />
    <div>
      <p>
        Created : <span>{fileInfoContent.created}</span>
      </p>
      <p>
        Modified : <span>{fileInfoContent.modified}</span>
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
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span on:click={deleteFile}>
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

  .fileInfoHeader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50%;
    max-height: 50%;
    margin: 10px;
  }

  .fileInfoContainer img,
  .fileInfoContainer iframe {
    height: 100%;
  }

  .iconWrapper {
    width: 60%;
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

  .error {
    color: red;
  }

  .slideIn {
    animation: slide-in 700ms forwards;
  }

  .slideOut {
    animation: slide-out 700ms forwards;
  }

  @keyframes slide-in {
    from {
      width: 0;
    }
    to {
      width: var(--info-width);
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
