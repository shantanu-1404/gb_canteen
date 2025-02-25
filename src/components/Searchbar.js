

import React, { useState, useEffect } from "react";

const SearchBar = ({ tableId, gridviewId, placeholder = "Search Table..." , onSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const table = document.getElementById(tableId);
    const gridview = document.getElementById(gridviewId);

    // If the table is present, filter table rows based on query
    if (table) {
      const rows = table.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        let match = false;

        cells.forEach((cell) => {
          const cellText = cell.textContent.toLowerCase();
          if (cellText.includes(query.toLowerCase())) {
            match = true;
          }
        });

        row.style.display = match ? "" : "none";
      });
    }

    // If the gridview is present, filter grid items based on query
    if (gridview) {
      const gridItems = gridview.querySelectorAll(".grid-item"); // Assuming each grid item has the class "grid-item"

      gridItems.forEach((item) => {
        const itemText = item.textContent.toLowerCase();
        item.style.display = itemText.includes(query.toLowerCase()) ? "" : "none";
      });
    }
  }, [query, tableId, gridviewId]);


  // Whenever search query changes, update the filtered data
  const handleInputChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    onSearch(searchQuery); // Pass search query to onSearch function
  };

  return (
    <div className="table-searchbar">
    <i className="bi bi-search aetablesearch-icon"></i>
    <input
      type="text"
      className="aetabletag-input"
      placeholder={placeholder}
      value={query}
      onChange={handleInputChange}
    />
  </div>
  );
};

export default SearchBar;




