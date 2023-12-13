import React from "react";
import "./LoadingSpinner.css";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
      <div className="lds-dual-ring"></div>
  );
}

export default LoadingSpinner;