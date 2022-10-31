import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface AnimeInfoPopUpProps {
  animeId: string;
  isAnimeInfoPopUp: boolean;
  setIsAnimeInfoPopUp: Dispatch<SetStateAction<boolean>>;
}

type AnimeInfoArray = {
  animeImg: string;
  animeTitle: string;
  episodesList: any[];
  genres: string[];
  otherNames: string;
  releasedDate: string;
  status: string;
  synopsis: string;
  totalEpisodes: string;
  type: string;
};

export default function AnimeInfoPopUp({
  animeId,
  setIsAnimeInfoPopUp,
  isAnimeInfoPopUp,
}: AnimeInfoPopUpProps) {
  const [data, setData] = useState<AnimeInfoArray>();
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    FetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeId]);

  useEffect(() => {
    if (isAnimeInfoPopUp) {
      document.body.classList.add("notScrollable");
    }
  }, [isAnimeInfoPopUp]);

  const RemoveBodyStyle = () => {
    document.body.classList.remove("notScrollable");
    setIsAnimeInfoPopUp(false);
  };

  const FetchData = () => {
    fetch(
      `https://gogo-anime-api-sand.vercel.app/api/anime-api/anime-details?id=${animeId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };
  return (
    <>
      <section className='AnimeInfoPopUp'>
        <div className='AnimeInfoContent'>
          <div
            className='bgClose'
            onClick={() => {
              RemoveBodyStyle();
            }}></div>
          {isloading ? (
            <div className='loader'></div>
          ) : (
            <>
              <h2 className='animeTitle'>{data?.animeTitle}</h2>
              <p
                className='close'
                onClick={() => {
                  RemoveBodyStyle();
                }}>
                X
              </p>
              <img src={data?.animeImg} alt='' />
              <div className='animeTest'>
                <p>other names: {data?.otherNames}</p>
                <p>relesaed date: {data?.releasedDate}</p>
                <p>status: {data?.status}</p>
                <p>totale episodes: {data?.totalEpisodes}</p>
                <p>type: {data?.type}</p>
                <div className={`animeSynopsis ${isOpen ? "open" : ""}`}>
                  <p className='text'>{data?.synopsis}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}>
                click me
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
}
