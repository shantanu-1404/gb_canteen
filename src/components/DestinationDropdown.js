import React, { useState, useRef, useEffect } from "react";
import SearchBar from "../components/Searchbar";
import Modal from "./Modal";
import Row from "react-bootstrap/Row";
import TextInput from "./TextInput";
import Button from "./Button";
import SelectComponent from "./SelectComponent";
import Aetextarea from "../components/Aetextarea";

const DestinationDropdown = ({
  label,
  name,
  options,
  onChange,
  createAction,
  createLabel,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
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

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const filteredDestinations = options.filter(
    (destination) =>
      destination.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectDestination = (destination) => {
    setSelectedDestination(destination);
    setIsDropdownOpen(false);
    if (onChange) onChange(destination);
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
      <label className="form-label">{label}</label>

      <div
        className="searchable_dropdown w-full border border-gray-300 rounded-md p-3 text-left flex justify-between items-center"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedDestination
          ? `${selectedDestination.city} - ${selectedDestination.address}`
          : "Select a Destination"}
        <span className="bi bi-chevron-down"></span>
      </div>

      {isDropdownOpen && (
        <div className="form_section absolute mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-300 z-10">
          <SearchBar
            placeholder="Search for a city or address..."
            onSearch={handleSearch}
          />

          <div className="destination-list-container">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectDestination(destination)}
                >
                  <strong>{destination.city}</strong> - {destination.address}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm p-2">No destinations found</p>
            )}
          </div>

          {/* ✅ Add New Destination Option */}
          {createAction && (
            <div className="searchable_link p-3">
              <a onClick={() => setModalOpen(true)}>{createLabel}</a>
              <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="Create New Supplier"
              >
                <form>
                  <Aetextarea
                    label="TextArea"
                    name="address"
                    placeholder="Enter your address..."
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
                      label="State"
                      placeholder="State"
                      required={true}
                      onChange={handleTextInputChange}
                    />
                  </Row>
                  <Row>
                    <TextInput
                      label="City"
                      placeholder="City"
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

export default DestinationDropdown;
