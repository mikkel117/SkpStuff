import React, { useState, useEffect } from "react";
import SeeAllAnime from "../SeeAllAnime";

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
    fetch(`https://rumbo-anime-api.herokuapp.com/top-airing?page=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data[0].episodes);
        setPages(data[0].pages);
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
