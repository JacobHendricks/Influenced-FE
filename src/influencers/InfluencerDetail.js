import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import InfluencedAPI from "../api/api";
import RatingCardList from "../ratings/RatingCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext"
import RatingForm from "../ratings/RatingForm"


import "./InfluencerDetail.css";

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

  async function updateInfluencerScores() {
    let scores = await InfluencedAPI.updateInfluencerScores(id)
    console.debug("UPDATED SCORES", scores)
    setRatingScore(scores.score)
    setRatingCredibilityScore(scores.credibilityScore)
  }



  // if (!influencer) return <LoadingSpinner />;

  return (
      <div className="InfluencerDetail col-md-8 offset-md-2">
        <h4>{screenName}</h4>
        <img src={image} alt={name} className="float-right ml-5" />
        <p>{socialType}</p>
        <p><b>{name}</b></p>
        <p>{description}</p>
        <p>Followers: {formatNum(usersCount)}</p>
        <p>{url}</p>
        <div>Rating: {ratingScore ? ratingScore : "Be first to enter a rating"}</div>
        <div>Credibility: {ratingCredibilityScore ? ratingCredibilityScore: "Be first to enter a rating"}</div>
        <br></br>
        <RatingForm 
          key={id}
          userId={currentUser.id} 
          influencerId={id} 
          influencerCid={cid} 
          influencerData={{socialType, url, name, image, description, screenName, usersCount, score, credibilityScore}}
          getInfluencerId={getInfluencerId}
          updateInfluencerScores={updateInfluencerScores} 
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
