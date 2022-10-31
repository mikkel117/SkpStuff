import React, { useState, useEffect } from "react";

export default function MovieSliderTest() {
  const [userInput, setUserInput] = useState<string>("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (userInput.length > 2) {
      FetchData();
    }
  }, [userInput]);

  async function FetchData() {
    await fetch(
      `https://gogo-anime-api-sand.vercel.app/api/anime-api/search?keyw=${userInput}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.list);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  }

  return (
    <>
      <div className='dropdown'>
        <input
          type='text'
          className='dropInput'
          onChange={(e) => setUserInput(e.target.value)}
        />
        <div className='dropinputContent'>
          {data.length > 0 ? (
            <a>
              {data.map((item: any) => {
                return <a href={item.animeUrl}>{item.animeTitle}</a>;
              })}
            </a>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
