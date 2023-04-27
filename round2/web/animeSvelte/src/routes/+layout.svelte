<script>
  import Search from "./search.svelte";
</script>

<header>
  <Search />
  <h1>
    <a href="/">AnimeNexus</a>
  </h1>
</header>

<slot />

<style>
  header {
    background-color: var(--navBg);
    width: 100%;
    display: grid;
    grid-template-columns: 5% 20% 1fr 20% 5%;
  }
  h1 {
    grid-column: 3;
    justify-self: center;
    margin: 10px;
  }
  a {
    color: var(--mainColor);
  }
</style>
