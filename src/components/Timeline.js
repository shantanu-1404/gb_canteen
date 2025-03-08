import React, { useState } from "react";

// **Function to Determine Status Class**
const getStatusClass = (scanType) => {
  const statusMap = {
    DL: "complete", // Delivered
    UD: "active", // In Progress
    PU: "active", // Pickup
    T: "pending", // Processing
  };

  return statusMap[scanType] || "pending"; // Default to "pending" if unknown
};

// **Reusable Timeline Item Component**
const TimelineItem = ({ status, scan, date, time, location }) => {
  return (
    <li className="timeline-item">
      {/* Left: Status Indicator & Line */}
      <div className="timeline-left">
        <div className="timeline-circle">
          <span className="checkmark">&#10003;</span> {/* ✅ Green Checkmark */}
        </div>
        <div className="timeline-line"></div> {/* ✅ Vertical Line */}
      </div>

      {/* Middle: Shipment Details */}
      <div className="timeline-details">
        <h5>{scan}</h5>
        <p className="timeline-location">{location}</p>
      </div>

      {/* Right: Date & Time */}
      <div className="timeline-right">
        <span className="timeline-date">
          {date} - {time}
        </span>
      </div>
    </li>
  );
};

// **Main Timeline Component**
const Timeline = ({ events }) => {
  const [showAll, setShowAll] = useState(false); // ✅ Control expansion

  // ✅ Limit items initially
  const visibleEvents = showAll ? events : events.slice(0, 3);

  return (
    <div>
      <ul className="timeline">
        {/* ✅ "View All" & "View Less" Toggle */}
        {events.length > 3 && (
          <div className="text-center">
            <a className="searchable_link" onClick={() => setShowAll(!showAll)}>
              {showAll ? "View Less" : "View All"}
            </a>
          </div>
        )}
        {visibleEvents.map((item, index) => (
          <TimelineItem
            key={index}
            status={getStatusClass(item.ScanType)} // Determine status dynamically
            scan={item.Scan} // Shipment status
            date={item.ScanDate} // Date of scan
            time={item.ScanTime} // Time of scan
            location={item.ScannedLocation} // Location details
          />
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
