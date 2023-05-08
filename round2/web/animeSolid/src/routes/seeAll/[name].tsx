import { useParams } from "solid-start";

export default function Index() {
  const params = useParams();
  return (
    <>
      <div>{params.name}</div>
    </>
  );
}
