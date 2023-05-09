import { createSignal, createResource, createEffect, Show } from "solid-js";
import type { AnimeDataType } from "tsTypes/Types";
import styles from "./AnimeSearch.module.scss";

const Fetch = async (userInput: string) => {
  if (userInput) {
    return (
      await fetch(
        `https://gogo-anime-api-sand.vercel.app/api/anime-api/search?keyw=${userInput}`
      )
    ).json();
  }
};

export default function AnimeSearch() {
  const [userInput, setUserInput] = createSignal<string>("");
  const [focused, setFocused] = createSignal<boolean>(false);

  createEffect(() => {
    console.log(data());
  });

  createEffect(() => {
    console.log(focused());
  });

  const [data] = createResource<AnimeDataType, string>(userInput, Fetch);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setTimeout(() => {
      setFocused(false);
    }, 200);
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
        <Show when={focused}>
          <div class={styles.dropInputContent}></div>
        </Show>
      </div>
    </>
  );
}
