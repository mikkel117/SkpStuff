import React, { useState, useEffect } from "react";
import AnimeInfoPopUp from "../AnimeInfoPopUp";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function MyHeader() {
  const [userInput, setUserInput] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [animeId, setAnimeId] = useState<string>("");
  const [isAnimeInfoPopUp, setIsAnimeInfoPopUp] = useState<boolean>(false);

  useEffect(() => {
    if (userInput.length > 2) {
      FetchData();
    }
  }, [userInput]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "process.env.REACT_APP_gogoanime_key",
      "X-RapidAPI-Host": "gogoanime2.p.rapidapi.com",
    },
  };

  async function FetchData() {
    await fetch(
      `https://rumbo-anime-api.herokuapp.com/search?keyw=${userInput}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
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
    setUserInput("");
    setData([]);
  };
  return (
    <>
      <header>
        <form className='animeSearch' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='search anime'
            className='animeSearchInput'
            onChange={(e) => setUserInput(e.target.value)}
          />
          <div className='dropinputContent'>
            {data
              .filter((post: any) => {
                if (userInput === "") {
                  setData([]);
                  return "";
                } else if (
                  post.animeTitle
                    .toLowerCase()
                    .includes(userInput?.toLowerCase() as string)
                ) {
                  return post;
                }
              })
              .map((post: any) => {
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
          </div>
        </form>
        {userInput.length > 2 ? (
          <div
            className='hiddingCover'
            onClick={() => {
              EmptyData();
            }}></div>
        ) : (
          <></>
        )}
        <h1 className='title'>
          {" "}
          <Link to='/'>Title</Link>
        </h1>
        <CgProfile size={35} className='profile' />
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
