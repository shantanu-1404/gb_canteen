import React, { useState } from "react";

const Filter = ({ columns, data, onFilter }) => {
  const [filterText, setFilterText] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(columns[0].dbcol);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const applyFilter = (filterText, column, subCategory) => {
    const filtered = data.filter((item) => {
      const value = item[column];
      const isSubcategoryMatch = subCategory ? String(value) === subCategory : true;
      const isTextMatch = value && String(value).toLowerCase().includes(filterText.toLowerCase());
      return isSubcategoryMatch && isTextMatch;
    });

    onFilter(filtered); // Update filtered data based on filter
  };

  const handleFilterChange = (e) => {
    const text = e.target.value;
    setFilterText(text);
    applyFilter(text, selectedColumn, selectedSubCategory); // Apply filter when text changes
  };

  const handleColumnChange = (dbcol) => {
    setSelectedColumn(dbcol);
    applyFilter(filterText, dbcol, selectedSubCategory); // Apply filter when column changes
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
            <select
              id="columnFilter"
              className="form-select"
              value={selectedColumn}
              onChange={(e) => handleColumnChange(e.target.value)}
            >
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
    </div>
  );
};

export default Filter;
