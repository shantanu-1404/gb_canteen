import React, { useState, useEffect } from "react";
import { Tooltip, OverlayTrigger } from 'react-bootstrap'; // For Tooltip functionality

// Utility function for formatting count with 1000+ logic
const formatCount = (count) => {
  if (count < 10) return count; // For counts between 1 and 9 (No +)
  if (count < 100) return Math.floor(count / 10) * 10 + "+"; // For counts between 10 and 99
  if (count < 1000) return Math.floor(count / 100) * 100 + "+"; // For counts between 100 and 999
  return Math.floor(count / 1000) * 1000 + "+"; // For counts 1000 and above
};

const MetricCard = ({
  title,
  operation,
  column,
  tableRef,
  tooltipText,
  icon,
  columns, // Accept columns as props
}) => {
  const [metricValue, setMetricValue] = useState(0);

  const calculateMetric = () => {
    const table = tableRef?.current;
    if (!table) return;

    const rows = table.querySelectorAll("tbody tr");

    let result = 0;
    let count = 0;
    let positiveCount = 0;
    let negativeCount = 0;
    let sum = 0;
    let totalEntries = 0;
    let totalDays = 0;
    let ratioNumerator = 0;
    let ratioDenominator = 0;

    rows.forEach((row) => {
      const columnsArray = column.split(","); // Handle multiple columns like ratio or average
      let validRow = true;

      switch (operation) {
        case "total":
          columnsArray.forEach((col) => {
            const cellValue = row.querySelector(`[data-col="${col}"]`)?.textContent?.trim();
            if (cellValue && !isNaN(cellValue)) result += parseFloat(cellValue);
          });
          break;

        case "count":
          columnsArray.forEach((col) => {
            const cellValue = row.querySelector(`[data-col="${col}"]`)?.textContent?.trim();
            if (cellValue) count += 1;
          });
          break;

        case "positiveCount":
          columnsArray.forEach((col) => {
            const cellValue = row.querySelector(`[data-col="${col}"]`)?.textContent?.trim();
            if (cellValue === "true") positiveCount += 1;
          });
          break;

        case "negativeCount":
          columnsArray.forEach((col) => {
            const cellValue = row.querySelector(`[data-col="${col}"]`)?.textContent?.trim();
            if (cellValue === "false") negativeCount += 1;
          });
          break;

        case "mean":
          columnsArray.forEach((col) => {
            const cellValue = row.querySelector(`[data-col="${col}"]`)?.textContent?.trim();
            if (!isNaN(cellValue)) {
              sum += parseFloat(cellValue);
              totalEntries += 1;
            }
          });
          break;

        case "average":
          if (columnsArray.length === 2) {
            const startDateText = row.querySelector(`[data-col="${columnsArray[0]}"]`)?.textContent?.trim();
            const endDateText = row.querySelector(`[data-col="${columnsArray[1]}"]`)?.textContent?.trim();
            const startDate = new Date(startDateText);
            const endDate = new Date(endDateText);

            if (!isNaN(startDate) && !isNaN(endDate)) {
              const timeDiff = (endDate - startDate) / (1000 * 60 * 60 * 24); // Time difference in days
              totalDays += timeDiff;
              totalEntries += 1;
            } else {
              validRow = false;
            }
          }
          break;

        case "percentage":
          columnsArray.forEach((col) => {
            const cellValue = row.querySelector(`[data-col="${col}"]`)?.textContent?.trim();
            if (!isNaN(cellValue)) result += parseFloat(cellValue);
          });
          break;

        case "1000+":
          columnsArray.forEach((col) => {
            const cellValue = row.querySelector(`[data-col="${col}"]`)?.textContent?.trim();
            if (!isNaN(cellValue) && parseFloat(cellValue) >= 1000) {
              result += 1;
            }
          });
          break;

        case "ratio":
          if (columnsArray.length === 2) {
            const numerator = parseFloat(row.querySelector(`[data-col="${columnsArray[0]}"]`)?.textContent);
            const denominator = parseFloat(row.querySelector(`[data-col="${columnsArray[1]}"]`)?.textContent);

            if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
              ratioNumerator += numerator;
              ratioDenominator += denominator;
            }
          }
          break;

        default:
          break;
      }

      // Prevent invalid rows from affecting calculations
      if (!validRow) return;
    });

    // Calculate the result based on operation type
    const mean = operation === "mean" && totalEntries > 0 ? (sum / totalEntries).toFixed(2) : 0;
    const average = operation === "average" && totalEntries > 0 ? (totalDays / totalEntries).toFixed(2) : 0;
    const percentage = operation === "percentage" && rows.length > 0 ? ((result / rows.length) * 100).toFixed(2) : 0;
    const positivePercentage = operation === "positivePercentage" && totalEntries > 0 ? ((positiveCount / totalEntries) * 100).toFixed(2) : 0;
    const value1000PlusPercentage = operation === "1000+" ? result : 0;
    const ratio = operation === "ratio" && ratioDenominator > 0 ? `${ratioNumerator}:${ratioDenominator}` : 0;

    // Set the metric value based on operation type
    if (operation === "total") {
      setMetricValue(result);
    } else if (operation === "count") {
      setMetricValue(count); // Just show the count, no formatting here
    } else if (operation === "positiveCount") {
      setMetricValue(positiveCount);
    } else if (operation === "negativeCount") {
      setMetricValue(negativeCount);
    } else if (operation === "mean") {
      setMetricValue(mean);
    } else if (operation === "average") {
      setMetricValue(average);
    } else if (operation === "percentage") {
      setMetricValue(`${percentage}%`);
    } else if (operation === "positivePercentage") {
      setMetricValue(`${positivePercentage}%`);
    } else if (operation === "1000+") {
      setMetricValue(`${formatCount(result)}`); // Format count dynamically
    } else if (operation === "ratio") {
      setMetricValue(ratio);
    }
  };

  useEffect(() => {
    calculateMetric();
  }, [operation, column, tableRef]);

  return (
    <div className="metrix">
      <div className="d-flex flex-column ">
        {/* First Line: Tooltip and Title */}
        <div className="d-flex gap-5 mt-2 justify-content-between">
          {/* Title */}
          <h6 style={{ margin: 0 }}>{title}</h6>
          {/* Tooltip only for the exclamation circle icon */}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="tooltip">{tooltipText}</Tooltip>}
          >
            <div className="icon-container" style={{ marginRight: "10px" }}>
              {/* Exclamation Circle Icon with Tooltip */}
              <i
                className="bi bi-exclamation-circle"
                style={{ fontSize: "15px", cursor: "pointer" }}
              ></i>
            </div>
          </OverlayTrigger>
        </div>

        {/* Second Line: Image and Metric Value */}
        <div className="d-flex gap-5 mt-2 justify-content-between">
          {/* Optional: Custom Icon (e.g., image or SVG) */}
          {icon && (
            <img
              src={icon}
              alt=""
              style={{ width: "35px", height: "35px", marginRight: "8px" }}
            />
          )}

          {/* Metric Value */}
          <h3 style={{ margin: 0 }}>{metricValue}</h3>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;