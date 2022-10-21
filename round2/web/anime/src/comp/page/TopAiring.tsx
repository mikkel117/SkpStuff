import React, { useState, useEffect } from "react";
import AnimeInfoPopUp from "../AnimeInfoPopUp";
import AnimeSlider from "../AnimeSlider";

export default function TopAiring() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    FetchData();
  }, []);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "process.env.REACT_APP_gogoanime_key",
      "X-RapidAPI-Host": "gogoanime2.p.rapidapi.com",
    },
  };

  const FetchData = () => {
    fetch(`https://rumbo-anime-api.herokuapp.com/top-airing`)
      .then((response) => response.json())
      .then((data) => {
        setData(data[0].episodes);
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
