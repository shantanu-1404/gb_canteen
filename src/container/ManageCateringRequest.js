import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Aetextarea from "../components/Aetextarea";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SelectComponent from "../components/SelectComponent";
import FormHeader from "../components/FormHeader";
import PhoneInput from "../components/PhoneInput";
import DateInput from "../components/DateInput";
import CheckboxInput from "../components/CheckboxInput";

const ManageCateringRequest = () => {
  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const handleOptionChange = (selectedValue) => {
    console.log("Selected:", selectedValue);
  };
  const handleAgreementChange = (isChecked) => {
    console.log("User agreed:", isChecked);
  };

  const [selectedSingle, setSelectedSingle] = useState("");
  const preferred_payment_method = [
    { value: "credit_card", label: "Credit Card" },
    { value: "debit_card", label: "Debit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "cash", label: "Cash" },
    { value: "cryptocurrency", label: "Cryptocurrency" },
    { value: "mobile_payment", label: "Mobile Payment" },
    { value: "gift_card", label: "Gift Card" },
  ];
  const client_status = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "suspended", label: "Suspended" },
    { value: "terminated", label: "Terminated" },
    { value: "prospective", label: "Prospective" },
  ];

  return (
    <Layout>
      <Row>
        <FormHeader
          title="Manage Catering Request"
          backUrl="/manage-corporate-client"
          closeUrl="/"
        />
        <Col md={12}>
          <div className="form_section">
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="Client Name"
                  placeholder="Name"
                  required={true}
                  onChange={handleTextInputChange}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Event Type"
                  placeholder="Type"
                  required={true}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="Number of People"
                  placeholder="Number of People"
                  required={true}
                  onChange={handleTextInputChange}
                  type="number"
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Budget"
                  placeholder="Budget"
                  required={true}
                  onChange={handleTextInputChange}
                  type="number"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <SelectComponent
                  label="Menu Preferences"
                  name="Menu Preferences"
                  listStyle="col-md-6"
                  options={preferred_payment_method}
                  isMulti={false}
                  onChange={setSelectedSingle}
                />
              </div>
              <div className="col-md-6">
                <SelectComponent
                  label="Quantity"
                  name="Quantity"
                  listStyle="col-md-6"
                  options={preferred_payment_method}
                  isMulti={false}
                  onChange={setSelectedSingle}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <SelectComponent
                  label="Recurring Orders"
                  name="Recurring Orders"
                  listStyle="col-md-6"
                  options={preferred_payment_method}
                  isMulti={false}
                  onChange={setSelectedSingle}
                />
              </div>
              <div className="col-md-6">
                <DateInput
                  label="Date & Time"
                  includeTime={true}
                  type="future"
                />
              </div>
            </div>
            <Aetextarea
              label="Delivery Instruction"
              name="address"
              placeholder="Instruction"
            />
            <Aetextarea
              label="Special Requests"
              name="address"
              placeholder="Requests"
            />
            <Row>
              <CheckboxInput
              label="Add-On Option 1"
              onChange={handleAgreementChange}
            />
              <CheckboxInput
              label="Add-On Option 2"
              onChange={handleAgreementChange}
            />
              <CheckboxInput
              label="Add-On Option 3"
              onChange={handleAgreementChange}
            />
              <CheckboxInput
              label="Add-On Option 4"
              onChange={handleAgreementChange}
            />
              <CheckboxInput
              label="Add-On Option 5"
              onChange={handleAgreementChange}
            />
            </Row>
            
            <TextInput
              placeholder="Specify any other Add-Ons"
              required={true}
              onChange={handleTextInputChange}
             
            />
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

export default ManageCateringRequest;
