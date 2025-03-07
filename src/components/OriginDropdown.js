import React, { useState, useRef, useEffect } from "react";

import SearchBar from "./Searchbar";
import Modal from "./Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInput from "./TextInput";
import Button from "./Button";
import SelectComponent from "./SelectComponent";
import PhoneInput from "./PhoneInput";

const OriginDropdown = ({
  label,
  name,
  options, // { Location1: [Supplier1, Supplier2], Location2: [Supplier3, Supplier4] }
  onChange,
  createAction, // Function for creating a new supplier
  createLabel = "Create New Supplier", // Default label for creating a supplier
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("Select");
  const [selectedLocation, setSelectedLocation] = useState(null);
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

  // Handle search input from SearchBar
  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  // Filter locations based on search term
  const filteredLocations = Object.keys(options).filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter suppliers based on search term (for selected location)
  const filteredSuppliers =
    selectedLocation && options[selectedLocation]
      ? options[selectedLocation].filter((supplier) =>
          supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  // Handle selection of location
  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setSelectedLabel(location);
    setSearchTerm(""); // Reset search term
  };

  // Handle selection of supplier
  const handleSelectSupplier = (supplier) => {
    setSelectedLabel(`${selectedLocation} - ${supplier.name}`);
    setIsDropdownOpen(false);
    if (onChange) onChange(supplier);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };
  const [selectedSingle, setSelectedSingle] = useState("");

  const countries = [
    { value: "1", label: "India" },
    { value: "2", label: "UK" },
    { value: "3", label: "US" },
    { value: "4", label: "Canada" },
  ];

  return (
    <div className="relative w-72" ref={selectRef}>
      {/* Label */}
      <label className="form-label">{label}</label>

      {/* Select Box */}
      <div
        className="searchable_dropdown w-full border border-gray-300 rounded-md p-3 text-left flex justify-between items-center"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedLabel}
        <span className="bi bi-chevron-down"></span>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="form_section absolute mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-300 z-10">
          {/* Search Bar */}
          <SearchBar placeholder="Search for data..." onSearch={handleSearch} />

          {/* Location List (Scrollable) */}
          <div className="location-list-container">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <div
                  key={location}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectLocation(location)}
                >
                  {location}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm p-2">No locations found</p>
            )}
          </div>

          {/* Horizontal Divider */}
          <hr className="dropdown-divider" />

          {/* Supplier List */}
          <div className="supplier-list-container">
            {selectedLocation && filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <div
                  key={supplier.name}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectSupplier(supplier)}
                >
                  {supplier.name} - {supplier.details}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm p-2">
                {selectedLocation
                  ? "No suppliers found"
                  : "Select a location first"}
              </p>
            )}
          </div>

          {/* Create New Supplier Link */}
          {createAction && (
            <div className="searchable_link p-3">
              <a onClick={() => setModalOpen(true)}>{createLabel}</a>
              <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="Create New Supplier"
              >
                <form>
                  <TextInput
                    label="Supplier Name"
                    placeholder="Enter Input"
                    required={true}
                    onChange={handleTextInputChange}
                  />
                  <Row>
                    <SelectComponent
                      label="Country"
                      name="singleSelect"
                      options={countries}
                      isMulti={false}
                      onChange={setSelectedSingle}
                    />
                    <TextInput
                      label="Address"
                      placeholder="Address"
                      required={true}
                      onChange={handleTextInputChange}
                    />
                  </Row>
                  <Row>
                    <TextInput
                      label="State"
                      placeholder="State"
                      required={true}
                      onChange={handleTextInputChange}
                    />
                    <TextInput
                      label="City"
                      placeholder="City"
                      required={true}
                      onChange={handleTextInputChange}
                    />
                  </Row>
                  <Row>
                    <TextInput
                      label="Street"
                      placeholder="Street"
                      required={true}
                      onChange={handleTextInputChange}
                    />
                    <TextInput
                      label="Postal Code"
                      placeholder="Code"
                      required={true}
                      onChange={handleTextInputChange}
                    />
                  </Row>
                  <div className="row">
                    <div className="col-md-6">
                      <PhoneInput
                        label="Mobile Number"
                        placeholder="Enter your mobile number"
                      />
                    </div>
                    <div className="col-md-6 p-2">
                      <TextInput
                        label="Email"
                        type="email"
                        placeholder="yourname@company.com"
                      />
                    </div>
                  </div>
                  <div className="btn-sack">
                  <Button label="Save" type="submit" />
                  <Button
                    label="Cancel"
                    type="button"
                    onClick={() => setModalOpen(false)}
                  />
                </div>
                </form>
              </Modal>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OriginDropdown;
