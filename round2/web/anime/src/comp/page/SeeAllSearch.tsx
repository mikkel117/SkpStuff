import { useState, useEffect, Dispatch, SetStateAction } from "react";
import SeeAllAnime from "../SeeAllAnime";
import Loading from "../Loading";

interface SeeAllSearchProps {
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;
}

export default function SeeAllSearch({
  userInput,
  setUserInput,
}: SeeAllSearchProps) {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isloading, setIsloading] = useState<boolean>(false);
  useEffect(() => {
    setIsloading(true);
    FetchPopular(page);
  }, [page, userInput]);

  const FetchPopular = (pageNumber: number) => {
    fetch(
      `https://gogo-anime-api-sand.vercel.app/api/anime-api/search?keyw=${userInput}&page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

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
      <h3 className='title'>Search</h3>
      <input
        type='text'
        autoFocus
        placeholder='search anime'
        className='SearchInput'
        onChange={(e) => setUserInput(e.target.value)}
      />
      {isloading ? (
        <Loading />
      ) : (
        <>
          <SeeAllAnime
            episodes={episodes}
            setEpisodes={setEpisodes}
            pages={pages}
            setPages={setPages}
            pageNumber={page}
            setPageNumber={setPage}
          />
        </>
      )}
    </div>
  );
}
