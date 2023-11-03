import React from "react";
import "./ProfileRatingCard.css";
// import UserContext from "../auth/UserContext";

/** Show limited information about a rating.
 *
 * Is rendered by RatingCardList to show a "card" for each rating.
 *
 *
 * RatingCardList -> RatingCard
 */

function RatingCard({ id, name, score, credibilityScore, review }) {
  // console.debug("RatingCard", score, name);

  return (
      <div className="ProfileRatingCard card">
        <div className="card-body">
          <h6 className="card-title">{name}</h6>
          <div><small>Rating: {score}</small></div>
          {credibilityScore && <div><small>Credibility: {credibilityScore}</small></div>}
          <p>{review}</p>
        </div>
      </div>
  );
}


export default RatingCard;
