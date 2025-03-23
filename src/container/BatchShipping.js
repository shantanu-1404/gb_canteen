import React, { useState, useRef } from "react";
import Layout from "./layout";

import SelectComponent from "../components/SelectComponent";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInput from "../components/CheckboxInput";
import DataTable from "../components/DataTable";
import blogsdata from "../assets/json/blogsdata.json";
import orderDetails from "../assets/json/order_specific_detail.json";
import MetricCard from "../components/MetricCard";
import IndividualOverridesdata from "../assets/json/individualOverrides.json";

import live from "../assets/svg/chat-like.svg";
import draft from "../assets/svg/channel.svg";
import view from "../assets/svg/chat-pic.svg";

const BatchShipping = () => {
  const [setSelectedSingle] = useState("");
  const tableRef = useRef();

  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const columns = [
    { headname: "Image", type: "img", dbcol: "col1" },
    { headname: "Title", type: "", dbcol: "col2" },
    { headname: "Posted by", type: "", dbcol: "col3" },
    { headname: "Visibility", type: "", dbcol: "col4" },
    { headname: "tags", type: "tags", dbcol: "col5" },
    { headname: "Category", type: "", dbcol: "col6" },
    { headname: "Date and time", type: "time", dbcol: "col7" },
  ];

  const order_specific_detail = [
    { headname: "Order Id", type: "", dbcol: "col1" },
    { headname: "Customer Name", type: "", dbcol: "col2" },
    { headname: "Weight (kg)", type: "editable", dbcol: "col3" },
    { headname: "Dimensions (L x W x H)", type: "editable", dbcol: "col4" },
    { headname: "HSN Code", type: "", dbcol: "col5" },
    { headname: "Item Value", type: "editable", dbcol: "col6" },
  ];
  const IndividualOverrides = [
    { headname: "Order Id", type: " ", dbcol: "col1" },
    { headname: "Customer Name", type: " ", dbcol: "col2" },
    { headname: "Order Date", type: "time", dbcol: "col3" },
    { headname: "Address", type: " ", dbcol: "col4" },
    { headname: "Error Type", type: "", dbcol: "col5" },
    { headname: "Error Description", type: "", dbcol: "col6" },
    { headname: "", type: "button", dbcol: "col7" },
  ];

  const spicelevel = [
    { label: "Mild", value: "spice1" },
    { label: "Medium", value: "spice2" },
    { label: "Hot", value: "spice3" },
  ];

  const country_of_origin = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "it", label: "Italy" },
    { value: "jp", label: "Japan" },
    { value: "cn", label: "China" },
    { value: "in", label: "India" },
  ];

  const [activeStep, setActiveStep] = useState(1);

  // Navigate to the selected step directly
  const navigateToStep = (step) => {
    setActiveStep(step);
  };
  const handleAgreementChange = (isChecked) => {
    console.log("User agreed:", isChecked);
  };

  return (
    <Layout>
      <form
        id="restaurant-application-form"
        method="post"
        action="/restaurant/submitApplication"
        enctype="multipart/form-data"
      >
        <div className="row mt-5">
          {/* Roadmap Step Navigation */}
          {[
            "Select Orders",
            "Add Shipping Details",
            "Package Details",
            "Shipping Labels",
            "Review & Confirm",
          ].map((stepName, index) => (
            <div key={index} className="col-md">
              <div
                onClick={() => navigateToStep(index + 1)}
                className={`d-flex gap-2 align-items-center step ${
                  activeStep === index + 1 ? "active" : ""
                }`}
              >
                <span>{index + 1}</span>
                <a>{stepName}</a>
              </div>
            </div>
          ))}
        </div>
        {/*-------------------------------------------------------------------------Page one------------------------------------------------------- */}
        {activeStep === 1 && (
          <div className="row justify-content-center">
            <div className="form_section">
              Total Number Of Selected Orders - 07
            </div>
            <DataTable
              id="table1"
              tableRef={tableRef}
              columns={columns}
              data={blogsdata}
              defaultView="table"
              searchable={true}
              filterable={true}
              sortable={true}
              paginated={true}
            />
            <div className="form-group row p-3 gap-2 d-flex justify-content-end">
              <a type="submit" className="btn col-4 a-btn-primary">
                Save
              </a>
            </div>
          </div>
        )}
        {/*-------------------------------------------------------------------------Page two------------------------------------------------------- */}
        {activeStep === 2 && (
          <div className="row mt-3 mb-5 form-step" id="step-2">
            <div className="row justify-content-center">
              <Row>
                <Col md={12}>
                  <div className="form_section">
                    <h6 className="card-title">Batch Settings</h6>

                    <Row>
                      <SelectComponent
                        label="Select Carrier"
                        name="Select Carrier"
                        listStyle="col-md-6"
                        options={spicelevel}
                        isMulti={false}
                        onChange={setSelectedSingle}
                      />
                      <SelectComponent
                        label="Select Shipping Method"
                        name="Select Shipping Method"
                        listStyle="col-md-6"
                        options={spicelevel}
                        isMulti={false}
                        onChange={setSelectedSingle}
                      />
                    </Row>
                    <CheckboxInput
                      label="Apply this carrier and method to all orders."
                      onChange={handleAgreementChange}
                    />
                  </div>
                  <div className="form_section">
                    <h6 className="card-title">Individual Overrides</h6>

                    <DataTable
                      id="table1"
                      tableRef={tableRef}
                      columns={columns}
                      data={blogsdata}
                      defaultView="table"
                      searchable={false}
                      filterable={false}
                      sortable={false}
                      paginated={false}
                      grid={false}
                    />
                  </div>
                </Col>
              </Row>
              <div className="form-group row p-3 gap-2 d-flex justify-content-between">
                <a type="submit" className="btn col-4 a-btn-primary">
                  Back
                </a>
                <a type="submit" className="btn col-4 a-btn-primary">
                  Save
                </a>
              </div>
            </div>
          </div>
        )}

        {/*-------------------------------------------------------------------------Page three------------------------------------------------------- */}
        {activeStep === 3 && (
          <div className="row mt-3 mb-6 form-step" id="step-3">
            <div className="row justify-content-center">
              <Row>
                <Col md={12}>
                  <div className="form_section">
                    <h6 className="card-title">Shared Package Details</h6>
                    <Row>
                      <TextInput
                        label="Weight ( Per Package )"
                        placeholder="Weight In Kg"
                        required={true}
                        onChange={handleTextInputChange}
                      />
                      <TextInput
                        label="HSN Code"
                        placeholder="HSN Code"
                        required={true}
                        onChange={handleTextInputChange}
                      />
                    </Row>
                    <h5 className="card-title">Shared Package Details</h5>
                    <Row>
                      <Col md={6}>
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

                      <Col md={6} style={{ marginTop: "-30px" }}>
                        {" "}
                        {/* Adds bottom margin */}
                        <SelectComponent
                          label="Country Of Origin"
                          name="Country Of Origin"
                          listStyle="col-md-6"
                          options={country_of_origin}
                          isMulti={false}
                          onChange={setSelectedSingle}
                        />
                      </Col>
                    </Row>
                    <CheckboxInput
                      label="Apply these details to all selected orders."
                      onChange={handleAgreementChange}
                    />
                  </div>
                  <div className="form_section">
                    <h6 className="card-title">Order - Specific Details</h6>
                    <DataTable
                      id="table2"
                      tableRef={tableRef}
                      columns={order_specific_detail}
                      data={orderDetails}
                      defaultView="table"
                      searchable={false}
                      filterable={false}
                      sortable={false}
                      paginated={false}
                      grid={false}
                    />
                  </div>
                </Col>
              </Row>
              <div className="form-group row p-3 gap-2 d-flex justify-content-between">
                <a type="submit" className="btn col-4 a-btn-primary">
                  Back
                </a>
                <a type="submit" className="btn col-4 a-btn-primary">
                  Save
                </a>
              </div>
            </div>
          </div>
        )}
        {/*-------------------------------------------------------------------------Page four------------------------------------------------------- */}
        {/* Step 4 - Revenue Share Agreement */}
        {activeStep === 4 && (
          <div className="row mt-3 mb-5 form-step" id="step-4">
            <DataTable
              id="table2"
              tableRef={tableRef}
              columns={order_specific_detail}
              data={orderDetails}
              defaultView="grid"
              searchable={false}
              filterable={false}
              sortable={false}
              paginated={false}
              grid={false}
            />
            <div className="form_section">
              <h6 className="card-title">Shared Package Details</h6>

              <Col md={6}>
                <SelectComponent
                  label="Save Labels"
                  name="Save Labels"
                  listStyle="col-md-6"
                  options={country_of_origin}
                  isMulti={false}
                  onChange={setSelectedSingle}
                />
              </Col>

              <div className="form-group row p-3 gap-2 d-flex justify-content-between">
                <CheckboxInput
                  label="Include a packing slip for each shipment."
                  onChange={handleAgreementChange}
                />
                <a type="submit" className="btn col-4 a-btn-primary">
                  Print All Labels Now
                </a>
              </div>
            </div>
            <div className="form-group row p-3 gap-2 d-flex justify-content-between">
                <a type="submit" className="btn col-4 a-btn-primary">
                  Back
                </a>
                <a type="submit" className="btn col-4 a-btn-primary">
                  Save
                </a>
              </div>
          </div>
        )}
        {/*-------------------------------------------------------------------------Page five------------------------------------------------------- */}
        {activeStep === 5 && (
          <div className="row mt-3 mb-5 form-step" id="step-5">
            <h6 className="card-title">Training Modules</h6>
            <div className="card-container gap-4 flex-wrap">
              <Row className="metrix-container">
                <Col xs={4} md={3}>
                  <MetricCard
                    title="Total Orders"
                    operation="count"
                    column="col1"
                    tableRef={tableRef}
                    icon={live} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                    tooltipText="This shows the count of live blogs" // Tooltip for additional context
                  />
                </Col>
                <Col xs={4} md={3}>
                  <MetricCard
                    title="Total Weight"
                    operation="count"
                    column="col2"
                    tableRef={tableRef}
                    icon={draft} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                    tooltipText="This shows the count of Draft Blog" // Tooltip for additional context
                  />
                </Col>
                <Col xs={4} md={3}>
                  <MetricCard
                    title="Total Shipping Cost"
                    operation="total"
                    column="col4"
                    tableRef={tableRef}
                    icon={view} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                    tooltipText="This shows the total of Views" // Tooltip for additional context
                  />
                </Col>
              </Row>
            </div>
            <DataTable
              id="table3"
              tableRef={tableRef}
              columns={IndividualOverrides}
              data={IndividualOverridesdata}
              defaultView="table"
              searchable={false}
              filterable={false}
              sortable={false}
              paginated={false}
              grid={false}
            />
              <div className="form-group row p-3 gap-2 d-flex justify-content-end">
                <a type="" className="btn col-4 a-btn-primary">
                Save Draft
                </a>
                <a type="" className="btn col-4 a-btn-primary">
                Create Shipment
                </a>
              </div>
          </div>
        )}
       
      </form>
    </Layout>
  );
};

export default BatchShipping;
