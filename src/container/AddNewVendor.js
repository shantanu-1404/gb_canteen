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
import DateInput from "../components/DateInput";
import PhoneInput from "../components/PhoneInput";
import AddSubsection from "../components/AddSubsection";
import CheckboxInput from "../components/CheckboxInput";

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

  const spicelevel = [
    { label: "Mild", value: "spice1" },
    { label: "Medium", value: "spice2" },
    { label: "Hot", value: "spice3" },
  ];
  const allergens = [
    { label: "Peanuts", value: "allergen1" },
    { label: "Dairy", value: "allergen2" },
    { label: "Gluten", value: "allergen3" },
    { label: "Soy", value: "allergen4" },
    { label: "Eggs", value: "allergen5" },
    { label: "Shellfish", value: "allergen6" },
    { label: "Tree Nuts", value: "allergen7" },
    { label: "Sesame", value: "allergen8" },
  ];
  const dietaryLabels = [
    { label: "Vegetarian", value: "diet1" },
    { label: "Vegan", value: "diet2" },
    { label: "Gluten-Free", value: "diet3" },
    { label: "Keto", value: "diet4" },
    { label: "Paleo", value: "diet5" },
    { label: "Dairy-Free", value: "diet6" },
    { label: "Nut-Free", value: "diet7" },
    { label: "Low-Carb", value: "diet8" },
  ];
  const paymentTerms = [
    { label: "Net 30", value: "payment1" },
    { label: "Net 60", value: "payment2" },
    { label: "Net 90", value: "payment3" },
    { label: "Due on Receipt", value: "payment4" },
    { label: "Installments", value: "payment5" },
    { label: "Cash on Delivery (COD)", value: "payment6" },
    { label: "Advance Payment", value: "payment7" },
    { label: "Partial Payment", value: "payment8" },
  ];
  const packagingRequirements = [
    { label: "Eco-Friendly", value: "packaging1" }, // Sustainable & biodegradable
    { label: "Recyclable", value: "packaging2" }, // Made from recyclable materials
    { label: "Compostable", value: "packaging3" }, // Can be composted
    { label: "Minimal Packaging", value: "packaging4" }, // Reduced waste packaging
    { label: "Plastic-Free", value: "packaging5" }, // No plastic used
    { label: "Biodegradable", value: "packaging6" }, // Breaks down naturally
    { label: "Reusable", value: "packaging7" }, // Can be used multiple times
    { label: "Vacuum Sealed", value: "packaging8" }, // Airtight packaging
    { label: "Tamper-Proof", value: "packaging9" }, // Sealed for security
    { label: "Temperature-Controlled", value: "packaging10" }, // Maintains specific temperature
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
  const handleAgreementChange = (isChecked) => {
    console.log("User agreed:", isChecked);
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
          <div className="row mt-3 mb-6 form-step" id="step-3">
            <div className="">
           <AddSubsection Cardtitle="Menu Items" layoutType="card">
           
              <TextInput
                label="Dish Name"
                required={true}
                placeholder="Name"
                onChange={handleTextInputChange}
              />
              <FileUploadComponent
                label="Recommended Size - 1350px X 1080px"
                name="imageUpload"
                allowedClasses="image"
                onChange={handleFileChange}
              />
              <Aetextarea
                label="Description"
                name="Description"
                placeholder="Description"
                onChange={handleCaptionChange}
                
              />
              <Row>
                <SelectComponent
                  label="Spice Level"
                  name="Spice Level"
                  options={spicelevel}
                  isMulti={false}
                  onChange={setSelectedSingle}
                />
                <TextInput
                  label="Price"
                  required={true}
                  placeholder="Amount"
                  onChange={handleTextInputChange}
                  type="number"
                />
              </Row>
              <Row>
                <SelectComponent
                  label="Allergens"
                  name="Allergens"
                  options={allergens}
                  isMulti={false}
                  onChange={setSelectedSingle}
                />
                <SelectComponent
                  label="Dietary Labels"
                  name="Recurrence"
                  options={dietaryLabels}
                  isMulti={false}
                  onChange={setSelectedSingle}
                />
              </Row>
            </AddSubsection>
            </div>
            <div className="form_section">
              <h6 className="card-title">Bulk Upload</h6>
              <FileUploadComponent
                label="Recommended Size - 1350px X 1080px"
                name="imageUpload"
                allowedClasses="image"
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}
        {/*-------------------------------------------------------------------------Page four------------------------------------------------------- */}
        {/* Step 4 - Revenue Share Agreement */}
        {activeStep === 4 && (
          <div className="row mt-3 mb-5 form-step" id="step-4">
            <Row>
              <Col md={7}>
                <div className="form_section">
                  <h6 className="card-title">Revenue Share Agreement</h6>
                  <TextInput
                    label="Platform Commission Percentage"
                    info="Defines the platform's cut from each order"
                    placeholder="0%"
                    required={true}
                    onChange={handleTextInputChange}
                  />
                  <SelectComponent
                    label="Payment Terms"
                    name="Payment"
                    options={paymentTerms}
                    isMulti={false}
                    onChange={setSelectedSingle}
                    info="Specifies how and when payments are made to the restaurant"
                  />
                </div>
                <div className="form_section">
                  <h6 className="card-title">Service Level Expectations</h6>
                  <SelectComponent
                    label="Packaging Requirements"
                    name="Packaging Requirements"
                    options={packagingRequirements}
                    isMulti={false}
                    onChange={setSelectedSingle}
                    info="Allows the user to specify packaging standards to ensure consistency in handling and delivery"
                  />
                </div>
              </Col>

              <Col md={5}>
                <div className="form_section">
                  <h6 className="card-title">Custom Terms </h6>
                  <TextInput
                    placeholder="Add term"
                    required={true}
                    onChange={handleTextInputChange}
                  />
                  <Row>
                    <Col>
                      <DateInput label="Start Date" type="past" />
                    </Col>
                    <Col>
                      <DateInput label="End Date" type="future" />
                    </Col>
                  </Row>
                  <CheckboxInput
                    label="I have read and agree to the"
                    linkText="Terms and Conditions"
                    linkUrl="/"
                    onChange={handleAgreementChange}
                  />
                  <div className="form-group row gap-2 text-center">
                    <a type="submit" className="btn col-4 a-btn-primary">
                      Save for later
                    </a>
                    <a type="submit" className="btn col-4 a-btn-primary">
                      Activate
                    </a>
                  </div>
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
        {/*-------------------------------------------------------------------------Page five------------------------------------------------------- */}
        {activeStep === 5 && (
          <div className="row mt-3 mb-5 form-step" id="step-5">
            <div className="form_section">
              <h6 className="card-title">Training Modules</h6>
              <AddSubsection
                Cardtitle="Add Packaging Guidelines"
                layoutType="list"
              ></AddSubsection>
              <FileUploadComponent
                label="Recommended Size - 1350px X 1080px"
                name="imageUpload"
                allowedClasses="image"
                onChange={handleFileChange}
              />

              <AddSubsection
                Cardtitle="Platform Usage Tutorials"
                layoutType="list"
              ></AddSubsection>
            </div>
          </div>
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
