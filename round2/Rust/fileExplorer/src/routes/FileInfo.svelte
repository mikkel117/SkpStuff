<script lang="ts">
  import type { dirsType } from "$lib/Types";
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  import { invoke } from "@tauri-apps/api/tauri";
  import Icon from "@iconify/svelte";
  import profileImg from "$lib/img/profile_picture.png";
  export let isOpen: boolean = false;
  export let fileInfoContent: dirsType | null = null;
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
    showSize = false;
    size = 0;
  }

  function lazyLoadImage(node: any, data: any) {
    setTimeout(() => {
      const img = new Image();
      img.src = data.src;
      img.onload = () => {
        node.setAttribute("src", data.src);
      };
    }, 1000);
    return {
      destroy() {},
    };
  }

  function lazyLoadIframe(node: any, data: any) {
    setTimeout(() => {
      const iframe = document.createElement("iframe");
      iframe.src = data.src;
      iframe.onload = () => {
        node.setAttribute("src", data.src);
      };
      node.appendChild(iframe);
      console.log(node);
    }, 1000);

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

<section class="fileInfoContainer">
  {#if fileInfoContent}
    <div class="close" on:click={() => close()} on:keydown={() => close()}>
      X
    </div>
    <!-- <div class="fileInfoHeader"> -->
    <!-- <Icon icon="material-symbols:folder" width="100%" /> -->
    <!-- </div>  -->
    <div class="fileInfoHeader">
      {#if fileInfoContent.file_extension === "jpg" || fileInfoContent.file_extension === "png" || fileInfoContent.file_extension === "jpeg" || fileInfoContent.file_extension === "gif"}
        <img
          use:lazyLoadImage={{
            src: convertedFilePath,
          }}
          alt={fileInfoContent.name}
        />
      {:else if fileInfoContent.file_extension === "pdf" || fileInfoContent.file_extension === "txt"}
        <!-- <iframe
          use:lazyLoadIframe={{
            src: convertedFilePath,
          }}
          frameborder="0"
          title={fileInfoContent.name}
          /> -->
        <!-- <iframe
            src={convertedFilePath}
            frameborder="0"
            title={fileInfoContent.name}
            /> -->
        <img src={profileImg} alt="" height="100%" />
      {:else if fileInfoContent.is_dir}
        <div class="iconWrapper">
          <Icon icon="material-symbols:folder" width="70%" />
        </div>
      {:else}
        <div class="iconWrapper">
          <Icon icon="pepicons-pencil:file" width="70%" />
        </div>
      {/if}
    </div>
  {/if}
</section>

<style>
  .fileInfoContainer {
    width: 100%;
    height: 100%;
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
  .fileInfoHeader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50%;
    max-height: 50%;
    padding: 10px;
    width: 100%;
    overflow: hidden;
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
  .fileInfoContainer iframe {
    width: 100%;
  }

  .iconWrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
</style>
