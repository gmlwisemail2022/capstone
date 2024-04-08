import React from "react";

const Search = ({
  searchType,
  setSearchType,
  searchValue,
  setSearchValue,
  handleSearch,
}) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search value"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="col-md-6">
        <select
          className="form-select mb-2"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="">Select search type</option>
          <option value="productName">Product Name</option>
          <option value="externalId">External ID</option>
          <option value="productId">Product ID</option>
        </select>
      </div>
      <div className="col-md-6">
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
