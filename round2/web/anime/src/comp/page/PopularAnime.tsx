import React, { useState, useEffect } from "react";

export default function PopularAnime() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    FetchData();
  }, []);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "aee2130728mshc250038c75dd0d2p181ea1jsn58e75ec5d280",
      "X-RapidAPI-Host": "gogoanime2.p.rapidapi.com",
    },
  };

  const FetchData = () => {
    fetch(`https://gogoanime2.p.rapidapi.com/popular?page=1`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };
  return (
    <>
      <div className='popularAnimeContaninger'>
        {data.map((item: any) => {
          return (
            <div key={item.animeId} className='animeCard'>
              <img src={item.animeImg} alt={item.animeTitle} />
            </div>
          );
        })}
      </div>
    </>
  );
}
