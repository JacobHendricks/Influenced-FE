import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import SearchForm from "../common/SearchForm";
import InfluencedAPI from "../api/api";
import InfluencerCard from "./InfluencerCard";
import LoadingSpinner from "../common/LoadingSpinner";
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
