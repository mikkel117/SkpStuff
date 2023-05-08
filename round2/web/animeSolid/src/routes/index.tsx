import { Title } from "solid-start";
import { createSignal } from "solid-js";
import AnimeSlider from "~/components/animeSlider/AnimeSlider";
import Genres from "~/components/genres/Genres";
import "./home.scss";

export default function Home() {
  const [subOrDub, setSubOrDub] = createSignal<number>(1);

  return (
    <main>
      <Title>AnimeNexus</Title>
      <div class='animeWrapper'>
        <div class='animeType'>
          <button onclick={() => setSubOrDub(1)}>sub</button>

          <button onclick={() => setSubOrDub(2)}>dub</button>
        </div>
        <AnimeSlider
          endpoint={`https://gogo-anime-api-sand.vercel.app/api/anime-api/recent-release?type=${subOrDub()}&page=1`}
          name='Recent release'
        />
      </div>
      <div class='animeWrapper'>
        <AnimeSlider
          endpoint='https://gogo-anime-api-sand.vercel.app/api/anime-api/top-airing'
          name='Top airing'
        />
      </div>
      <div class='animeWrapper'>
        <AnimeSlider
          endpoint='https://gogo-anime-api-sand.vercel.app/api/anime-api/popular?page=1'
          name='Popular anime'
        />
      </div>

      <div class='animeWrapper'>
        <AnimeSlider
          endpoint='https://gogo-anime-api-sand.vercel.app/api/anime-api/movies?page=1'
          name='movies'
        />
      </div>
      <div class='genresWrapper'>
        <Genres />
      </div>
    </main>
  );
}
