import React, { useState, useEffect } from "react";

// Filter Component
const Filter = ({ tableId, columns, data, onFilter }) => {
  const [filterText, setFilterText] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Handle filter text change
  const handleInputChange = (e) => {
    setFilterText(e.target.value);
  };

  // Handle applying the filter
  const handleApplyFilter = () => {
    const filtered = data.filter((row) =>
      columns.some(
        (col) =>
          row[col] &&
          row[col].toString().toLowerCase().includes(filterText.toLowerCase())
      )
    );
    onFilter(filtered, tableId);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (event.target.closest(".filter-dropdown") === null) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-container">
      <button
        className="btn btn-outline-secondary"
        onClick={toggleDropdown}
        aria-expanded={dropdownVisible}
      >
        <i className="bi bi-filter"></i> {/* Filter icon */}
      </button>

      {dropdownVisible && (
        <div className="filter-dropdown dropdown-menu show">
          <div className="filter-input">
            <input
              type="text"
              className="form-control"
              value={filterText}
              onChange={handleInputChange}
              placeholder="Filter..."
            />
          </div>
          <button
            className="btn btn-primary mt-2"
            onClick={handleApplyFilter}
          >
            Apply Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
