import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface SearchPopUpProps {
  isSearchPopUpOpen: boolean;
  setIsSearchPopUpOpen: Dispatch<SetStateAction<boolean>>;
  setGenre: Dispatch<SetStateAction<string>>;
}

export default function SearchPopUp({
  setIsSearchPopUpOpen,
  isSearchPopUpOpen,
  setGenre,
}: SearchPopUpProps) {
  const [data, setData] = useState<any[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  useEffect(() => {
    if (isSearchPopUpOpen) {
      document.body.classList.add("notScrollable");
    }
    FetchData();
  }, [isSearchPopUpOpen]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const FetchData = () => {
    fetch(`https://gogo-anime-api-sand.vercel.app/api/anime-api/get-genres`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.genres);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  const RemoveBodyStyle = () => {
    document.body.classList.remove("notScrollable");
    setIsSearchPopUpOpen(false);
  };

  const RemoveBodyStyleWhenSwitchPage = (item: any) => {
    document.body.classList.remove("notScrollable");
    setIsSearchPopUpOpen(false);
    setGenre(item.value);
  };

  return (
    <>
      <div className='searchModal'>
        <div
          className='searchModalBgClose'
          onClick={() => {
            RemoveBodyStyle();
          }}></div>
        <div className='searchModalContent'>
          <input
            type='text'
            autoFocus
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <div className='filter'>
            {data
              .filter((post: any) => {
                if (userInput === "") {
                  return "";
                } else if (
                  post.genre
                    .toLowerCase()
                    .includes(userInput?.toLowerCase() as string)
                ) {
                  return post;
                }
              })
              .map((item: any) => {
                if (
                  item.genre !== "Hentai" &&
                  item.genre !== "Yaoi" &&
                  item.genre !== "Yuri" &&
                  item.genre !== "Erotica" &&
                  item.genre !== "Ecchi"
                ) {
                  /* return <p key={item.value}>{item.value}</p>; */
                  return (
                    <Link
                      to='/genre'
                      key={item.genre}
                      onClick={() => {
                        RemoveBodyStyleWhenSwitchPage(item);
                      }}>
                      {item.genre}
                    </Link>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
}
