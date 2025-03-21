import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

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
        setData(data.genres);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  return (
    <>
      <div className='genres'>
        {data.map((item: any) => {
          if (
            item.genre !== "Hentai" &&
            item.genre !== "Yaoi" &&
            item.genre !== "Yuri" &&
            item.genre !== "Erotica"
          ) {
            return (
              <Link
                to='/genre'
                key={item.genre}
                onClick={() => {
                  setGenre(item.value);
                }}>
                {item.genre}
              </Link>
            );
          }
        })}
      </div>
    </>
  );
}
