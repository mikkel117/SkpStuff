import {
  createSignal,
  createResource,
  createEffect,
  Show,
  For,
} from "solid-js";
import type { AnimeDataType } from "tsTypes/Types";
import styles from "./AnimeSearch.module.scss";
import { A } from "@solidjs/router";
import CreateUserInput from "~/context/CreateUserInput";

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
  //const [userInput, setUserInput] = createSignal<string>("");
  const [focused, setFocused] = createSignal<boolean>(false);
  const [pagesLength, setPageLength] = createSignal<number>(0);
  const { userInput, setUserInput } = CreateUserInput;

  createEffect(() => {
    setPageLength(data()?.pages?.length ?? 0);
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
        <Show when={focused()}>
          <div class={styles.dropInputContent}>
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
              <Show when={pagesLength()}>
                <A href='/Resoults' class={styles.seeAllSearch}>
                  see all
                </A>
              </Show>
            </Show>
          </div>
        </Show>
      </div>
    </>
  );
}
