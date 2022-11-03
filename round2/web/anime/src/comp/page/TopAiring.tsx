import React, { useState, useEffect } from "react";
import AnimeSlider from "../AnimeSlider";

export default function TopAiring() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = () => {
    fetch(`https://gogo-anime-api-sand.vercel.app/api/anime-api/top-airing`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.episodes);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };
  return (
    <>
      <AnimeSlider data={data} />
    </>
  );
}
