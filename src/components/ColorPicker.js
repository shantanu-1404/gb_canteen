import React, { useState } from "react";

const ColorPicker = ({ label = "Background Colour", defaultColor = "#ffffff", onChange }) => {
    const [selectedColor, setSelectedColor] = useState(defaultColor);

    // Handle color change
    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="form-group d-flex p-2 gap-1">            
            <span className="profile-pic" style={{ backgroundColor: selectedColor, padding: "0px", border: "none" }}>                
                <input
                    type="color"
                    className="color-input"
                    value={selectedColor}
                    onChange={handleColorChange}
                />
            </span>
            <div className="col">
                <label className="form-label">{label}</label>
                <label className="form-label color-code">{selectedColor}</label>
            </div>            
        </div>
    );
};

export default ColorPicker;
