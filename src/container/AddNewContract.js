import React, { useState } from "react";
import Layout from "./layout";

import FormHeader from "../components/FormHeader";
import FileUploadComponent from "../components/FileUploadComponent";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddNewContract = () => {
  const [fileData, setFileData] = useState(null);

  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const handleFileChange = (file, isValid) => {
    console.log("Selected file:", file);
    console.log("Is valid:", isValid);
    setFileData(file);
  };

  return (
    <Layout>
      <FormHeader title="Add New Contract" backUrl="/" closeUrl="/" />
      <Row>
        <Col lg={12}>
          <div className="form_section">
            <h6 className="card-title">Contract Information</h6>
            <Row>
              <TextInput
                label="Contract Name "
                placeholder="Contract Name  "
                required={true}
                onChange={handleTextInputChange}
              />
              <TextInput
                label="Account ID"
                placeholder="Account ID"
                required={true}
                onChange={handleTextInputChange}
              />
            </Row>
            <Row>
              <TextInput
                label="General Service Passphrase "
                placeholder="General Service Passphrase  "
                required={true}
                onChange={handleTextInputChange}
              />
              <TextInput
                label="Tracking Service Passphrase"
                placeholder="Tracking Service Passphrase"
                required={true}
                onChange={handleTextInputChange}
              />
            </Row>
            <br />
            <br />
            <div className="btn-sack">
              <Button label="Add This Contract" />
            </div>
          </div>

          <div className="form_section">
            <h6 className="card-title">Contract Prices</h6>
            <div className="form-group p-3 gap-2 d-flex justify-content-end">
              <a type="submit" className="btn col-4 a-btn-primary">
                Download CSV
              </a>
            </div>
            <FileUploadComponent
              label="Recommended Size - 1350px X 1080px"
              name="imageUpload"
              allowedClasses="image"
              onChange={handleFileChange}
            />
            <br />
            <br />
            <div className="btn-sack">
              <Button label="Save This Prices" />
            </div>
          </div>
          <div className="form-group row p-3 gap-2 d-flex justify-content-end">
            <a type="submit" className="btn col-4 a-btn-primary">
              Save
            </a>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddNewContract;
