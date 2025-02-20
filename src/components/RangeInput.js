import React, { useState } from "react";

const RangeInput = ({ min = 0, max = 100, defaultValue = 50, to, from, title }) => {
    const [value, setValue] = useState(defaultValue);

    // Handle slider change
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="form-group">
            <label className="form-label">{title}</label>
            <div className="range-wrapper">
                <span className="campaign-label">{from}</span>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleChange}
                    className="range "
                />
                <span className="campaign-label right">{to}</span>
            </div>
            <div className="range-value">{value}%</div>
        </div>
    );
};

export default RangeInput;
