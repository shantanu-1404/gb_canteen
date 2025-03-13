import React, { useState } from "react";
import Layout from "./layout";
import FormHeader from "../components/FormHeader";
import SelectComponent from "../components/SelectComponent";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateInput from "../components/DateInput";
import Button from "../components/Button";

const App= () => {
  const [selectedSingle, setSelectedSingle] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 3; // ✅ Define Total Steps

  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // ✅ Calculate Progress Percentage
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <Layout>
      <FormHeader
        title="Add New Gift Card"
        backUrl="/products/giftcards"
        closeUrl="/"
      />

      {/* ✅ Progress Bar */}
      <div className="progress-container" style={{ margin: "20px 0" }}>
        <div
          className="progress-bar"
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: "#4CAF50",
            height: "8px",
            borderRadius: "5px",
          }}
        ></div>
        <p style={{ textAlign: "center", marginTop: "5px", fontSize: "14px" }}>
          Step {currentStep} of {totalSteps} ({progressPercentage.toFixed(0)}% Complete)
        </p>
      </div>

      <Row>
        <Col md={12}>
          {/* ✅ Step 1: Product Details */}
          {currentStep === 1 && (
            <div className="form_section">
              <h6 className="card-title">Product Details</h6>
              <TextInput
                label="Gift Card Code"
                placeholder="Predefined Code"
                required={true}
                onChange={handleTextInputChange}
              />
              <TextInput
                label="Issued By"
                placeholder="Predefined"
                required={true}
                onChange={handleTextInputChange}
              />
              <SelectComponent
                label="Issued to"
                name="Issued to"
                options={options}
                isMulti={false}
                onChange={setSelectedSingle}
              />
              <Row>
                <Col md={6}>
                  <DateInput label="Creation Date" type="past" />
                </Col>
                <Col md={6}>
                  <DateInput label="Expiration Date" type="future" />
                </Col>
              </Row>
            </div>
          )}

          {/* ✅ Step 2: More Details */}
          {currentStep === 2 && (
            <div className="form_section">
              <h6 className="card-title">More Details</h6>
              <SelectComponent
                label="Initial Value"
                name="Initial Value"
                options={options}
                isMulti={false}
                onChange={setSelectedSingle}
              />
              <SelectComponent
                label="Status"
                name="Status"
                options={options}
                isMulti={false}
                onChange={setSelectedSingle}
              />
              <TextInput
                label="Security Features (Security Code)"
                placeholder="Code"
                required={true}
                onChange={handleTextInputChange}
              />
            </div>
          )}

          {/* ✅ Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div className="form_section">
              <h6 className="card-title">Review & Submit</h6>
              <p>Please review all the details before submitting.</p>
            </div>
          )}
        </Col>
      </Row>

      {/* ✅ Navigation Buttons */}
      <div className="form-group row p-3 gap-2 text-center d-flex justify-content-between">
        <Button label="Previous" onClick={prevStep} disabled={currentStep === 1} />
        <Button label={currentStep === totalSteps ? "Submit" : "Next"} onClick={nextStep} />
      </div>
    </Layout>
  );
};

export default App;
