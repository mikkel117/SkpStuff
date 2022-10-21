import React, { useState, useEffect } from "react";
import AnimeSlider from "../AnimeSlider";

interface RecentEpisodesProps {
  animeType: number;
}

export default function RecentEpisodes({ animeType }: RecentEpisodesProps) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    FetchData();
  }, [animeType]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "process.env.REACT_APP_gogoanime_key",
      "X-RapidAPI-Host": "gogoanime2.p.rapidapi.com",
    },
  };

  const FetchData = () => {
    fetch(
      `https://gogoanime2.p.rapidapi.com/recent-release?type=${animeType}&page=1`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
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
