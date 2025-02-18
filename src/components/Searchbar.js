import React, { useState, useEffect } from "react";

const SearchBar = ({ tableId, placeholder = "Search Table..." }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const table = document.getElementById(tableId);
    if (!table) return; // Exit early if the table is not available

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
  }, [query, tableId]);

  return (
    <div className="table-searchbar">
  <i className="bi bi-search aetablesearch-icon"></i>
  <input
    type="text"
    className="aetabletag-input"
    placeholder={placeholder}
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
</div>





   
  );
};

export default SearchBar;
