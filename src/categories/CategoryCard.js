import React from "react";
import { Link } from "react-router-dom";
import "./CategoryCard.css";

// import "./CategoryCard.css";

/** Show limited information about a Category
 *
 * Is rendered by CategoryList to show a "card" for each Category.
 *
 * CategoryList -> CategoryCard
 */

function CategoryCard({ category, name}) {
  // console.debug("CategoryCard", name, category);

  return (
      <Link className="CategoryCard card" to={category ? `/influencers?category=${category}` : `/influencers`}>
        <div className="card-body">
          <h5 className="card-title">
            {name}
          </h5>
        </div>
      </Link>
  );
}



export default CategoryCard;
