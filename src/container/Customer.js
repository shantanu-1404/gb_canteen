import React, { useRef, useState } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";

import MetricCard from "../components/MetricCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/DataTable";
import DateInput from "../components/DateInput";
import Button from "../components/Button";
import customersData from "../assets/json/CustomersData.json";
import { FiFilter, FiGrid, FiRotateCcw } from "react-icons/fi";
import TextInput from "../components/TextInput";

// Template Data (Scalable)
const templates = [
  {
    value: "activeCustomers",
    label: "Active Customers (30 days)",
    conditions: ["Last order within 30 days", "More than 2 orders"],
  },
  {
    value: "highSpenders",
    label: "High Spending Customers",
    conditions: ["Total spent > ₹5000", "More than 5 orders"],
  },
  {
    value: "noRecentOrder",
    label: "No Orders in 90 Days",
    conditions: ["No order placed in last 90 days"],
  },
  {
    value: "newsletterSubscribers",
    label: "Subscribed to Newsletter",
    conditions: ["Email marketing opt-in = true"],
  },
];

const Customer = () => {
  const tableRef = useRef();

  const navigate = useNavigate();
  const [segmentName, setSegmentName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [activeConditions, setActiveConditions] = useState([]);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false); // 🔁 dropdown visibility

  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const handleTemplateChange = (e) => {
    const selected = templates.find((t) => t.value === e.target.value);
    setSelectedTemplate(e.target.value);
    setActiveConditions(selected?.conditions || []);
    setShowTemplateDropdown(false); // Hide dropdown after selection
  };

  const columns = [
    { headname: "Id", type: "", dbcol: "col1" },
    { headname: "Customer Name", type: "", dbcol: "col2" },
    { headname: "Email Id", type: "", dbcol: "col3" },
    { headname: "Phone Number", type: "", dbcol: "col4" },
    { headname: "Order Placed", type: "", dbcol: "col5" },
    { headname: "Total Spend", type: "", dbcol: "col6" },
    { headname: "End Date", type: "time", dbcol: "col7" },
    { headname: "Status", type: "badge", dbcol: "col8" },
  ];

  // ✅ Refresh page
  const handleRefresh = () => {
    window.location.reload(); // This will refresh the page
  };
  return (
    <Layout>
      <div className="d-flex justify-content-between">
        <div className="mt-3 d-flex align-items-center">
          <div className="d-flex gap-5 md-date">
            <DateInput label="" type="range" includeTime={false} />
          </div>

          {/* Refresh Button */}
          <div className=" mb-2 ps-3 md-refresh ">
            <i
              className="bi bi-arrow-repeat icon-refresh"
              onClick={handleRefresh}
            ></i>
          </div>
        </div>
        <div className="text-right gap-3 mb-3 mt-3 ie-btn d-flex">
          <Button buttonType="import" label="Import" />
          <Button buttonType="export" label="Export" />
          <div className="dropdown">
            <Button
              buttonType="add"
              onClick={() => navigate("/add-customer")}
              label="Add New"
            />
          </div>
        </div>
      </div>

      <div className="card-container gap-4 flex-wrap">
        <Row className="metrix-container">
          <Col xs={4} md={3}>
            <MetricCard
              title="Total Customers"
              operation="count"
              column="col1"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of live blogs" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Active Customers"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/truck.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of Draft Blog" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Churn Rate"
              operation="total"
              column="col4"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Views" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Average Lifetime Value (LTV)"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_bag.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Users" // Tooltip for additional context
            />
          </Col>
        </Row>
      </div>
      <div className="form_section">
        {/* Header Row */}
        <Row>
          <Col md={9}>
            <TextInput
              placeholder="Segment Name"
              required={true}
              onChange={handleTextInputChange}
            />
          </Col>
          <Col md={3}>
            <div className="segment-tools">
              <i
                className="bi bi-arrow-90deg-left seg-icon gray-icon"
                title="Undo"
              ></i>
              <i
                className="bi bi-arrow-90deg-right seg-icon gray-icon"
                title="Redo"
              ></i>

              <span className="divider" />

              <span className="label">Templates</span>
              <i className="bi bi-columns seg-icon" title="Templates"></i>
              <div className="toolbar-divider"></div>

              <span className="label">Filters</span>
              <i className="bi bi-filter seg-icon" title="Filters"></i>
            </div>
          </Col>
        </Row>
        <hr />
        {/* Instructions */}
        <p className="segment-description">
          To create a segment, choose a{" "}
          {!showTemplateDropdown ? (
            <span
              className="link"
              onClick={() => setShowTemplateDropdown(true)}
              style={{
                cursor: "pointer",
                color: "#0066ff",
                textDecoration: "underline",
              }}
            >
              template
            </span>
          ) : (
            <select
              className="inline-template-dropdown"
              value={selectedTemplate}
              onChange={handleTemplateChange}
              onBlur={() => setShowTemplateDropdown(false)} // hides when clicked away
              autoFocus
            >
              <option value="">Select a template</option>
              {templates.map((template) => (
                <option key={template.value} value={template.value}>
                  {template.label}
                </option>
              ))}
            </select>
          )}{" "}
          or apply a{" "}
          <span
            className="link"
            style={{ color: "#0066ff", textDecoration: "underline" }}
          >
            filter
          </span>
          .
        </p>

        {/* Conditions Preview */}
        {activeConditions.length > 0 && (
          <div className="conditions-box">
            <strong>Conditions:</strong>
            <ul>
              {activeConditions.map((condition, idx) => (
                <li key={idx}>{condition}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Save Button */}
        <div className="d-flex justify-content-end">
          <button className="a-btn-primary">Save Segment</button>
        </div>
      </div>
      <DataTable
        id="table1"
        tableRef={tableRef}
        columns={columns}
        data={customersData}
        defaultView="table"
        searchable={true}
        filterable={true}
        sortable={true}
        paginated={true}
      />
    </Layout>
  );
};

export default Customer;
