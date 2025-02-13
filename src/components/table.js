import React, { useRef, useState } from "react";
import MetricCard from "../components/Metrics";
import SearchBar from "../components/Searchbar";
import Filter from "../components/Filter";
import "../App.css"; // Custom CSS file if needed for additional styling
import GridView from "../components/Gridview";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Column } from "react-virtualized";

const Table = () => {
  // Create a reference for the table
  const tableRef = useRef();

  // Sample data for table
  const sampleData = [
    {
      col1: 1150,
      col2: 60,
      col3: "Shipped",
      col4: true,
      col5: "2023-01-01",
      col6: "2024-08-02",
    },
    {
      col1: 2000,
      col2: 40,
      col3: "Pending",
      col4: false,
      col5: "2023-02-01",
      col6: "2024-03-16",
    },

    {
      col1: 3060,
      col2: 90,
      col3: "Shipped",
      col4: true,
      col5: "2023-12-01",
      col6: "2024-03-07",
    },
    {
      col1: 3060,
      col2: 90,
      col3: "Shipped",
      col4: true,
      col5: "2023-12-01",
      col6: "2024-03-07",
    },
    {
      col1: 3060,
      col2: 90,
      col3: "Pending",
      col4: false,
      col5: "2023-12-01",
      col6: "2024-03-07",
    },
    {
      col1: 3060,
      col2: 90,
      col3: "Shipped",
      col4: true,
      col5: "2023-12-01",
      col6: "2024-03-07",
    },
    {
      col1: 3060,
      col2: 90,
      col3: "Shipped",
      col4: false,
      col5: "2023-12-01",
      col6: "2024-03-07",
    },
    {
      col1: 3060,
      col2: 90,
      col3: "Pending",
      col4: true,
      col5: "2023-12-01",
      col6: "2024-03-07",
    },
    {
      col1: 3060,
      col2: 90,
      col3: "Shipped",
      col4: false,
      col5: "2023-12-01",
      col6: "2024-03-07",
    },
    {
      col1: 3060,
      col2: 90,
      col3: "Pending",
      col4: true,
      col5: "2023-12-01",
      col6: "2024-03-07",
    },
    {
      col1: 3060,
      col2: 90,
      col3: "Pending",
      col4: false,
      col5: "2023-12-01",
      col6: "2024-03-07",
    },
    {
      col1: 3060,
      col2: 90,
      col3: "Shipped",
      col4: true,
      col5: "2023-12-01",
      col6: "2024-03-07",
    },
 
    // Add more sample data as needed
  ];
  // Columns you want to allow filtering on
  const columns = ["name", "status", "amount"];

  // The filtered data (default to sampleData)
  const [filteredData, setFilteredData] = useState(sampleData);

  
 

  return (
    <div>
      <h1>Metrics Dashboard</h1>
      
        <div className="card-container d-flex gap-4 flex-wrap">
          <Row>
            <Col xs={4} md={3}>
              <MetricCard
                title="Total of Col-1"
                operation="total"
                column="Col-1"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Count for Col-2"
                operation="count"
                column="Col-2"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/truck.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Positive Count"
                operation="positiveCount"
                column="Col-4"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Negative Count"
                operation="negativeCount"
                column="Col-4"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/order_bag.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Mean of Col-1"
                operation="mean"
                column="Col-1"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/truck.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Average of Col-5 & Col-6"
                operation="average"
                column="Col-5,Col-6"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/order_bag.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Ratio (Col-1 / Col-2)"
                operation="ratio"
                column="Col-1,Col-2"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/return.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Percentage of Positive (Col-2)"
                operation="percentage"
                column="Col-2"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/order_bag.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Count of Values Greater Than 1000 (Col-1)"
                operation="1000+"
                column="Col-1"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/return.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
            <Col xs={4} md={3}>
              <MetricCard
                title="Total of Col-1"
                operation="total"
                column="Col-1"
                tableRef={tableRef}
                icon="http://localhost/gb_canteen/svg/wallet.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
              />
            </Col>
          </Row>
        </div>
        {/* Reusable SearchBar Component */}
      <SearchBar tableId="table1" placeholder="Search " />
      <GridView tableId="table1" data={sampleData} />
       
 <div className="table-container list-view form_section">
  <table className="table ae-table " ref={tableRef} id="table1">
    <thead>
      <tr>
        <th>Col-1 (Integer)</th>
        <th>Col-2 (Integer)</th>
        <th>Col-3 (Enum)</th>
        <th>Col-4 (Boolean)</th>
        <th>Start Date (Col-5)</th>
        <th>End Date (Col-6)</th>
      </tr>
    </thead>
    
    <tbody id="tableBody">
      {sampleData.map((data, index) => (
        <tr key={index}>
          <td data-col="Col-1">{data.col1}</td>
          <td data-col="Col-2">{data.col2}</td>
          <td data-col="Col-3">{data.col3}</td>
          <td data-col="Col-4">{data.col4 ? "true" : "false"}</td>
          <td data-col="Col-5">{data.col5}</td>
          <td data-col="Col-6">{data.col6}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Table;
