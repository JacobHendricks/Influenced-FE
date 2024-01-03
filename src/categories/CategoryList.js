import React, { useContext } from "react";
import CategoryCard from "./CategoryCard";
// import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext"
import imgCat from "../images/influencerCategories.jpg";
import imgFollowers from "../images/influencerFollowers.jpg";
import imgReview from "../images/influencerReview.jpg";
import "./CategoryList.css";


/** Show page with list of categories.
 *
 * On mount, loads categories from API.
 * Re-loads filtered categories on submit from search form.
 *
 * This is routed to at /categories
 *
 * Routes -> CategoryList
 */

function CategoryList() {
  const { categoriesList } = useContext(UserContext);
  // console.debug("CategoryList", categoriesList);

  return (
      <div className="CategoryList col-xl-4 offset-xl-4">
        <div className="container">

          <div className="row">
            <div className="col-3">
              <img className="img-desc" id="img-cat" src={imgCat} alt="influencer categories" />
            </div>
            <div className="col title d-flex align-items-center">Category</div>
          </div>
          <div className="row mt-2">
            <div className="col desc d-flex align-items-center">Search potential Influencers to follow or collaborate with by category of interest</div>
          </div>
          <hr></hr>

          <div className="row">
            <div className="col-3">
              <img className="img-desc" id="img-followers" src={imgFollowers} alt="influencer followers" />
            </div>
            <div className="col title d-flex align-items-center">Filter by Name and/or Number of Followers</div>
          </div>
          <div className="row mt-2">
            <div className="col desc d-flex align-items-center">Search potential Influencers to follow or collaborate with by their influencer or channel name or solely by the number of followers they currently have</div>
          </div>
          <hr></hr>

          <div className="row">
            <div className="col-3">
              <img className="img-desc" id="img-review" src={imgReview} alt="influencer review" />
            </div>
            <div className="col title d-flex align-items-center">Rate and Review Influencers</div>
          </div>
          <div className="row mt-2">
            <div className="col desc d-flex align-items-center">
              <div>
                <p>Ratings and reviews should be based on what users like and/or dislike about an individual influencer or channel and allow for a credibility score to be entered so other potential viewers and/or collaborators know who they can trust when reviewing their content.</p>
                <div><em>Ratings/Reviews can be deleted, however Influenced users are limited to write one review/rating per Influencer</em></div>
              </div>
            </div>
          </div>
          <hr></hr>

        </div>

        <div>
          {categoriesList.map(c => (
              <CategoryCard
                  key={c[0]}
                  category={c[0]}
                  name={c[1]}
              />
          ))}
        </div>
      </div>
  );
}

export default CategoryList;
