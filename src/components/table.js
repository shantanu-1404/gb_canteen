import React, { useState, useEffect ,useRef} from "react";
import SortTable from "../components/SortTable";

// Table component that accepts data, columns, and sorting logic as props
const Table = ({ id, tableRef, data, columns, filteredData, setFilteredData }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedData, setSortedData] = useState(data);
    // Create a reference for the table
   // const tableRef = useRef();
  
  

  // Update sorted data whenever the sort changes
  useEffect(() => {
    setSortedData(filteredData); // Set the filtered data whenever it changes
  }, [filteredData]);

  // Function to handle column sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
    } else {
      setSortColumn(column);
      setSortOrder("asc"); // Default to ascending order
    }
  };



  // Function to sort data based on column and order
  const sortData = (data, column, order) => {
    return data.sort((a, b) => {
      let valueA = a[column];
      let valueB = b[column];

      if (valueA === undefined || valueA === null) valueA = "";
      if (valueB === undefined || valueB === null) valueB = "";

      if (typeof valueA === "string" && typeof valueB === "string") {
        valueA = valueA.trim().toLowerCase();
        valueB = valueB.trim().toLowerCase();
        return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return order === "asc" ? valueA - valueB : valueB - valueA;
      }

      if (Date.parse(valueA) && Date.parse(valueB)) {
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return order === "asc" ? dateA - dateB : dateB - dateA;
      }

      return 0;
    });
  };

  useEffect(() => {
    if (sortColumn) {
      const sortedData = sortData([...filteredData], sortColumn, sortOrder);
      setFilteredData(sortedData);
    }
  }, [sortColumn, sortOrder, filteredData, setFilteredData]);

  return (
    
    <div className="table-container list-view form_section">
    <table className="table ae-table" ref={tableRef} id={id}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.dbcol}>
              {column.headname}
            </th>
          ))}
        </tr>
      </thead>
      <tbody id="tableBody">
        {filteredData.length > 0 ? (
          filteredData.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td data-col={column.dbcol} key={column.dbcol}>{row[column.dbcol]}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length}>No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  );
};

export default Table;
