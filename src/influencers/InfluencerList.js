import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import SearchForm from "../common/SearchForm";
import InfluencedAPI from "../api/api";
import InfluencerCard from "./InfluencerCard";
import LoadingSpinner from "../common/LoadingSpinner";
import "./InfluencerList.css";
import imgFollowers from "../images/influencerFollowers.jpg";
import imgReview from "../images/influencerReview.jpg";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";

/** Show page with list of influencers.
 *
 * On mount, loads influencers from API.
 * Re-loads filtered influencers on submit from search form.
 *
 * This is routed to at /influencers
 *
 * Routes -> { InfluencerCard, SearchForm }
 */

function InfluencerList() {
  // console.debug("InfluencerList");
  const location = useLocation()
  const [influencers, setInfluencers] = useState(null);
  let categoryObj = {};
  const searchParams = location.search.substring(1);
    if (searchParams) { 
      categoryObj = JSON.parse('{"' + searchParams.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    }

  const [searchKey, setSearchKey] = useState(categoryObj);

  useEffect(function getInfluencersOnMount() {
    console.debug("InfluencerList useEffect getInfluencersOnMount", categoryObj);
    search(searchKey);
  }, [searchKey]);

  /** Triggered by search form submit; reloads influencers. */
  async function search(params) {
    setInfluencers(null);
    let influencers = await InfluencedAPI.searchInfluencers(params);
    console.debug("INFLUENCERS***", influencers)
    setInfluencers(influencers);
  }

  if (!influencers) return <LoadingSpinner />;

  return (
      <div className="InfluencerList col-xl-6 offset-xl-3">

        <div className="container">

          <div className="row">
            <div className="col-3">
              <img className="img-desc" id="img-followers" src={imgFollowers} alt="influencer followers" />
            </div>
            <div className="col title d-flex align-items-center">Filter by Name and/or Number of Followers</div>
          </div>
          <div className="row mt-2">
            <div className="col desc d-flex align-items-center">Search potential Influencers to follow or collaborate with by their influencer or channel name or solely by the number of followers they currently have</div>
          </div>
          <hr></hr>
          <br></br>

          {/* <div className="row">
            <div className="col-3">
              <img className="img-desc" id="img-review" src={imgReview} alt="influencer review" />
            </div>
            <div className="col title d-flex align-items-center">Rate and Review Influencers</div>
          </div>
          <div className="row mt-2">
            <div className="col desc d-flex align-items-center">
              <div>
                <p>Ratings and reviews should be based on what users like and/or dislike about an individual influencer or channel and allow for a credibility score to be entered so other potential viewers and/or collaborators know who they can trust when reviewing their content.</p>
                <div><em>Ratings/Reviews can be deleted, however Influenced users are limited to write one review/rating per Influencer</em></div>
              </div>
            </div>
          </div>
          <hr></hr> */}
        </div>

        <SearchForm searchFor={(data) => setSearchKey(data)} />
        {influencers.length
            ? (
                <div className="InfluencerList-list">
                  {influencers.map(i => (
                      <InfluencerCard
                          key={i.cid}
                          id={i.id}
                          cid={i.cid}
                          socialType={i.socialType}
                          url={i.url}
                          name={i.name}
                          image={i.image}
                          description={i.description}
                          screenName={i.screenName}
                          usersCount={i.usersCount}
                          categories={i.categories}
                          score={i.score}
                          credibilityScore={i.credibilityScore}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div>
  );
}


export default InfluencerList;
