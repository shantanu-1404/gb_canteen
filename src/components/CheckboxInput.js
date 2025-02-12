import React, { useState } from "react";

const CheckboxInput = ({
    label = "I have read and agree to the",
    linkText = "Terms and Conditions",
    linkUrl = "#",
    info = "",
    name = "checkbox",
    onChange
}) => {
    const [isChecked, setIsChecked] = useState(false);

    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        if (onChange) {
            onChange(e.target.checked);
        }
    };

    return (
        <div className="form-group form-check mt-3">
            <input
                className="form-check-input"
                type="checkbox"
                id={name}
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={name}>
                {label} <a href={linkUrl} target="_blank" rel="noopener noreferrer">{linkText}</a>
            </label>
            <br/><small>{info}</small>
        </div>
    );
};

export default CheckboxInput;
