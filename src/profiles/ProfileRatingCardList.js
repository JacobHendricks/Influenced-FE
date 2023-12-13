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
      <div className="ProfileRatingCardList col-xl-4 offset-xl-4">
        <h3>User Ratings</h3>
        {ratings.map(r => (
            <ProfileRatingCard
                key={r.id}
                influencerId={r.id}
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
