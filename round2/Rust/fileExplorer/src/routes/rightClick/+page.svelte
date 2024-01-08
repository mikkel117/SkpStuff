<script lang="ts">
  let pos = { x: 0, y: 0 };
  let menu = { h: 0, w: 0 };
  let browser = { w: 0, h: 0 };
  let showMenu = false;

  function rightClickContextMenu(e: MouseEvent) {
    e.preventDefault();
    showMenu = true;
    browser = { w: window.innerWidth, h: window.innerHeight };
    pos = { x: e.clientX, y: e.clientY };
    let target = e.target as HTMLElement;
    if (browser.h - pos.y < menu.h) pos.y = pos.y - menu.h;
    if (browser.w - pos.x < menu.w) pos.x = pos.x - menu.w;
  }

  function onPageClick(e: MouseEvent) {
    showMenu = false;
  }

  function getContextMenuDimensions(node: HTMLElement) {
    let height = node.offsetHeight;
    let width = node.offsetWidth;
    menu = { h: height, w: width };
  }
</script>

<h2 class="test">right click page</h2>
{#if showMenu}
  <div
    use:getContextMenuDimensions
    style="position: absolute; top:{pos.y}px; left:{pos.x}px;"
  >
    <div class="navbar">
      <ul>
        <li>test</li>
      </ul>
    </div>
  </div>
{/if}

<svelte:window
  on:contextmenu|preventDefault={rightClickContextMenu}
  on:click={onPageClick}
/>

<style>
  .navbar {
    display: inline-flex;
    border: 1px #999 solid;
    width: 170px;
    background-color: #fff;
    color: black;
    border-radius: 10px;
    overflow: hidden;
    flex-direction: column;
  }
  ul {
    list-style: none;
    margin: 6px;
  }
  ul li {
    display: block;
    list-style-type: none;
    width: 1fr;
  }
</style>
