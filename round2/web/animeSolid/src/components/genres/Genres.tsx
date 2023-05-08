import { createResource, Show, For } from "solid-js";
import "./Genres.scss";
import type { genreType } from "tsTypes/Types";
const Fetch = async () => {
  return (
    await fetch(
      "https://gogo-anime-api-sand.vercel.app/api/anime-api/get-genres"
    )
  ).json();
};
function AnimeSlider() {
  const [data] = createResource<genreType>(Fetch);
  return (
    <>
      <h3>Genres</h3>
      <div class='genres'>
        <Show when={!data.loading} fallback={<div>loading...</div>}>
          <>
            <For each={data()?.genres}>
              {(item) => (
                <>
                  <Show
                    when={
                      item.genre !== "Hentai" &&
                      item.genre !== "Yaoi" &&
                      item.genre !== "Yuri" &&
                      item.genre !== "Erotica"
                    }>
                    <a href='/'>{item.genre}</a>
                  </Show>
                </>
              )}
            </For>
          </>
        </Show>
      </div>
    </>
  );
}
export default AnimeSlider;
