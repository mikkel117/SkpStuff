import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import GetUser from "../_supabase/getUser";
import { useNavigate } from "react-router-dom";
import SignOut from "../_supabase/signout";
import GetAllAnime from "../_supabase/getAllAnime";
import AnimeInfoPopUp from "../AnimeInfoPopUp";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

interface favoriteAnimes {
  animeId: string;
  animeTitle: string;
  animeImg: string;
}

export default function ProfileContent() {
  const ChunkSize: number = 10;
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<favoriteAnimes[]>([]);
  const [dataUsed, setDataUsed] = useState<favoriteAnimes[]>([]);
  const [endChunk, setEndChunk] = useState<number>(ChunkSize);
  const [startChunk, setStartChunk] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [animeId, setAnimeId] = useState<string>("");
  const [isAnimeInfoPopUp, setIsAnimeInfoPopUp] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      let user = await GetUser();
      setUser(user);
      isLogedIn(user);
    };

    const isLogedIn = async (user: any) => {
      if (user.data.user === null) {
        navigate("/");
      } else {
        let anime = await GetAllAnime(user.data.user.id);
        if (anime.data) {
          setData(anime.data);
          setDataUsed(anime.data.slice(startChunk, endChunk));
          HowManyPages(anime.data);
        }
        if (anime.error) {
          console.log(anime.error);
        }
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    setDataUsed(data.slice(startChunk, endChunk));
  }, [endChunk]);

  const HowManyPages = (data: favoriteAnimes[]) => {
    let pagesSize = 0;
    for (let index = 0; index < data.length; index = index + ChunkSize) {
      pagesSize = pagesSize + 1;
    }
    if (pagesSize === 0) {
      pagesSize = 1;
    }
    setTotalPages(pagesSize);
  };

  const IncreaseChunkSize = () => {
    if (endChunk !== data.length && endChunk < data.length) {
      setCurrentPage(currentPage + 1);
      setStartChunk(startChunk + ChunkSize);
      setEndChunk(endChunk + ChunkSize);
    }
  };

  const DecreaseChunkSize = () => {
    if (startChunk !== 0) {
      setCurrentPage(currentPage - 1);
      setStartChunk(startChunk - ChunkSize);
      setEndChunk(endChunk - ChunkSize);
    }
  };

  const Logout = () => {
    SignOut();
    setUser(null);
  };

  const OpenModal = (animeId: string) => {
    setAnimeId(animeId);
    setIsAnimeInfoPopUp(true);
  };
  return (
    <>
      {user && (
        <div className='profileContentWrapper'>
          <div className='favortieWrapper'>
            <p className='profileEmail'>email: {user.data.user.email}</p>
            <h3 className='favortieAnimesTitle'>favortie animes</h3>
            <button
              className='signOutBtn'
              onClick={() => {
                Logout();
              }}>
              sign out
            </button>
            {dataUsed.map((item: favoriteAnimes) => {
              return (
                <div
                  className='animeCard'
                  key={item.animeId}
                  onClick={() => {
                    OpenModal(item.animeId);
                  }}>
                  <span>{item.animeTitle}</span>
                  <img src={item.animeImg} alt='' />
                </div>
              );
            })}
            <div className='pagesWrapper'>
              <AiOutlineArrowLeft
                onClick={() => {
                  DecreaseChunkSize();
                }}
              />
              <span>
                {currentPage}/{totalPages}
              </span>
              <AiOutlineArrowRight
                onClick={() => {
                  IncreaseChunkSize();
                }}
              />
            </div>
            <button className='deleteUser'>delete user</button>
          </div>
        </div>
      )}
      {isAnimeInfoPopUp && (
        <AnimeInfoPopUp
          animeId={animeId}
          setIsAnimeInfoPopUp={setIsAnimeInfoPopUp}
          isAnimeInfoPopUp={isAnimeInfoPopUp}
        />
      )}
    </>
  );
}
