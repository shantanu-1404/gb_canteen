import React, { useState } from "react";
import Layout from "./layout";

import FormHeader from "../components/FormHeader";
import SelectComponent from "../components/SelectComponent";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TagInput from "../components/TagInput";
import DateInput from "../components/DateInput";
import PhoneInput from "../components/PhoneInput";
import CheckboxInput from "../components/CheckboxInput";

const AddNewCustomer = () => {
  const [fileData, setFileData] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedSingle, setSelectedSingle] = useState("");


  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };


  const handleAgreementChange = (isChecked) => {
    console.log("User agreed:", isChecked);
  };

  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
  ];
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    { value: "zh", label: "Chinese (Mandarin)" },
    { value: "ja", label: "Japanese" },
    { value: "hi", label: "Hindi" },
    { value: "ar", label: "Arabic" },
    { value: "ru", label: "Russian" },
    { value: "ko", label: "Korean" },
    { value: "tr", label: "Turkish" },
    { value: "nl", label: "Dutch" },
  ];
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non_binary", label: "Non-Binary" },
    { value: "prefer_not_say", label: "Prefer Not to Say" },
    { value: "other", label: "Other" },
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
      <FormHeader title="Add New Customer" backUrl="/products" closeUrl="/" />
      <Row>
        <Col md={7}>
          <div className="form_section">
            <h6 className="card-title">Customer Details</h6>
            <Row>
              <TextInput
                label="First Name"
                placeholder="Name"
                required={true}
                onChange={handleTextInputChange}
              />
              <TextInput
                label="Last Name"
                placeholder="Name"
                required={true}
                onChange={handleTextInputChange}
              />
            </Row>

            <SelectComponent
              label="Language"
              name="Language "
              options={languageOptions}
              isMulti={false}
              onChange={setSelectedSingle}
            />
            <Row>
              <SelectComponent
                label="Gender"
                name="Gender"
                options={genderOptions}
                isMulti={false}
                onChange={setSelectedSingle}
              />
              <DateInput
              label="Date Of Birth"
              includeTime={false} />
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
            <CheckboxInput
              label="Customer agreed to receive emails"
              onChange={handleAgreementChange}
            />
            <CheckboxInput
              label="Customer agreed to receive text SMS"
              onChange={handleAgreementChange}
            />
          </div>
          <div className="form_section">
            <h6 className="card-title">Location Details</h6>
            <TextInput
              label="Address"
              placeholder="Address"
              required={true}
              onChange={handleTextInputChange}
            />
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="Street"
                  placeholder="Street"
                  required={true}
                  onChange={handleTextInputChange}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="City"
                  placeholder="City"
                  required={true}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="State"
                  placeholder="State"
                  required={true}
                  onChange={handleTextInputChange}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Postal Code"
                  placeholder="Code"
                  required={true}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>
            <SelectComponent
              label="Delivery Zone"
              name="Recurrence"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />
          </div>
        </Col>

        <Col md={5}>
          <div className="form_section">
            <h6 className="card-title">Tax Exemption</h6>
            <CheckboxInput
              label="Collect Tax"
              onChange={handleAgreementChange}
            />
          </div>
          <div className="form_section">
            <h6 className="card-title">Note</h6>
            <TextInput
              placeholder="Write here..."
              required={true}
              onChange={handleTextInputChange}
            />
          </div>
          <div className="form_section">
            <TagInput
              availableTags={availableTags}
              onTagsChange={handleTagsChange}
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

export default AddNewCustomer;
