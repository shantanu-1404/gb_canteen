import React, { useState, useMemo } from "react";
import SelectComponent from "../components/SelectComponent";
import TextInput from "../components/TextInput";

const MessengerForward = () => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [newContact, setNewContact] = useState("");
  const [postFrequency, setPostFrequency] = useState("");

  const post_frequency = [
    { label: "+91 89992 12092", value: "+91 89992 12092" },
    { label: "Family Group", value: "Family Group" },
    { label: "Marketing Group", value: "Marketing Group" },
    { label: "+91 75645 34568", value: "+91 75645 34568" },
    { label: "Neha", value: "Neha" },
  ];

  // ✅ Add contact safely
  const addContactToSelected = (contact) => {
    if (!contact || selectedContacts.includes(contact)) return;
    const updated = [...selectedContacts, contact];
    setSelectedContacts(updated);
  };

  // ✅ Remove contact
  const handleRemove = (contact) => {
    const updated = selectedContacts.filter((item) => item !== contact);
    setSelectedContacts(updated);
  };

  // ✅ Handle dropdown change
  const handleAddSelected = (val) => {
    addContactToSelected(val);
    setPostFrequency(""); // Reset select
  };

  // ✅ Handle manual input add
  const handleAddNewContact = () => {
    if (newContact && !selectedContacts.includes(newContact)) {
      addContactToSelected(newContact);
      setNewContact("");
    }
  };

  // ✅ Batch generation - updates live with selectedContacts
  const batches = useMemo(() => {
    const result = [];
    for (let i = 0; i < selectedContacts.length; i += 5) {
      const batch = selectedContacts.slice(i, i + 5);
      if (batch.length > 0) result.push(batch); // ✅ include even partial batch
    }
    return result;
  }, [selectedContacts]);

  return (
    <div className="container">
      {/* Select Dropdown */}
      <SelectComponent
        label="Recipient Contacts"
        listStyle="col-md-6"
        name="post_frequency"
        options={post_frequency}
        isMulti={false}
        value={postFrequency} // ✅ controlled
        onChange={(val) => {
          setPostFrequency(""); // clears select
          addContactToSelected(val); // adds selected contact
        }}
      />

      {/* Add New Contact */}
      <div className="row">
        <div className="col-md-10">
          <TextInput
            label="Add New Contact"
            placeholder="Contact"
            required={true}
            value={newContact} // ✅ controlled value
            onChange={setNewContact} // ✅ updates state on typing
          />
        </div>
        <div className="col-md-2 p-4">
          <button
            className="btn col-12 a-btn-primary"
            onClick={handleAddNewContact}
          >
            Add
          </button>
        </div>
      </div>

      {/* Selected Contacts List */}
      <div
        className="p-3 my-3"
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        {selectedContacts.map((item, index) => (
          <div key={index} className="d-flex justify-content-between mb-2">
            <div>{item}</div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleRemove(item)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Forwarding Batches */}
      <h5>
        <strong>Forwarding Batches</strong>
      </h5>
      {batches.length === 0 && <p>No complete batch yet. Add more contacts.</p>}
      {batches.map((batch, index) => (
        <div
          key={index}
          className="d-flex align-items-center justify-content-between p-2 my-2"
          style={{
            border: "2px solid #8bc34a",
            borderRadius: "10px",
            backgroundColor: "#f7fff2",
          }}
        >
          <strong className="me-3">Batch {index + 1} -</strong>
          <div className="flex-grow-1">{batch.join(", ")}</div>
        </div>
      ))}
    </div>
  );
};

export default MessengerForward;
