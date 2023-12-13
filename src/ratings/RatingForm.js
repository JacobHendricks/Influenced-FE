import React, { useState } from "react";
import Alert from "../common/Alert";
import InfluencedAPI from "../api/api";
import Star from "../common/Star";

// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
 *
 * Routed as /profile
 * Routes -> RatingForm -> Alert
 */

function RatingForm({ userId, influencerId, influencerCid, influencerData, getInfluencerId, updateInfluencerScores }) {
  const [formData, setFormData] = useState({
    userId: userId,
    influencerId: influencerId,
    score: "",
    credibilityScore: "",
    review: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  // const [saveConfirmed, setSaveConfirmed] = useState(false);
  const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  console.debug(
      "RatingForm",
      "formData=", formData,
      "formErrors=", formErrors,
      "saveConfirmed=", saveConfirmed,
  );

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.debug("HandleSubmit Inf ID:", influencerId)
    let id = influencerId;
    // Add influencer to db if it doesn't exist 
    if (!id) {
      console.debug("NO INF ID, Adding Influencer")
      const influencer = await addInfluencer();
      console.log("What is inf?????", influencer)
      if  (influencer) {
        id = influencer.id;
        console.log("Inf from api", id, influencer)
      }
      //id = influencer ? influencer.id : influencerId;
    }
    
    await addRating(id);
    await getInfluencerId();
    await updateInfluencerScores(id);
  }

  async function addRating(influencerId) {
    try {
      console.debug("Add Rating", influencerId);
      await InfluencedAPI.addRating({ ...formData, influencerId});
    
      setSaveConfirmed(true);
      // history.push("/influencers");
    } catch (errors) {
      setFormErrors(errors);
      return;
    }
  }


  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  async function addInfluencer() {
    try {
      let influencerResult = await InfluencedAPI.addInfluencer({
        cid: influencerCid,
        socialType: influencerData.socialType,
        groupId: influencerData.groupId,
        url: influencerData.url,
        name: influencerData.name,
        image: influencerData.image,
        description: influencerData.description,
        screenName: influencerData.screenName,
        usersCount: influencerData.usersCount
      })
      console.debug("influencerResult:", influencerResult)
      // add influencerId to the Rating Form
      setFormData(f => ({ ...f, influencerId: influencerResult.id }))
      return influencerResult;
    } catch (errors) {
      console.log("Error adding infl", errors)
      setFormErrors(errors);
      return;
    }
  }



  return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Enter a Rating</h5>
          <form>
            <div className="row">
              <div className="col-3">
                <div className="form-group">
                  <label>Rating</label>
                    <Star 
                      name="score"
                      handleChange={handleChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Credibility</label>
                    <Star 
                      name="credibilityScore"
                      handleChange={handleChange}
                  />
                </div>
              </div>
            </div>
            
            
            <div className="form-group">
              <label>Review</label>
              <textarea
                  name="review"
                  className="form-control"
                  value={formData.review}
                  onChange={handleChange}
              >
              </textarea>
            </div>

            {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null}

            {saveConfirmed
                ?
                <Alert type="success" messages={["Rating Created"]} />
                : null}

            <button
                className="btn btn-primary"
                onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
  );
}

export default RatingForm;
