import React from "react";
import { Button } from 'react-bootstrap'; // Assuming you're using React-Bootstrap

// Grid Card component to display each row as a card
const GridCard = ({ rowData, columns }) => {
  return (
    <div className="grid-card">
      {/* Map through the columns to display the column's headname and respective data */}
      {columns.map((column, index) => (
        <p key={index}>
          <strong>{column.headname}:</strong> {rowData[column.dbcol]}
        </p>
      ))}
    </div>
  );
};

const GridView = ({ data, columns }) => {
  return (
    <div className="grid-list-container  ">
      {/* Grid view: Render cards */}
      <div className="grid-container">
        {data.map((row, index) => (
          <GridCard key={index} rowData={row} columns={columns} />
        ))}
      </div>
    </div>
  );
};

export default GridView;
