import { useEffect, useState, useMemo } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import SupabaseDeleteUser from "../_supabase/deleteUser";
import GetAllAnime from "../_supabase/getAllAnime";
import GetUser from "../_supabase/getUser";
import SignOut from "../_supabase/signout";
import AnimeInfoPopUp from "../AnimeInfoPopUp";

interface favoriteAnimes {
  animeId: string;
  animeTitle: string;
  animeImg: string;
}

const ChunkSize: number = 12;
export default function ProfileContent() {
  const [user, setUser] = useState<any>(null);
  const [arrayFullLeanth, setArrayFullLeanth] = useState<favoriteAnimes[]>([]);
  const [dataUsed, setDataUsed] = useState<favoriteAnimes[]>([]);
  const [endChunk, setEndChunk] = useState<number>(ChunkSize);
  const [startChunk, setStartChunk] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [animeId, setAnimeId] = useState<string>("");
  const [isAnimeInfoPopUp, setIsAnimeInfoPopUp] = useState<boolean>(false);
  const [isDeleteUserModal, setIsDeleteUserModal] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      let user = await GetUser();
      setUser(user);
      isLogedIn(user);
    };

    getUser();
  }, []);

  const isLogedIn = async (user: any) => {
    if (user.data.user === null) {
      navigate("/");
    } else {
      let anime = await GetAllAnime(user.data.user.id);
      if (anime.data) {
        setArrayFullLeanth(anime.data);
        setDataUsed(anime.data.slice(startChunk, endChunk));
        HowManyPages(anime.data);
      }
      if (anime.error) {
        console.log(anime.error);
      }
    }
  };

  const memoizedData = useMemo(
    () => arrayFullLeanth.slice(startChunk, endChunk),
    [endChunk]
  );
  useEffect(() => {
    //setDataUsed(arrayFullLeanth.slice(startChunk, endChunk));
    setDataUsed(memoizedData);
  }, [memoizedData]);

  const HowManyPages = (data: favoriteAnimes[]) => {
    let pagesSize = 0;
    for (let i = 0; i < data.length; i = i + ChunkSize) {
      pagesSize = pagesSize + 1;
    }
    if (pagesSize === 0) {
      pagesSize = 1;
    }
    setTotalPages(pagesSize);
  };

  const IncreaseChunkSize = () => {
    if (
      endChunk !== arrayFullLeanth.length &&
      endChunk < arrayFullLeanth.length
    ) {
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
  };

  const OpenModal = (animeId: string) => {
    setAnimeId(animeId);
    setIsAnimeInfoPopUp(true);
  };

  const DeleteUser = async () => {
    await SupabaseDeleteUser(user);
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
            <button
              className='deleteUser'
              onClick={() => {
                setIsDeleteUserModal(true);
              }}>
              delete user
            </button>
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
      {isDeleteUserModal && (
        <div className='deleteUserContainer'>
          <div className='deleteUserContent'>
            <p>are you sure you want to delete this user?</p>
            <div>
              <button className='yes' onClick={() => DeleteUser()}>
                yes
              </button>
              <button
                className='no'
                onClick={() => setIsDeleteUserModal(false)}>
                no
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
