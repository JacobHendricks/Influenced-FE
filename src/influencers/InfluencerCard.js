import React from "react";
import { Link } from "react-router-dom";
import "./InfluencerCard.css";


/** Show limited information about a influencer
 *
 * Is rendered by InfluencerList to show a "card" for each influencer.
 *
 * InfluencerList -> InfluencerCard
 */

function InfluencerCard({ cid, socialType, url, name, image, description, screenName, usersCount, score, credibilityScore}) {
  console.debug("InfluencerCard", name);

  return (
      <Link className="InfluencerCard card" to={{
        pathname: `/influencers/ratings/${cid}`,
        state: {socialType: socialType,
                url: url,
                name: name,
                image: image,
                description: description,
                screenName: screenName,
                usersCount: usersCount,
                score: score,
                credibilityScore: credibilityScore
        }
      }}>
        <div className="card-body">

          <div className="d-flex justify-content-start">
            <div className="d-flex flex-row">
              <div className="">
              {image && <img src={image}
                                alt={name} />}
              </div>
              <div className="pl-4">
                <h5 className="card-title">@{screenName}</h5>
                {/* <span className="socialType">({socialType})</span> */}
                <div>{name}</div>
                <div>Followers: {formatNum(usersCount)}</div>
                <div><small>{description}</small></div>
              </div>
            </div>
          </div>

          <div className="rating row mt-2">
            <div className="score col-3"> 
               {/* Rating: {score ? (`${score} / 5`(<span className="star">&#9733;</span>)) : "No ratings"}  */}
               {score? <span id="rating-span">Rating: </span> : null}
               {score ? `${score} / 5` : <span id="no-rating-span">No ratings</span>} 
               {score ? <span className="star">&#9733;</span> : null}
            </div>
            {/* <div className="col"> */}
              <div className="credibility col align-self-center">
                {credibilityScore ? <span id="rating-span">Credibility: </span> : null}
                {credibilityScore ? `${credibilityScore} / 5` : null} 
                {credibilityScore ? <span className="star">&#9733;</span> : null}
              </div>
            {/* </div> */}
          </div>
        </div>
      </Link>
  );
}
//   return (
//       <Link className="InfluencerCard card" to={{
//         pathname: `/influencers/ratings/${cid}`,
//         state: {socialType: socialType,
//                 url: url,
//                 name: name,
//                 image: image,
//                 description: description,
//                 screenName: screenName,
//                 usersCount: usersCount,
//                 score: score,
//                 credibilityScore: credibilityScore
//         }
//       }}>
//         <div className="card-body">
//           <div className="">

//           </div>
//           <h6 className="card-title">
//             {screenName} @ {socialType}
//             {image && <img src={image}
//                              alt={name}
//                              className="float-right ml-5" />}
//           </h6>
//           <p>{name}</p>
//           <p>Followers: {formatNum(usersCount)}</p>
//           <p><small>{description}</small></p>
//           <div>Rating: {score ? score : "Be first to enter a rating"}</div>
//           <div><small>Credibility: {credibilityScore ? credibilityScore: "Be first to enter a rating"}</small></div>
//         </div>
//       </Link>
//   );
// }


/** Render integer usersCount like '1,250,343' */

function formatNum(num) {
  const digitsRev = [];
  const numStr = num.toString();
  let revIdx = 1

  for (let i = numStr.length - 1; i >= 0; i--) {
    digitsRev.push(numStr[i]);
    // if (i > 0 && i % 3 === 0) digitsRev.push(",");
    if (i > 0 && revIdx % 3 === 0) digitsRev.push(",");
    revIdx ++;
  }

  return digitsRev.reverse().join("");
}

export default InfluencerCard;
