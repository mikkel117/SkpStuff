import React, { useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import PopularAnime from "./PopularAnime";
import RecentEpisodes from "./RecentEpisodes";
import TopAiring from "./TopAiring";
import Movies from "./Movies";
import Genres from "./Genres";
import SearchPopUp from "../SearchPopUp";

import { AiOutlineSearch } from "react-icons/ai";
import Loading from "../Loading";

interface HomePorps {
  setGenre: Dispatch<SetStateAction<string>>;
}

export default function Home({ setGenre }: HomePorps) {
  const [animeTypeSubDub, setAnimeTypeSubDub] = useState<number>(1);
  const [isSearchPopUpOpen, setIsSearchPopUpOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      <div>
        <div className='animeWrapper'>
          <div className='animeType'>
            <span
              className={`${
                animeTypeSubDub === 1
                  ? "animeTypeActive"
                  : "animeTypeDeactivated"
              }`}
              onClick={() => {
                setAnimeTypeSubDub(1);
              }}>
              sub
            </span>
            <span
              className={`${
                animeTypeSubDub === 2
                  ? "animeTypeActive"
                  : "animeTypeDeactivated"
              }`}
              onClick={() => {
                setAnimeTypeSubDub(2);
              }}>
              dub
            </span>
          </div>
          <h3 className='title'>Recent episodes</h3>
          <Link to='/recent-episodes' className='seeAll'>
            see all
          </Link>
          <RecentEpisodes
            animeType={animeTypeSubDub}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
        <div className='animeWrapper'>
          <h3 className='title'>Top Airing</h3>
          <Link to='/top-airing' className='seeAll'>
            see all
          </Link>
          <TopAiring />
        </div>
        <div className='animeWrapper'>
          <h3 className='title'>Popular anime</h3>
          <Link to='/popular' className='seeAll'>
            see all
          </Link>
          <PopularAnime />
        </div>
        <div className='animeWrapper'>
          <h3 className='title'>Movies</h3>
          <Link to='/movies' className='seeAll'>
            see all
          </Link>
          <Movies />
        </div>
        <div className='genresWrapper'>
          <h3 className='title'>Genres</h3>
          <AiOutlineSearch
            size={30}
            className='genresSearch'
            onClick={() => {
              setIsSearchPopUpOpen(true);
            }}
          />
          <Genres setGenre={setGenre} />
        </div>
        {isSearchPopUpOpen && (
          <SearchPopUp
            setIsSearchPopUpOpen={setIsSearchPopUpOpen}
            isSearchPopUpOpen={isSearchPopUpOpen}
            setGenre={setGenre}
          />
        )}
      </div>
      {isLoading && (
        <div className='homeLoadingWrapper'>
          <Loading />
        </div>
      )}
    </>
  );
}
