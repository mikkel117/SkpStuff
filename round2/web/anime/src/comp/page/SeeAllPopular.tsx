import React, { useState, useEffect } from "react";
import SeeAllAnime from "../SeeAllAnime";

export default function SeeAllPopular() {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    FetchPopular(page);
  }, [page]);

  const FetchPopular = (pageNumber: number) => {
    fetch(`https://rumbo-anime-api.herokuapp.com/popular?page=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data[0].episodes);
        setPages(data[0].pages);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };
  return (
    <div className='SeeAllAnimeWrapper'>
      <h3 className='title'>Popular</h3>
      <SeeAllAnime
        episodes={episodes}
        setEpisodes={setEpisodes}
        pages={pages}
        setPages={setPages}
        pageNumber={page}
        setPageNumber={setPage}
      />
    </div>
  );
}
