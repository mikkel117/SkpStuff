import React, { useState, useEffect } from "react";
import AnimeInfoPopUp from "../AnimeInfoPopUp";
import { Link } from "react-router-dom";

export default function PopularAnime() {
  const [data, setData] = useState<any[]>([]);
  const [animeId, setAnimeId] = useState<string>("");
  const [isAnimeInfoPopUp, setIsAnimeInfoPopUp] = useState<boolean>(false);
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
    fetch(`https://gogoanime2.p.rapidapi.com/popular?page=1`, options)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };
  const OpenModal = (animeId: string) => {
    setAnimeId(animeId);
    setIsAnimeInfoPopUp(true);
  };
  return (
    <>
      <div className='popularAnimeContaninger'>
        {data.map((item: any) => {
          return (
            <div
              key={item.animeId}
              className='animeCard'
              onClick={() => {
                OpenModal(item.animeId);
              }}>
              <img
                src={item.animeImg}
                alt={item.animeTitle}
                draggable={false}
              />
              <div className='animeTitle'>{item.animeTitle}</div>
            </div>
          );
        })}
      </div>
      {isAnimeInfoPopUp ? (
        <AnimeInfoPopUp
          animeId={animeId}
          setIsAnimeInfoPopUp={setIsAnimeInfoPopUp}
        />
      ) : (
        <></>
      )}
      {/* <div>
        <Link to='/AddCity'>click me</Link>
      </div> */}
    </>
  );
}
