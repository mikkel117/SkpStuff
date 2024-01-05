<script lang="ts">
  import BackButton from "./BackButton.svelte";
  import NavSearch from "./NavSearch.svelte";
</script>

<div class="nav">
  <BackButton />
  <NavSearch />
</div>

<style>
  .nav {
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
