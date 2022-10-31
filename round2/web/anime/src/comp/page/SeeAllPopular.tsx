import React, { useState, useEffect } from "react";
import SeeAllAnime from "../SeeAllAnime";

export default function SeeAllPopular() {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isloading, setIsloading] = useState<boolean>(false);
  useEffect(() => {
    setIsloading(true);
    FetchPopular(page);
  }, [page]);

  const FetchPopular = (pageNumber: number) => {
    fetch(
      `https://gogo-anime-api-sand.vercel.app/api/anime-api/popular?page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data.list[0].episodes);
        setPages(data.list[0].pages);
        setIsloading(false);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };
  return (
    <div className='SeeAllAnimeWrapper'>
      <h3 className='title'>Popular</h3>
      {isloading ? (
        <div className='loader SeeAllAnimeLoading'></div>
      ) : (
        <SeeAllAnime
          episodes={episodes}
          setEpisodes={setEpisodes}
          pages={pages}
          setPages={setPages}
          pageNumber={page}
          setPageNumber={setPage}
        />
      )}
    </div>
  );
}
