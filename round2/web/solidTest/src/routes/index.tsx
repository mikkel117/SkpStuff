import { Title } from "solid-start";
import Counter from "~/components/Counter";
import Fetch from "~/components/fetch/Fetch";
export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      {/* <Counter /> */}
      <Fetch />
    </main>
  );
}
