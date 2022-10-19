import React, { useState } from "react";

export default function GridTest() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div className='wrapper'>
        <div style={{ backgroundColor: "black" }}></div>
        <div
          style={{ backgroundColor: "red" }}
          className={`${isOpen ? "test2" : "test"}`}></div>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}>
          click me
        </button>
      </div>
    </>
  );
}
