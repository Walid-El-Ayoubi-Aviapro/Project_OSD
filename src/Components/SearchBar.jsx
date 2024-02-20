import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import DataDisplay from "./DataDisplay";

const SearchBar = ({ onSearch, data }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={handleSearch}
        style={{
          backgroundColor: "rgb(112, 58, 112)",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
        }}
      >
        Search
      </button>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          width: "200px",
          height: "20px",
          marginLeft: "10px",
          border: "1px solid rgb(112, 58, 112)",
          marginRight: "10px",
        }}
      />
      <FontAwesomeIcon icon={faSearch} />
      {/* <DataDisplay searchQuery={query} data={data} /> */}
    </div>
  );
};

export default SearchBar;
