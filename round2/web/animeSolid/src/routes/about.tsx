import {
  createSignal,
  createResource,
  createEffect,
  Show,
  For,
  onMount,
  onCleanup,
} from "solid-js";
import type { AnimeDataType } from "tsTypes/Types";
import styles from "../components/animeSlider/AnimeSlider.module.scss";

const Fetch = async (Input: string) => {
  if (Input) {
    return (
      await fetch(
        `https://gogo-anime-api-sand.vercel.app/api/anime-api/search?keyw=${Input}`
      )
    ).json();
  }
};

export default function Home() {
  const [userInput, setUserInput] = createSignal<string>("");
  const [test, setTest] = createSignal<boolean>(false);
  const [data] = createResource<AnimeDataType, string>(
    () => userInput(),
    Fetch
  );

  const onFocus = () => {
    setTest(true);
  };

  const onBlur = () => {
    setTimeout(() => {
      setTest(false);
    }, 100);
  };
  return (
    <>
      <div class={styles.animeSearch}>
        <input
          type='text'
          onInput={(e) => {
            setUserInput(e.target.value);
          }}
          onfocus={onFocus}
          onblur={onBlur}
        />
        <Show when={test()}>
          <Show when={!data.loading}>
            <For each={data()?.episodes}>
              {(item) => (
                <p>
                  <span>{item.animeTitle}</span>
                  <img
                    src={item.animeImg}
                    alt={item.animeTitle}
                    elementtiming={""}
                    fetchpriority={"high"}
                  />
                </p>
              )}
            </For>
          </Show>
        </Show>
      </div>
    </>
  );
}
