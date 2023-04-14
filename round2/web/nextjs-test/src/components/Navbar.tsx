import { NextPage } from "next";
import Link from "next/link";

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  return (
    <div>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/posts/first-post'>Content</Link>
        </li>
        <li>
          <Link href='/About'>About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
