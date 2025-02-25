import React, { useState, useEffect } from "react";
import Table from "./Table"; // Import Table component
import SearchBar from "./Searchbar";
import GridView from "./Gridview";
import Filter from "./Filter";
import SortTable from "./SortTable"; // Import SortTable
import { Row, Col } from "react-bootstrap";

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
  const [filteredData, setFilteredData] = useState(data); // Store filtered data
  const [view, setView] = useState(defaultView); // Toggle between table/grid views
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
  // Handle search query
  const handleSearch = (query) => {
    // Apply search filter on existing data (combined with any existing filter)
    const searchedData = data.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredData(searchedData);
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
  }, [sortColumn, sortOrder, sortable, filteredData]);

  return (
    <div>
      <Row className="align-items-center mt-4">
        <Col>
          {searchable && (
            <SearchBar
              tableId={id}
              gridviewId={id}
              placeholder="Search for data..."
              onSearch={(query) => handleSearch(query)}
            />
          )}
        </Col>

        <Col md="auto">
          <div className="d-flex gap-2">
            {filterable && (
              <Filter
                columns={columns}
                data={data}
                onFilter={setFilteredData} // Update filtered data
                tableId={id}
                gridviewId={id}
              />
            )}

            {/* View Toggle Button */}
            <div className="table-btn">
              <button className="btn grid-btn " onClick={handleViewToggle}>
                <i className="bi bi-grid"></i>
              </button>
            </div>

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
        <GridView
          gridviewId={id}
          data={filteredData} // Pass filteredData to GridView
          columns={columns}
          sortColumn={sortColumn} // Pass sortColumn to GridView
          sortOrder={sortOrder} // Pass sortOrder to GridView
          viewType={view}
        />
      )}
    </div>
  );
};

export default DataTable;