<header>
  <h1>
    <a href="/">home</a>
  </h1>
</header>

<slot />

<style>
  header {
    background-color: var(--navBg);
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  h1 {
    grid-column: 2;
    justify-self: center;
    margin: 10px;
  }
  a {
    color: var(--mainColor);
  }
</style>
