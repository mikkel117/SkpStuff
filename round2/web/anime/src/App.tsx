import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import MovieSliderTest from "./comp/page/sandbox/MovieSliderTest";
import GridTest from "./comp/page/sandbox/GridTest";

import MyHeader from "./comp/header/MyHeader";
import PageNotFound from "./comp/page/PageNotFound";
import Home from "./comp/page/Home";
import SeeAllRecentEpisodes from "./comp/page/SeeAllRecentEpisodes";
import SeeAllPopular from "./comp/page/SeeAllPopular";
import SeeAllTopAiring from "./comp/page/SeeAllTopAiring";

import AnimeTypeProvider from "./context/SeeAllAnimeContext";

function App() {
  return (
    <>
      <AnimeTypeProvider>
        <MyHeader />
        {/* <Home /> */}
        {/* <GridTest /> */}
        {/* <UseContextTest /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/MovieSliderTest' element={<MovieSliderTest />} />
          <Route path='/Test' element={<GridTest />} />
          <Route path='/RecentEpisodes' element={<SeeAllRecentEpisodes />} />
          <Route path='/TopAiring' element={<SeeAllTopAiring />} />
          <Route path='/Popular' element={<SeeAllPopular />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </AnimeTypeProvider>
    </>
  );
}

export default App;
