import React, { useContext } from "react";
// import LoadingSpinner from "../common/LoadingSpinner";
import ProfileForm from "./ProfileForm";
import ProfileRatingCardList from "./ProfileRatingCardList";
import UserContext from "../auth/UserContext";

/** Show page with list of influencers.
 *
 * On mount, loads influencers from API.
 * Re-loads filtered influencers on submit from search form.
 *
 * This is routed to at /influencers
 *
 * Routes -> { InfluencerCard, SearchForm }
 */

function Profile() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Profile">
      <h3>User Ratings</h3>
      <ProfileRatingCardList ratings={currentUser.ratings}/>

      <ProfileForm />
    </div>
  )

}

export default Profile;