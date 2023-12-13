import React, { useContext } from "react";
import "./ProfileRatingCard.css";
import UserContext from "../auth/UserContext";
import InfluencedApi from "../api/api";

/** Show limited information about a rating.
 *
 * Is rendered by RatingCardList to show a "card" for each rating.
 *
 *
 * RatingCardList -> RatingCard
 */

function RatingCard({ influencerId, name, score, credibilityScore, review }) {
  // console.debug("RatingCard", score, name);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.debug("Deleting Rating:", currentUser.id, influencerId);
    await InfluencedApi.deleteRating(currentUser.id, influencerId);
    let refreshCurrentUser = await InfluencedApi.getCurrentUser(currentUser.username);
    setCurrentUser(refreshCurrentUser);
  }

  return (
      <div className="ProfileRatingCard card">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <div className="reviewer-card-title">{name}</div>
              <div className="row ratings-row">
                <div className="col-3">Rating: {score} <span className="star">&#9733;</span></div>
                {credibilityScore && <div className="col">Credibility: {credibilityScore} <span className="star">&#9733;</span></div>}
              </div>
            </div>
            <div className="col-1">
              <button type="delete" className="btn btn-danger btn-sm float-right" onClick={handleSubmit}>Delete</button>
            </div>
          </div>
          <div className="row">
            <div className="col">{review}</div>
          </div>
        </div>
      </div>
  );
}


export default RatingCard;
