import React, { useState } from "react";
import Layout from "./layout";

import FormHeader from "../components/FormHeader";
import SelectComponent from "../components/SelectComponent";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "../components/Button";
import DateInput from "../components/DateInput";
import RadioInput from "../components/RadioInput";

const ShippingRate = () => {
  const [setSelectedSingle] = useState("");

  const handleOptionChange = (selectedValue) => {
    console.log("Selected:", selectedValue);
  };

  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const countries = [
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
    { label: "United Kingdom", value: "uk" },
    { label: "Australia", value: "au" },
    { label: "Germany", value: "de" },
    { label: "France", value: "fr" },
    { label: "India", value: "in" },
    { label: "Japan", value: "jp" },
    { label: "China", value: "cn" },
    { label: "Brazil", value: "br" },
    { label: "South Africa", value: "za" },
    { label: "Mexico", value: "mx" },
    { label: "Italy", value: "it" },
    { label: "Spain", value: "es" },
  ];
  const carriers = [
    { label: "Maersk Line India", value: "maersk_india" },
    { label: "MSC Mediterranean Shipping Company", value: "msc" },
    { label: "CMA CGM Group", value: "cma_cgm" },
    { label: "Hapag-Lloyd", value: "hapag_lloyd" },
    { label: "Evergreen Marine", value: "evergreen" },
    { label: "COSCO Shipping Lines", value: "cosco" },
    { label: "Yang Ming Marine Transport", value: "yang_ming" },
    { label: "ONE (Ocean Network Express)", value: "one" },
    { label: "Hyundai Merchant Marine", value: "hmm" },
    { label: "ZIM Integrated Shipping", value: "zim" },
    { label: "NYK Line", value: "nyk" },
    { label: "APL (American President Lines)", value: "apl" },
  ];
  const currencies = [
    { label: "US Dollar (USD)", value: "usd" },
    { label: "Euro (EUR)", value: "eur" },
    { label: "British Pound (GBP)", value: "gbp" },
    { label: "Indian Rupee (INR)", value: "inr" },
    { label: "Australian Dollar (AUD)", value: "aud" },
    { label: "Canadian Dollar (CAD)", value: "cad" },
    { label: "Swiss Franc (CHF)", value: "chf" },
    { label: "Japanese Yen (JPY)", value: "jpy" },
    { label: "Chinese Yuan (CNY)", value: "cny" },
    { label: "Singapore Dollar (SGD)", value: "sgd" },
    { label: "Hong Kong Dollar (HKD)", value: "hkd" },
    { label: "New Zealand Dollar (NZD)", value: "nzd" },
    { label: "South Korean Won (KRW)", value: "krw" },
    { label: "Brazilian Real (BRL)", value: "brl" },
  ];

  const serviceTypeFilter = [
    { label: "Standard Delivery", value: "standard_delivery" },
    { label: "Express Delivery", value: "express_delivery" },
    { label: "Same Day Delivery", value: "same_day_delivery" },
    { label: "Overnight Delivery", value: "overnight_delivery" },
    { label: "International Shipping", value: "international_shipping" },
    { label: "Freight Shipping", value: "freight_shipping" },
    { label: "Local Pickup", value: "local_pickup" },
    { label: "Curbside Pickup", value: "curbside_pickup" },
    { label: "White Glove Delivery", value: "white_glove_delivery" },
    { label: "Temperature Controlled", value: "temperature_controlled" },
    { label: "Subscription Service", value: "subscription_service" },
  ];

  return (
    <Layout>
      <FormHeader title="Shipping Rates" backUrl="/" closeUrl="/" />

      <div className="form_section">
        <RadioInput
          label="Selection Preference :"
          name="payment"
          options={[
            { label: "Country-Based", value: "Country" },
            { label: "Zone-Based", value: "Zone" },
          ]}
          required={true}
          onChange={handleOptionChange}
        />
        <Row>
          <SelectComponent
            label="From Country"
            name="From Country"
            listStyle="col-md-6"
            options={countries}
            isMulti={false}
            onChange={setSelectedSingle}
          />
          <SelectComponent
            label="Carrier Name"
            name="Carrier Name"
            listStyle="col-md-6"
            options={carriers}
            isMulti={false}
            onChange={setSelectedSingle}
          />
        </Row>
        <Row>
          <SelectComponent
            label="To Country"
            name="To Country"
            listStyle="col-md-6"
            options={countries}
            isMulti={false}
            onChange={setSelectedSingle}
          />
          <Col md={6}>
            <strong>
              {" "}
              <h7 className="card-title">
                Parcel Dimensions in Length x Width x Height (optional)
              </h7>
            </strong>
            <Row>
              <TextInput
                placeholder="Cm"
                required={true}
                onChange={handleTextInputChange}
              />
              <TextInput
                placeholder="Cm"
                required={true}
                onChange={handleTextInputChange}
              />
              <TextInput
                placeholder="Cm"
                required={true}
                onChange={handleTextInputChange}
              />
            </Row>
          </Col>
        </Row>
        <Row>
          <SelectComponent
            label="Currency"
            name="Currency"
            listStyle="col-md-6"
            options={currencies}
            isMulti={false}
            onChange={setSelectedSingle}
          />
          <SelectComponent
            label="Service Type Filter"
            name="Service Type Filter"
            listStyle="col-md-6"
            options={serviceTypeFilter}
            isMulti={false}
            onChange={setSelectedSingle}
          />
        </Row>
        <Row>
          <Col md={6}>
            <RadioInput
              label="Weight"
              name="Weight"
              options={[
                { label: "Fixed", value: "Fixed" },
                { label: "Within range", value: "range" },
              ]}
              required={true}
              onChange={handleOptionChange}
            />
          </Col>
          <Col md={6}>
            <DateInput label="Estimated Delivery Date " includeTime={true} />
          </Col>
        </Row>{" "}
        <br />
        <br />
        <div className="btn-sack">
          <Button label="Load Prices" />
        </div>
      </div>
    </Layout>
  );
};

export default ShippingRate;
