import React, { useState } from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import MovieSliderTest from "./comp/page/sandbox/MovieSliderTest";
import GridTest from "./comp/page/sandbox/GridTest";
import NewSlider from "./comp/page/sandbox/NewSlider";

import MyHeader from "./comp/header/MyHeader";
import PageNotFound from "./comp/page/PageNotFound";
import Home from "./comp/page/Home";
import SeeAllRecentEpisodes from "./comp/page/SeeAllRecentEpisodes";
import SeeAllPopular from "./comp/page/SeeAllPopular";
import SeeAllTopAiring from "./comp/page/SeeAllTopAiring";
import SeeAllSearch from "./comp/page/SeeAllSearch";
import SeeAllMovies from "./comp/page/SeeAllMovies";
import SeeGenre from "./comp/page/SeeGenre";

import AnimeTypeProvider from "./context/SeeAllAnimeContext";

function App() {
  const [userInput, setUserInput] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  return (
    <>
      <AnimeTypeProvider>
        <MyHeader userInput={userInput} setUserInput={setUserInput} />
        {/* <Home /> */}
        {/* <GridTest /> */}
        {/* <UseContextTest /> */}
        <Routes>
          <Route path='/' element={<Home setGenre={setGenre} />} />
          <Route path='/MovieSliderTest' element={<MovieSliderTest />} />
          <Route path='/new-slider' element={<NewSlider />} />
          <Route path='/Test' element={<GridTest />} />
          <Route path='/RecentEpisodes' element={<SeeAllRecentEpisodes />} />
          <Route path='/TopAiring' element={<SeeAllTopAiring />} />
          <Route path='/Popular' element={<SeeAllPopular />} />
          <Route
            path='/see-all-search'
            element={
              <SeeAllSearch userInput={userInput} setUserInput={setUserInput} />
            }
          />
          <Route path='/Movies' element={<SeeAllMovies />} />
          <Route
            path='/Genre'
            element={<SeeGenre genre={genre} setGenre={setGenre} />}
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </AnimeTypeProvider>
    </>
  );
}

export default App;
