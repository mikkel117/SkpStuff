<script lang="ts">
  let loaded = new Map();
  let visible = false;

  function lazyLoad(node: any, data: any) {
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
      }, 2000);
    }
    return {
      destroy() {},
    };
  }
</script>

<label>
  <input type="checkbox" bind:checked={visible} />
  Visible
</label>

{#if visible}
  <img
    use:lazyLoad={{
      src: "C:\\Users\\rumbo\\OneDrive\\Billeder\\Planet9\\Planet9_3840x2160.jpg",
    }}
    alt="Lazy loaded image"
  />
{/if}

<img src="C:\Users\rumbo\OneDrive\Billeder\myNewImage.png" alt="" />

<style></style>
