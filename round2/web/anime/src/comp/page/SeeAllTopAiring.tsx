import React, { useState, useEffect } from "react";

export default function SeeAllTopAiring() {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);

  const FetchTopAiring = (pageNumber: number) => {
    fetch(`https://rumbo-anime-api.herokuapp.com/top-airing?page=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data[0].episodes);
        setPages(data[0].pages);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  return <div>SeeAllTopAiring</div>;
}
