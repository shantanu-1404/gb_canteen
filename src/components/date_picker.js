import React, { useState, useEffect, useRef } from "react";

const MetricCard = ({ title, operation, column, tableRef }) => {
  const [metricValue, setMetricValue] = useState(0);

  const calculateMetric = () => {
    const table = tableRef.current;
    if (!table) return;

    const rows = table.querySelectorAll("tbody tr");

    let result = 0;

    rows.forEach((row) => {
      const cell = row.querySelector(`[data-col="${column}"]`);
      if (!cell) return;

      const cellValue = cell.textContent.trim();

      if (operation === "total" && !isNaN(cellValue)) {
        result += parseFloat(cellValue);
      }
      if (operation === "count" && cellValue) {
        result += 1;
      }
      if (operation === "positiveCount" && cellValue === "true") {
        result += 1;
      }
    });

    setMetricValue(result);
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

const Metrics = ({ tableRef }) => {
  return (
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
    </div>
  );
};

export default Metrics;
