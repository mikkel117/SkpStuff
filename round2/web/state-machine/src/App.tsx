import React, { useState, useMemo } from "react";
import logo from "./logo.svg";
import "./App.scss";
import useFetch from "./useFetch";
import useIsOpen from "./useIsOpen";

interface useIsOpenprops {
  isOpenTest: boolean;
}

function App() {
  //const [data]: any = useFetch("https://jsonplaceholder.typicode.com/todos");
  const [id, setId] = useState<number>(0);
  const { isOpenTest }: useIsOpenprops = useIsOpen(id);
  return (
    <>
      <div className='App'>
        <button
          onClick={() => {
            setId(id + 1);
          }}>
          open
        </button>
        <p>{isOpenTest ? "open" : "close"}</p>

        {/* {data &&
          data.map((item: any) => {
            return <p key={item.id}>{item.title}</p>;
          })} */}
      </div>
    </>
  );
}

export default App;

/* 
custom hook
useMemo
useReduser
*/
