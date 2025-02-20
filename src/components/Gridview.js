import React from "react";
import { Button, Row } from "react-bootstrap"; // Assuming you're using React-Bootstrap

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
            <p className={`col-md `}>{rowData[column.dbcol]}</p>
          </div>
        ))}
        <div className="btn-sack-top">
          <span></span>
        </div>
      </div>
    </div>
  );
};

const GridView = ({ data, columns }) => {
  return (
    <Row>
      {data.map((row, index) => (
        <GridCard key={index} rowData={row} columns={columns} />
      ))}
    </Row>
  );
};

export default GridView;
