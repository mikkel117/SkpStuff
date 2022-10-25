import React, { useEffect, useState } from "react";

export default function SeeAllRecentEpisodes() {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [animeTypeSubDub, setAnimeTypeSubDub] = useState<number>(1);

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

  return <div>SeeAllRecentEpisodes</div>;
}
