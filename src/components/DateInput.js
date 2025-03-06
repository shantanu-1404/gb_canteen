import React, { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr"; // ✅ Correct way to use Flatpickr
import "flatpickr/dist/themes/dark.css"; // ✅ Flatpickr theme
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DateInput = ({
    label = "Date",
    name = "date",
    info = "",
    type = "all", // "all" (default), "past", "future", or "range"
    includeTime = false, // Enable time selection
    datePlaceholder = "Date", // ✅ Default placeholder for date
    timePlaceholder = "Time", // ✅ Default placeholder for time
}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [dateRange, setDateRange] = useState([]); // ✅ Added for range selection
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);

    // ✅ Set min and max date based on type
    useEffect(() => {
        const today = new Date();
        if (type === "past") {
            setMaxDate(today); // Only allow past dates
        } else if (type === "future") {
            setMinDate(today); // Only allow future dates
        }
    }, [type]);

    // ✅ Handle date change for single selection
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // ✅ Handle time change
    const handleTimeChange = (date) => {
        setSelectedTime(date);
    };

    return (
        <div className="form-group m-0">
            <Row>
                <Col>
                    <label htmlFor={name} className="form-label">
                        {label}
                    </label>

                    {/* ✅ Date Range Picker */}
                    {type === "range" ? (
                        <div className="date-picker-container">
                            <i className="bi bi-calendar Flatpickr-icon"></i>
                            <Flatpickr
                                className="form-control pr-5"
                                placeholder={datePlaceholder} // ✅ Dynamic placeholder
                                style={{ paddingLeft: "40px" }}
                                value={dateRange}
                                options={{
                                    mode: "range",
                                    dateFormat: includeTime ? "Y-m-d H:i" : "Y-m-d",
                                    enableTime: includeTime,
                                    minDate: minDate || null,
                                    maxDate: maxDate || null,
                                }}
                                onChange={(selectedDates) => setDateRange(selectedDates)}
                            />
                        </div>
                    ) : (
                        // ✅ Single Date Picker
                        <div className="date-picker-container">
                            <DatePicker
                                className="form-control pl-5"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                minDate={minDate}
                                maxDate={maxDate}
                                dateFormat={includeTime ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"}
                                placeholderText={datePlaceholder} // ✅ Dynamic placeholder
                            />
                            <i className="bi bi-calendar DatePicker-icon"></i>
                        </div>
                    )}
                </Col>

                {/* ✅ Time Picker (Optional) */}
                {includeTime && type !== "range" && (
                    <Col>
                        <label className="form-label">Time</label>
                        <div className="date-picker-container">
                            <DatePicker
                                className="form-control"
                                selected={selectedTime}
                                onChange={handleTimeChange}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                placeholderText={timePlaceholder} // ✅ Dynamic placeholder
                            />
                            <i className="bi bi-clock DatePicker-icon"></i>
                        </div>
                    </Col>
                )}
            </Row>

            <br />
            <small>{info}</small>
        </div>
    );
};

export default DateInput;
