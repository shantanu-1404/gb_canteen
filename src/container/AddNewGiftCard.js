import React, { useState } from "react";
import Layout from "./layout";

import FormHeader from "../components/FormHeader";
import SelectComponent from "../components/SelectComponent";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateInput from "../components/DateInput";

const AddNewGiftCard = () => {
  const [selectedSingle, setSelectedSingle] = useState("");

  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
  ];

  return (
    <Layout>
      <FormHeader
        title="Add New Gift Card"
        backUrl="/products/giftcards"
        closeUrl="/"
      />
      <Row>
        <Col md={7}>
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
        </Col>

        <Col md={5}>
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

          <div className="form-group row p-3 gap-2 text-center">
            <a type="submit" className="btn col a-btn-primary">
              Save and continue later
            </a>
            <a type="submit" className="btn col-4 a-btn-primary">
              Next
            </a>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddNewGiftCard;
