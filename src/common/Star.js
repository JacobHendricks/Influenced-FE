import React, { useState } from "react";
import { FaStar } from 'react-icons/fa'
import "./Star.css";

function Star({name, handleChange}) {
  const [starRating, setStarRating] = useState(null);
  const [hover, setHover] = useState(null)
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return(
          <label key={`${name}-${index + 1}`}>
            
            <input 
              type="radio" 
              name={name}
              value={currentRating}
              onClick={() => setStarRating(currentRating)} 
              onChange={handleChange}
            />
            <FaStar 
              className="ratingStar" 
              size ={30}
              color={currentRating <= (hover || starRating) ? "#ffc107" : "#e4e5e9"} 
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        )
         
      })}
      
    </div>
  )

}

export default Star;