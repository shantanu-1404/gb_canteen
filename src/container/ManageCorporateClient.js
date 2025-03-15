import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Aetextarea from "../components/Aetextarea";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SelectComponent from "../components/SelectComponent";
import FormHeader from "../components/FormHeader";
import PhoneInput from "../components/PhoneInput";

const ManageCorporateClient = () => {
  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
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
    { value: "prospective", label: "Prospective" }
  ];
  
  return (
    <Layout>
      <Row>
        <FormHeader
          title="Manage Corporate Clients"
          backUrl="/corporate_catering"
          closeUrl="/"
        />
        <Col md={12}>
          <div className="form_section">
            <TextInput
              label="Company Name"
              placeholder="Name"
              required={true}
              onChange={handleTextInputChange}
            />

            <TextInput
              label="Contact Person Name"
              placeholder="Name"
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
              <div className="col-md-6">
                <TextInput
                  label="Email"
                  type="email"
                  placeholder="yourname@company.com"
                />
              </div>
            </div>
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
            <div className="row">
              <div className="col-md-6">
                <SelectComponent
                  label="Preferred Payment Method"
                  name="Preferred Payment Method"
                  listStyle="col-md-6"
                  options={preferred_payment_method}
                  isMulti={false}
                  onChange={setSelectedSingle}
                />
              </div>
              <div className="col-md-6">
              <SelectComponent
                  label="Client Status"
                  name="Client Status"
                  listStyle="col-md-6"
                  options={client_status }
                  isMulti={false}
                  onChange={setSelectedSingle}
                />
              </div>
            </div>
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

export default ManageCorporateClient;
