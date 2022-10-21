import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface AnimeInfoPopUpProps {
  animeId: string;
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
}: AnimeInfoPopUpProps) {
  const [data, setData] = useState<test>();
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    FetchData();
  }, [animeId]);

  const Options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "aee2130728mshc250038c75dd0d2p181ea1jsn58e75ec5d280",
      "X-RapidAPI-Host": "gogoanime2.p.rapidapi.com",
    },
  };

  const FetchData = () => {
    fetch(`https://rumbo-anime-api.herokuapp.com/anime-details/${animeId}`)
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
                  setIsAnimeInfoPopUp(false);
                }}>
                X
              </p>
              <img src={data?.animeImg} alt='' />
              <div className='animeInfoWrapper'>
                <div
                  className={`animeInfo ${
                    isOpen ? "hideAnimeInfo" : "showAnimeInfo"
                  }`}>
                  <p>{data?.otherNames}</p>
                  <p>{data?.releasedDate}</p>
                  <p>{data?.status}</p>
                  <p>{data?.totalEpisodes}</p>
                  <p>{data?.type}</p>
                  <p>
                    {data?.genres.map((item: any) => {
                      return (
                        <span key={item}>
                          {item} <br />
                        </span>
                      );
                    })}
                  </p>
                </div>
                <div
                  className={`animeSynopsisWrapper ${
                    isOpen ? "synopsisOpen" : "synopsisClose"
                  } `}>
                  <input type='checkbox' id='expand-toggle' />
                  <p className={`animeSynopsis`}>{data?.synopsis}</p>
                  <label
                    htmlFor='expand-toggle'
                    id='expand-btn'
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
