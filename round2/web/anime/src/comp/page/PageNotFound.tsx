import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <div>PageNotFound</div>
      <p>
        go back <Link to='/'>home</Link>
      </p>
    </>
  );
}
