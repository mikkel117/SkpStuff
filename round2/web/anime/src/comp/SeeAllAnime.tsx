import React, { useState, Dispatch, SetStateAction } from "react";
import {
  AiOutlineDoubleLeft,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import AnimeInfoPopUp from "./AnimeInfoPopUp";

interface SeeAllAnimeProps {
  episodes: any[];
  setEpisodes: Dispatch<SetStateAction<undefined[]>>;
  pages: any[];
  setPages: Dispatch<SetStateAction<undefined[]>>;
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
    if (pageNumber > 0) {
      setPageNumber(pageNumber);
    }
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
          <AiOutlineArrowLeft
            className='seeAllAnimeArrow'
            onClick={() => {
              updatePageNUmber(pageNumber - 1);
            }}
          />
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
          <AiOutlineArrowRight
            className='seeAllAnimeArrow'
            onClick={() => {
              updatePageNUmber(pageNumber + 1);
            }}
          />
        </div>
      )}
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
