import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

export default function GridTest() {
  const [Fullarray, setFullArray] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  ]);
  const [array1, setArray1] = useState<number[]>([]);
  const [endChunk, setEndChunk] = useState<number>(5);
  const [startChunk, setStartChunk] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ChunkSize: number = 5;

  useEffect(() => {
    console.log(Math.round(Fullarray.length / ChunkSize));
    let test = 0;
    for (let index = 0; index < Fullarray.length; index = index + ChunkSize) {
      test = test + 1;
      console.log(test);
    }
    setPages(test);
  }, []);

  useEffect(() => {
    setArray1(Fullarray.slice(startChunk, endChunk));
  }, [endChunk]);

  const IncreaseChunkSize = () => {
    if (endChunk !== Fullarray.length) {
      setCurrentPage(currentPage + 1);
      setStartChunk(startChunk + ChunkSize);
      setEndChunk(endChunk + ChunkSize);
    }
  };

  const DecreaseChunkSize = () => {
    if (startChunk !== 0) {
      setCurrentPage(currentPage - 1);
      setStartChunk(startChunk - ChunkSize);
      setEndChunk(endChunk - ChunkSize);
    }
  };

  return (
    <>
      <section className='testBox'>
        <div>
          full array:
          {Fullarray.map((item: number) => {
            return <span key={item}>{item}</span>;
          })}
        </div>
        <div>
          array:
          {array1.map((item: number) => {
            return <span key={item}>{item}</span>;
          })}
        </div>
        <div>
          {currentPage}/ {pages}
        </div>
        <button
          onClick={() => {
            IncreaseChunkSize();
          }}>
          increase chunk size
        </button>
        <button
          onClick={() => {
            DecreaseChunkSize();
          }}>
          decrease chunk size
        </button>
      </section>
    </>
  );
}
