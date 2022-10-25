import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDoubleLeft } from "react-icons/ai";

import { SeeAllAnimesType } from "../../model/Typs";
import { AnimeTypeContext } from "../../context/SeeAllAnimeContext";

export default function SeeAllAnimeOfType() {
  const { animeType, updateAnimeType } = useContext(
    AnimeTypeContext
  ) as SeeAllAnimesType;
  /* const [data, setData] = useState<any[]>([]); */
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [animeTypeSubDub, setAnimeTypeSubDub] = useState<number>(1);

  useEffect(() => {
    switch (animeType) {
      case "PopularAnime":
        FetchPopular(page);
        break;
      case "TopAiring":
        FetchTopAiring(page);
        break;
      case "RecentEpisodes":
        FetchRecentEpisodes(animeTypeSubDub, page);
        break;
      default:
        break;
    }
  }, []);

  const updatePageNUmber = (pageNumber: number) => {
    switch (animeType) {
      case "PopularAnime":
        FetchPopular(pageNumber);
        break;
      case "TopAiring":
        FetchTopAiring(pageNumber);
        break;
      case "RecentEpisodes":
        FetchRecentEpisodes(animeTypeSubDub, pageNumber);
        break;
      default:
        break;
    }
    setPage(pageNumber);
  };

  const UpdateSubDub = (SubDub: number) => {
    setAnimeTypeSubDub(SubDub);
    FetchRecentEpisodes(SubDub, page);
  };

  const FetchPopular = (pageNumber: number) => {
    fetch(`https://rumbo-anime-api.herokuapp.com/popular?page=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data[0].episodes);
        setPages(data[0].pages);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  const FetchTopAiring = (pageNumber: number) => {
    fetch(`https://rumbo-anime-api.herokuapp.com/top-airing?page=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data[0].episodes);
        setPages(data[0].pages);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  const FetchRecentEpisodes = (SubDub: number, pageNumber: number): void => {
    fetch(
      `https://rumbo-anime-api.herokuapp.com/recent-release?type=${SubDub}&page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data[0].episodes);
        setPages(data[0].pages);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  return (
    <>
      <div className='SeeAllAnimeWrapper'>
        {animeType === "RecentEpisodes" ? (
          <div className='animeSubDub'>
            <span
              className={`${animeTypeSubDub === 1 ? "animeSubDubActive" : ""}`}
              onClick={() => {
                UpdateSubDub(1);
              }}>
              sub
            </span>
            <span
              className={`${animeTypeSubDub === 2 ? "animeSubDubActive" : ""}`}
              onClick={() => {
                UpdateSubDub(2);
              }}>
              dub
            </span>
          </div>
        ) : (
          <></>
        )}
        <div className='animeImgWrapper'>
          {episodes.map((item: any) => {
            return (
              <div className='animeCard' key={item.animeId}>
                <img src={item.animeImg} alt='' />
                <span>{item.animeTitle}</span>
              </div>
            );
          })}
        </div>
        <div className='animePages'>
          <span>
            <AiOutlineDoubleLeft
              onClick={() => {
                updatePageNUmber(1);
              }}
            />
          </span>
          {pages.map((item: any) => {
            return (
              <span
                key={item.page}
                onClick={() => {
                  updatePageNUmber(parseInt(item.page));
                }}
                className={`${page === parseInt(item.page) ? "onPage" : ""}`}>
                {item.page}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}
