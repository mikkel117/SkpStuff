import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <div className='pageNotFoundWrapper'>
        <h2>Page Not Found</h2>
        <p>
          go back <Link to='/'>home</Link>
        </p>
      </div>
    </>
  );
}
