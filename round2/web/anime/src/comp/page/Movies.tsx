import React, { useState, useEffect } from "react";
import AnimeSlider from "../AnimeSlider";

export default function Movies() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = () => {
    fetch(`https://gogo-anime-api-sand.vercel.app/api/anime-api/movies?page=1`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setData(data.list[0].episodes);
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
