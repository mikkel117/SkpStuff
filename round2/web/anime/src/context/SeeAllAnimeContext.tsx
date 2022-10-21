import React, { createContext, useState } from "react";
import { SeeAllAnimesType } from "../model/Typs";

interface Props {
  children: React.ReactNode;
}

export const AnimeTypeContext = createContext<SeeAllAnimesType | null>(null);

export const AnimeTypeProvider: React.FC<Props> = ({ children }) => {
  const [animeType, setAnimeType] = useState("");

  const updateAnimeType = (input: string) => {
    setAnimeType(input);
  };

  return (
    <AnimeTypeContext.Provider value={{ animeType, updateAnimeType }}>
      {children}
    </AnimeTypeContext.Provider>
  );
};

export default AnimeTypeProvider;
