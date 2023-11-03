import React from "react";
import RatingCard from "./RatingCard";

/** Show list of rating cards.
 *
 * Used by InfluencerDetail to list ratings. 
 *
 * RatingCardList -> RatingCard
 *
 */

function RatingCardList({ ratings }) {
  console.debug("RatingCardList", "ratings=", ratings);

  return (
      <div className="RatingCardList">
        {ratings.map(r => (
            <RatingCard
                key={r.reviewerName}
                score={r.score}
                reviewerName={r.reviewerName}
                credibilityScore={r.credibilityScore}
                review={r.review}
            />
        ))}
      </div>
  );
}

export default RatingCardList;
