import React, { useState, useEffect, useMemo } from "react";
import Layout from "./layout";
import Aetextarea from "../components/Aetextarea";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SelectComponent from "../components/SelectComponent";
import FormHeader from "../components/FormHeader";
import PhoneInput from "../components/PhoneInput";
import Button from "../components/Button";

const WhatsappAppMessengerForward = () => {
  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const [selectedMulti, setSelectedMulti] = useState([]);

  const [selectedContacts, setSelectedContacts] = useState([]);
  const [newContact, setNewContact] = useState("");
  const [postFrequency, setPostFrequency] = useState("");
  const [progress, setProgress] = useState(0);
  const [isForwarding, setIsForwarding] = useState(false);

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
  const handleStartForwarding = () => {
    setIsForwarding(true);
    let val = 0;
    const interval = setInterval(() => {
      val += 10;
      setProgress(val);
      if (val >= 100) {
        clearInterval(interval);
        setIsForwarding(false);
      }
    }, 500); // updates every 0.5s
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
    <Layout>
      <div className="form-group row p-0  text-center d-flex justify-content-end">
        <Button label="Bulk Upload" buttonType="bulkuplaod" />
      </div>
      <Row>
        <div className="form_section">
          {/* Select Dropdown */}
          <Aetextarea
            label="Message to Forward"
            name="Message"
            placeholder="Type your message here ..."
          />
          <SelectComponent
            label="Recipient Contacts"
            listStyle="col-md-6"
            name="post_frequency"
            options={post_frequency}
            isMulti={false}
            value={postFrequency}
            onChange={(val) => {
              setPostFrequency(val);
              handleAddSelected(val);
            }}
          />
          {/* Add New Contact */}
          <div className="row">
            <div className="col-md-10">
              <TextInput
                label="Add New Contact"
                placeholder="Contact"
                required={true}
                value={newContact}
                onChange={setNewContact}
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
          {batches.length === 0 && (
            <p>No complete batch yet. Add more contacts.</p>
          )}
          {batches.map((batch, index) => (
            <div
              key={index}
              className="batch d-flex align-items-center justify-content-between p-2 my-3"
            >
              <strong className="me-3">Batch {index + 1} -</strong>
              <div className="flex-grow-1">{batch.join(", ")}</div>
            </div>
          ))}
          <TextInput
            label="Delay Between Batches"
            placeholder="In Seconds"
            required={true}
            onChange={handleTextInputChange}
          />
          <h6>Forwarding Progress</h6>
          <div
            className="progress"
            style={{
              width: "100%",
              height: "10px",
              borderRadius: "20px",
              backgroundColor: "#DDDDDD", // remaining part
              overflow: "hidden",
            }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${progress}%`,
                height: "100%",
                backgroundColor: "#95DD0A", // progress bar
                transition: "width 0.4s ease-in-out",
              }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>{" "}
        </div>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            label="Forward Messages"
            onClick={handleStartForwarding}
          />
        </div>
      </Row>
    </Layout>
  );
};

export default WhatsappAppMessengerForward;
