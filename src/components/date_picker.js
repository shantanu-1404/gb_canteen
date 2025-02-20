// DateRangePicker.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";


// Reusable DateRangePicker component
const DateRangePicker = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate) {
      onDateRangeChange(date, endDate); // Notify parent when both dates are selected
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate) {
      onDateRangeChange(startDate, date); // Notify parent when both dates are selected
    }
  };

  return (
    <div className="date-range-picker">
      <div className="d-flex justify-content-between">
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Start Date"
            isClearable
            className="form-control"
          />
        </div>

        <div>
          <label htmlFor="endDate">End Date:</label>
          <DatePicker
            id="endDate"
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select End Date"
            isClearable
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
