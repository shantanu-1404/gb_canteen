import React, { useState, useEffect, useRef } from "react";
import Table from "./Table"; // Import Table component
import SearchBar from "./Searchbar";
import GridView from "./Gridview";
import Filter from "./Filter";
import SortTable from "./SortTable";
import { Row, Col } from "react-bootstrap";
import Layout from "../container/layout";

const DataTable = ({
  id = "datatable",
  tableRef,
  columns = [],
  data = [],
  defaultView = "table",
  searchable = true,
  filterable = true,
  sortable = true,
  paginated = true,
  children
}) => {
  // State management
  const [filteredData, setFilteredData] = useState(data);
  const [view, setView] = useState(defaultView);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Toggle between table and grid view
  const handleViewToggle = () => {
    setView((prevView) => (prevView === "table" ? "grid" : "table"));
  };

  // Sorting function
  const handleSorting = (column, order) => {
    setSortColumn(column);
    setSortOrder(order);
  };

  // Apply sorting whenever sort state changes
  useEffect(() => {
    if (!sortable || !sortColumn) return;

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
  }, [sortColumn, sortOrder, sortable]);

  return (
    <div>
      <Row className="align-items-center mt-4">
        <Col>
          {/* Search Bar (if enabled) */}
          {searchable && <SearchBar tableId={id} placeholder="Search..." />}
        </Col>

        <Col md="auto">
          <div className="d-flex gap-2">
            {/* Filter Component (if enabled) */}
            {filterable && (
              <Filter columns={columns} data={data} onFilter={setFilteredData} />
            )}

            {/* View Toggle Button */}
            <button className="btn grid-btn aeicon-btn-primary" onClick={handleViewToggle}>
              <i className="bi bi-grid" style={{ fontSize: "1.5rem" }}></i>
            </button>

            {/* Sorting Component (if enabled) */}
            {sortable && (
              <SortTable
                data={filteredData}
                setSortedData={setFilteredData}
                columns={columns}
                sortColumn={sortColumn}
                setSortColumn={setSortColumn}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            )}
          </div>
        </Col>
      </Row>

      {/* Render Table or GridView based on state */}
      {view === "table" ? (
        <Table
          id={id}
          data={data}
          columns={columns}
          tableRef={tableRef}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
          paginated={paginated}
        />
      ) : (
        <>
          {children ? <Row>{children}</Row> : <GridView data={data} columns={columns} />}
        </>
      )}
    </div>
  );
};

export default DataTable;
