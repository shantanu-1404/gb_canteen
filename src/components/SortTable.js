import React, { useState } from 'react';

// Sorting function that handles ascending, descending, alphabetical, and date-wise
export const sortData = (data, sortColumn, sortOrder) => {
  if (!sortColumn) return data;

  return data.sort((a, b) => {
    let valueA = a[sortColumn];
    let valueB = b[sortColumn];

    // Ensure values are not undefined or null
    if (valueA === undefined || valueA === null) valueA = "";
    if (valueB === undefined || valueB === null) valueB = "";

    // Alphabetical Sorting (for strings)
    if (typeof valueA === "string" && typeof valueB === "string") {
      valueA = valueA.trim().toLowerCase();
      valueB = valueB.trim().toLowerCase();
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    // Numeric Sorting (for numbers)
    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }

    // Date-wise Sorting (for date)
    if (Date.parse(valueA) && Date.parse(valueB)) {
      const dateA = new Date(valueA);
      const dateB = new Date(valueB);
      return sortOrder === "newToOld" ? dateB - dateA : dateA - dateB;
    }

    return 0;
  });
};

const SortTable = ({
  data,
  setSortedData,
  columns,
  sortColumn,
  setSortColumn,
  sortOrder,
  setSortOrder,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [subDropdownVisible, setSubDropdownVisible] = useState(false);

  // Function to handle column selection to display sorting options
  const handleColumnSelect = (column) => {
    // Toggle sub-dropdown visibility for the selected column
    setSelectedColumn(selectedColumn === column ? null : column);
    setSubDropdownVisible(!subDropdownVisible); // Toggle the sub-dropdown for sorting options
  };

  // Function to handle sorting option selection
  const handleSortingOption = (option) => {
    setSortOrder(option);
    const sortedData = sortData(data, selectedColumn, option);
    setSortedData(sortedData);
    setSubDropdownVisible(false); // Close the sub-dropdown after selecting an option
  };

  // Function to get sorting options based on the column data type
  const getSortingOptions = (column) => {
    const value = data[0][column]; // Get the first value in the column to determine type
    if (typeof value === "number") return ["asc", "desc"]; // For numbers: Ascending, Descending
    if (typeof value === "string") return ["alphabetical", "reverseAlphabetical"]; // For strings: A-Z, Z-A
    if (Date.parse(value)) return ["newToOld", "oldToNew"]; // For dates: New to Old, Old to New
    return [];
  };

  return (
    <div>
      {/* Sorting Icon */}
      <div className="sort-icon-container">
        <button
          className="btn aeicon-btn-primary bi bi-arrow-down-up"
          style={{ fontSize: "1.5rem", cursor: "pointer" }}
          onClick={() => setDropdownVisible(!dropdownVisible)} // Toggle dropdown visibility
        />
      </div>

      {/* Main Sorting Options Dropdown */}
      {dropdownVisible && (
        <div className="aetabledropdown-menu">
          {columns.map((column, index) => (
            <div key={index} className="dropdown-item">
              <div onClick={() => handleColumnSelect(column.dbcol)}>
                {column.headname} {/* Display column name */}
              </div>

              {/* Sub-Dropdown for Sorting Options of Selected Column */}
              {selectedColumn === column.dbcol && subDropdownVisible && (
                <div className="sorting-options-container">
                  {getSortingOptions(column.dbcol).map((option, index) => (
                    <div
                      key={index}
                      className="dropdown-item"
                      onClick={() => handleSortingOption(option)}
                    >
                      {option === "asc"
                        ? "Ascending"
                        : option === "desc"
                        ? "Descending"
                        : option === "alphabetical"
                        ? "Alphabetical (A-Z)"
                        : option === "reverseAlphabetical"
                        ? "Reverse Alphabetical (Z-A)"
                        : option === "oldToNew"
                        ? "Oldest to Newest"
                        : "Newest to Oldest"}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortTable;
