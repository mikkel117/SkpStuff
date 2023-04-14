import { NextPage } from "next";
import Link from "next/link";

interface Props {}

const FirstPost: NextPage<Props> = ({}) => {
  return (
    <>
      <h1>first post</h1>
      <Link href='/'>back to home</Link>
    </>
  );
};

export default FirstPost;
