import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [test, setTest] = useState(true);
  return (
    <div className='test'>
      <h2 className='head'>test</h2>
      <button
        onClick={() => {
          setTest(!test);
        }}>
        click me
      </button>
      {test && (
        <>
          <p>test</p>
        </>
      )}
    </div>
  );
}
