import React, { useState, useEffect } from "react";

// MetricCard Component to display individual metric
const MetricCard = ({ title, operation, column, tableRef }) => {
  const [metricValue, setMetricValue] = useState(0);

  const calculateMetric = () => {
    const table = tableRef?.current; // Ensure we have the table reference
    if (!table) return; // If the table is not available, return

    const rows = table.querySelectorAll("tbody tr");

    let result = 0;
    let count = 0;
    let positiveCount = 0;
    let negativeCount = 0;
    let sum = 0;
    let totalEntries = 0;
    let totalDays = 0;  // This will hold the sum of all date differences for the average calculation

    rows.forEach((row) => {
      const cell = row.querySelector(`[data-col="${column}"]`);
      if (!cell) return;

      const cellValue = cell.textContent.trim();

      switch (operation) {
        case "total":
          if (!isNaN(cellValue)) result += parseFloat(cellValue);
          break;
        case "count":
          if (cellValue) count += 1;
          break;
        case "positiveCount":
          if (cellValue === "true") positiveCount += 1;
          break;
        case "negativeCount":
          if (cellValue === "false") negativeCount += 1;
          break;
        case "mean":
          if (!isNaN(cellValue)) {
            sum += parseFloat(cellValue);
            totalEntries += 1;
          }
          
          break;
        case "average":
          if (column.includes("Col-4") && column.includes("Col-5")) {
            const startDateText = row.querySelector('[data-col="Col-4"]').textContent;
            const endDateText = row.querySelector('[data-col="Col-5"]').textContent;

            // Parse the dates
            const startDate = new Date(startDateText);
            const endDate = new Date(endDateText);

            // Ensure both start and end dates are valid
            if (!isNaN(startDate) && !isNaN(endDate)) {
              const timeDiff = (endDate - startDate) / (1000 * 60 * 60 * 24); // Time difference in days
              totalDays += timeDiff;
              totalEntries += 1;
            }
          }
          break;
        default:
          break;
      }
    });

    // Calculate the mean or average based on the operation
    const mean = operation === "mean" && totalEntries > 0 ? (sum / totalEntries).toFixed(2) : 0;
    const average = operation === "average" && totalEntries > 0 ? (totalDays / totalEntries).toFixed(2) : 0;

    // Set the metric value based on operation type
    if (operation === "total") {
      setMetricValue(result);
    } else if (operation === "count") {
      setMetricValue(count);
    } else if (operation === "positiveCount") {
      setMetricValue(positiveCount);
    } else if (operation === "negativeCount") {
      setMetricValue(negativeCount);
    } else if (operation === "mean") {
      setMetricValue(mean);
    } else if (operation === "average") {
      setMetricValue(average);
    }
  };

  useEffect(() => {
    calculateMetric();
  }, [operation, column, tableRef]);

  return (
    <div className="metric-card">
      <h6>{title}</h6>
      <h3>{metricValue}</h3>
    </div>
  );
};



export default MetricCard;
