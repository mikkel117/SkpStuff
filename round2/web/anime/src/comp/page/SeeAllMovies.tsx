import { useState, useEffect } from "react";
import SeeAllAnime from "../SeeAllAnime";
import Loading from "../Loading";

export default function SeeAllMovies() {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isloading, setIsloading] = useState<boolean>(false);
  const [aph, setAph] = useState<string>("");
  const [aphArr, setAphArr] = useState<any[]>([]);
  useEffect(() => {
    setIsloading(true);
    FetchPopular(page);
  }, [page, aph]);

  const FetchPopular = (pageNumber: number) => {
    fetch(
      `https://gogo-anime-api-sand.vercel.app/api/anime-api/movies?aph=${aph}&page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data.episodes);
        setPages(data.pages);
        setAphArr(data.aphList);
        setIsloading(false);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };
  return (
    <div className='SeeAllAnimeWrapper'>
      <h3 className='title'>Movies</h3>
      {isloading ? (
        <Loading />
      ) : (
        <>
          <div className={`aphContainer`}>
            {aphArr.map((item: any) => {
              return (
                <p
                  className={`${
                    aph === item.aph
                      ? "active"
                      : aph === item.value
                      ? "active"
                      : aph === item.value
                      ? "active"
                      : ""
                  }`}
                  key={item.aph}
                  onClick={() => {
                    setAph(item.value);
                  }}>
                  {item.aph}
                </p>
              );
            })}
          </div>
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
