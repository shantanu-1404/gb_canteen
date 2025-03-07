import React, { useState, useRef, useEffect } from "react";

const SelectComponent = ({ 
    label, 
    name, 
    options, 
    info, 
    isMulti = false, 
    onChange, 
    listStyle 
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedValues, setSelectedValues] = useState(isMulti ? [] : "");
    const [selectedLabel, setSelectedLabel] = useState(""); 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const selectRef = useRef(null);

    // ✅ Handle click outside dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ✅ Filter options based on search input
    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ✅ Handle selecting an option
    const handleSelect = (value, label) => {
        if (isMulti) {
            setSelectedValues((prevValues) => {
                const newValues = prevValues.includes(value)
                    ? prevValues.filter((v) => v !== value)
                    : [...prevValues, value];

                if (onChange) onChange(newValues);
                return newValues;
            });
        } else {
            // ✅ Single-Select: Update state and close dropdown
            setSelectedValues(value);
            setSelectedLabel(label);
            
            setTimeout(() => {
                setIsDropdownOpen(false);
            }, 100);

            if (onChange) onChange(value);
        }

        setSearchTerm(""); // Reset search term after selection
    };

    // ✅ Remove tag in multi-select mode
    const removeTag = (value) => {
        setSelectedValues((prevValues) => prevValues.filter((v) => v !== value));
    };

    return (
        <div className="form-group" ref={selectRef}>
            <label className="form-label">{label}</label>
            <div 
                className={`ae-select-wrapper ${isMulti ? "ae-multiple-select" : ""}`}
                onClick={() => setIsDropdownOpen(true)} 
            >
                {isMulti && (
                    <div className="ae-selected-options">
                        {selectedValues.map((value) => {
                            const label = options.find((option) => option.value === value)?.label;
                            return (
                                <div className="ae-tag" key={value}>
                                    {label} 
                                    <span className="ae-remove-tag" onClick={() => removeTag(value)}>
                                        &times;
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="ae-search-container">
                    {isMulti && <i className="bi bi-search"></i>}
                    <input
                        type="text"
                        className="ae-search-input"
                        placeholder={isMulti ? "Search Options..." : "Select..."}
                        value={isDropdownOpen ? searchTerm : selectedLabel} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsDropdownOpen(true)}
                        readOnly={!isDropdownOpen} 
                    />
                    <i 
                        className={`bi ${isDropdownOpen ? "bi-chevron-up" : "bi-chevron-down"}`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    ></i>
                </div>

                <select className="ae-select" name={name} multiple={isMulti} style={{ display: "none" }}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>

                {isDropdownOpen && (
                    <div className={`ae-options-list ${listStyle}`}>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.value}
                                    data-value={option.value}
                                    className={isMulti ? (selectedValues.includes(option.value) ? "selected" : "") : (selectedValues === option.value ? "selected" : "")}
                                    onClick={() => handleSelect(option.value, option.label)}
                                >
                                    {option.label}
                                </div>
                            ))
                        ) : (
                            <div className="no-options">No options found</div>
                        )}
                    </div>
                )}
            </div>
            <br/><small>{info}</small>
        </div>
    );
};

export default SelectComponent;
