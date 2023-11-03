import React from "react";
import ProfileRatingCard from "./ProfileRatingCard"

/** Show list of rating cards.
 *
 * Used by InfluencerDetail to list ratings. 
 *
 * RatingCardList -> RatingCard
 *
 */

function ProfileRatingCardList({ ratings }) {
  console.debug("ProfileRatingCardList", "ratings=", ratings);

  return (
      <div className="ProfileRatingCardList">
        {ratings.map(r => (
            <ProfileRatingCard
                key={r.id}
                id={r.id}
                score={r.score}
                name={r.name}
                credibilityScore={r.credibilityScore}
                review={r.review}
            />
        ))}
      </div>
  );
}

export default ProfileRatingCardList;
