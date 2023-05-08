import type { AnimeDataType } from "tsTypes/Types";
import "./animeSlider.scss";
import {
  createResource,
  createEffect,
  Show,
  createSignal,
  Accessor,
  For,
} from "solid-js";
type AnimeSliderProps = {
  endpoint: string;
  name: string;
};
const Fetch = async (endpoint: any) => {
  return (await fetch(endpoint)).json();
};
/* (await fetch(endpoint)).json(); */
function AnimeSlider(props: AnimeSliderProps) {
  //  const [data, setData] = createSignal<AnimeDataType>();
  //const [user] = createResource(userId, Fetch);
  const [data] = createResource<AnimeDataType, string>(
    () => props.endpoint,
    Fetch
  );
  return (
    <>
      <h3>{props.name}</h3>
      <div class='animeSlider'>
        <Show when={!data.loading} fallback={<div>loading </div>}>
          <For each={data()?.episodes}>
            {(item) => (
              <div class='animeCard'>
                <img
                  src={item.animeImg}
                  alt=''
                  elementtiming={""}
                  fetchpriority={"high"}
                />
                <span>{item.animeTitle}</span>
              </div>
            )}
          </For>
        </Show>
      </div>
    </>
  );
}
export default AnimeSlider;
