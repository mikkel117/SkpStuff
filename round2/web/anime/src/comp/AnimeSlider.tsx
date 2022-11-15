import React, { useState, useEffect } from "react";
import AnimeInfoPopUp from "./AnimeInfoPopUp";
interface AnimeSliderProps {
  data: any[];
}

export default function AnimeSlider({ data }: AnimeSliderProps) {
  const [animeId, setAnimeId] = useState<string>("");
  const [isAnimeInfoPopUp, setIsAnimeInfoPopUp] = useState<boolean>(false);

  const OpenModal = (animeId: string) => {
    setAnimeId(animeId);
    setIsAnimeInfoPopUp(true);
  };

  return (
    <>
      <div className='animeContaninger'>
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
              <span className='animeTitle'>{item.animeTitle}</span>
            </div>
          );
        })}
      </div>
      {isAnimeInfoPopUp && (
        <AnimeInfoPopUp
          animeId={animeId}
          setIsAnimeInfoPopUp={setIsAnimeInfoPopUp}
          isAnimeInfoPopUp={isAnimeInfoPopUp}
        />
      )}
    </>
  );
}
