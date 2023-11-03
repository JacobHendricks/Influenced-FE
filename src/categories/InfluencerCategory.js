import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchForm from "../common/SearchForm";
import InfluencedAPI from "../api/api";
import InfluencerCard from "../influencers/InfluencerCard";
import LoadingSpinner from "../common/LoadingSpinner";

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
  console.debug("InfluencerList");
  const { category } = useParams();

  const [influencers, setInfluencers] = useState();

  useEffect(function getInfluencersOnMount() {
    console.debug("InfluencerList useEffect getInfluencersOnMount");
    search(category);
  }, [category]);

  /** Triggered by search form submit; reloads influencers. */
  async function search(category) {
    console.debug("Search", category)
    let influencers = await InfluencedAPI.getInfluencersByCategory(category);
    console.debug("INFLUENCERS***", influencers)
    setInfluencers(influencers);
  }

  if (!influencers) return <LoadingSpinner />;

  return (
      <div className="InfluencerList col-md-8 offset-md-2">
        <SearchForm searchFor={search} />
        {influencers.length
            ? (
                <div className="InfluencerList-list">
                  {influencers.map(i => (
                      <InfluencerCard
                          key={i.cid}
                          id={i.cid}
                          socialType={i.socialType}
                          url={i.url}
                          name={i.name}
                          image={i.image}
                          description={i.description}
                          screenName={i.screenName}
                          usersCount={i.usersCount}
                          categories={i.categories}
                          ratings={i.ratings}
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
