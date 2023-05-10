import styles from "./page.module.scss";

async function Fetch() {
  const res = await fetch(`https://swapi.dev/api/people/1/`);
  return res.json();
}

export default async function Home() {
  const getData = Fetch();
  const [data] = await Promise.all([getData]);
  /* console.log(data); */
  return (
    <>
      <div>{data.name}</div>
    </>
  );
}
