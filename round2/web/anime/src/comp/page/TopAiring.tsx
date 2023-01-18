import useHomeFetch from "../../hooks/useHomeFetch";
import AnimeSlider from "../AnimeSlider";

export default function TopAiring() {
  const data = useHomeFetch(
    `https://gogo-anime-api-sand.vercel.app/api/anime-api/top-airing`
  );
  return (
    <>
      <AnimeSlider data={data} />
    </>
  );
}
