import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";
import imgInfl from "../images/influencers.jpg";
import imgCat from "../images/influencerCategories.jpg";
import imgFollowers from "../images/influencerFollowers.jpg";
import imgReview from "../images/influencerReview.jpg";

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
          {currentUser
                ? <h5>
                  Welcome {currentUser.firstName || currentUser.username}!
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
          <div>
            Influenced provides an ultimate source for content creators and users to rate and review other influencers amongst the most popular platforms
          </div>
          {/* <h1 className="mb-4 font-weight-bold">Influenced</h1> */}
          <img id="img-influencers" src={imgInfl} alt="influencers" />
          {/* <p className="lead">All the influencers in one convenient place.</p> */}
          <div>
            Ratings and reviews are based on what users like and/or dislike about an individual influencer or channel and allow for a credibility score to be entered so other potential viewers and/or collaborators know who they can trust when reviewing their content
          </div>

          <hr></hr>
        </div>

        <div className="container text-center">
          <div className="row">
            <div className="col text">Browse by Category</div>
            <div className="col text">Browse by Name/# of Followers</div>
            <div className="col text">Rate/Review Influencers</div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <img className="img-sect" id="img-cat" src={imgCat} alt="influencer categories" />
            </div>
            <div className="col">
              <img className="img-sect" id="img-followers" src={imgFollowers} alt="influencer followers" />
            </div>
            <div className="col">
              <img className="img-sect" id="img-review" src={imgReview} alt="influencer review" />
            </div>
          </div>         
        </div> 
        
      </div>

  );
}

export default Homepage;
