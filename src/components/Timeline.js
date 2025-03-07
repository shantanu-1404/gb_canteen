import React from "react";

// **Reusable Timeline Item Component**
const TimelineItem = ({ status, title, date, description }) => {
  return (
    <li className={`timeline-item ${status}`}>
      {/* Status Indicator */}
      <div className="timeline-circle">
        {status === "loading" ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : status === "complete" || status === "active" ? (
          <span className="checkmark">&#10003;</span>
        ) : null}
      </div>

      {/* Timeline Content */}
      <div className="timeline-content">
        <div className="row">
          <div className="col">
            <h5>{title}</h5>
            <p>{description}</p>
          </div>
          <div className="col date-time">
            <small>{date}</small>
          </div>
        </div>
      </div>
    </li>
  );
};

// **Main Timeline Component**
const Timeline = ({ events }) => {
  return (
    <ul className="timeline">
      {events.map((item, index) => (
        <TimelineItem
          key={index}
          status={item.status}
          title={item.title}
          date={item.date}
          description={item.description}
        />
      ))}
    </ul>
  );
};

export default Timeline;
