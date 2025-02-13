import React, { useState } from "react";

// This GridCard component renders individual row data as cards
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

const GridView = ({ data }) => {
  const [view, setView] = useState("list"); // 'list' or 'grid' view

  // Toggle between list and grid view
  const handleViewToggle = () => {
    setView((prevView) => (prevView === "list" ? "grid" : "list"));
  };

  // Render List view (table)
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

  // Render Grid view (cards)
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
        {view === "list" ? "Switch to Grid View" : "Switch to Table View"}
      </button>

      {/* Conditionally render either grid or list view */}
      {view === "list" ? renderListView() : renderGridView()}
    </div>
  );
};

export default GridView;