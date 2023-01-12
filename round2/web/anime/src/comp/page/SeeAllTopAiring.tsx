import React, { useState, useEffect } from "react";
import SeeAllAnime from "../SeeAllAnime";
import Loading from "../Loading";

export default function SeeAllTopAiring() {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isloading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    setIsloading(true);
    FetchTopAiring(page);
  }, [page]);

  const FetchTopAiring = (pageNumber: number) => {
    fetch(
      `https://gogo-anime-api-sand.vercel.app/api/anime-api/top-airing?page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data.episodes);
        setPages(data.pages);
        setIsloading(false);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  return (
    <div className='SeeAllAnimeWrapper'>
      <h3 className='title'>Top Airing</h3>
      {isloading ? (
        <Loading />
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
