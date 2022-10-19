import React from "react";
import "./App.scss";
import { Link, Routes, Route } from "react-router-dom";
import MyHeader from "./comp/header/MyHeader";
import MovieSliderTest from "./comp/page/sandbox/MovieSliderTest";
import Home from "./comp/page/Home";

function App() {
  return (
    <>
      <MyHeader />
      {/* <Home /> */}
      {/* <GridTest /> */}
      {/* <MovieSliderTest /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/MovieSliderTest' element={<MovieSliderTest />} />
      </Routes>
    </>
  );
}

export default App;
