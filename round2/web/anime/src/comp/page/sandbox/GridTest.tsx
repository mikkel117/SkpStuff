import React, { useState } from "react";

export default function GridTest() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {/* <div className='wrapper'>
        <div className={`animeSynopsisWrapper`}>
          <input type='checkbox' id='expand-toggle' />
          <p className={`animeSynopsis`}>
            Metus porttitor sagittis morbi accumsan letius nisi felis conubia
            fringilla platea urna nisl vitae hac volutpat convallis sed nullam
            enim efficitur pharetra mi vulputate consectetuer suscipit inceptos
            fermentum purus sem penatibus duis rhoncus dapibus fames elit dolor
            eget aenean sociosqu
          </p>
          <label
            htmlFor='expand-toggle'
            id='expand-btn'
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </div>
        <div className='test'>
          Lorem nec magna sapien himenaeos magnis dictum hendrerit per nunc
          euismod fermentum senectus vel dignissim habitasse facilisis molestie
          suscipit taciti volutpat ad feugiat vestibulum faucibus iaculis
          dapibus donec ligula consectetuer
        </div>
      </div> */}
      <div className='wrapper'>
        <div className='test'>
          Lorem nec magna sapien himenaeos magnis dictum hendrerit per nunc
          euismod fermentum senectus vel dignissim habitasse facilisis molestie
          suscipit taciti volutpat ad feugiat vestibulum faucibus iaculis
          dapibus donec ligula consectetuer
        </div>
        <div className={`box ${isOpen ? "open" : ""}`}>
          <p className='text'>
            Metus porttitor sagittis morbi accumsan letius nisi felis conubia
            fringilla platea urna nisl vitae hac volutpat convallis sed nullam
            enim efficitur pharetra mi vulputate consectetuer suscipit inceptos
            fermentum purus sem penatibus duis rhoncus dapibus fames elit dolor
            eget aenean sociosqu
          </p>
        </div>
        <button
          className='showMore'
          onClick={() => {
            setIsOpen(!isOpen);
          }}>
          {isOpen ? "Show less" : "Show more"}
        </button>
      </div>
    </>
  );
}
