import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RadioInput = ({
    label = "Select an Option",
    name = "radioOptions",
    options = [],
    required = false,
    info = "",
    onChange
}) => {
    const [selectedValue, setSelectedValue] = useState("");
    const [error, setError] = useState("");

    // Handle radio button selection
    const handleRadioChange = (e) => {
        setSelectedValue(e.target.value);
        setError(""); // Remove error on selection
        if (onChange) {
            onChange(e.target.value);
        }
    };

    // Validate selection on form submission
    const handleValidation = () => {
        if (required && !selectedValue) {
            setError("Please select an option.");
        }
    };

    return (
        <Row>
            <label className="form-label">{label}</label>
            {options.map((option, index) => (
                <Col  xs={6} md={4}>
                    <div className="form-group form-check col-md" key={index}>
                        <input
                            className="form-check-input"
                            type="radio"
                            name={name}
                            value={option.value}
                            id={option.value}
                            checked={selectedValue === option.value}
                            onChange={handleRadioChange}
                        />
                        <label className="form-check-label" htmlFor={option.value}>
                            {option.label}
                        </label>
                    </div>
                </Col>
            ))}
            {error && <small className="error-text">{error}</small>}
            <br/><small>{info}</small>

        </Row>
    );
};

export default RadioInput;
