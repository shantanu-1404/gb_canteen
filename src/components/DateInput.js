import React, { useState, useEffect } from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DateInput = ({
    label = "Date",
    name = "date",
    info = "",
    type = "all", // "all" (default), "past", or "future"
    includeTime = false, // Enable time selection
}) => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
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

    // Handle time change
    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    return (
        <div className="form-group">
            <Row>
                <Col>
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
                </Col>
                {includeTime && (
                    <Col>
                        <label className="form-label">
                            Time
                        </label>
                        <input
                            className="form-control"
                            type="time"
                            name={`${name}_time`}
                            value={selectedTime}
                            onChange={handleTimeChange}
                        />
                    </Col>
                )}
            </Row>
            <br />
            <small>{info}</small>
        </div>
    );
};

export default DateInput;
