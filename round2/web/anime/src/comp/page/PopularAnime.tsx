import React, { useState, useEffect } from "react";
import AnimeSlider from "../AnimeSlider";
import { Link } from "react-router-dom";

export default function PopularAnime() {
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
    fetch(`https://rumbo-anime-api.herokuapp.com/popular?page=1`)
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
      {/* <div>
        <Link to='/AddCity'>click me</Link>
      </div> */}
    </>
  );
}
