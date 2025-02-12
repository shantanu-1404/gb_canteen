import React, { useState, useEffect } from "react";

const DateInput = ({
    label = "Date",
    name = "date",
    info = "",
    type = "all", // "all" (default), "past", or "future"
}) => {
    const [selectedDate, setSelectedDate] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    // Set min and max date based on type
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

        if (type === "past") {
            setMaxDate(today); // Only allow past dates
        } else if (type === "future") {
            setMinDate(today); // Only allow future dates
        }
    }, [type]);

    // Handle date change
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                className="form-control"
                type="date"
                name={name}
                value={selectedDate}
                onChange={handleDateChange}
                min={minDate}
                max={maxDate}
            />
            <br/><small>{info}</small>
        </div>
    );
};

export default DateInput;
