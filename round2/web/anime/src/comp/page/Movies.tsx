import React, { useState, useEffect } from "react";
import AnimeSlider from "../AnimeSlider";

export default function Movies() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = (): void => {
    fetch(`https://gogo-anime-api-sand.vercel.app/api/anime-api/movies?page=1`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
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
