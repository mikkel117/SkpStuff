import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { isTemplateExpression } from "typescript";

interface Genresprops {
  setGenre: Dispatch<SetStateAction<string>>;
}

export default function Genres({ setGenre }: Genresprops) {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = () => {
    fetch(`https://gogo-anime-api-sand.vercel.app/api/anime-api/get-genres`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.Genres);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  return (
    <>
      <div className='genres'>
        {data.map((item: string) => {
          if (item != "hentai" && item != "yaoi" && item != "yuri") {
            return (
              <Link
                to='/Genre'
                key={item}
                onClick={() => {
                  setGenre(item);
                }}>
                {item}
              </Link>
            );
          }
        })}
      </div>
    </>
  );
}
