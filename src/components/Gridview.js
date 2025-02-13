import React, { useState } from "react";

// Card component for grid view
const GridCard = ({ rowData }) => {
  return (
    <div className="grid-card">
      {Object.keys(rowData).map((key) => (
        <p key={key}>
          <strong>{key}:</strong> {rowData[key]}
        </p>
      ))}
    </div>
  );
};

const GridListView = ({ data }) => {
  const [view, setView] = useState("list"); // 'list' or 'grid' view

  // Handle the toggle between list and grid views
  const handleViewToggle = () => {
    setView((prevView) => (prevView === "list" ? "grid" : "list"));
  };

  // Render the list view
  const renderListView = () => (
    <table className="table">
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, idx) => (
              <td key={idx}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Render the grid view
  const renderGridView = () => (
    <div className="grid-container">
      {data.map((row, index) => (
        <GridCard key={index} rowData={row} />
      ))}
    </div>
  );

  return (
    <div className="grid-list-container">
      <button className="btn btn-primary" onClick={handleViewToggle}>
        <i className={`bi ${view === "list" ? "bi-grid" : "bi-table"}`}></i>
        Toggle View
      </button>

      {/* Conditionally render grid or list view */}
      {view === "list" ? renderListView() : renderGridView()}
    </div>
  );
};

export default GridListView;
