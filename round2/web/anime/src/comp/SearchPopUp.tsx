import React, { useEffect, Dispatch, SetStateAction } from "react";

interface SearchPopUpProps {
  isSearchPopUpOpen: boolean;
  setIsSearchPopUpOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SearchPopUp({
  setIsSearchPopUpOpen,
  isSearchPopUpOpen,
}: SearchPopUpProps) {
  useEffect(() => {
    if (isSearchPopUpOpen) {
      document.body.classList.add("notScrollable");
    }
  }, [isSearchPopUpOpen]);
  const RemoveBodyStyle = () => {
    document.body.classList.remove("notScrollable");
    setIsSearchPopUpOpen(false);
  };

  return (
    <>
      <div className='searchModal'>
        <div
          className='searchModalBgClose'
          onClick={() => {
            RemoveBodyStyle();
          }}></div>
        <div className='searchModalContent'>
          <input type='text' />
        </div>
      </div>
    </>
  );
}
