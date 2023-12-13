import React, { useContext } from "react";
import CategoryCard from "./CategoryCard";
// import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext"

/** Show page with list of categories.
 *
 * On mount, loads categories from API.
 * Re-loads filtered categories on submit from search form.
 *
 * This is routed to at /categories
 *
 * Routes -> CategoryList
 */

function CategoryList() {
  const { categoriesList } = useContext(UserContext);
  // console.debug("CategoryList", categoriesList);

  return (
      <div className="CategoryList col-xl-4 offset-xl-4">
        {categoriesList.map(c => (
            <CategoryCard
                key={c[0]}
                category={c[0]}
                name={c[1]}
            />
        ))}
      </div>
  );
}

export default CategoryList;
