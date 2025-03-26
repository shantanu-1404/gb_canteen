import React, { useState} from "react";
import Layout from "./layout";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SelectComponent from "../components/SelectComponent";
import FormHeader from "../components/FormHeader";
import FileUploadComponent from "../components/FileUploadComponent";
import RadioInput from "../components/RadioInput";
import DateInput from "../components/DateInput";

const AddNewBundle = () => {
  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const handleOptionChange = (selectedValue) => {
    console.log("Selected:", selectedValue);
  };

  const handleFileChange = (file, isValid) => {
    console.log("Selected file:", file);
    console.log("Is valid:", isValid);
    setFileData(file);
  };
  const [PostFrequency, setPostFrequency] = useState("");
  const [selectedMulti, setSelectedMulti] = useState([]);
  const [fileData, setFileData] = useState(null);

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" },
    { value: "deleted", label: "Deleted" },
  ];

  const selectProductOptions = [
    { value: "product_1", label: "Wireless Mouse" },
    { value: "product_2", label: "Laptop Stand" },
    { value: "product_3", label: "USB-C Hub" },
    { value: "product_4", label: "Bluetooth Keyboard" },
    { value: "product_5", label: "Noise Cancelling Headphones" },
    { value: "product_6", label: "Webcam Full HD" },
    { value: "product_7", label: "Portable SSD 1TB" },
    { value: "product_8", label: "LED Desk Lamp" },
    { value: "product_9", label: "Wireless Charger" },
    { value: "product_10", label: "Smartwatch Pro" },
  ];

  return (
    <Layout>
      <Row>
        <FormHeader title="Add New Bundle" backUrl="/bundles" closeUrl="/" />
        <Col md={12}>
          <div className="form_section">
            <h6 className="card-title">Bundle Details</h6>

            <TextInput
              label="Bundle Name"
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
            <RadioInput
              label="Discount Type -"
              name="DiscountType"
              options={[
                { label: "Percentage", value: "option1" },
                { label: "Fixed Value", value: "option2" },
              ]}
              required={true}
              onChange={handleOptionChange}
            />
            <div className="col-md-6"></div>

            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="Discount Value"
                  placeholder="Value"
                  required={true}
                  onChange={handleTextInputChange}
                  type="number"
                />
              </div>
              <div className="col-md-6">
                <SelectComponent
                  label="Status"
                  name="Status"
                  listStyle="col-md-6"
                  options={statusOptions}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
              <div className="col-md-6"></div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Row>
                  <DateInput label="Start Date" type="" />
                  <DateInput label="End Date" type="" />
                </Row>
              </div>
              <div className="col-md-6">
                <SelectComponent
                  label="Select Product"
                  name="Product"
                  listStyle="col-md-6"
                  options={selectProductOptions}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
              <div className="col-md-6"></div>
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

export default AddNewBundle;
