import React, { useState, useEffect } from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import Profile from "./comp/page/Profile";
import ProfileContent from "./comp/page/ProfileContent";

function App() {
  const [userInput, setUserInput] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [formValue, setFormValue] = useState<string>("");

  return (
    <>
      <MyHeader
        userInput={userInput}
        setUserInput={setUserInput}
        formValue={formValue}
        setFormValue={setFormValue}
      />
      <Routes>
        <Route path='/' element={<Home setGenre={setGenre} />} />
        <Route path='/movie-slider-test' element={<MovieSliderTest />} />
        <Route path='/new-slider' element={<NewSlider />} />
        <Route path='/test' element={<GridTest />} />
        <Route path='/recent-episodes' element={<SeeAllRecentEpisodes />} />
        <Route path='/top-airing' element={<SeeAllTopAiring />} />
        <Route path='/popular' element={<SeeAllPopular />} />
        <Route
          path='/see-all-search'
          element={
            <SeeAllSearch userInput={userInput} setUserInput={setUserInput} />
          }
        />
        <Route path='/movies' element={<SeeAllMovies />} />
        <Route
          path='/genre'
          element={<SeeGenre genre={genre} setGenre={setGenre} />}
        />
        <Route
          path='/login'
          element={
            <Profile formValue={formValue} setFormValue={setFormValue} />
          }
        />
        <Route path='/profile' element={<ProfileContent />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
