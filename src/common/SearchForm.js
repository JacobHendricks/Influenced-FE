import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import "./SearchForm.css";
import UserContext from "../auth/UserContext"

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
  const { categoriesList } = useContext(UserContext);
  // console.debug("Categories List", categoriesList)
  console.debug("SearchForm", "searchFor=", typeof searchFor);


  const [formData, setformData] = useState({
    // q:
    // category
  });
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    console.log("PATH", path)
    const searchParams = location.search.substring(1);
    if (searchParams) { 
      const searchObj = JSON.parse('{"' + searchParams.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
      setformData(searchObj)
      console.log("URL QUERY OBJ", searchObj)
      //searchFor(searchObj);
    }
  },[])

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    console.debug("SEARCH DATA", formData)
    for (let key in formData) {
      console.log("FORMDATA", key, formData[key])
    }

    const params = new URLSearchParams(formData)
    history.push({ pathname: location.pathname, search: params.toString() });

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
    // const params = new URLSearchParams({[name]: value });
    
    // urlParams.set('order', 'date');
    // window.location.search = urlParams;
    // params.set(name, value)
    // history.push({ pathname: location.pathname, search: urlParams.toString() });      
  }

  return (
      <div className="SearchForm mb-4">
        <form onSubmit={handleSubmit}>

          <div className="form-group row justify-content-center">
            <label htmlFor="q" className="col-md-3 col-form-label" >Influencer Name / @ </label>
            <div className="col-md-3">
              <input
                  className="form-control flex-grow-1"
                  name="q"
                  placeholder="Enter search term.."
                  type="text"
                  value={formData.q}
                  onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group row row justify-content-center">
            <label htmlFor="category" className="col-md-3 col-form-label">Category</label>
            <div className="col-md-3">
              <select
                  className="form-control flex-grow-1"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
              >
                {categoriesList.map(c => 
                  <option key={c[0]} value={c[0]}> {c[1]} </option>
                  )}
              </select>
            </div>
          </div>

          <div className="form-group row row justify-content-center">
            <label htmlFor="minUsersCount" className="col-md-3 col-form-label">Min Followers</label>
            <div className="col-md-3">
              <input
                  className="form-control flex-grow-1"
                  name="minUsersCount"
                  type="text"
                  value={formData.minUsersCount}
                  onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group row row justify-content-center">
            <label htmlFor="maxUsersCount" className="col-md-3 col-form-label">Max Followers</label>
            <div className="col-md-3">
              <input
                  className="form-control flex-grow-1"
                  name="maxUsersCount"
                  type="text"
                  value={formData.maxUsersCount}
                  onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group row row justify-content-center">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>

        </form>
      </div>
  );
}

export default SearchForm;
