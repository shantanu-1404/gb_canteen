// Table.js
import React, { useState, useEffect, useRef } from "react";
import RowsPerPageSelector from "../components/RowsPerPageSelector"; // Import RowsPerPageSelector

const Table = ({
  id,
  tableRef,
  data,
  columns,
  filteredData,
  setFilteredData,
}) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedData, setSortedData] = useState(data);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default to 10 rows per page
  const [currentPage, setCurrentPage] = useState(1); // Default to page 1
   const [selectedRows, setSelectedRows] = useState([]);

  // Calculate the indices for slicing the data
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Update sorted data whenever the sort changes
  useEffect(() => {
    setSortedData(filteredData); // Set the filtered data whenever it changes
  }, [filteredData]);

  // Function to handle column sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
    } else {
      setSortColumn(column);
      setSortOrder("asc"); // Default to ascending order
    }
  };

  // Function to sort data based on column and order
  const sortData = (data, column, order) => {
    return data.sort((a, b) => {
      let valueA = a[column];
      let valueB = b[column];

      if (valueA === undefined || valueA === null) valueA = "";
      if (valueB === undefined || valueB === null) valueB = "";

      if (typeof valueA === "string" && typeof valueB === "string") {
        valueA = valueA.trim().toLowerCase();
        valueB = valueB.trim().toLowerCase();
        return order === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return order === "asc" ? valueA - valueB : valueB - valueA;
      }

      if (Date.parse(valueA) && Date.parse(valueB)) {
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return order === "asc" ? dateA - dateB : dateB - dateA;
      }

      return 0;
    });
  };

  useEffect(() => {
    if (sortColumn) {
      const sortedData = sortData([...filteredData], sortColumn, sortOrder);
      setFilteredData(sortedData);
    }
  }, [sortColumn, sortOrder, filteredData, setFilteredData]);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page when rows per page is changed
  };
    // Function to toggle the checkbox
    const handleCheckboxChange = (rowIndex) => {
      setSelectedRows((prevSelectedRows) => {
        if (prevSelectedRows.includes(rowIndex)) {
          return prevSelectedRows.filter((index) => index !== rowIndex); // Remove from selected rows
        } else {
          return [...prevSelectedRows, rowIndex]; // Add to selected rows
        }
      });
    };

  return (
    <div className="table-container list-view section_card">
      <table className="table ae-table" ref={tableRef} id={id}>
        <thead>
          <tr>
          <th>
              <input
                type="checkbox"
                checked={selectedRows.length === filteredData.length}
                onChange={() => {
                  if (selectedRows.length === filteredData.length) {
                    setSelectedRows([]); // Deselect all if already selected
                  } else {
                    setSelectedRows(filteredData.map((_, index) => index)); // Select all
                  }
                }}
              />
            </th>
            {columns.map((column) => (
              <th
                key={column.dbcol}
                onClick={() => handleSort(column.dbcol)} // Add sorting functionality
              >
                {column.headname}
                {sortColumn === column.dbcol && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody id="tableBody">
          {currentData.length > 0 ? (
            currentData.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(startIndex + index)}
                    onChange={() => handleCheckboxChange(startIndex + index)}
                  />
                </td>
                {columns.map((column) => (
                  <td data-col={column.dbcol} key={column.dbcol}>
                    {row[column.dbcol]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Rows Per Page Selector */}

      {/* Pagination Controls */}
      <br/><br/>
      <div className="pagination-controls ">
        <RowsPerPageSelector
          rowsPerPage={rowsPerPage}
          setRowsPerPage={handleRowsPerPageChange}
        />
        <div style={{padding: "10px"}} className="btn-sack position-relative">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left"></i> {/* Previous icon */}
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="bi bi-chevron-right"></i> {/* Next icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
