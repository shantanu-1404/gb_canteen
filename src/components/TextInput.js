import React, { useState } from "react";

const TextInput = ({
    label,
    type = "text", // Can be "text", "email", or "url"
    placeholder = "Enter value...",
    info = "",
    name = "customInput",
    required = false,
    onChange
}) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle input change
    const handleChange = (e) => {
        let inputValue = e.target.value;

        if (type === "url") {
            inputValue = inputValue.replace(/\s+/g, "-"); // Convert spaces to "-"
        }

        setValue(inputValue);
        setError(""); // Reset error on change

        if (onChange) {
            onChange(inputValue);
        }
    };

    // Validate input on blur
    const handleBlur = () => {
        if (required && !value.trim()) {
            setError("This field is required.");
            return;
        }

        if (type === "email" && value && !validateEmail(value)) {
            setError("Invalid email format.");
        }
    };

    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                type={type}
                name={name}
                className={`form-control ${error ? "input-error" : ""}`}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {error && <small className="error-text">{error}</small>}
            <br /><small>{info}</small>
        </div>
    );
};

export default TextInput;
