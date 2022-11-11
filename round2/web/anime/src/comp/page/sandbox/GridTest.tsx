import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

type test = {
  animeId: string;
  animeImg: string;
  animeTitle: string;
};

export default function GridTest() {
  const [data, setData] = useState<test>();
  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);
  const FetchData = () => {
    fetch(
      "https://gogo-anime-api-sand.vercel.app/api/anime-api/get-anime-by-id?id=Spy-x-Family"
    )
      .then((response) => response.json())
      .then((data) => setData(data));
  };
  return (
    <>
      <section className='imageGrid'>
        <div className='imageGridContent'>
          <span className='title'>{data?.animeTitle}</span>
          <div className='close'>x</div>
          <div className='imageCover'>
            <img src={data?.animeImg} alt='' />
          </div>
        </div>
      </section>
    </>
  );
}
