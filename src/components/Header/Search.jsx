import React from "react";
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import { Link } from "react-router-dom";

const Search = () => {
  return (
    <form action="#" className="search">
      <div className="input-group">
        <input
          id="search"
          name="search"
          type="text"
          className="form-control"
          placeholder="Search"
          required
        />
        <label className="visually-hidden" htmlFor="search"></label>
        <button
          className="btn btn-primary text-white"
          type="submit"
          aria-label="Search"
        >
          <Link to="/productsPage" className="btn btn-primary">
          <IconSearch  />
          </Link>
        </button>
      </div>
    </form>
  );
};
export default Search;
