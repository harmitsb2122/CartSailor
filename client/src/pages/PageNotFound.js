import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout";

const PageNotFound = () => {
  return (
    <Layout>
      <div className="container text-center mt-5">
        <h1>404</h1>
        <br />
        <h2>Page Not Found</h2>
        <br />
        <Link to="/" className="btn btn-dark">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
