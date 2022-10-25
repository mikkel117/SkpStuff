import React, { useEffect, useState } from "react";
import SeeAllAnime from "../SeeAllAnime";

export default function SeeAllRecentEpisodes() {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [animeTypeSubDub, setAnimeTypeSubDub] = useState<number>(1);

  useEffect(() => {
    FetchRecentEpisodes(animeTypeSubDub, page);
  }, [page]);

  const UpdateSubDub = (SubDub: number) => {
    setAnimeTypeSubDub(SubDub);
    FetchRecentEpisodes(SubDub, page);
  };

  const FetchRecentEpisodes = (SubDub: number, pageNumber: number): void => {
    fetch(
      `https://rumbo-anime-api.herokuapp.com/recent-release?type=${SubDub}&page=${pageNumber}`
    )
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
      <h3 className='title'>Recent episodes</h3>
      <div className='animeSubDub'>
        <span
          className={`${animeTypeSubDub === 1 ? "animeSubDubActive" : ""}`}
          onClick={() => {
            UpdateSubDub(1);
          }}>
          sub
        </span>
        <span
          className={`${animeTypeSubDub === 2 ? "animeSubDubActive" : ""}`}
          onClick={() => {
            UpdateSubDub(2);
          }}>
          dub
        </span>
      </div>
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
