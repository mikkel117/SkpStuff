import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import AnimeSlider from "../AnimeSlider";
import Loading from "../Loading";

interface RecentEpisodesProps {
  animeType: number;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function RecentEpisodes({
  animeType,
  isLoading,
  setIsLoading,
}: RecentEpisodesProps) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err.message);
        setIsLoading(false);
      });
  };
  return (
    <>
      <AnimeSlider data={data} />
    </>
  );
}
