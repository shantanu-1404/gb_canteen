import React, { useState, useEffect } from "react";
import Layout from "./layout";

import FormHeader from "../components/FormHeader";
import SelectComponent from "../components/SelectComponent";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInput from "../components/CheckboxInput";
import RadioInput from "../components/RadioInput";

const ShipmentDefaultSetting = () => {
  const [fileData, setFileData] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedSingle, setSelectedSingle] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOptionChange = (selectedValue) => {
    console.log("Selected:", selectedValue);
  };

  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const handleAgreementChange = (isChecked) => {
    console.log("User agreed:", isChecked);
  };

  const preferred_shipping_methods = [
    { value: "standard", label: "Standard Shipping" },
    { value: "express", label: "Express Shipping" },
    { value: "overnight", label: "Overnight Shipping" },
    { value: "two_day", label: "2-Day Shipping" },
    { value: "same_day", label: "Same-Day Delivery" },
    { value: "economy", label: "Economy Shipping" },
    { value: "freight", label: "Freight Shipping" },
    { value: "local_courier", label: "Local Courier Delivery" },
    { value: "pickup", label: "In-Store Pickup" },
    { value: "drone", label: "Drone Delivery" },
    { value: "white_glove", label: "White Glove Delivery" },
  ];

  const default_reasons_for_export = [
    { value: "sale", label: "Sale of Goods" },
    { value: "gift", label: "Gift" },
    { value: "repair", label: "Repair & Return" },
    { value: "return", label: "Return to Seller" },
    { value: "sample", label: "Product Sample" },
    { value: "personal", label: "Personal Use" },
    { value: "commercial", label: "Commercial Purpose" },
    { value: "exhibition", label: "Exhibition or Trade Show" },
    { value: "charity", label: "Charity Donation" },
    { value: "military", label: "Military Use" },
    { value: "scientific", label: "Scientific Research" },
    { value: "diplomatic", label: "Diplomatic Shipment" },
    { value: "warranty", label: "Warranty Replacement" },
    { value: "intercompany", label: "Intercompany Transfer" },
    { value: "other", label: "Other (Specify)" },
  ];

  return (
    <Layout>
      <FormHeader title="Shipment Defaults Settings" backUrl="/" closeUrl="/" />

      <div className="form_section">
        <h6 className="card-title">Shipping Settings</h6>
        <Row>
          <TextInput
            label="Standard package weight "
            placeholder="kg"
            required={true}
            onChange={handleTextInputChange}
            type="number"
          />
          <SelectComponent
            label="Preferred Shipping Method"
            name="Preferred Shipping Method"
            listStyle="col-md-6"
            options={preferred_shipping_methods}
            isMulti={false}
            onChange={setSelectedSingle}
          />
        </Row>
        <Row>
          <Col md={6}>
            <SelectComponent
              label="Default Reason For Export"
              name="Default Reason For Export"
              listStyle="col-md-6"
              options={default_reasons_for_export}
              isMulti={false}
              onChange={setSelectedSingle}
            />
          </Col>
        </Row>
        <CheckboxInput
          label="Display order reference on shipping label"
          onChange={handleAgreementChange}
        />
        <CheckboxInput
          label="Include postage paid logo on letter labels"
          onChange={handleAgreementChange}
        />
        <CheckboxInput
          label="Add QR code to unstamped letter labels"
          onChange={handleAgreementChange}
        />
        <CheckboxInput
          label="Utilize order number as invoice number for customs clearance"
          onChange={handleAgreementChange}
        />
      </div>

      <div className="form_section">
        <h6 className="card-title">Customise Your Shipping Recommendations</h6>
        <RadioInput
          label="Shipment Origin -"
          name="ShipmentOrigin"
          options={[
            { label: "Pickup", value: "Pickup" },
            { label: "Drop - Off", value: "DropOff" },
          ]}
          required={true}
          onChange={handleOptionChange}
        />
        <RadioInput
          label="Shipment Destination -"
          name="ShipmentDestination"
          options={[
            { label: "To Home", value: "credit" },
            { label: "To Pickup Location", value: "PickupLocation" },
            { label: "To Mailbox", value: "Mailbox" },
            { label: "To PO Box", value: "ToPOBox" },
          ]}
          required={true}
          onChange={handleOptionChange}
        />
        <RadioInput
          label="Package Type -"
          name="PackageType"
          options={[
            { label: "Letter", value: "Letter" },
            { label: "Parcel", value: "Parcel" },
            { label: "Pallet", value: "Pallet" },
            { label: "Box", value: "Box" },
          ]}
          required={true}
          onChange={handleOptionChange}
        />
        <RadioInput
          label="Package Type -"
          name="PackageType"
          options={[
            { label: "No Restriction", value: "NoRestriction" },
            { label: "16 +", value: "16" },
            { label: "24 +", value: "24" },
          ]}
          required={true}
          onChange={handleOptionChange}
        />

        <RadioInput
          label="Signature Needed -"
          name="Signature"
          options={[
            { label: "Yes", value: "credit" },
            { label: "No", value: "paypal" },
          ]}
          required={true}
          onChange={handleOptionChange}
        />
        <Col md={6}>
          <TextInput
            label="Maximum lead time "
            placeholder="15 days"
            required={true}
            onChange={handleTextInputChange}
          />
        </Col>
        <br />
        <br />
        <div className="btn-sack">
          <Button label="Update Settings" />
        </div>
      </div>
      <div className="form-group row p-3 gap-2 d-flex justify-content-end">
        <a type="submit" className="btn col-4 a-btn-primary">
          Save
        </a>
      </div>
    </Layout>
  );
};

export default ShipmentDefaultSetting;
