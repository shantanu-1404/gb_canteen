import React, { useState, useEffect } from "react";

const PhoneInput = ({
  label = "Contact Number",
  info = "",
  placeholder = "Enter phone number",
  name = "phone"
}) => {
  const [countries, setCountries] = useState([]);
  const [selectedCode, setSelectedCode] = useState("+91"); // Default country code
  const [selectedFlag, setSelectedFlag] = useState("https://flagcdn.com/w40/in.png"); // Default flag for India
  const [phoneNumber, setPhoneNumber] = useState("");

  // Fetch country codes and flags from RestCountries API
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const countryList = data
          .map((country) => ({
            name: country.cca2, // Country Short Name (ISO 3166-1 Alpha-2)
            code: country.idd?.root
              ? `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ""}`
              : null,
            flag: country.flags.svg, // Country flag
          }))
          .filter((country) => country.code) // Remove countries without codes
          .sort((a, b) => a.name.localeCompare(b.name)); // Sort by country short form

        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountryData();
  }, []);

  // Handle country selection
  const handleCountryChange = (event) => {
    const selected = countries.find((c) => c.code === event.target.value);
    if (selected) {
      setSelectedCode(selected.code);
      setSelectedFlag(selected.flag);
    }
  };

  // Handle phone number input and restrict to numbers only
  const handlePhoneChange = (e) => {
    // Remove non-numeric characters using regular expression
    const numericValue = e.target.value.replace(/\D/g, "");
    setPhoneNumber(numericValue);
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="input-group">
        {/* Country Code Dropdown with Flags */}
        <div className="dropdown-container">
          <img src={selectedFlag} alt="flag" className="flag-icon" />
          <select className="form-control country-dropdown" value={selectedCode} onChange={handleCountryChange}>
            {countries.map((country) => (
              <option key={country.name} value={country.code}>
                ({country.code}) {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Phone Number Input */}
        <input
          type="text"
          name={name}
          className="form-control phone-input"
          placeholder={placeholder}
          value={phoneNumber}
          onChange={handlePhoneChange}
        />
      </div>
      <br /><small>{info}</small>
    </div>
  );
};

export default PhoneInput;
