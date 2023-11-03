import React, { useState } from "react";
import "./SearchForm.css";

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({ searchFor }) {
  console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [formData, setformData] = useState({});

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    console.debug("SEARCH DATA", formData)
    searchFor({ ...formData});
    // searchFor(formData.trim() || undefined);
    // setformData(formData.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setformData(formData => ({
      ...formData,
      [name]: value || undefined
    }));
  }

  return (
      <div className="SearchForm mb-4">
        <form className="form-inline" onSubmit={handleSubmit}>
          <label htmlFor="q">Influencer Name / @ </label>
          <input
              className="form-control form-control-lg flex-grow-1"
              name="q"
              placeholder="Enter search term.."
              type="text"
              value={formData.q}
              onChange={handleChange}
          /><br></br><br></br>
          <label htmlFor="minUsersCount">Min Followers</label>
          <input
              className="form-control form-control-lg flex-grow-1"
              name="minUsersCount"
              type="text"
              value={formData.minUsersCount}
              onChange={handleChange}
          />
          <label htmlFor="maxUsersCount">Max Followers</label>
          <input
              className="form-control form-control-lg flex-grow-1"
              name="maxUsersCount"
              type="text"
              value={formData.maxUsersCount}
              onChange={handleChange}
          />
          <label htmlFor="category">Category</label>
          <input
              className="form-control form-control-lg flex-grow-1"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
          />
          <button type="submit" className="btn btn-lg btn-primary">
            Submit
          </button>
        </form>
      </div>
  );
}

export default SearchForm;
