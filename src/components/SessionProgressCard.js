import React from "react";

// Reusable ProgressBar Component
const ProgressBar = ({ label, value, colorClass }) => {
  return (
    <div className="col-md-3">
      <div className="lite_text">{label}</div>
      <div className="progress">
        <div className={`progress-bar ${colorClass}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
};

// Main Component: SessionProgress
const SessionProgressCard = ({ data }) => {
  return (
    <div className="col-md-6">
      <div className="metrix">
        <label className="form-label mb-4">Session by device type</label>
        <div className="row">
          {data.map((item, index) => (
            <ProgressBar
              key={index}
              label={item.label}
              value={item.value}
              colorClass={item.colorClass}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionProgressCard;
