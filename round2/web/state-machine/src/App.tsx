import React, { useState, useMemo } from "react";
import logo from "./logo.svg";
import "./App.scss";
import useFetch from "./useFetch";
import useModal from "./useModal";
import Modal from "./Modal";

interface useIsOpenprops {
  isOpenTest: boolean;
}

function App() {
  //const [data]: any = useFetch("https://jsonplaceholder.typicode.com/todos");
  const modal = useModal();
  return (
    <>
      <div className='App'>
        {/* {data &&
          data.map((item: any) => {
            return <p key={item.id}>{item.title}</p>;
          })} */}
        <button onClick={modal.openModal}>open modal</button>
        {modal.isOpen && <Modal modalClose={modal.closeModal} />}
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
