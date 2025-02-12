import React, { useState } from "react";

const TextInput = ({
    label = "Input",
    info = "",
    name = "textInput",
    placeholder = "Enter text...",
    required = false,
    onChange
}) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    // Handle input change
    const handleChange = (e) => {
        setValue(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
        setError(""); // Remove error on change
    };

    // Validate input on blur
    const handleBlur = () => {
        if (required && !value.trim()) {
            setError("This field is required.");
        }
    };

    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                type="text"
                name={name}
                className={`form-control ${error ? "input-error" : ""}`}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {error && <small className="error-text">{error}</small>}
            <br/><small>{info}</small>
        </div>
    );
};

export default TextInput;
