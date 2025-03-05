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
import RadioInput from "../components/RadioInput";
import PhoneInput from "../components/PhoneInput";

const AddNewCollection = () => {
  const [fileData, setFileData] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedSingle, setSelectedSingle] = useState("");

  // Handle caption change
  const handleCaptionChange = (text) => {
    setMessage(text);
  };

  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const handleFileChange = (file, isValid) => {
    console.log("Selected file:", file);
    console.log("Is valid:", isValid);
    setFileData(file);
  };
  const handleOptionChange = (selectedValue) => {
    console.log("Selected:", selectedValue);
  };

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

  const options = [
    { label: "Hidden", value: "credit" },
    { label: "Visible", value: "paypal" },
  ];
  const [activeStep, setActiveStep] = useState(1);

  // Navigate to the previous step
  const prevStep = () => {
    setActiveStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };
  // Navigate to the next step
  const nextStep = () => {
    setActiveStep((prevStep) => (prevStep < 6 ? prevStep + 1 : prevStep));
  };
  // Navigate to the selected step directly
  const navigateToStep = (step) => {
    setActiveStep(step);
  };

  return (
    <Layout>
      <FormHeader
        title="Add New Vendor"
        backUrl="/vendoronboarding"
        closeUrl="/"
      />
      <form
        id="restaurant-application-form"
        method="post"
        action="/restaurant/submitApplication"
        enctype="multipart/form-data"
      >
        <div className="row mt-5">
          {/* Roadmap Step Navigation */}
          {[
            "Vendor Application Form",
            "Document Verification",
            "Menu Management",
            "Contract Agreement",
            "Training & Guidelines",
            "Approval and Go-Live",
          ].map((stepName, index) => (
            <div key={index} className="col-md">
              <div
                onClick={() => navigateToStep(index + 1)}
                className={`d-flex gap-2 align-items-center step ${
                  activeStep === index + 1 ? "active" : ""
                }`}
              >
                <span>{index + 1}</span>
                <a>{stepName}</a>
              </div>
            </div>
          ))}
        </div>
        {/*-------------------------------------------------------------------------Page one------------------------------------------------------- */}
        {activeStep === 1 && (
          <div className="row justify-content-center">
            <Row>
              <Col md={7}>
                <div className="form_section">
                  <h6 className="card-title">General Information</h6>
                  <TextInput
                    label="Vendor Name"
                    placeholder="Name"
                    required={true}
                    onChange={handleTextInputChange}
                  />
                  <FileUploadComponent
                    label="Recommended Size - 1350px X 1080px"
                    name="imageUpload"
                    allowedClasses="image"
                    onChange={handleFileChange}
                  />
                  <TextInput
                    label="Contact Person Name"
                    placeholder="Person Name"
                    required={true}
                    onChange={handleTextInputChange}
                  />
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
                  <h6 className="card-title">Cuisine Information</h6>
                  <SelectComponent
                    label="Cuisine Types"
                    name="Recurrence"
                    options={options}
                    isMulti={false}
                    onChange={setSelectedSingle}
                  />
                  <TagInput
                    availableTags={availableTags}
                    onTagsChange={handleTagsChange}
                  />
                </div>

                <div className="form-group row p-3 gap-2 text-center">
                  <a type="submit" className="btn col-4 a-btn-primary">
                    Save
                  </a>
                </div>
              </Col>
            </Row>
          </div>
        )}
        {/*-------------------------------------------------------------------------Page two------------------------------------------------------- */}
        {activeStep === 2 && (
          <div className="row mt-3 mb-5 form-step" id="step-2">
            <div className="row justify-content-center">
              <Row>
                <Col md={12}>
                  <div className="form_section">
                    <h6 className="card-title">Uploaded Documents</h6>

                    <Row>
                      <FileUploadComponent
                        label="Recommended Size - 1350px X 1080px"
                        name="imageUpload"
                        allowedClasses="image"
                        onChange={handleFileChange}
                      />

                      <FileUploadComponent
                        label="Recommended Size - 1350px X 1080px"
                        name="imageUpload"
                        allowedClasses="image"
                        onChange={handleFileChange}
                      />
                    </Row>

                    <Row>
                      <FileUploadComponent
                        label="Recommended Size - 1350px X 1080px"
                        name="imageUpload"
                        allowedClasses="image"
                        onChange={handleFileChange}
                      />
                      <FileUploadComponent
                        label="Recommended Size - 1350px X 1080px"
                        name="imageUpload"
                        allowedClasses="image"
                        onChange={handleFileChange}
                      />
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}

        {/*-------------------------------------------------------------------------Page three------------------------------------------------------- */}
        {activeStep === 3 && (
          <div className="row mt-3 mb-6 form-step" id="step-3"></div>
        )}
        {/*-------------------------------------------------------------------------Page four------------------------------------------------------- */}
        {/* Step 4 - Revenue Share Agreement */}
        {activeStep === 4 && (
          <div className="row mt-3 mb-5 form-step" id="step-4"></div>
        )}
        {/*-------------------------------------------------------------------------Page five------------------------------------------------------- */}
        {activeStep === 5 && (
          <div className="row mt-3 mb-5 form-step" id="step-5"></div>
        )}
        {/*-------------------------------------------------------------------------Page six------------------------------------------------------- */}

        {activeStep === 6 && (
          <div className="row mt-3 mb-5 form-step" id="step-5"></div>
        )}
      </form>
    </Layout>
  );
};

export default AddNewCollection;
