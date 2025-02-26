import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { sortData } from "./SortTable"; // ✅ Import sorting logic
import moment from "moment"; // ✅ For time formatting

const GridCard = ({ rowData, columns, countryFlags }) => {



  const badgeColors = {
    positive: "positive_garph",
    negative: "critical",
    pending: "pending",
    default: ["blue", "purpul", "voilet"],
  };

  // ✅ Stores assigned colors to ensure consistency
  const badgeColorMap = new Map();

  const getBadgeClass = (value) => {
    const lowerValue = String(value).toLowerCase().trim();

    // ✅ Predefined categories
    if (["completed", "published", "true", "active", "confirmed", "positive"].includes(lowerValue))
      return badgeColors.positive;

    if (["negative", "inactive", "false", "critical"].includes(lowerValue))
      return badgeColors.negative;

    if (["pending"].includes(lowerValue)) return badgeColors.pending;

    // ✅ If value already has a color assigned, return it
    if (badgeColorMap.has(lowerValue)) return badgeColorMap.get(lowerValue);

    // ✅ Assign a new color from `default` and store it
    const newColor = badgeColors.default[badgeColorMap.size % badgeColors.default.length];
    badgeColorMap.set(lowerValue, newColor);

    return newColor;
  };
  // ✅ Function to handle all cell types including nested objects
  const formatValue = (column, value) => {
    const type = column.type || "text";


    if (type === "img") return <img src={value} alt="img" style={{ width: "40px", height: "40px", borderRadius: "5px" }} />;

    if (type === "badge") return <span className={`badge ${getBadgeClass(value)}`}>{value}</span>;

    if (type === "tags")
      return (
        <div className="tags-container">
          {Array.isArray(value)
            ? value.map((tag, i) => (
              <span key={i} className={`badge blue mx-1`}>
                {tag}
              </span>
            ))
            : <span
              className={`badge blue mx-1`}
            >
              {value}
            </span>
          }
        </div>
      );

    if (type === "time") {
      const now = moment();
      const inputTime = moment(value);
      const diffHours = now.diff(inputTime, "hours");
      const diffDays = now.diff(inputTime, "days");

      if (diffHours < 1) return inputTime.fromNow();
      if (diffDays < 1) return inputTime.fromNow();
      if (diffDays === 1) return "Yesterday";

      return inputTime.format("Do MMM YYYY"); // ✅ "23rd March 2024"
    }

    if (type === "rating") {
      const rating = Math.min(Math.max(Number(value), 0), 5);
      return <span className="rating">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</span>;
    }

    if (type === "currency") {
      return <span>${parseFloat(value).toFixed(2)}</span>;
    }

    if (type === "country") {
      return countryFlags[value] ? (
        <img src={countryFlags[value]} alt={value} title={value} style={{ width: "30px", height: "20px" }} />
      ) : (
        value
      );
    }



    if (typeof value === "object" && value !== null) {
      return Object.entries(value)
        .map(([key, val]) => `${key}: ${val}`)
        .join(", "); // Example: "organic: 50, paid: 100"
    }

    return value !== undefined && value !== null ? value : "N/A";
  };

  return (
    <div className="col-md-6 col-lg-4">
      <div className="section_card flex-column">
        {columns.map((column, index) => (
          <div key={index} className="row">
            <strong className="col-md">{column.headname} - </strong>
            <p className={`col-md`}>{formatValue(column, rowData[column.dbcol])}</p>
          </div>
        ))}
        <div className="btn-sack-top">
          <span></span>
        </div>
      </div>
    </div>
  );
};

const GridView = ({ data, columns, sortColumn, sortOrder, viewType = "grid" }) => {
  const [sortedData, setSortedData] = useState(data);
  const [countryFlags, setCountryFlags] = useState({}); // ✅ Store country flags

  useEffect(() => {
    // ✅ Fetch country flags
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const flags = {};
        data.forEach((country) => {
          flags[country.name.common] = country.flags.svg;
        });
        setCountryFlags(flags);
      })
      .catch((error) => console.error("Error fetching country flags:", error));
  }, []);

  useEffect(() => {
    // ✅ Apply sorting whenever sort column or order changes
    const newSortedData = sortData(data, sortColumn, sortOrder);
    setSortedData(newSortedData);
  }, [sortColumn, sortOrder, data]);

  return viewType === "grid" ? (
    <Row>
      {sortedData.length > 0 ? (
        sortedData.map((row, index) => (
          <GridCard key={index} rowData={row} columns={columns} countryFlags={countryFlags} />
        ))
      ) : (
        <div>No data to display</div>
      )}
    </Row>
  ) : (
    <div>No grid view</div>
  );
};

export default GridView;
