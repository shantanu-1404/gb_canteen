import React, { useState, useEffect, useRef } from "react";
import RowsPerPageSelector from "./RowsPerPageSelector";
import SortTable from "./SortTable";
const Table = ({
  id,
  tableRef,
  data,
  columns,
  filteredData,
  setFilteredData,
  paginated = true,
}) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedData, setSortedData] = useState(data);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);

  const startIndex = paginated ? (currentPage - 1) * rowsPerPage : 0;
  const endIndex = paginated ? startIndex + rowsPerPage : filteredData.length;
  const currentData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);




  useEffect(() => {
    setSortedData(filteredData);
  }, [filteredData]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortData = (data, column, order) => {
    return data.sort((a, b) => {
      let valueA = a[column];
      let valueB = b[column];

      if (valueA === undefined || valueA === null) valueA = "";
      if (valueB === undefined || valueB === null) valueB = "";

      if (typeof valueA === "string" && typeof valueB === "string") {
        return order === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return order === "asc" ? valueA - valueB : valueB - valueA;
      }

      if (Date.parse(valueA) && Date.parse(valueB)) {
        return order === "asc"
          ? new Date(valueA) - new Date(valueB)
          : new Date(valueB) - new Date(valueA);
      }

      return 0;
    });
  };

  useEffect(() => {
    if (sortColumn && sortOrder) {
      const sorted = sortData(data, sortColumn, sortOrder); // Use the local function directly
      setSortedData(sorted);
    } else {
      setSortedData(data); // Reset to default if no sorting applied
    }
  }, [data, sortColumn, sortOrder]);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const handleCheckboxChange = (rowIndex) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(rowIndex)
        ? prevSelectedRows.filter((index) => index !== rowIndex)
        : [...prevSelectedRows, rowIndex]
    );
  };

  // Function to render cell content (Handles nested objects)
  const renderCellContent = (value) => {
    if (typeof value === "object" && value !== null) {
      return (
        <div className="nested-object">
          {Object.entries(value).map(([key, val], idx) => (
            <div key={idx}>
              {key.toUpperCase()}: {val}
            </div>
          ))}
        </div>
      );
    }
    return value;
  };

  return (
    <div
      className={`table-container list-view section_card ${!paginated ? "scrollable-table" : ""
        }`}
    >
      <table className="table ae-table" ref={tableRef} id={id}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === filteredData.length}
                onChange={() => {
                  setSelectedRows(
                    selectedRows.length === filteredData.length
                      ? []
                      : filteredData.map((_, index) => index)
                  );
                }}
              />
            </th>
            {columns.map((column) => (
              <th
                key={column.dbcol}
                onClick={() => handleSort(column.dbcol)}
                style={{ cursor: "pointer" }}
              >
                {column.headname.toUpperCase()}
                {sortColumn === column.dbcol && (
                  <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
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
                    {renderCellContent(row[column.dbcol])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {paginated ? (
        <>
          <br />
          <br />
          <div className="pagination-controls">
            <RowsPerPageSelector
              rowsPerPage={rowsPerPage}
              setRowsPerPage={handleRowsPerPageChange}
            />
            <div className="btn-sack position-relative" style={{ padding: "10px" }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="scroll-indicator"></div>
      )}
    </div>
  );
};

export default Table;
