import React, { useRef ,useState } from "react";
import MetricCard from "../components/Metrics";
import SearchBar from '../components/Searchbar';
import Filter from "../components/Filter";
import '../App.css'; // Custom CSS file if needed for additional styling
import ToggleView from '../components/Gridview';

const App = () => {
  // Create a reference for the table
  const tableRef = useRef();

  // Sample data for table
  const sampleData = [
    {
      col1: 100,
      col2: "Shipped",
      col3: true,
      col4: "2023-01-01",
      col5: "2024-08-02",
    },
    {
      col1: 20,
      col2: "Pending",
      col3: false,
      col4: "2023-02-01",
      col5: "2024-03-16",
    },
    {
      col1: 30,
      col2: "Shipped",
      col3: true,
      col4: "2023-12-01",
      col5: "2024-03-07",
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

      <div className="metrics-container">
        <MetricCard
          title="Total of Col-1"
          operation="total"
          column="Col-1"
          tableRef={tableRef}
        />
        <MetricCard
          title="Count for Col-2"
          operation="count"
          column="Col-2"
          tableRef={tableRef}
        />
        <MetricCard
          title="Positive Count"
          operation="positiveCount"
          column="Col-3"
          tableRef={tableRef}
        />
        <MetricCard
          title="Negative Count"
          operation="negativeCount"
          column="Col-3"
          tableRef={tableRef}
        />
        <MetricCard
          title="Mean of Col-1"
          operation="mean"
          column="Col-1"
          tableRef={tableRef}
        />
        <MetricCard
        title="Average of Col-4 & Col-5"
        operation="average"
        column="Col-4,Col-5"
        tableRef={tableRef}
      />
      </div>

      {/* Reusable SearchBar Component */}
      <SearchBar tableId="table1" placeholder="Search " />
       {/* Filter Component */}
       <Filter
        tableId="table1"
        columns={columns} // Columns you want to filter
        data={sampleData} // Pass the data to be filtered
        onFilter={setFilteredData} // Handle filtered data
      />
      
      <ToggleView tableId="table1" columns={columns} data={sampleData} />

      <table ref={tableRef} id="table1">
 
        <thead>
          <tr>
            <th>Col-1 (Integer)</th>
            <th>Col-2 (Enum)</th>
            <th>Col-3 (Boolean)</th>
            <th>Start Date (Col-4)</th>
            <th>End Date (Col-5)</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((data, index) => (
            <tr key={index}>
              <td data-col="Col-1">{data.col1}</td>
              <td data-col="Col-2">{data.col2}</td>
              <td data-col="Col-3">{data.col3 ? "true" : "false"}</td>
              <td data-col="Col-4">{data.col4}</td>
              <td data-col="Col-5">{data.col5}</td>
            </tr>
          ))}
        </tbody>
      </table>    
    </div>
  );
};

export default App;
