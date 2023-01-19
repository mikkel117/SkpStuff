import "./App.scss";

import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import MyHeader from "./comp/header/MyHeader";
import Home from "./comp/page/Home";
import PageNotFound from "./comp/page/PageNotFound";
import Profile from "./comp/page/Profile";
import ProfileContent from "./comp/page/ProfileContent";
import SeeAllMovies from "./comp/page/SeeAllMovies";
import SeeAllPopular from "./comp/page/SeeAllPopular";
import SeeAllRecentEpisodes from "./comp/page/SeeAllRecentEpisodes";
import SeeAllSearch from "./comp/page/SeeAllSearch";
import SeeAllTopAiring from "./comp/page/SeeAllTopAiring";
import SeeGenre from "./comp/page/SeeGenre";

// imports all pages and some components
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
      {/* sets a path to the pages */}
      <Routes>
        <Route path='/' element={<Home setGenre={setGenre} />} />
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
