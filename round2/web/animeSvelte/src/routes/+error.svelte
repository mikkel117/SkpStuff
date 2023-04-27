<script>
  import "./+page.svelte";
</script>

<div>
  <h1>404 Not Found</h1>
  <p>The page you're looking for could not be found.</p>
  <!-- <p>
    Please check the URL for any typos, or try searching for what you're looking
    for using the search bar above.
  </p> -->
  <p>click <a href="/">here</a> to go home</p>
</div>

<style lang="scss">
  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    font-size: 48px;
    margin-top: 24px;
    margin-bottom: 24px;
  }

  p {
    font-size: 24px;
    margin-bottom: 20px;
    a {
      color: red;
      font-weight: bolder;
    }
  }
</style>
