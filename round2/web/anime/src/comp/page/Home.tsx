import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PopularAnime from "./PopularAnime";
import RecentEpisodes from "./RecentEpisodes";
import TopAiring from "./TopAiring";
import { SeeAllAnimesType } from "../../model/Typs";
import { AnimeTypeContext } from "../../context/SeeAllAnimeContext";

export default function Home() {
  const { animeType, updateAnimeType } = useContext(
    AnimeTypeContext
  ) as SeeAllAnimesType;
  const [animeTypeSubDub, setAnimeTypeSubDub] = useState<number>(1);

  return (
    <>
      <div className='animeWrapper'>
        <div className='animeType'>
          <span
            className={`${animeTypeSubDub === 1 ? "animeTypeActive" : ""}`}
            onClick={() => {
              setAnimeTypeSubDub(1);
            }}>
            sub
          </span>
          <span
            className={`${animeTypeSubDub === 2 ? "animeTypeActive" : ""}`}
            onClick={() => {
              setAnimeTypeSubDub(2);
            }}>
            dub
          </span>
        </div>
        <h3 className='title'>Recent episodes</h3>
        <Link
          to='/seeAllAnimeOfType'
          className='seeAll'
          onClick={() => {
            updateAnimeType("RecentEpisodes");
          }}>
          see all
        </Link>
        <RecentEpisodes animeType={animeTypeSubDub} />
      </div>
      <div className='animeWrapper'>
        <h3 className='title'>Top Airing</h3>
        <Link
          to='/seeAllAnimeOfType'
          className='seeAll'
          onClick={() => {
            updateAnimeType("TopAiring");
          }}>
          see all
        </Link>
        <TopAiring />
      </div>
      <div className='animeWrapper'>
        <h3 className='title'>Popular anime</h3>
        <Link
          to='/seeAllAnimeOfType'
          className='seeAll'
          onClick={() => {
            updateAnimeType("PopularAnime");
          }}>
          see all
        </Link>
        <PopularAnime />
      </div>
    </>
  );
}