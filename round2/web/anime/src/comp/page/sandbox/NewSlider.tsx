import React, { useState, useEffect } from "react";
import AnimeInfoPopUp from "../../AnimeInfoPopUp";

export default function NewSlider() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    FetchData();
  });

  const FetchData = () => {
    fetch(`https://gogo-anime-api-sand.vercel.app/api/anime-api/top-airing`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.list[0].episodes);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };
  return (
    <>
      <div className='NewSliderContainer'>
        {data.map((item: any) => {
          return (
            <div>
              <img src={item.animeImg} alt='' />
              <span>{item.animeTitle}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
