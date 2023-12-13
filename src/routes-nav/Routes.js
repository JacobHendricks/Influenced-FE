import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import InfluencerDetail from "../influencers/InfluencerDetail";
import LoginForm from "../auth/LoginForm";
import Profile from "../profiles/Profile";
import RatingForm from "../ratings/RatingForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";
import InfluencerList from "../influencers/InfluencerList";
import CategoryList from "../categories/CategoryList";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup }) {
  console.debug(
      "Routes",
      `login=${typeof login}`,
      `register=${typeof register}`,
  );

  return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            <Homepage />
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>

          <Route exact path="/influencers">
            <InfluencerList />
          </Route>

          <Route exact path="/categories">
            <CategoryList />
          </Route>

          <PrivateRoute path="/influencers/ratings/:cid/new">
            <RatingForm />
          </PrivateRoute>

          <Route exact path="/influencers/ratings/:cid">
            <InfluencerDetail />
          </Route>

          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;
