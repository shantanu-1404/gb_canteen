import React, { useState } from "react";

const EmailInput = ({
    label = "Email",
    placeholder = "email@example.com",
    info = "",
    name = "email"
}) => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle email input change
    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);

        if (inputEmail && !validateEmail(inputEmail)) {
            setError("Invalid email format");
        } else {
            setError("");
        }
    };

    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                type="email"
                name={name}
                className={`form-control ${error ? "input-error" : ""}`}
                placeholder={placeholder}
                value={email}
                onChange={handleEmailChange}
            />
            {error && <small className="error-text">{error}</small>}
            <br /><small>{info}</small>
        </div>
    );
};

export default EmailInput;
