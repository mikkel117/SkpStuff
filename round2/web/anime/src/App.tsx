import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import MyHeader from "./comp/header/MyHeader";
import MovieSliderTest from "./comp/page/sandbox/MovieSliderTest";
import PageNotFound from "./comp/page/PageNotFound";
import Home from "./comp/page/Home";
import SeeAllAnimeOfType from "./comp/page/SeeAllAnimeOfType";

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
          <Route path='/seeAllAnimeOfType' element={<SeeAllAnimeOfType />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </AnimeTypeProvider>
    </>
  );
}

export default App;
