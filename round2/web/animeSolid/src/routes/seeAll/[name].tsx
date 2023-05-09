import { useParams } from "solid-start";
import { For, Show, createResource, createSignal, onMount } from "solid-js";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "solid-icons/hi";
import type { AnimeDataType } from "tsTypes/Types";
import styles from "./seeAll.module.scss";
const Fetch = async (endpoint: any) => {
  if (endpoint) {
    return (await fetch(endpoint)).json();
  }
};

export default function Index() {
  const params = useParams();
  const [title, setTitle] = createSignal<string>("unknown");
  const [endpoint, setEndpoint] = createSignal<string>("");
  const [subOrDub, setSubOrDub] = createSignal<number>(1);
  const [page, setPage] = createSignal<number>(1);
  const [aph, setAph] = createSignal<string>("");
  const [data] = createResource<AnimeDataType, string>(endpoint, Fetch);
  onMount(() => {
    seeAllInfo(page(), 1, "");
  });

  const seeAllInfo = (pageNumber: number, subDub?: number, aph?: string) => {
    switch (params.name) {
      case "Recentrelease":
        setTitle("Recent release");
        setEndpoint(
          `https://gogo-anime-api-sand.vercel.app/api/anime-api/recent-release?type=${subDub}&page=${pageNumber}`
        );

        break;
      case "Topairing":
        setTitle("Top airing");
        setEndpoint(
          `https://gogo-anime-api-sand.vercel.app/api/anime-api/top-airing?page=${pageNumber}`
        );
        break;
      case "Popularanime":
        setTitle("Popular anime");
        setEndpoint(
          `https://gogo-anime-api-sand.vercel.app/api/anime-api/popular?page=${pageNumber}`
        );
        break;
      case "movies":
        setTitle("Movies");
        setEndpoint(
          `https://gogo-anime-api-sand.vercel.app/api/anime-api/movies?aph=${aph}&page=${pageNumber}`
        );
        break;

      default:
        console.log("something else");

        break;
    }
  };

  const upDatePageNumber = (number: number) => {
    setPage(number);
    seeAllInfo(number);
  };
  const prePage = () => {
    if (page() > 1) {
      let pageNumber = page() - 1;
      setPage(pageNumber);
      seeAllInfo(pageNumber);
    }
  };

  const nextPage = () => {
    let pageNumber = page() + 1;
    setPage(pageNumber);
    seeAllInfo(pageNumber);
  };

  const ChangeSubDub = () => {
    let subDub: number;
    if (subOrDub() === 1) {
      subDub = 2;
    } else {
      subDub = 1;
    }
    setSubOrDub(subDub);
    seeAllInfo(page(), subDub);
  };

  const ChangeAph = (aphValue: string) => {
    setAph(aphValue);
    seeAllInfo(page(), 1, aphValue);
  };

  return (
    <div>
      <h3 class={styles.title}>{title()}</h3>
      <Show when={params.name === "Recentrelease"}>
        <div class={styles.animeType}>
          <button
            class={`${
              subOrDub() === 1
                ? styles.animeTypeActive
                : styles.animeTypeDeactivated
            }`}
            onClick={() => ChangeSubDub()}>
            sub
          </button>
          <button
            class={`${
              subOrDub() === 2
                ? styles.animeTypeActive
                : styles.animeTypeDeactivated
            }`}
            onClick={() => ChangeSubDub()}>
            dub
          </button>
        </div>
      </Show>
      <Show when={params.name === "movies"}>
        <div class={styles.aphContainer}>
          <For each={data()?.aphList}>
            {(item) => (
              <p
                class={`${aph() === item.aph ? styles.active : ""}`}
                onClick={() => ChangeAph(item.value)}>
                {item.aph}
              </p>
            )}
          </For>
          {/* {#each animeData.aphList as item}
        <p
          class={`${
            aph === item.aph ? "active" : aph === item.value ? "active" : ""
          }`}
          on:click={() => {
            changeAph(item.value);
          }}
          on:keypress={() => {
            changeAph(item.value);
          }}
        >
          {item.aph}
        </p>
      {/each} */}
        </div>
      </Show>
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
      <Show when={data()} fallback={<div>nothing is here</div>}>
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
      </Show>
    </div>
  );
}
