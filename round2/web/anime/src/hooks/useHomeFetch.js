import { useEffect, useState } from "react";

export default function useHomeFetch(url) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        setData(data.episodes);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  }, []);

  return data;
}
