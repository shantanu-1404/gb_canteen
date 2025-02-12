import React, { useState, useRef, useEffect } from "react";

const SelectComponent = ({ label, name, options, info, isMulti = false, onChange }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedValues, setSelectedValues] = useState(isMulti ? [] : "");
    const [selectedLabel, setSelectedLabel] = useState(""); // For single select display
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (value, label) => {
        if (isMulti) {
            if (selectedValues.includes(value)) {
                setSelectedValues(selectedValues.filter((v) => v !== value));
            } else {
                setSelectedValues([...selectedValues, value]);
            }
        } else {
            setSelectedValues(value);
            setSelectedLabel(label); // Show selected option in search container
            setIsDropdownOpen(false);
        }
        setSearchTerm(""); // Reset search term after selection
        if (onChange) onChange(isMulti ? selectedValues : value);
    };

    const removeTag = (value) => {
        setSelectedValues(selectedValues.filter((v) => v !== value));
    };

    return (
        <div className={`form-group`} ref={selectRef}>
            <label className="form-label">{label}</label>
            <div
                className={`ae-select-wrapper ${isMulti ? "ae-multiple-select" : ""}`}
                onClick={() => setIsDropdownOpen(true)} // Open dropdown when clicking on container
            >
                {isMulti ? (
                    <div className="ae-selected-options">
                        {selectedValues.map((value) => {
                            const label = options.find((option) => option.value === value)?.label;
                            return (
                                <div className="ae-tag" key={value}>
                                    {label} <span className="ae-remove-tag" onClick={() => removeTag(value)}>&times;</span>
                                </div>
                            );
                        })}
                    </div>
                ) : null}

                <div className="ae-search-container">
                    {isMulti ? (<i class="bi bi-search"></i>) : null}
                    <input
                        type="text"
                        className="ae-search-input"
                        placeholder={isMulti ? "Search Options..." : "Select..."}
                        value={isDropdownOpen ? searchTerm : selectedLabel} // Show selected option when dropdown is closed
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsDropdownOpen(true)}
                        readOnly={!isDropdownOpen} // Prevents typing unless dropdown is open
                    />
                    <i className="bi bi-chevron-down"></i>
                </div>

                <select className="ae-select" name={name} multiple={isMulti} style={{ display: "none" }}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>

                {isDropdownOpen && (
                    <div className="ae-options-list">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.value}
                                    data-value={option.value}
                                    className={selectedValues.includes(option.value) ? "selected" : ""}
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
