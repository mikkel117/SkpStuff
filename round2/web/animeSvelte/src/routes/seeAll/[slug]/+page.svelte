<script lang="ts">
  import { onMount } from "svelte";
  import "../../+page.svelte";

  export let data;
  let endpoint: string = "";
  let page: number = 1;
  let subOrDub: number = 1;
  let userInput: string = "nar";
  let title: string = "unknown";
  switch (data.slug) {
    case "Recent release":
      title = "Recent release";
      endpoint = `https://gogo-anime-api-sand.vercel.app/api/anime-api/recent-release?type=${subOrDub}&page=${page}`;
      break;
    case "Top airing":
      title = "Top airing";
      endpoint = `https://gogo-anime-api-sand.vercel.app/api/anime-api/top-airing?page=${page}`;
      break;
    case "Popular anime":
      title = "Popular anime";
      endpoint = `https://gogo-anime-api-sand.vercel.app/api/anime-api/popular?page=${page}`;
      break;
    case "movies":
      title = "Movies";
      endpoint = `https://gogo-anime-api-sand.vercel.app/api/anime-api/movies?page=${page}`;
      break;
    case "allSearch":
      title = "All Search";
      endpoint = `https://gogo-anime-api-sand.vercel.app/api/anime-api/search?keyw=${userInput}&page=${page}`;
      break;
    default:
      console.log("something");
      break;
  }

  const getData = () => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((resData) => console.log(resData))
      .catch((err) => console.log(err));
  };

  onMount(async () => {
    getData();
  });
</script>

<div>
  <h1>{title}</h1>
</div>

<style>
  div {
    text-align: center;
  }
</style>
