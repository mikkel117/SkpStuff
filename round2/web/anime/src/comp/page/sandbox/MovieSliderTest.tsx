import React, { useState, useEffect } from "react";

export default function MovieSliderTest() {
  const [userInput, setUserInput] = useState<string>("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (userInput.length > 2) {
      FetchData();
    }
  }, [userInput]);

  async function FetchData() {
    await fetch(
      `https://gogo-anime-api-sand.vercel.app/api/anime-api/search?keyw=${userInput}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.list);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  }

  return (
    <>
      <div></div>
    </>
  );
}
