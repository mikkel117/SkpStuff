import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import AnimeInfoPopUp from "../AnimeInfoPopUp";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

interface MyHeaderProps {
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;
}

export default function MyHeader({ userInput, setUserInput }: MyHeaderProps) {
  const [data, setData] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [animeId, setAnimeId] = useState<string>("");
  const [isAnimeInfoPopUp, setIsAnimeInfoPopUp] = useState<boolean>(false);
  const [focused, setFocused] = useState(false);

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
                <button className='seeAllSearch'>
                  <Link
                    to='/see-all-search'
                    onClick={() => {
                      EmptyData();
                    }}>
                    see all
                  </Link>
                </button>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
        <h1 className='title'>
          <Link to='/'>Title</Link>
        </h1>
        <Link to='/login' className='profile'>
          <CgProfile size={35} />
        </Link>
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
