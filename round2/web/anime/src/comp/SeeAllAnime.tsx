import React, { useState, Dispatch, SetStateAction } from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import AnimeInfoPopUp from "./AnimeInfoPopUp";

interface SeeAllAnimeProps {
  episodes: any[];
  setEpisodes: Dispatch<SetStateAction<any[]>>;
  pages: any[];
  setPages: Dispatch<SetStateAction<any[]>>;
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
}

export default function SeeAllAnime({
  episodes,
  setEpisodes,
  pages,
  setPages,
  pageNumber,
  setPageNumber,
}: SeeAllAnimeProps) {
  const [animeId, setAnimeId] = useState<string>("");
  const [isAnimeInfoPopUp, setIsAnimeInfoPopUp] = useState<boolean>(false);

  const updatePageNUmber = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const OpenModal = (animeId: string) => {
    setAnimeId(animeId);
    setIsAnimeInfoPopUp(true);
  };

  return (
    <>
      <div className='animeImgWrapper'>
        {episodes.map((item: any) => {
          return (
            <div
              className='animeCard'
              key={item.animeId}
              onClick={() => {
                OpenModal(item.animeId);
              }}>
              <img src={item.animeImg} alt='' />
              <span>{item.animeTitle}</span>
            </div>
          );
        })}
      </div>
      {pages.length === 0 ? (
        <></>
      ) : (
        <div className='animePages'>
          <span>
            <AiOutlineDoubleLeft
              onClick={() => {
                updatePageNUmber(1);
              }}
            />
          </span>
          {pages.map((item: any) => {
            return (
              <span
                key={item.page}
                onClick={() => {
                  updatePageNUmber(parseInt(item.page));
                }}
                className={`${
                  pageNumber === parseInt(item.page) ? "onPage" : ""
                }`}>
                {item.page}
              </span>
            );
          })}
        </div>
      )}
      {isAnimeInfoPopUp ? (
        <AnimeInfoPopUp
          animeId={animeId}
          setIsAnimeInfoPopUp={setIsAnimeInfoPopUp}
          isAnimeInfoPopUp={isAnimeInfoPopUp}
        />
      ) : (
        <></>
      )}
    </>
  );
}
