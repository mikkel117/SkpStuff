import React, { useState, useEffect } from "react";
import AnimeSlider from "../AnimeSlider";

interface RecentEpisodesProps {
  animeType: number;
}

export default function RecentEpisodes({ animeType }: RecentEpisodesProps) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    FetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeType]);

  const FetchData = () => {
    fetch(
      `https://gogo-anime-api-sand.vercel.app/api/anime-api/recent-release?type=${animeType}&page=1`
    )
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
