import React from "react";
import { Button, Row, Col, Table } from "react-bootstrap"; // Added Table for structured view

// Utility function to format nested objects correctly
const formatValue = (value) => {
  if (typeof value === "object" && value !== null) {
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${val}`)
      .join(", "); // Example: "organic: 50, paid: 100"
  }
  return value !== undefined && value !== null ? value : "N/A";
};

// Grid Card component to display each row as a card
const GridCard = ({ rowData, columns }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="section_card flex-column">
        <br />
        <br />
        {columns.map((column, index) => (
          <div key={index} className="row">
            <strong className="col-md">{column.headname} - </strong>
            <p className={`col-md`}>{formatValue(rowData[column.dbcol])}</p>
          </div>
        ))}
        <div className="btn-sack-top">
          <span></span>
        </div>
      </div>
    </div>
  );
};

// Table View to display data in structured format
const TableView = ({ data, columns }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.headname}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>{formatValue(row[col.dbcol])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// Main Component: Handles both Grid & Table View
const GridView = ({ data, columns, viewType = "grid" }) => {
  return viewType === "grid" ? (
    <Row>
      {data.map((row, index) => (
        <GridCard key={index} rowData={row} columns={columns} />
      ))}
    </Row>
  ) : (
    <TableView data={data} columns={columns} />
  );
};

export default GridView;
