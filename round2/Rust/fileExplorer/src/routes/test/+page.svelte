<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";

  onMount(async () => {
    getFilesInDir();
  });

  async function getFilesInDir() {
    let files = await invoke("get_files_in_dir", {
      filePath: "C:\\Users\\rumbo\\OneDrive\\Billeder\\Saved Pictures",
    });
    console.log(files);
  }
</script>

<p>test</p>
