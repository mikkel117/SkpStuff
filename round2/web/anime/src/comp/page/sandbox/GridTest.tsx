import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

export default function GridTest() {
  const input = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [userInput, setUserInput] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    if (input.current) {
      /* console.log(document.activeElement === input.current); */
    }

    if (userInput.length > 1) {
      const timer = setTimeout(() => {
        FetchData();
      }, 200);
      return () => clearTimeout(timer);
    } else if (userInput.length === 0) {
      setData([]);
    }
  }, [userInput]);

  /* useEffect(() => {
    
  }, [focused]); */

  const focus = () => {
    if (!focused) {
      setFocused(true);
    }
  };

  const blur = () => {
    const timer = setTimeout(() => {
      if (focused) setFocused(false);
    }, 100);
    return () => clearTimeout(timer);
  };

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

  return (
    <>
      <div className='box'>
        <input
          ref={input}
          type='text'
          placeholder='search anime'
          id='inputTest'
          onChange={(e) => setUserInput(e.target.value)}
          onFocus={focus}
          onBlur={blur}
        />
        {focused && (
          <div className='test'>
            {data.map((item: any) => {
              return (
                <span
                  key={item.animeId}
                  onClick={() => {
                    console.log(item.animeTitle);
                  }}>
                  {item.animeTitle}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
