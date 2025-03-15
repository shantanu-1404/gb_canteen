import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Aetextarea from "../components/Aetextarea";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SelectComponent from "../components/SelectComponent";
import DateInput from "../components/DateInput";
import TagInput from "../components/TagInput";
import FormHeader from "../components/FormHeader";
import FileUploadComponent from "../components/FileUploadComponent";
import AddSubsection from "../components/AddSubsection";

const AddNewPlan = () => {
  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };
  const [PostFrequency, setPostFrequency] = useState("");
  const [selectedMulti, setSelectedMulti] = useState([]);
  const [fileData, setFileData] = useState(null);

  const benefitOptions = [
    { value: "free_delivery", label: "Free Delivery" },
    { value: "discounted_prices", label: "Discounted Prices" },
    { value: "priority_support", label: "Priority Customer Support" },
    { value: "early_access", label: "Early Access to New Features" },
    { value: "exclusive_deals", label: "Exclusive Member Deals" },
    { value: "cashback_rewards", label: "Cashback Rewards" },
    { value: "extended_warranty", label: "Extended Warranty" },
    { value: "free_returns", label: "Free Returns & Exchanges" },
    { value: "loyalty_points", label: "Loyalty Points Accumulation" },
  ];
  const trialPeriodOptions = [
    { value: "7_days", label: "7 Days" },
    { value: "14_days", label: "14 Days" },
    { value: "30_days", label: "30 Days" },
    { value: "60_days", label: "60 Days" },
    { value: "90_days", label: "90 Days" },
    { value: "custom", label: "Custom Duration" },
    { value: "no_trial", label: "No Trial" },
  ];
  const pricingOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "weekly", label: "Weekly" },
    { value: "biweekly", label: "Bi-Weekly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "semi_annually", label: "Semi-Annually" },
    { value: "annually", label: "Annually" },
    { value: "one_time", label: "One-Time Payment" },
  ];
  const showPlanOptions = [
    { "value": "yes", "label": "Yes" },
    { "value": "no", "label": "No" }
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
  const handleFileChange = (file, isValid) => {
    console.log("Selected file:", file);
    console.log("Is valid:", isValid);
    setFileData(file);
  };

  return (
    <Layout>
      <Row>
        <FormHeader
          title="Add New Plan"
          backUrl="/subscription_plan"
          closeUrl="/"
        />
        <Col md={12}>
          <div className="form_section">
            <h6 className="card-title">Plan Details</h6>

            <TextInput
              label="Plan Name"
              placeholder=" Name"
              required={true}
              onChange={handleTextInputChange}
            />
            <Aetextarea
              label="Description"
              name="Description"
              placeholder="Description"
              isWordCount={true}
              wordLimit={100}
            />
            <Row>
              <SelectComponent
                label="Pricing"
                name="pricing"
                listStyle="col-md-6"
                options={pricingOptions}
                isMulti={false}
                onChange={setPostFrequency}
              />
              <TextInput
                label="Amount"
                placeholder="Amount"
                required={true}
                onChange={handleTextInputChange}
                type="number"
              />
            </Row>
            <Row>
              <SelectComponent
                label="Benefits"
                name="Benefits"
                listStyle="col-md-6"
                options={benefitOptions}
                isMulti={false}
                onChange={setPostFrequency}
              />
              <SelectComponent
                label="Trial Period"
                name="Trial Period"
                listStyle="col-md-6"
                options={trialPeriodOptions}
                isMulti={false}
                onChange={setPostFrequency}
              />
            </Row>
            <Row>
              <Col>
                <DateInput label="Start Date" type="past" />
              </Col>
              <Col>
                <DateInput label="End Date" type="future" />
              </Col>
            </Row>
            <Col md={6}>
              <SelectComponent
                label="Show Plan On The Frontend"
                name="Show Plan On The Frontend"
                listStyle="col-md-6"
                options={showPlanOptions}
                isMulti={false}
                onChange={setPostFrequency}
              />            
            </Col>
          </div>

          <div className="form-group row p-3 gap-2 text-center d-flex justify-content-end">
            <a type="submit" className="btn col-4 a-btn-primary">
              Add
            </a>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddNewPlan;
