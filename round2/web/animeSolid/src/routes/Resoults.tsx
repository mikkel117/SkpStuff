import {
  For,
  Show,
  createEffect,
  createResource,
  createSignal,
  onMount,
} from "solid-js";
import type { AnimeDataType } from "tsTypes/Types";
import styles from "../routes/seeAll/seeAll.module.scss";
import CreateUserInput from "~/context/CreateUserInput";

import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "solid-icons/hi";
const Fetch = async (endpoint: any) => {
  return (await fetch(endpoint)).json();
};

export default function Result() {
  const [endpoint, setEndpoint] = createSignal<string>("");
  //const [userInput, setUserInput] = createSignal<string>("nar");
  const { userInput, setUserInput } = CreateUserInput;
  const [page, setPage] = createSignal<number>(1);
  const [data] = createResource<AnimeDataType, string>(endpoint, Fetch);
  /* onMount(() => {
      seeAllInfo(page(), 1, "");
    }); */

  createEffect(() => {
    setEndpoint(
      `https://gogo-anime-api-sand.vercel.app/api/anime-api/search?keyw=${userInput()}&page=${page()}`
    );
  });

  createEffect(() => {
    console.log(data());
  });

  const upDatePageNumber = (number: number) => {
    setPage(number);
  };
  const prePage = () => {
    if (page() > 1) {
      let pageNumber = page() - 1;
      setPage(pageNumber);
    }
  };

  const nextPage = () => {
    let pageNumber = page() + 1;
    setPage(pageNumber);
  };

  return (
    <div>
      <h3 class={styles.title}>see search results </h3>

      <div class={styles.animeImgWrapper}>
        <Show when={!data.loading} fallback={<div>loading...</div>}>
          <For each={data()?.episodes}>
            {(item) => (
              <div class={styles.animeCard}>
                <img
                  src={item.animeImg}
                  alt={item.animeTitle}
                  elementtiming={""}
                  fetchpriority={"high"}
                />
                <span>{item.animeTitle}</span>
              </div>
            )}
          </For>
        </Show>
      </div>
      <Show when={data()!.pages.length > 0}>
        <div class={styles.animePages}>
          <div class={styles.seeAllAnimeArrow} onClick={() => prePage()}>
            <HiOutlineArrowSmLeft />
          </div>
          <For each={data()!.pages}>
            {(item) => (
              <span
                class={` ${
                  page() === parseInt(item.page) ? styles.onPage : ""
                } `}
                onClick={() => upDatePageNumber(parseInt(item.page))}>
                {item.page}
              </span>
            )}
          </For>
          <div class={styles.seeAllAnimeArrow} onClick={() => nextPage()}>
            <HiOutlineArrowSmRight />
          </div>
        </div>
      </Show>
    </div>
  );
}
