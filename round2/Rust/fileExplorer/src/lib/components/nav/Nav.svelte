<script lang="ts">
  import BackButton from "./BackButton.svelte";
  import ForwardButton from "./ForwardButton.svelte";
  import NavSearch from "./NavSearch.svelte";
</script>

<div class="nav">
  <!-- <BackButton /> -->
  <a href="/test">click</a>
  <!-- <span></span>
  <ForwardButton /> -->
  <NavSearch />
</div>

<style>
  .nav {
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  span {
    width: 20px;
  }
</style>
