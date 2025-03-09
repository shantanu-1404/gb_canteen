import React, { useState, useEffect } from "react";
import SearchBar from "./Searchbar";
import Filter from "./Filter";
import SortTable from "./SortTable";
import { Row, Col } from "react-bootstrap";
import ProductDropdown from "../components/ProductDropdown";

const SelectTable = ({
  id = "selectTable",
  columns = [],
  data = [],
  multiSelect = true,
  onSelectionChange,
  updateQuantity,
  selectedProducts, // ✅ Quantity update function
  setSelectedProducts, // ✅ Function to update JSON data for selected rows
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);
  const [quantities, setQuantities] = useState({});

  // ✅ Sorting function
  const handleSorting = (column, order) => {
    setSortColumn(column);
    setSortOrder(order);
  };

  // ✅ Handle search query
  const handleSearch = (query) => {
    const searchedData = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredData(searchedData);
  };

  // ✅ Ensure Selected Items Stay Checked When Reopening Modal
  useEffect(() => {
    setSelectedRows(selectedProducts);
  }, [selectedProducts]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // ✅ Apply sorting whenever sort state changes
  useEffect(() => {
    if (!sortColumn) return;

    const sortedData = [...filteredData].sort((a, b) => {
      let valueA = a[sortColumn] ?? "";
      let valueB = b[sortColumn] ?? "";

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      if (Date.parse(valueA) && Date.parse(valueB)) {
        return sortOrder === "asc"
          ? new Date(valueA) - new Date(valueB)
          : new Date(valueB) - new Date(valueA);
      }

      return 0;
    });

    setFilteredData(sortedData);
  }, [sortColumn, sortOrder]);

  // ✅ Handle Row Selection
  const handleRowSelect = (row, event) => {
    event.stopPropagation();
    let updatedSelection;

    if (multiSelect) {
      updatedSelection = selectedRows.some((selected) => selected.id === row.id)
        ? selectedRows.filter((selected) => selected.id !== row.id)
        : [
          ...selectedRows,
          { ...row, quantity: quantities[row.id] || row.quantity || 1 },
        ];
    } else {
      updatedSelection =
        selectedRows[0]?.id === row.id
          ? []
          : [{ ...row, quantity: row.quantity || 1 }];
    }

    setSelectedRows(updatedSelection);
    setSelectedProducts(updatedSelection);
    onSelectionChange && onSelectionChange(updatedSelection);
  };

  // ✅ Render Cell Content Based on Type
  const renderCellContent = (column, value, rowData) => {
    const type = column.type || "text";

    switch (type) {
      case "img":
        return (
          <img
            src={value}
            alt="img"
            style={{ width: "50px", borderRadius: "5px" }}
          />
        );

      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={selectedRows.some(
              (selected) => selected.id === rowData.id
            )}
            onChange={(e) => handleRowSelect(rowData, e)} // ✅ Pass `e` explicitly
          />
        );

      case "currency":
        return <span>${parseFloat(value).toFixed(2)}</span>;

      case "badge":
        return (
          <span className={`badge badge-${value.toLowerCase()}`}>{value}</span>
        );

      case "quantity": // ✅ Add Quantity Handling
        return (
          <div
            className="quantity-control"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="btn a-btn-primary qty-btn"
              onClick={() => updateQuantity(rowData.id, (value || 1) - 1)}
            >
              -
            </button>
            <input
              type="text"
              className="form-control qty-input"
              value={value ?? 1}
              onChange={(e) => updateQuantity(rowData.id, e.target.value)}
            />
            <button
              className="btn a-btn-primary qty-btn"
              onClick={() => updateQuantity(rowData.id, (value || 1) + 1)}
            >
              +
            </button>
          </div>
        );

      case "product":
        return (<ProductDropdown items={rowData.items} />);


      default:
        return value;
    }
  };

  return (
    <div>
      <Row className="gap-2 align-items-center mb-3">
        <Col>
          <SearchBar
            tableId={id}
            gridviewId={id}
            placeholder="Search for data..."
            onSearch={(query) => handleSearch(query)}
          />
        </Col>

        <Col md="auto">
          <div className="d-flex gap-2">
            <Filter
              columns={columns}
              data={data}
              onFilter={setFilteredData}
              tableId={id}
            />
            <SortTable
              data={filteredData}
              setSortedData={setFilteredData}
              columns={columns}
              sortColumn={sortColumn}
              setSortColumn={setSortColumn}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>
        </Col>
      </Row>

      {/* Table Component */}
      <div className="table-container">
        <table className="table ae-table" id={id}>
          <thead>
            <tr>
              {multiSelect && <th>Select</th>}
              {columns.map((column) => (
                <th
                  key={column.dbcol}
                  onClick={() => handleSorting(column.dbcol, sortOrder)}
                  style={{ cursor: "pointer" }}
                >
                  {column.headname}{" "}
                  {sortColumn === column.dbcol &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <tr
                  key={row.id}
                  onClick={(event) => handleRowSelect(row, event)}
                  className={
                    selectedRows.some((selected) => selected.id === row.id)
                      ? "selected-row"
                      : ""
                  }
                  style={{ cursor: "pointer" }}
                >
                  {multiSelect && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.some(
                          (selected) => selected.id === row.id
                        )}
                        onChange={(event) => handleRowSelect(row, event)}
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
                <td colSpan={columns.length + (multiSelect ? 1 : 0)}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectTable;
