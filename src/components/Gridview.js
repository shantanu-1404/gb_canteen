import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap"; // Added Table for structured view
import { sortData } from "./SortTable"; // Import sorting logic

const GridCard = ({ rowData, columns }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="section_card flex-column">
        <br />
        <br />
        {columns.map((column, index) => (
          <div key={index} className="row">
            <strong className="col-md">{column.headname} - </strong>
            <p className={`col-md`}>{rowData[column.dbcol]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const GridView = ({ data, columns, sortColumn, sortOrder, viewType = "grid" }) => {
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    // Apply sorting whenever sort column or order changes
    const newSortedData = sortData(data, sortColumn, sortOrder);
    setSortedData(newSortedData);
  }, [sortColumn, sortOrder, data]);

  return viewType === "grid" ? (
    <Row>
      {sortedData.length > 0 ? (
        sortedData.map((row, index) => (
          <GridCard key={index} rowData={row} columns={columns} />
        ))
      ) : (
        <div>No data to display</div>
      )}
    </Row>
  ) : (
    <div>No grid view</div>
  );
};

export default GridView;