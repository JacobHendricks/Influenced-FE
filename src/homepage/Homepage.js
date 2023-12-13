import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  return (
      <div className="Homepage">
        <div className="container text-center">
          <h1 className="mb-4 font-weight-bold">Influenced</h1>
          <p className="lead">All the influencers in one convenient place.</p>
          <div>Browse influencers by Category</div>
          <div>Search by Name and filter by number of followers</div>
          <div>Rate your favorite (and least favorite) influencers! </div>
          <br></br>
          <br></br>
          {currentUser
              ? <h5>
                Welcome Back, {currentUser.firstName || currentUser.username}!
              </h5>
              : (
                  <p>
                    <Link className="btn btn-primary font-weight-bold mr-3"
                          to="/login">
                      Log in
                    </Link>
                    <Link className="btn btn-primary font-weight-bold"
                          to="/signup">
                      Sign up
                    </Link>
                  </p>
              )}
        </div>
      </div>
  );
}

export default Homepage;
