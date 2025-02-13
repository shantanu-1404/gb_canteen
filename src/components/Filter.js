import React, { useState } from "react";

const Filter = ({ columns, data, onFilter }) => {
  const [filterText, setFilterText] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(columns[0]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Handle the change in filter input
  const handleFilterChange = (e) => {
    const text = e.target.value;
    setFilterText(text);
    applyFilter(text, selectedColumn);
  };

  // Apply the filter based on selected column
  const applyFilter = (filterText, column) => {
    const filtered = data.filter((item) => {
      const value = item[column];
      return value && String(value).toLowerCase().includes(filterText.toLowerCase());
    });
    onFilter(filtered); // Pass filtered data back to parent
  };

  // Handle column selection from dropdown
  const handleColumnChange = (column) => {
    setSelectedColumn(column);
    applyFilter(filterText, column); // Apply filter immediately when column changes
  };

  return (
    <div className="filter-container">
      <div className="filter-icon">
        {/* Filter Icon - Toggle Dropdown on Click */}
        <i className="bi bi-filter" onClick={toggleDropdown}></i>
      </div>

      {/* Dropdown menu for selecting the column to filter */}
      {dropdownVisible && (
        <div className="dropdown-menu">
          <div className="dropdown-item">
            <label htmlFor="columnFilter">Select Column</label>
            <select
              id="columnFilter"
              className="form-select"
              value={selectedColumn}
              onChange={(e) => handleColumnChange(e.target.value)}
            >
              {columns.map((column, index) => (
                <option key={index} value={column}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Input field for filtering */}
          <div className="dropdown-item">
            <input
              type="text"
              className="form-control"
              placeholder={`Filter by ${selectedColumn}`}
              value={filterText}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
