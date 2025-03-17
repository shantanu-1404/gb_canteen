import React, { useState } from "react";
import Layout from "./layout";

import FormHeader from "../components/FormHeader";
import FileUploadComponent from "../components/FileUploadComponent";
import SelectComponent from "../components/SelectComponent";
import Aetextarea from "../components/Aetextarea";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TagInput from "../components/TagInput";
import TabComponent from "../components/InventaryPanel";
import DateInput from "../components/DateInput";
import PhoneInput from "../components/PhoneInput";
import CheckboxInput from "../components/CheckboxInput";

const AddNewShipment = () => {
  const [fileData, setFileData] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedSingle, setSelectedSingle] = useState("");

  // Handle caption change
  const handleCaptionChange = (text) => {
    setMessage(text);
  };
  const handleAgreementChange = (isChecked) => {
    console.log("User agreed:", isChecked);
  };
  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const handleFileChange = (file, isValid) => {
    console.log("Selected file:", file);
    console.log("Is valid:", isValid);
    setFileData(file);
  };

  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
  ];

  const handleTagsChange = (tags) => {
    console.log("Selected Tags:", tags);
  };
  const availableTags = [
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Angular",
    "Vue",
    "Python",
    "Django",
    "Flask",
  ];

  return (
    <Layout>
      <FormHeader title="Add New Shipment" backUrl="/products" closeUrl="/" />
      <Row>
        <Col md={7}>
          <div className="form_section">
            <h6 className="card-title">Sender & Recipient Details</h6>
            <TextInput
              label=" Sender's Address"
              placeholder="Title"
              required={true}
              onChange={handleTextInputChange}
            />
            <Row>
              <TextInput
                label=" Sender's Address"
                placeholder="Title"
                required={true}
                onChange={handleTextInputChange}
              />
              <PhoneInput
                label="Recipient Contact Number"
                placeholder="Enter your mobile number"
              />
            </Row>
            <TextInput
              label=" Destination Address"
              placeholder="Title"
              required={true}
              onChange={handleTextInputChange}
            />
          </div>

          <div className="form_section">
            <Row>
              <SelectComponent
                label="Shipping Carrier"
                name="Shipping Carrier"
                options={options}
                isMulti={false}
                onChange={setSelectedSingle}
              />
              <SelectComponent
                label="Shipping Method"
                name="Shipping Method"
                options={options}
                isMulti={false}
                onChange={setSelectedSingle}
              />
            </Row>

            <DateInput label="End Date" includeTime={true} />
          </div>
        </Col>

        <Col md={5}>
          <div className="form_section">
            <h6 className="card-title">Payment Summary</h6>
          </div>

          <div className="form_section">
            <h6 className="card-title">Package Protection & Instructions</h6>

            <SelectComponent
              label="Insurance Coverage"
              name="Insurance Coverage"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />
            <Aetextarea
              label="TextArea (limited)"
              name="description"
              placeholder="Enter your description..."
              isWordCount={true}
              wordLimit={100}
            />
            <FileUploadComponent
              label="Recommended Size - 1350px X 1080px"
              name="imageUpload"
              allowedClasses="image"
              onChange={handleFileChange}
            />
         <CheckboxInput
              label="Check if the item is fragile and requires special handling."
              onChange={handleAgreementChange}
            />
          </div>
          <div className="form-group row p-3 gap-2 text-center">
            <a type="submit" className="btn col a-btn-primary">
              Save and continue later
            </a>
            <a type="submit" className="btn col-4 a-btn-primary">
              Add
            </a>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddNewShipment;
