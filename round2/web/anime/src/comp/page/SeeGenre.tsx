import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import SeeAllAnime from "../SeeAllAnime";

interface SeeGenreProps {
  genre: string;
  setGenre: Dispatch<SetStateAction<string>>;
}

export default function SeeGenre({ genre, setGenre }: SeeGenreProps) {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isloading, setIsloading] = useState<boolean>(false);
  useEffect(() => {
    setIsloading(true);
    FetchData(page);
  }, [page]);

  const FetchData = (pageNumber: number) => {
    fetch(
      `https://gogo-anime-api-sand.vercel.app/api/anime-api/genres?genre=${genre}&page=${pageNumber}`
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
      <h3 className='title'>Genre: {genre}</h3>
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
