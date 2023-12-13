import React from "react";
import "./RatingCard.css";
// import UserContext from "../auth/UserContext";

/** Show limited information about a rating.
 *
 * Is rendered by RatingCardList to show a "card" for each rating.
 *
 *
 * RatingCardList -> RatingCard
 */

function RatingCard({ reviewerName, score, credibilityScore, review }) {
  console.debug("RatingCard", score, reviewerName);

  return (
      <div className="RatingCard card">
        <div className="card-body">
          <div className="rating-card-title">{reviewerName}</div>
          <div className="row ratings-row">
            <div className="col-3">Rating: {score} <span className="star">&#9733;</span></div>
            {credibilityScore && <div className="col">Credibility: {credibilityScore} <span className="star">&#9733;</span></div>}
          </div>
          <div>{review}</div>
        </div>
      </div>
  );
}


export default RatingCard;
