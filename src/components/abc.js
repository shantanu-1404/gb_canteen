import React, { useState, useEffect, useRef } from "react";
import Table from "../components/table"; // Import the Table component
import SearchBar from "../components/Searchbar";
import GridView from "../components/Gridview";
import Filter from "../components/Filter";
import SortTable from "../components/SortTable";
import { Row, Col, Button } from "react-bootstrap";
import MetricCard from "../components/Metrics";
import Layout from "../container/layout";

const DataTable = () => {
  // Create a reference for the table
  const tableRef = useRef();

  // Sample data and columns
  const sampleData = [
    {
      col1: 1150,
      col2: 60,
      col3: "Shipped",
      col4: "true",
      col5: "2023-01-01",
      col6: "2024-08-02",
    },
    {
      col1: 2000,
      col2: 40,
      col3: "Pending",
      col4: "false",
      col5: "2023-02-01",
      col6: "2024-03-16",
    },
    {
      col1: 3060,
      col2: 90,
      col3: "Shipped",
      col4: "true",
      col5: "2023-12-01",
      col6: "2024-03-07",
    },
    // Add more sample data here...
  ];

  const columns = [
    { headname: "AAAA", dbcol: "col1" },
    { headname: "BBBB", dbcol: "col2" },
    { headname: "CCCC", dbcol: "col3" },
    { headname: "DDDD", dbcol: "col4" },
    { headname: "EEEE", dbcol: "col5" },
    { headname: "FFFF", dbcol: "col6" },
  ];

  // State management
  const [filteredData, setFilteredData] = useState(sampleData); // Store filtered data
  const [view, setView] = useState("table"); // Default view is table
  const [sortColumn, setSortColumn] = useState(null); // Column to be sorted
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order (asc, desc)

  // Toggle between grid and table view
  const handleViewToggle = () => {
    setView((prevView) => (prevView === "table" ? "grid" : "table"));
  };

  // Function to handle sorting by column
  const handleSorting = (column, order) => {
    setSortColumn(column);
    setSortOrder(order);
  };

  // Update filteredData when sorting or filtering happens
  useEffect(() => {
    const sortedData = filteredData.sort((a, b) => {
      let valueA = a[sortColumn];
      let valueB = b[sortColumn];

      if (valueA === undefined || valueA === null) valueA = "";
      if (valueB === undefined || valueB === null) valueB = "";

      // Handling different types for sorting
      if (typeof valueA === "string" && typeof valueB === "string") {
        valueA = valueA.trim().toLowerCase();
        valueB = valueB.trim().toLowerCase();
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      if (Date.parse(valueA) && Date.parse(valueB)) {
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }

      return 0;
    });

    setFilteredData(sortedData);
  }, [sortColumn, sortOrder, filteredData]);

  // Sorting logic applied whenever sort or filtered data changes
  useEffect(() => {
    const sortedData = filteredData.sort((a, b) => {
      let valueA = a[sortColumn];
      let valueB = b[sortColumn];

      if (valueA === undefined || valueA === null) valueA = "";
      if (valueB === undefined || valueB === null) valueB = "";

      if (typeof valueA === "string" && typeof valueB === "string") {
        valueA = valueA.trim().toLowerCase();
        valueB = valueB.trim().toLowerCase();
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      if (Date.parse(valueA) && Date.parse(valueB)) {
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }

      return 0;
    });

    setFilteredData(sortedData);
  }, [sortColumn, sortOrder, filteredData]);

  return (
    <Layout>
      <div>
        <h1>Metrics Dashboard</h1>

        <div className="card-container d-flex gap-4 flex-wrap">
          <Row>
            <Col xs={4} md={3}>
              <MetricCard
                title="Total of Col-1"
                operation="total"
                column="col1"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Count for Col-2"
                operation="count"
                column="col2"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/truck.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Positive Count"
                operation="positiveCount"
                column="col3"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Negative Count"
                operation="negativeCount"
                column="col4"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/order_bag.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Mean of Col-1"
                operation="mean"
                column="col1"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/truck.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Average of Col-5 & Col-6"
                operation="average"
                column="col5,col6"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/order_bag.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Ratio (Col-1 / Col-2)"
                operation="ratio"
                column="col1,col2"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/return.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Percentage of Positive (Col-2)"
                operation="percentage"
                column="col2"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/order_bag.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Count of Values Greater Than 1000 (Col-1)"
                operation="1000+"
                column="col1"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/return.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Total of Col-1"
                operation="total"
                column="col1"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/wallet.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
          </Row>
        </div>



 <Row className="align-items-center gx-1">
  <Col xs={12} sm={2} md={3} lg={9}>
    {/* Search Bar */}
    <SearchBar tableId="table1" placeholder="Search Table..." />
  </Col>
  <Col xs={12} sm={4} md={3} lg={1} style={{ paddingRight: '0.5rem' }}>
    {/* Filter Component */}
    <Filter columns={columns} data={sampleData} onFilter={setFilteredData} />
  </Col>
  <Col xs={12} sm={2} md={1} lg={1} style={{ paddingRight: '0.5rem' }}>
    {/* View Toggle Button */}
    <button className="btn aeicon-btn-primary" onClick={handleViewToggle}>
      {view === 'table' ? (
        <i className="bi bi-grid" style={{ fontSize: '1.5rem' }}></i>
      ) : (
        <i className="bi bi-grid" style={{ fontSize: '1.5rem' }}></i>
      )}
    </button>
  </Col>
  <Col xs={12} sm={4} md={3} lg={1}>
    {/* SortTable Component */}
    <SortTable
      data={filteredData}
      setSortedData={setFilteredData}
      columns={columns}
      sortColumn={sortColumn}
      setSortColumn={setSortColumn}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
      handleSorting={handleSorting}
    />
  </Col>
</Row>



        {/* Conditionally render Table or GridView */}
        {view === "table" ? (
          <Table
            id="table1"
            data={sampleData}
            columns={columns}
            tableRef={tableRef}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
          />
        ) : (
          <GridView data={sampleData} columns={columns} />
        )}
      </div>
    </Layout>
  );
};

export default DataTable;
