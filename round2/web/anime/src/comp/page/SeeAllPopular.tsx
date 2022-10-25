import React, { useState, useEffect } from "react";

export default function SeeAllPopular() {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  return <div>SeeAllPopular</div>;
}
