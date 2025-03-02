import React from "react";

// Reusable PerformanceStat Component
// Reusable PerformanceStat Component
const PerformanceStatsCard = ({ label, value, status }) => {
    return (
      <div className="col-md-2">
        <div className="metrix">
          <label className="form-label">{label}</label>
          <div>{value}</div>
          <div className="d-flex justify-content-end">
            <span className={status === "Good" ? "good" : "moderate"}>{status}</span>
          </div>
        </div>
      </div>
    );
  };
  
  // Main Scalable Component
  const Metrics = () => {
    const metricsData = [
      { label: "Loading speed", value: "3 Seconds", status: "Moderate" },
      { label: "Interactivity", value: "213 ms", status: "Moderate" },
      { label: "Visual Stability", value: "0.02", status: "Good" },
    ];
  
    return (
      <div className="row">
        {metricsData.map((metric, index) => (
          < PerformanceStatsCard
            key={index}
            label={metric.label}
            value={metric.value}
            status={metric.status}
          />
        ))}
      </div>
    );
  };

export default PerformanceStatsCard;
