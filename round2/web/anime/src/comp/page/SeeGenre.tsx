import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import SeeAllAnime from "../SeeAllAnime";
import Loading from "../Loading";

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
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        setEpisodes(data.episodes);
        setPages(data.pages);
        setIsloading(false);
      })
      .catch((err) => {
        console.log("error", err.status);
      });
  };
  return (
    <div className='SeeAllAnimeWrapper'>
      <h3 className='title'>Genre: {genre}</h3>
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
