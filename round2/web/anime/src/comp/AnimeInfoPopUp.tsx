import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

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
  const [otherNames, setOtherNames] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showButton, setShowButton] = useState<boolean>(false);
  const animeDescription = useRef<HTMLParagraphElement>(null);

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

  useLayoutEffect(() => {
    if (animeDescription.current) {
      const hasOverflow =
        animeDescription.current.scrollHeight >
        animeDescription.current.clientHeight;
      if (hasOverflow) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }
  }, [data]);

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
        if (data.error) {
          /* console.log(data.error); */
          setError(true);
          setErrorMessage("404");
        }

        setOtherNames(data.otherNames);
        setGenres(data.genres);

        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
        /* console.log("error", err.message); */
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
              {error ? (
                <h3 className='error'>error: {errorMessage}</h3>
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
                  <div className='imageCover'>
                    <img src={data?.animeImg} alt='' />
                  </div>
                  <div className='animeInfo'>
                    <AiOutlineStar className='addToFervervt' size={30} />
                    <div className='splitAnimeInfo'>
                      <div className='animeInfoTextWrapper'>
                        <p className='animeInfoText'>
                          other names:
                          {otherNames.map((item: any) => {
                            return <span key={item}>{item},</span>;
                          })}
                        </p>
                        <p className='animeInfoText'>
                          genres:
                          {genres.map((item: any) => {
                            return <span key={item}>{item},</span>;
                          })}
                        </p>
                        <p className='animeInfoText'>
                          relesaed date: <span> {data?.releasedDate}</span>
                        </p>
                        <p className='animeInfoText'>
                          status: <span> {data?.status}</span>{" "}
                        </p>
                        <p className='animeInfoText'>
                          totale episodes: <span> {data?.totalEpisodes} </span>{" "}
                        </p>
                        <p className='animeInfoText'>
                          type: <span> {data?.type} </span>
                        </p>
                      </div>
                      {data?.totalEpisodes === "0" ? (
                        <></>
                      ) : (
                        <div className='epWrapper'>
                          <p className='epTitle'>episodesList</p>
                          <div className={`eps`}>
                            {data?.episodesList.map((item) => {
                              return (
                                <a
                                  key={item.episodeId}
                                  href={item.episodeUrl}
                                  target='_blank'>
                                  {item.episodeNum}
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className={`animeSynopsis ${isOpen ? "open" : ""}`}
                      ref={animeDescription}>
                      {data?.synopsis}
                    </div>
                    {showButton && (
                      <button
                        onClick={() => {
                          setIsOpen(!isOpen);
                        }}>
                        {isOpen ? "show less" : "show more"}
                      </button>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
