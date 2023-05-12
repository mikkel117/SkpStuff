import AnimeCard from "./AnimeCard";

async function Fetch(url: string) {
  const res = await fetch(url);
  return res.json();
}

interface AnimeSliderProps {
  title: string;
  url: string;
}

export default async ({ title, url }: AnimeSliderProps) => {
  const data = await Fetch(url);

  return (
    <>
      <h3>{title}</h3>
      <AnimeCard data={data} />
    </>
  );
};
