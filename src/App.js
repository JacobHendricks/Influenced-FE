import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import InfluencedAPI from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "influenced-token";

/** Influenced application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [seen, setSeen] = useState(false)

  console.debug(
      "App",
      "infoLoaded=", infoLoaded,
      "currentUser=", currentUser,
      "token=", token,
  );

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          InfluencedAPI.token = token;
          let currentUser = await InfluencedAPI.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
  async function signup(signupData) {
    try {
      let token = await InfluencedAPI.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await InfluencedAPI.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  // function togglePop() {
  //   setSeen(!seen);
  // };


  if (!infoLoaded) return <LoadingSpinner />;

  return (
      <BrowserRouter>
        <UserContext.Provider
            value={{ currentUser, setCurrentUser, categoriesList }}>
          <div className="App">
            <Navigation logout={logout} />
            <Routes login={login} signup={signup} />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
  );
}


const categoriesList = [
  ['', 'All'], 
  ['celebrity', 'Celebrity'], 
  ['actor', 'Actor'], 
  ['business', 'Business'], 
  ['influencer', 'Influencer'], 
  ['government', 'Government'], 
  ['other', 'Other'],
  ['personal', 'Personal'],
  ['public', 'Public'],
  ['accessories-and-jewellery', 'Accessories & Jewelry'],
  ['adult-content', 'Adult content'],
  ['alcohol-alcohol', 'Alcohol'],
  ['animals', 'Animals'],
  ['architecture-and-urban-design', 'Architecture & Urban Design'],
  ['art-artists', 'Art'],
  ['beauty', 'Beauty'],
  ['business-and-careers', 'Business & Careers'],
  ['cars-and-motorbikes', 'Cars & Motorcycles'],
  ['cinema-and-Actors-actresses', 'Cinema & Actors/actresses'],
  ['clothing-and-outfits', 'Clothing & Outfits'],
  ['comics-and-sketches', 'Comics & sketches'],
  ['computers-and-gadgets','Computers & Gadgets'],
  ['crypto', 'Crypto'],
  ['diy-and-design', 'DIY & Design'],
  ['education-education', 'Education'],
  ['extreme-sports-and-outdoor-activity', 'Extreme Sports & Outdoor activity'],
  ['family', 'Family'],
  ['fashion-fashion', 'Fashion'],
  ['finance-and-economics', 'Finance & Economics'],
  ['fitness-and-gym', 'Fitness & Gym'],
  ['food-and-cooking', 'Food & Cooking'],
  ['gaming','Gaming'],
  ['health-and-medicine', 'Health & Medicine'],
  ['humor-and-fun-and-happiness', 'Humor & Fun'],
  ['kids-and-toys','Kids & Toys'],
  ['lifestyle', 'Lifestyle'],
  ['literature-and-journalism','Literature & Journalism'],
  ['luxury','Luxury'],
  ['machinery-and-technologies','Machinery & Technologies'],
  ['management-and-marketing','Management & Marketing'],
  ['mobile-related','Mobile related'],
  ['modeling','Modeling'],
  ['music-music','Music'],
  ['nft','NFT'],
  ['nature-and-landscapes','Nature & landscapes'],
  ['photography','Photography'],
  ['politics-politics', 'Politics'],
  ['racing-sports','Racing'],
  ['science', 'Science'],
  ['shopping-and-retail','Shopping & Retail'],
  ['shows', 'Shows'],
  ['sports','Sports'],
  ['sports-with-a-ball','Sports'],
  ['sweets-and-bakery','Baking & Sweets'],
  ['tobacco-and-smoking','Tobacco & Smoking'],
  ['trainers-and-coaches','Trainers & Coaches'],
  ['travel-travel','Travel'],
  ['water-sports','Water sports'],
  ['winter-sports','Winter sports']
]




export default App;
