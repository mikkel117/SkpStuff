import React, { useState, useEffect } from "react";

const useIsOpen = (id) => {
  const [isOpenTest, setIsOpenTest] = useState(false);

  useEffect(() => {
    console.log(id);

    if (id != 0) {
      setIsOpenTest(!isOpenTest);
    }
  }, [id]);

  return { isOpenTest };
};

export default useIsOpen;
