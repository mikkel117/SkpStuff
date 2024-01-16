<script lang="ts">
  export let isOpen: boolean;
  import Icon from "@iconify/svelte";
</script>

<div>
  <button on:click={() => (isOpen = false)}>X</button>
  <h1>Slide Out</h1>

  <Icon icon="material-symbols:folder" width="100" />

  <p>
    Integer egestas vehicula ad iaculis ante semper si sodales hendrerit. <br />
    Consectetur viverra leo commodo ridiculus potenti fringilla penatibus <br />
    euismod habitant. Nulla porta potenti aliquet ipsum hac imperdiet nunc
    <br />
    platea habitasse ultricies ante. Rutrum lobortis tristique blandit nulla
    <br />
    feugiat eros torquent. Enim nullam imperdiet fringilla nisi bibendum <br />
    egestas. Feugiat ultricies litora suscipit accumsan venenatis metus dictumst
    <br />
    mi a. Felis velit aenean aliquam si curae placerat faucibus per. Porttitor
    <br />
    curae malesuada pretium urna lectus per sodales. Nibh felis rhoncus interdum
    <br />
    ultricies enim. Iaculis elementum molestie aptent nec integer placerat magna
    <br />
    curae bibendum. Bibendum taciti placerat ipsum facilisi suspendisse sodales
    <br />
    proin scelerisque tempor netus. Ullamcorper tincidunt senectus ultrices
    <br />
    rutrum posuere turpis letius a porta nascetur quisque. Blandit nascetur
    <br />
    curae est mauris sollicitudin facilisis purus erat. Facilisi quam dui diam
    <br />
    rutrum urna penatibus nascetur dictum taciti aliquet magna. Id scelerisque
    <br />
    quam risus dictumst si sagittis sollicitudin ornare amet. Tellus malesuada
    <br />
  </p>
</div>

<style>
  div {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
</style>
