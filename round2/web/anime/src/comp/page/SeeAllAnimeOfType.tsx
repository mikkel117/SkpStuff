import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { SeeAllAnimesType } from "../../model/Typs";
import { AnimeTypeContext } from "../../context/SeeAllAnimeContext";

export default function SeeAllAnimeOfType() {
  const { animeType, updateAnimeType } = useContext(
    AnimeTypeContext
  ) as SeeAllAnimesType;
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    switch (animeType) {
      case "PopularAnime":
        setUrl("test");
        break;
      case "TopAiring":
        setUrl("TopAiring");
        break;
      case "RecentEpisodes":
        setUrl("RecentEpisodes");
        break;
      default:
        setUrl("");
        break;
    }
  }, []);

  useEffect(() => {
    console.log(url);
  }, [url]);

  return (
    <>
      <div>{animeType}</div>
      <Link to='/'>go home</Link>
    </>
  );
}
