import React, { useState } from "react";

export default function MovieSliderTest() {
  const [userInput, setUserInput] = useState<string>();
  const colors: string[] = [
    "red",
    "green",
    "blue",
    "orange",
    "black",
    "yellow",
    "white",
  ];

  return (
    <>
      <div className='dropdown'>
        <input
          type='text'
          className='dropInput'
          onChange={(e) => setUserInput(e.target.value)}
        />
        <div className='dropinputContent'>
          {colors
            .filter((post: any) => {
              if (userInput === "") {
                return "";
              } else if (
                post.includes(userInput?.toLocaleLowerCase() as string)
              ) {
                return post;
              }
            })
            .map((post: any) => {
              return (
                <a href='#' key={post}>
                  {post}
                </a>
              );
            })}
        </div>
      </div>
    </>
  );
}
