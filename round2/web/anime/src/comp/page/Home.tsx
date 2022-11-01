import React, { useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import PopularAnime from "./PopularAnime";
import RecentEpisodes from "./RecentEpisodes";
import TopAiring from "./TopAiring";
import Movies from "./Movies";
import Genres from "./Genres";

interface HomePorps {
  setGenre: Dispatch<SetStateAction<string>>;
}

export default function Home({ setGenre }: HomePorps) {
  const [animeTypeSubDub, setAnimeTypeSubDub] = useState<number>(1);

  return (
    <>
      <div className='animeWrapper'>
        <div className='animeType'>
          <span
            className={`${
              animeTypeSubDub === 1 ? "animeTypeActive" : "animeTypeDeactivated"
            }`}
            onClick={() => {
              setAnimeTypeSubDub(1);
            }}>
            sub
          </span>
          <span
            className={`${
              animeTypeSubDub === 2 ? "animeTypeActive" : "animeTypeDeactivated"
            }`}
            onClick={() => {
              setAnimeTypeSubDub(2);
            }}>
            dub
          </span>
        </div>
        <h3 className='title'>Recent episodes</h3>
        <Link to='/RecentEpisodes' className='seeAll'>
          see all
        </Link>
        <RecentEpisodes animeType={animeTypeSubDub} />
      </div>
      <div className='animeWrapper'>
        <h3 className='title'>Top Airing</h3>
        <Link to='/TopAiring' className='seeAll'>
          see all
        </Link>
        <TopAiring />
      </div>
      <div className='animeWrapper'>
        <h3 className='title'>Popular anime</h3>
        <Link to='/Popular' className='seeAll'>
          see all
        </Link>
        <PopularAnime />
      </div>
      <div className='animeWrapper'>
        <h3 className='title'>Movies</h3>
        <Link to='/Movies' className='seeAll'>
          see all
        </Link>
        <Movies />
      </div>
      <div className='genresWrapper'>
        <h3 className='title'>Genres</h3>
        <Genres setGenre={setGenre} />
      </div>
    </>
  );
}
