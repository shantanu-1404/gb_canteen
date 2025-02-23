import React, { useState, useRef } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

// Sorting function that handles ascending, descending, alphabetical, and date-wise
export const sortData = (data, sortColumn, sortOrder) => {
  if (!sortColumn) return data;

  return [...data].sort((a, b) => {
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

    // Date-wise Sorting (for dates)
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const dropdownRef = useRef(null);

  // Toggle dropdown manually
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  // Attach event listener when dropdown is open
  React.useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Handle column selection to display sorting options
  const handleColumnSelect = (column) => {
    setSelectedColumn(column);
  };

  // Handle sorting option selection
  const handleSortingOption = (option) => {
    setSortOrder(option);
    setSortColumn(selectedColumn);
    const sortedData = sortData(data, selectedColumn, option);
    setSortedData(sortedData);
  };

  // Get sorting options based on the column data type
  const getSortingOptions = (column) => {
    const value = data[0]?.[column];
    if (typeof value === "number") return ["asc", "desc"]; // For numbers
    if (typeof value === "string") return ["alphabetical", "reverseAlphabetical"]; // For strings
    if (Date.parse(value)) return ["newToOld", "oldToNew"]; // For dates
    return [];
  };

  return (
    <div ref={dropdownRef}>
      {/* Sorting Icon */}
      <DropdownButton
        id="sort-dropdown"
        title={<i className="bi bi-arrow-down-up"></i>}
        className="table-btn"
        variant="primary"
        show={dropdownOpen} // ✅ Keep dropdown open until clicking outside
        onToggle={toggleDropdown}
      >
        {/* Column Selection */}
        {columns.map((column, index) => (
          <Dropdown.Item as="div" key={index} onClick={(e) => e.stopPropagation()}>
            <div onClick={() => handleColumnSelect(column.dbcol)}>{column.headname}</div>

            {/* Sorting Options (Only show if column is selected) */}
            {selectedColumn === column.dbcol && (
              <Dropdown.Menu show>
                {getSortingOptions(column.dbcol).map((option, idx) => (
                  <Dropdown.Item key={idx} onClick={() => handleSortingOption(option)}>
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
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            )}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};

export default SortTable;
