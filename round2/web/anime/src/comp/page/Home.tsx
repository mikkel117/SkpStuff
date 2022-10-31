import React, { useState } from "react";
import { Link } from "react-router-dom";
import PopularAnime from "./PopularAnime";
import RecentEpisodes from "./RecentEpisodes";
import TopAiring from "./TopAiring";

export default function Home() {
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
    </>
  );
}
