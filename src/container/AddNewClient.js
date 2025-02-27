import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Aetextarea from "../components/Aetextarea";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SelectComponent from "../components/SelectComponent";
import FormHeader from "../components/FormHeader";
import PhoneInput from "../components/PhoneInput";

const AddNewClient = () => {
  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };
  const [PostFrequency, setPostFrequency] = useState("");
  const [selectedMulti, setSelectedMulti] = useState([]);
  const post_frequency = [
    { value: "1", label: "Only once" },
    { value: "2", label: "Daily" },
    { value: "3", label: "Weekly" },
    { value: "4", label: "Monthly" },
  ];

  return (
    <Layout>
      <Row>
        <FormHeader
          title="Add New Client"
          backUrl="/social-media/projects"
          closeUrl="/"
        />
        <Col md={12}>
          <div className="form_section">
            <h6 className="card-title">Client Details</h6>
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
                <SelectComponent
                  label="Industry"
                  name="post_frequency"
                  listStyle="col-md-6"
                  options={post_frequency}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="Number of Profile Managed"
                  placeholder="Profile Managed"
                  required={true}
                  onChange={handleTextInputChange}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Number Of Employees"
                  placeholder="Number"
                  type="number"
                  required={true}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <SelectComponent
                  label="Status"
                  listStyle="col-md-6"
                  name="post_frequency"
                  options={post_frequency}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
              <div className="col-md-6">
                <SelectComponent
                  label="Assigned Team Members"
                  listStyle="col-md-6"
                  name="post_frequency"
                  options={post_frequency}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
            </div>
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
            <h6 className="card-title">Address Details</h6>

            <div className="col-md-12">
              <Aetextarea
                label="TextArea"
                name="address"
                placeholder="Enter your address..."
              />
            </div>

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
            <div className="col-md-12">
              <Aetextarea
                label="Preferred Location"
                name="Location"
                placeholder="Location"
              />
            </div>
          </div>

          <div className="form-group row p-3 gap-2 text-center d-flex justify-content-end">
            <a type="submit" className="btn col-4 a-btn-primary">
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

export default AddNewClient;
