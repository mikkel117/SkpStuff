import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";

export default function MyHeader() {
  const [userInput, setUserInput] = useState<string>("");
  const [data, setData] = useState<any[]>([]);

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

  async function Fetch() {
    let response = await fetch(
      `https://gogoanime2.p.rapidapi.com/search?keyw=${userInput}&page=1`,
      options
    );
    let data = await response.json();
    setData(data);
    console.log(data);
  }

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
                return <span key={post.animeId}>{post.animeTitle}</span>;
              })}
          </div>
        </form>
        <h1 className='title'>title</h1>
        <CgProfile size={35} className='profile' />
      </header>
    </>
  );
}
