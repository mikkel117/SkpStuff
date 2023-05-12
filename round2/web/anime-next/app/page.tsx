//import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import AnimeSlider from "../comp/animeSlider/AnimeSlider";

export default async function Home() {
  /* const [data, setData] = useState<any>([]);
  useEffect(() => {
    GetData();
  }, []); */

  /* async function GetData() {
    const fetchData = await fetch(`https://swapi.dev/api/people/1/`);
    setData(await fetchData.json());
  } */

  return (
    <>
      <div className={styles.animeWrapper}>
        {/* @ts-expect-error Server Component */}
        <AnimeSlider
          url={`https://gogo-anime-api-sand.vercel.app/api/anime-api/recent-release?type=1&page=1`}
          title='Recent release'
        />
      </div>
    </>
  );
}
