import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import InfluencedAPI from "../api/api";
import RatingCardList from "../ratings/RatingCardList";
// import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext"
import RatingForm from "../ratings/RatingForm"
import "./InfluencerDetail.css";
import imgReview from "../images/influencerReview.jpg";

 /** Influencer Detail page.
 *
 * Renders information about influencer, along with the jobs at that influencer.
 *
 * Routed at /influencers/:id
 *
 * Routes -> InfluencerDetail -> RatingCardList
 */

function InfluencerDetail() {
  const { currentUser } = useContext(UserContext);
  const location = useLocation()
  const { cid } = useParams();
  console.debug("InfluencerDetail2", "cid=", cid);
  
  const { socialType, url, name, image, description, screenName, usersCount, score, credibilityScore} = location.state
  console.debug("STATE", location.state)

  const [ratings, setRatings] = useState(null);
  const [id, setId] = useState(null)
  const [ratingScore, setRatingScore] = useState(score)
  const [ratingCredibilityScore, setRatingCredibilityScore] = useState(credibilityScore)

  useEffect(function getInfluencerRatings() {
    getInfluencerId();

  }, []);

  async function getInfluencerId() {
    let id = await InfluencedAPI.getInfluencerId(cid);
    console.debug("Get Influencer ID", id)
    setId(id)

    if (id) {
      let ratingsResponse = await InfluencedAPI.getInfluencerRatings(id);
      console.debug("GET RATINGS RESPONSE", ratingsResponse)
      setRatings(ratingsResponse);

    }

  }

  async function updateInfluencerScores(id) {
    console.log("FINAL ID", id)
    let scores = await InfluencedAPI.updateInfluencerScores(id)
    console.debug("UPDATED SCORES", scores)
    setRatingScore(scores.score)
    setRatingCredibilityScore(scores.credibilityScore)
  }



  // if (!influencer) return <LoadingSpinner />;

  return (
      <div className="InfluencerDetail col-xl-6 offset-xl-3">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <img className="img-description" id="img-review" src={imgReview} alt="influencer review" />
            </div>
            <div className="col title d-flex align-items-center">Rate and Review Influencers</div>
          </div>
          <div className="row mt-2">
            <div className="col description d-flex align-items-center">
              <div>
                <p>Ratings and reviews should be based on what users like and/or dislike about an individual influencer or channel and allow for a credibility score to be entered so other potential viewers and/or collaborators know who they can trust when reviewing their content.</p>
                <div><em>Ratings/Reviews can be deleted, however Influenced users are limited to write one review/rating per Influencer</em></div>
              </div>
            </div>
          </div>
          <hr></hr>
        </div>
        <br></br>
        <br></br>

        <div className="d-flex justify-content-start">
          <div className="d-flex flex-row">
            <div>
              <img src={image} alt={name} className="img-infl" />
            </div>
            <div className="pl-4">
              <h4 className="card-title">@{screenName}</h4>
              {/* <span className="socialType">({socialType})</span> */}
              <p><b>{name}</b></p>
              <p>Followers: {formatNum(usersCount)}</p>
              <p>{description}</p>
              <p>{url}</p>
            </div>
          </div>
        </div>

        <div className="ratings row mt-2">
            <div className="scoreR col-3"> 
               {/* Rating: {score ? (`${score} / 5`(<span className="star">&#9733;</span>)) : "No ratings"}  */}
               {ratingScore? <span id="ratings-span">Rating: </span> : null}
               {ratingScore ? `${ratingScore} / 5 ` : "No ratings"} 
               {ratingScore ? <span className="star">&#9733;</span> : null}
            </div>
            <div className="credibilityR col align-self-center">
              {ratingCredibilityScore ? <span id="ratings-span">Credibility: </span> : null}
              {ratingCredibilityScore ? `${ratingCredibilityScore} / 5 ` : "Be first to enter a rating"} 
              {ratingCredibilityScore ? <span className="star">&#9733;</span> : null}
            </div>
        </div>
        {/* <div>Rating: {ratingScore ? ratingScore : "Be first to enter a rating"}</div>
        <div>Credibility: {ratingCredibilityScore ? ratingCredibilityScore: "Be first to enter a rating"}</div> */}
        <br></br>
        <RatingForm 
          key={id}
          userId={currentUser.id} 
          influencerId={id} 
          influencerCid={cid} 
          influencerData={{socialType, url, name, image, description, screenName, usersCount, score, credibilityScore}}
          getInfluencerId={getInfluencerId}
          updateInfluencerScores={(id) => {
            console.log("About to call update score", id)
            updateInfluencerScores(id)
          }} 
        />

        <br></br>
        {/* <Link to={`/influencers/ratings/${id}/new`}> Enter Rating Here </Link> */}
        {ratings
            ? <RatingCardList ratings={ratings.ratings} />
            : <h5>No Ratings</h5>}
      </div>
  );
}


/** Render integer usersCount like '1,250,343' */

function formatNum(num) {
  const digitsRev = [];
  const numStr = num.toString();
  let revIdx = 1

  for (let i = numStr.length - 1; i >= 0; i--) {
    digitsRev.push(numStr[i]);
    // if (i > 0 && i % 3 === 0) digitsRev.push(",");
    if (i > 0 && revIdx % 3 === 0) digitsRev.push(",");
    revIdx ++;
  }

  return digitsRev.reverse().join("");
}

export default InfluencerDetail;
