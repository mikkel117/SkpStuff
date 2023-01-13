import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import AnimeInfoPopUp from "../AnimeInfoPopUp";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import GetUser from "../_supabase/getUser";

interface MyHeaderProps {
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;
  formValue: string;
  setFormValue: Dispatch<SetStateAction<string>>;
}

export default function MyHeader({
  userInput,
  setUserInput,
  formValue,
  setFormValue,
}: MyHeaderProps) {
  const [data, setData] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [animeId, setAnimeId] = useState<string>("");
  const [isAnimeInfoPopUp, setIsAnimeInfoPopUp] = useState<boolean>(false);
  const [focused, setFocused] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => {
    if (userInput.length > 1) {
      const timer = setTimeout(() => {
        FetchData();
      }, 200);
      return () => clearTimeout(timer);
    } else if (userInput.length === 0) {
      setData([]);
      setPages([]);
    }
  }, [userInput]);

  useEffect(() => {
    const getUser = async () => {
      let user = await GetUser();
      if (user.data.user === null) {
        setIsLogedIn(false);
      } else {
        setIsLogedIn(true);
      }
    };
    getUser();
  }, [formValue]);

  async function FetchData() {
    await fetch(
      `https://gogo-anime-api-sand.vercel.app/api/anime-api/search?keyw=${userInput}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.episodes);
        setPages(data.pages);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  }

  const ChangeAnimePopUpOpen = (animeId: string) => {
    setAnimeId(animeId);
    setIsAnimeInfoPopUp(true);
  };

  const EmptyData = (): void => {
    setData([]);
    setPages([]);
  };

  const focus = () => {
    if (!focused) {
      setFocused(true);
    }
  };

  const blur = () => {
    const timer = setTimeout(() => {
      if (focused) setFocused(false);
    }, 200);
    return () => clearTimeout(timer);
  };

  return (
    <>
      <header>
        <Link to='/see-all-search' className='phoneSearch'>
          <AiOutlineSearch size={30} />
        </Link>
        <div className='animeSearch'>
          <input
            type='text'
            placeholder='search anime'
            className='animeSearchInput'
            onChange={(e) => setUserInput(e.target.value)}
            onFocus={focus}
            onBlur={blur}
          />
          {focused && (
            <div className='dropinputContent'>
              {data.map((post: any) => {
                return (
                  <p
                    key={post.animeId}
                    onClick={() => {
                      ChangeAnimePopUpOpen(post.animeId);
                    }}>
                    <span> {post.animeTitle}</span>
                    <img src={post.animeImg} alt={post.animeId} />
                  </p>
                );
              })}
              {pages.length > 0 ? (
                <Link
                  to='/see-all-search'
                  onClick={() => {
                    EmptyData();
                  }}
                  className='seeAllSearch'>
                  see all
                </Link>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
        <h1 className='title'>
          <Link to='/'>AnimeNexus</Link>
        </h1>
        <div className='profile'>
          {isLogedIn ? (
            <Link to='/login'>
              <CgProfile size={35} />
            </Link>
          ) : (
            <>
              <Link
                to='/login'
                onClick={() => {
                  setFormValue("login");
                }}>
                login
              </Link>
              <br />
              <Link
                to='/login'
                onClick={() => {
                  setFormValue("singup");
                }}>
                singup
              </Link>
            </>
          )}
        </div>
      </header>
      {isAnimeInfoPopUp ? (
        <AnimeInfoPopUp
          animeId={animeId}
          setIsAnimeInfoPopUp={setIsAnimeInfoPopUp}
          isAnimeInfoPopUp={isAnimeInfoPopUp}
        />
      ) : (
        <></>
      )}
    </>
  );
}

{
  /* <div className='seeAllSearch'>
  <Link
    to='/see-all-search'
    onClick={() => {
      EmptyData();
    }}>
    see all
  </Link>
</div>;
 */
}
