import React, { useState, useEffect } from "react";
import AnimeInfoPopUp from "../AnimeInfoPopUp";
import { CgProfile } from "react-icons/cg";

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
      `https://gogoanime2.p.rapidapi.com/search?keyw=${userInput}&page=1`,
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
        <h1 className='title'>title</h1>
        <CgProfile size={35} className='profile' />
      </header>
      {isAnimeInfoPopUp ? (
        <AnimeInfoPopUp
          animeId={animeId}
          setIsAnimeInfoPopUp={setIsAnimeInfoPopUp}
        />
      ) : (
        <></>
      )}
    </>
  );
}
