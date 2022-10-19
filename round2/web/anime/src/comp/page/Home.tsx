import React from "react";
import PopularAnime from "./PopularAnime";

export default function Home() {
  return (
    <>
      <div className='popularAnimeWrapper'>
        <div className='popularAnimeTitle'>Popular anime</div>
        <p className='seeAll'>see all</p>
        <PopularAnime />
      </div>
    </>
  );
}
