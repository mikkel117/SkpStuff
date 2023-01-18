import AnimeSlider from "../AnimeSlider";
import useHomeFetch from "../../hooks/useHomeFetch";

export default function Movies() {
  const data = useHomeFetch(
    `https://gogo-anime-api-sand.vercel.app/api/anime-api/movies?page=1`
  );
  return (
    <>
      <AnimeSlider data={data} />
    </>
  );
}
