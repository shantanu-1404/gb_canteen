import React, { useState } from "react";
import Button from "./Button"; // Import your Button component

const AddSubsection = ({ Cardtitle, children }) => {
  // Initialize with one default subsection (the first card)
  const [sections, setSections] = useState([
    { id: Date.now(), title: "Default Title", description: "Default description", image: "" }, // Add unique ID
  ]);

  console.log("Initialized sections:", sections); // Log initial state with default values

  // Handle input change for the title or any other field
  const handleInputChange = (id, field, value) => {
    const updatedSections = sections.map((section) => {
      if (section.id === id) {
        return { ...section, [field]: value };
      }
      return section;
    });
    setSections(updatedSections);
    console.log(`Updated ${field} for subsection with id ${id}:`, value); // Log the change
  };

  // Add new subsection (new card)
  const addSection = () => {
    const newSection = {
      id: Date.now(), // Use unique ID for the new section
      title: "",
      description: "",
      image: "",
    };
    setSections([...sections, newSection]);
    console.log("Added new subsection. Updated sections:", [...sections, newSection]); // Log new subsection added
  };

  // Remove subsection by id
  const removeSection = (id) => {
    if (sections.length > 1) {
      const updatedSections = sections.filter((section) => section.id !== id);
      setSections(updatedSections);
      console.log(
        `Removed subsection with id ${id}. Updated sections:`,
        updatedSections
      ); // Log subsection removal
    } else {
      console.log("Cannot remove the last subsection.");
    }
  };

  return (
    <div className="subsection-container">
      {/* Render sections dynamically */}
      {sections.map((section) => (
        <div key={section.id} className="form_section">
          <h6 className="card-title">
            {Cardtitle} {sections.indexOf(section) + 1}
          </h6>

          {/* Render dynamic children */}
          {children}

          <br />
          <br />
          {/* Render Remove Button for each section */}
          <div className="btn-sack">
            {/* Remove Subsection Button */}
            {/* Prevent removal of the first subsection */}
            <Button
              buttonType="uncheck"
              btnStyle="red"
              label="Remove"
              onClick={() => removeSection(section.id)}
              disabled={sections.length === 1} // Disable remove button if only one subsection is left
            />
            {/* Show Add Subsection Button only for the last section */}
            {section === sections[sections.length - 1] && (
              <Button buttonType="add" onClick={addSection} label="Add Subsection" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddSubsection;
