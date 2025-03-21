import React, { useState, useEffect, useRef } from "react";
import RowsPerPageSelector from "./RowsPerPageSelector";
import moment from "moment"; // ✅ For formatting time
import { useState as useAsyncState } from "react";
import SortTable from "./SortTable";
import Button from "../components/Button";
import ProductDropdown from "../components/ProductDropdown";

const Table = ({
  id,
  tableRef,
  data,
  columns,
  filteredData,
  setFilteredData,
  paginated = true,
  handleButtonClick,
  updateQuantity,
  showCheckbox = true, // ✅ Default is true, can be set to false
}) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedData, setSortedData] = useState(data);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [countryFlags, setCountryFlags] = useAsyncState({});
  const [quantities, setQuantities] = useState({});

  const startIndex = paginated ? (currentPage - 1) * rowsPerPage : 0;
  const endIndex = paginated ? startIndex + rowsPerPage : filteredData.length;
  const currentData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleEditClick = (rowData) => {
    console.log("Editing row:", rowData);
    // You can implement the logic to edit the row or open a modal to edit the content
  };

  useEffect(() => {
    setSortedData(filteredData);
  }, [filteredData]);

  useEffect(() => {
    setQuantities(
      data.reduce(
        (acc, item) => ({ ...acc, [item.id]: item.quantity || 1 }),
        {}
      )
    );
  }, [data]);

  // ✅ Handle Quantity Updates
  const updateTableQuantity = (rowId, newQuantity) => {
    const updatedQuantity = Math.max(1, parseInt(newQuantity) || 1);
    setQuantities((prev) => ({ ...prev, [rowId]: updatedQuantity }));
    updateQuantity(rowId, updatedQuantity); // ✅ Sync across tables
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const flags = {};
        data.forEach((country) => {
          flags[country.name.common] = country.flags.svg;
        });
        setCountryFlags(flags);
      })
      .catch((error) => console.error("Error fetching country flags:", error));
  }, []);

  useEffect(() => {
    if (sortColumn && sortOrder) {
      const sorted = sortData(data, sortColumn, sortOrder);
      setSortedData(sorted);
    } else {
      setSortedData(data);
    }
  }, [data, sortColumn, sortOrder]);

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

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

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

  const updateAcceptReject = (productId, newAcceptValue) => {
    setFilteredData((prevData) =>
      prevData.map((product) =>
        product.id === productId
          ? {
              ...product,
              accept: Math.max(
                0,
                Math.min(newAcceptValue, product.total || 10)
              ), // Prevent exceeding total
              cancel:
                (product.total || 10) -
                Math.max(0, Math.min(newAcceptValue, product.total || 10)), // Auto-calculate Cancel
              progress: `${Math.max(
                0,
                Math.min(newAcceptValue, product.total || 10)
              )}/${product.total || 10}`, // ✅ Update progress bar dynamically
            }
          : product
      )
    );
  };

  const removeAcceptReject = (productId, newRejectValue) => {
    setFilteredData((prevData) =>
      prevData.map((product) =>
        product.id === productId
          ? {
              ...product,
              cancel: Math.max(
                0,
                Math.min(newRejectValue, product.total || 10)
              ), // ✅ Ensure cancel does not exceed total
              accept:
                (product.total || 10) -
                Math.max(0, Math.min(newRejectValue, product.total || 10)), // ✅ Auto-update Accept
              progress: `${
                (product.total || 10) -
                Math.max(0, Math.min(newRejectValue, product.total || 10))
              }/${product.total || 10}`, // ✅ Update Progress
            }
          : product
      )
    );
  };

  const badgeColors = {
    positive: "positive_garph",
    negative: "critical",
    pending: "pending",
    default: ["blue", "purpul", "voilet"],
  };

  // ✅ Stores assigned colors to ensure consistency
  const badgeColorMap = new Map();

  const getBadgeClass = (value) => {
    const lowerValue = String(value).toLowerCase().trim();

    // ✅ Predefined categories
    if (
      [
        "completed",
        "published",
        "true",
        "active",
        "confirmed",
        "positive",
      ].includes(lowerValue)
    )
      return badgeColors.positive;

    if (
      ["negative", "inactive", "cancelled", "false", "critical"].includes(
        lowerValue
      )
    )
      return badgeColors.negative;

    if (["pending", "draft"].includes(lowerValue)) return badgeColors.pending;

    // ✅ If value already has a color assigned, return it
    if (badgeColorMap.has(lowerValue)) return badgeColorMap.get(lowerValue);

    // ✅ Assign a new color from `default` and store it
    const newColor =
      badgeColors.default[badgeColorMap.size % badgeColors.default.length];
    badgeColorMap.set(lowerValue, newColor);

    return newColor;
  };

  // ✅ Function to handle all cell types including nested objects
  const renderCellContent = (column, value, rowData) => {
    const type = column.type || "text";
    if (column.type === "quantity") {
      return (
        <div className="quantity-control">
          <button
            className="btn a-btn-primary qty-btn"
            onClick={() =>
              updateQuantity(
                rowData.id,
                (quantities[rowData.id] || rowData.quantity) - 1
              )
            }
          >
            -
          </button>
          <input
            type="text"
            className="form-control qty-input"
            value={quantities[rowData.id] ?? rowData.quantity}
            onChange={(e) => updateQuantity(rowData.id, e.target.value)}
          />
          <button
            className="btn a-btn-primary qty-btn"
            onClick={() =>
              updateQuantity(
                rowData.id,
                (quantities[rowData.id] || rowData.quantity) + 1
              )
            }
          >
            +
          </button>
        </div>
      );
    }

    if (type === "grouped") {
      return (
        <div className="col">
          <h6>{rowData.heading}</h6>
          <p>{rowData.p1}</p>
          <p>{rowData.p2}</p>
        </div>
      ); // ✅ Now JSX is rendered correctly inside the table
    }

    // ✅ Editable Cell with Pencil Icon
    if (type === "editable") {
      return (
        <div className="editable-cell">
          <span>{value}</span>
          <i
            className="bi bi-pencil-square edit-icon"
           
            onClick={() => handleEditClick(rowData, column.dbcol)}
            title="Edit"
          ></i>
        </div>
      );
    }
    // ✅ Accept Column (Separate)
    if (type === "accept") {
      return (
        <div className="quantity-control">
          <button
            className="btn qty-btn"
            onClick={() =>
              updateAcceptReject(rowData.id, (rowData.accept || 0) - 1)
            }
          >
            -
          </button>
          <input
            type="text"
            className="form-control qty-input"
            value={rowData.accept || 0}
            onChange={(e) =>
              updateAcceptReject(rowData.id, parseInt(e.target.value) || 0)
            }
          />
          <button
            className="btn qty-btn"
            onClick={() =>
              updateAcceptReject(rowData.id, (rowData.accept || 0) + 1)
            }
          >
            +
          </button>
        </div>
      );
    }

    // ✅ Cancel Column (Separate)
    if (type === "cancel") {
      return (
        <div className="quantity-control">
          <button
            className="btn qty-btn"
            onClick={() =>
              removeAcceptReject(rowData.id, (rowData.cancel || 0) - 1)
            }
          >
            -
          </button>
          <input
            type="text"
            className="form-control qty-input"
            value={rowData.cancel || 0}
            onChange={(e) =>
              removeAcceptReject(rowData.id, parseInt(e.target.value) || 0)
            }
          />
          <button
            className="btn qty-btn"
            onClick={() =>
              removeAcceptReject(rowData.id, (rowData.cancel || 0) + 1)
            }
          >
            +
          </button>
        </div>
      );
    }

    // ✅ Progress Column (Separate)
    if (type === "ar-progress") {
      const total = rowData.total || 10;
      const accepted = rowData.accept || 0;
      const progressPercentage = (accepted / total) * 100;

      return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "100px",
              height: "8px",
              background: "#FFB3B3",
              borderRadius: "5px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${progressPercentage}%`,
                height: "100%",
                background: "#BDE275",
                borderRadius: "5px",
              }}
            ></div>
          </div>
          <span>
            {accepted}/{total}
          </span>
        </div>
      );
    }

    if (type === "img")
      return (
        <img
          src={value}
          alt="img"
          style={{ width: "100%", height: "40px", borderRadius: "5px" }}
        />
      );
    if (type === "checkbox") {
      return (
        <input
          type="checkbox"
          checked={selectedRows.includes(rowData.id)}
          onChange={() => handleCheckboxChange(rowData.id)}
        />
      );
    }

    if (type === "badge")
      return <span className={`badge ${getBadgeClass(value)}`}>{value}</span>;

    if (type === "tags")
      return (
        <div className="tags-container">
          {Array.isArray(value) ? (
            value.map((tag, i) => (
              <span key={i} className={`badge blue mx-1`}>
                {tag}
              </span>
            ))
          ) : (
            <span className={`badge blue mx-1`}>{value}</span>
          )}
        </div>
      );

    if (type === "time") {
      const now = moment();
      const inputTime = moment(value);
      const diffHours = now.diff(inputTime, "hours");
      const diffDays = now.diff(inputTime, "days");

      if (diffHours < 1) return <span>{inputTime.fromNow()}</span>; // ✅ "Just now", "2 min ago"
      if (diffDays < 1) return <span>{inputTime.fromNow()}</span>; // ✅ "3 hours ago"
      if (diffDays === 1) return <span>Yesterday</span>; // ✅ "Yesterday"

      return <span>{inputTime.format("Do MMM YYYY")}</span>;
    }

    if (type === "rating") {
      const rating = Math.min(Math.max(Number(value), 0), 5);
      return (
        <span className="rating">
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </span>
      );
    }

    if (type === "currency") {
      return <span>${parseFloat(value).toFixed(2)}</span>;
    }

    if (type === "country") {
      return countryFlags[value] ? (
        <>
          <img
            src={countryFlags[value]}
            alt={value}
            title={value}
            style={{ width: "30px", height: "20px" }}
          />{" "}
          {value}
        </>
      ) : (
        value
      );
    }
    if (type === "button") {
      return (
        <Button
          buttonType="edit"
          label="Edit"
          onClick={() => handleEditClick(rowData)}
          className="edit-button"
          style={{ fontSize: "13px", width: "10px" }} // Additional inline styling
        />
      );
    }

    
    // If the column type is "progress" and the value represents progress (e.g., "Ordered", "Completed", etc.)
    if (type === "progress") {
      const progressValue = value; // This should represent the current progress as a fraction (e.g., "2/10", "5/10")
      const [completed, total] = progressValue.split("/").map(Number);

      let progressBarColor = "#D9D9D9"; // Default color for Pending
      let progressText = `${completed}/${total}`;

      // Logic for Ordered/Completed and Pending
      if (completed === total) {
        progressBarColor = "#BDE275"; // Green for Ordered/Completed
      } else if (completed === 0) {
        progressBarColor = "#D9D9D9"; // Grey for Pending
      } else if (completed > 0 && completed < total) {
        // Mixed colors for half completed and half pending
        progressBarColor = `linear-gradient(to right, #BDE275 ${
          (completed / total) * 100
        }%, #FFB3B3 ${(completed / total) * 100}%)`;
      }

      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            className="progress"
            style={{
              backgroundColor: progressBarColor,
            }}
          >
            <div
              className="progress-bar"
              style={{
                width: `${(completed / total) * 100}%`,
                backgroundColor: progressBarColor,
              }}
              role="progressbar"
              aria-valuenow={completed}
              aria-valuemin="0"
              aria-valuemax={total}
            ></div>
          </div>
          <span style={{ marginLeft: "10px" }}>{progressText}</span>
        </div>
      );
    }

    if (type === "product") {
      return <ProductDropdown items={rowData.items} />;
    }

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
    <div className="section_card">
      <div
        className={`table-container list-view  ${
          !paginated ? "scrollable-table" : ""
        }`}
      >
        <table className="table ae-table" ref={tableRef} id={id}>
          <thead>
            <tr>
              {/* ✅ Show checkboxes only if `showCheckbox` is true */}
              {showCheckbox && (
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
              )}
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
                  {/* ✅ Show checkboxes only if `showCheckbox` is true */}
                  {showCheckbox && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(startIndex + index)}
                        onChange={() =>
                          handleCheckboxChange(startIndex + index)
                        }
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.dbcol}>
                      {renderCellContent(column, row[column.dbcol], row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (showCheckbox ? 1 : 0)}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {paginated ? (
        <>
          <br />
          <br />
          <div className="pagination-controls">
            <RowsPerPageSelector
              rowsPerPage={rowsPerPage}
              setRowsPerPage={handleRowsPerPageChange}
            />
            <div
              className="btn-sack position-relative"
              style={{ padding: "10px" }}
            >
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
