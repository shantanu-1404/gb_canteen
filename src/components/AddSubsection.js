import React, { useState } from "react";
import Button from "./Button"; // Import Button component

const AddSubsection = ({ Cardtitle, layoutType, children }) => {
  const [sections, setSections] = useState([
    { id: Date.now(), title: "", description: "", image: "" },
  ]);

  const [listItems, setListItems] = useState([""]); // ✅ Stores list-based items

  console.log("Initialized sections:", sections);

  // ✅ Handle input change for the title or any other field
  const handleInputChange = (id, field, value) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  // ✅ Add new subsection (card layout)
  const addSection = () => {
    const newSection = {
      id: Date.now(),
      title: "",
      description: "",
      image: "",
    };
    setSections([...sections, newSection]);
  };

  // ✅ Remove subsection by ID
  const removeSection = (id) => {
    if (sections.length > 1) {
      setSections(sections.filter((section) => section.id !== id));
    }
  };

  // ✅ Handle input change for List Items
  const handleListChange = (e, index) => {
    const updatedList = [...listItems];
    updatedList[index] = e.target.value;
    setListItems(updatedList);
  };

  // ✅ Add new list item
  const handleAddListItem = () => {
    setListItems([...listItems, ""]);
  };

  // ✅ Remove list item
  const handleRemoveListItem = (index) => {
    setListItems(listItems.filter((_, i) => i !== index));
  };

  return (
    <div className="subsection-container">
      {/* ✅ Render sections dynamically */}
      {sections.map((section) => (
        <div key={section.id} className="section_card">
         

          {/* ✅ Dynamic Children Rendering */}
          {layoutType === "card" ? (
            <> <h6 className="card-title">
            {Cardtitle} {sections.indexOf(section) + 1}
          </h6>
              {/* Render dynamic children */}
              {children}

              {/* Default Inputs */}
              
            </>
          ) : (
            <>
              <div className="row">
                <div className="col-md ">
                  <div className="form-group">
                    <label htmlFor="list-item-input" className="form-label">
                      {Cardtitle}
                    </label>
                    {listItems.map((item, index) => (
                      <div key={index} className="row">
                        <div className="input-group">
                          <input
                            type="text"
                            id="list-item-input"
                            name="list-item-input[]"
                            className="form-control m-0 "
                            placeholder="Enter Item"
                            value={item}
                            onChange={(e) => handleListChange(e, index)}
                          />
                          <button
                            type="button"
                            className="btn col-2 m-0 h-100 btn-danger"
                            onClick={() => handleRemoveListItem(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add List Item Button */}
                <div className="col-md-2">
                  <div className="form-group row p-4 gap-2 text-center">
                    <button
                      type="button"
                      id="add-list-item-btn"
                      className="btn col a-btn-primary"
                      onClick={handleAddListItem}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          <br />
          <br />

          {/* ✅ Render Remove & Add Subsection Button ONLY if layoutType is "card" */}
          {layoutType === "card" && (
            <div className="btn-sack">
              {/* Remove Subsection Button */}
              <Button
                buttonType="uncheck"
                btnStyle="red"
                label="Remove"
                onClick={() => removeSection(section.id)}
                disabled={sections.length === 1} // Disable remove button if only one subsection is left
              />
              {/* Show Add Subsection Button only for the last section */}
              {section === sections[sections.length - 1] && (
                <Button
                  buttonType="add"
                  onClick={addSection}
                  label="Add Subsection"
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddSubsection;
