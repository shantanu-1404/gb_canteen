import React, { useState, useRef } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Filter = ({ columns, data, onFilter }) => {
<<<<<<< HEAD
  const [filterText, setFilterText] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(columns[0].dbcol);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

=======
  const [filterText, setFilterText] = useState(""); // Filter input text
  const [selectedColumn, setSelectedColumn] = useState(columns[0].dbcol); // Default to first column dbcol
  const [selectedSubCategory, setSelectedSubCategory] = useState(""); // Store selected subcategory
  const [dropdownOpen, setDropdownOpen] = useState(false); // Control dropdown visibility
  const dropdownRef = useRef(null);

  // Toggle dropdown manually
>>>>>>> d6ee864747f0a1e36806c29450b170d70d70d403
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

<<<<<<< HEAD
=======
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
>>>>>>> d6ee864747f0a1e36806c29450b170d70d70d403
  const applyFilter = (filterText, column, subCategory) => {
    const filtered = data.filter((item) => {
      const value = item[column];
      const isSubcategoryMatch = subCategory ? String(value) === subCategory : true;
      const isTextMatch = value && String(value).toLowerCase().includes(filterText.toLowerCase());
      return isSubcategoryMatch && isTextMatch;
    });

    onFilter(filtered); // Update filtered data based on filter
  };

<<<<<<< HEAD
  const handleFilterChange = (e) => {
    const text = e.target.value;
    setFilterText(text);
    applyFilter(text, selectedColumn, selectedSubCategory); // Apply filter when text changes
  };

  const handleColumnChange = (dbcol) => {
    setSelectedColumn(dbcol);
    applyFilter(filterText, dbcol, selectedSubCategory); // Apply filter when column changes
=======
  // Handle column selection from dropdown
  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
    applyFilter(filterText, e.target.value, selectedSubCategory);
>>>>>>> d6ee864747f0a1e36806c29450b170d70d70d403
  };

  const getSubCategories = (column) => {
    const subcategories = new Set();
    data.forEach((row) => {
      if (row[column]) {
        subcategories.add(row[column]);
      }
    });
    return Array.from(subcategories); 
  };

<<<<<<< HEAD
  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory);
    applyFilter(filterText, selectedColumn, subCategory);
  };

  return (
    <div className="filter-container">
      <div className="filter-icon" onClick={toggleDropdown}>
        <button type="button" className="btn aeicon-btn-primary">
          <i className="bi bi-filter" style={{ fontSize: "1.5rem", cursor: "pointer" }}></i>
        </button>
      </div>

      {dropdownVisible && (
        <div className="aetabledropdown-menu">
          <div className="aetabledropdown-item">
            <label htmlFor="columnFilter">Select Column</label>
=======
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
>>>>>>> d6ee864747f0a1e36806c29450b170d70d70d403
            <select
              id="subCategoryFilter"
              className="form-select"
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
            >
<<<<<<< HEAD
              {columns.map((column, index) => (
                <option key={index} value={column.dbcol}>
                  {column.headname}
                </option>
              ))}
            </select>
          </div>

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
=======
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
>>>>>>> d6ee864747f0a1e36806c29450b170d70d70d403
    </div>
  );
};

export default Filter;
