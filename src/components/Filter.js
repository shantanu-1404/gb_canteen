import React, { useState, useRef } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Filter = ({ columns, data, onFilter }) => {
  const [filterText, setFilterText] = useState(""); // Filter input text
  const [selectedColumn, setSelectedColumn] = useState(columns[0].dbcol); // Default to first column dbcol
  const [selectedSubCategory, setSelectedSubCategory] = useState(""); // Store selected subcategory
  const [dropdownOpen, setDropdownOpen] = useState(false); // Control dropdown visibility
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

  // Apply the filter based on selected column and filter text
  const applyFilter = (filterText, column, subCategory) => {
    if (!filterText && !subCategory) {
      onFilter(data); // If no filter text or subcategory, return the original data
      return;
    }

    const filtered = data.filter((item) => {
      const value = item[column];
      const isSubcategoryMatch = subCategory ? String(value) === subCategory : true;
      const isTextMatch = value && String(value).toLowerCase().includes(filterText.toLowerCase());
      return isSubcategoryMatch && isTextMatch;
    });

    onFilter(filtered); // Pass the filtered data back to parent (Table.js)
  };

  // Handle column selection from dropdown
  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
    applyFilter(filterText, e.target.value, selectedSubCategory);
  };

  // Get unique subcategories (values) for the selected column
  const getSubCategories = (column) => {
    const subcategories = new Set();
    data.forEach((row) => {
      if (row[column]) {
        subcategories.add(row[column]);
      }
    });
    return Array.from(subcategories); // Return as an array
  };

  // Handle subcategory selection
  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
    applyFilter(filterText, selectedColumn, e.target.value);
  };

  return (
    <div className="filter-container" ref={dropdownRef}>
      {/* Filter Icon */}
      <DropdownButton
        id="filter-dropdown"
        title={<i className="bi bi-filter"></i>}
        className="table-btn"
        variant="primary"
        show={dropdownOpen} // ✅ Keep dropdown open until clicking outside
        onToggle={toggleDropdown}
      >
        {/* Column Selection */}
        <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
          <label htmlFor="columnFilter">Select Column</label>
          <select
            id="columnFilter"
            className="form-select"
            value={selectedColumn}
            onChange={handleColumnChange}
          >
            {columns.map((column, index) => (
              <option key={index} value={column.dbcol}>
                {column.headname}
              </option>
            ))}
          </select>
        </Dropdown.Item>

        {/* Subcategory Selection */}
        {getSubCategories(selectedColumn).length > 0 && (
          <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
            <label htmlFor="subCategoryFilter">Select Subcategory</label>
            <select
              id="subCategoryFilter"
              className="form-select"
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
            >
              <option value="">Select Subcategory</option>
              {getSubCategories(selectedColumn).map((subCategory, index) => (
                <option key={index} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>
          </Dropdown.Item>
        )}
      </DropdownButton>
    </div>
  );
};

export default Filter;
