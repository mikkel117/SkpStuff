import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface AnimeInfoPopUpProps {
  animeId: string;
  /* isAnimeInfoPopUp: boolean; */
  setIsAnimeInfoPopUp: Dispatch<SetStateAction<boolean>>;
}

type test = {
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
}: /* isAnimeInfoPopUp, */
AnimeInfoPopUpProps) {
  const [data, setData] = useState<test>();
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    FetchData();
  }, [animeId]);

  /* useEffect(() => {
    if (isAnimeInfoPopUp) {
      document.body.classList.add("notScrollable");
    }
  }, [isAnimeInfoPopUp]); */

  const RemoveBodyStyle = () => {
    /* document.body.classList.remove("notScrollable"); */
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
                <div className={`openTest ${isOpen ? "open" : ""}`}>
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

{
  /* <p>{data?.otherNames}</p>
                  <p>{data?.releasedDate}</p>
                  <p>{data?.status}</p>
                  <p>{data?.totalEpisodes}</p>
                  <p>{data?.type}</p> */
}
