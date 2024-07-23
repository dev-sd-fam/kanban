import React from "react";
import { BiArrowFromLeft, BiHome } from "react-icons/bi";
import { Link, useNavigate, useRouteError } from "react-router-dom";

// library

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="error">
      <h1>Uh oh! we've got a problem.</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <BiArrowFromLeft width={20} />
          <span>Go Back</span>
        </button>
        <Link to="/" className="btn btn--dark">
          <BiHome width={20} />
          <span>Go home</span>
        </Link>
      </div>
    </div>
  );
};

export default Error;
