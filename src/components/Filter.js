import React, { useState } from "react";

const Filter = ({ columns, data, onFilter }) => {
  const [filterText, setFilterText] = useState(""); // Filter input text
  const [dropdownVisible, setDropdownVisible] = useState(false); // Control dropdown visibility
  const [selectedColumn, setSelectedColumn] = useState(columns[0].dbcol); // Default to the first column dbcol
  const [selectedSubCategory, setSelectedSubCategory] = useState(""); // Store selected subcategory

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  // Apply the filter based on selected column and filter text
  const applyFilter = (filterText, column, subCategory) => {
    if (!filterText && !subCategory) {
      onFilter(data); // If no filter text or subcategory, return the original data
      return;
    }

    const filtered = data.filter((item) => {
      const value = item[column];
      // Filter based on subcategory and text
      const isSubcategoryMatch = subCategory ? String(value) === subCategory : true;
      const isTextMatch = value && String(value).toLowerCase().includes(filterText.toLowerCase());
      return isSubcategoryMatch && isTextMatch;
    });

    onFilter(filtered); // Pass the filtered data back to parent (Table.js)
  };

  // Handle filter text change
  const handleFilterChange = (e) => {
    const text = e.target.value;
    setFilterText(text);
    applyFilter(text, selectedColumn, selectedSubCategory); // Apply filter when text is changed
  };

  // Handle column selection from dropdown
  const handleColumnChange = (dbcol) => {
    setSelectedColumn(dbcol);
    applyFilter(filterText, dbcol, selectedSubCategory); // Apply filter when column changes
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

  // Handle subcategory (if applicable) selection
  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory);
    applyFilter(filterText, selectedColumn, subCategory); // Apply filter when subcategory changes
  };

  return (
    <div className="filter-container">
      {/* Filter Icon */}
      <div className="filter-icon" onClick={toggleDropdown}>
        <button className="btn aeicon-btn-primary">
          <i className="bi bi-filter" style={{ fontSize: "1.5rem", cursor: "pointer" }}></i>
        </button>
      </div>

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <div className="aetabledropdown-menu">
          {/* Column Selection */}
          <div className="aetabledropdown-item">
            <label htmlFor="columnFilter">Select Column</label>
            <select
              id="columnFilter"
              className="form-select"
              value={selectedColumn}
              onChange={(e) => handleColumnChange(e.target.value)}
            >
              {columns.map((column, index) => (
                <option key={index} value={column.dbcol}>
                  {column.headname} {/* Display headname */}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Selection (If applicable) */}
          {getSubCategories(selectedColumn).length > 0 && (
            <div className="aetabledropdown-item">
              <label htmlFor="subCategoryFilter">Select Subcategory</label>
              <div className="dropdown-item subcategory-container">
                <select
                  id="subCategoryFilter"
                  className="form-select"
                  value={selectedSubCategory}
                  onChange={(e) => handleSubCategoryChange(e.target.value)}
                >
                  <option value="">Select Subcategory</option>
                  {getSubCategories(selectedColumn).map((subCategory, index) => (
                    <option key={index} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

     
        </div>
      )}
    </div>
  );
};

export default Filter;
