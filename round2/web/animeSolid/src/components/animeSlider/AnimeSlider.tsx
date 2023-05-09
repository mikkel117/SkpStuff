import type { AnimeDataType } from "tsTypes/Types";
import styles from "./AnimeSlider.module.scss";
import { createResource, Show, For } from "solid-js";
import { A } from "@solidjs/router";
type AnimeSliderProps = {
  endpoint: string;
  name: string;
};
const Fetch = async (endpoint: any) => {
  return (await fetch(endpoint)).json();
};
function AnimeSlider(props: AnimeSliderProps) {
  const [data] = createResource<AnimeDataType, string>(
    () => props.endpoint,
    Fetch
  );
  return (
    <>
      <h3>{props.name}</h3>
      <div class={styles.animeSlider}>
        <Show when={!data.loading} fallback={<div>loading </div>}>
          <For each={data()?.episodes}>
            {(item) => (
              <div class={styles.animeCard}>
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
      <A
        class={styles.seeAll}
        href={`/seeAll/${props.name.replace(/\s/g, "")}`}>
        see all
      </A>
    </>
  );
}
export default AnimeSlider;
