import React, { useRef, useState } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";

import MetricCard from "../components/MetricCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/DataTable";
import DateInput from "../components/DateInput";
import Button from "../components/Button";
import productsdata from "../assets/json/product.json";
import InputSwitch from "../components/InputSwitch";
import CheckboxInput from "../components/CheckboxInput";
import PhoneInput from "../components/PhoneInput";
import TextInput from "../components/TextInput";
import MultiCheckboxDropdown from "../components/MultiCheckBoxDropDown";
import spam from "../assets/svg/spam.svg";
import blockuser from "../assets/svg/block-user.svg";
import pending from "../assets/svg/pending.svg";
import message from "../assets/svg/message.svg";

const WhatsAppSpamManagement = () => {
  const tableRef = useRef();
  const navigate = useNavigate();

  const [scanProfiles, setScanProfiles] = useState(false);
  const [scanRequests, setScanRequests] = useState(false);
  const [autoRejectSpam, setAutoRejectSpam] = useState(false);

  const columns = [
    { headname: "Image", type: "img", dbcol: "col1" },
    { headname: "Product name", type: "", dbcol: "col2" },
    { headname: "Price", type: "", dbcol: "col3" },
    { headname: "Category", type: "", dbcol: "col4" },
    { headname: "Tags", type: "tags", dbcol: "col5" },
    { headname: "Vendor", type: "", dbcol: "col6" },
    { headname: "Published on", type: "time", dbcol: "col7" },
  ];

  // ✅ Refresh page
  const handleRefresh = () => {
    window.location.reload(); // This will refresh the page
  };
  const [activeTab, setActiveTab] = useState("general");
  const [isSwitchOn, setSwitchOn] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [availableTags, setAvailableTags] = useState([
    "Keyword 1",
    "Keyword 2",
  ]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleAgreementChange = (val) => console.log("Agreement:", val);
  const handleTagsChange = (tags) => setSelectedTags(tags);
  const handleTextInputChange = (val) => console.log("Text input:", val);
  const [autoDelete, setAutoDelete] = useState(false);
  const [notifyAdmin, setNotifyAdmin] = useState(false);
  const [removeFromGroup, setRemoveFromGroup] = useState(false);

  const [includedGroups, setIncludedGroups] = useState([]);
  const [excludedGroups, setExcludedGroups] = useState([]);

  const groupOptions = [
    "All Groups",
    "Customer Support",
    "Sales Inquiries",
    "Marketing Broadcast",
    "Product Updates",
    "Technical Supports",
  ];
  const renderTab = () => {
    switch (activeTab) {
      case "general":
        return (
          <>
            <MultiCheckboxDropdown
              label="Groups Included"
              options={groupOptions}
              selectedOptions={includedGroups}
              onChange={setIncludedGroups}
            />
            <MultiCheckboxDropdown
              label="Groups Excluded"
              options={groupOptions.slice(1)} // exclude "All Groups"
              selectedOptions={excludedGroups}
              onChange={setExcludedGroups}
            />
            <PhoneInput
              label="Contacts Excluded"
              placeholder="+91 89673 92011"
            />
            <Button 
            label="Add" 
            className="my-2" 
            />
            <InputSwitch
              label="Auto-delete Spam"
              checked={autoDelete}
              onChange={setAutoDelete}
            />
            <InputSwitch
              label="Notify admin"
              checked={notifyAdmin}
              onChange={setNotifyAdmin}
            />
            <InputSwitch
              label="Remove from group"
              checked={removeFromGroup}
              onChange={setRemoveFromGroup}
            />
            <TextInput
              label="Auto-ban threshold"
              placeholder="Number"
              type=""
            />
            <Button label="Save" style={{ width: "100%" }} className="mt-4" />
          </>
        );

      case "keywords":
        return (
          <>
            <TextInput label="Search" placeholder="Search" />
            <TextInput label="Add New Keyword" placeholder="Keyword" />
            <Button label="Add" className="mt-2" />

            <div className="my-3">
              {selectedTags.map((tag, i) => (
                <span key={i} className="badge bg-light text-dark mx-1">
                  {tag}
                </span>
              ))}
            </div>

            <h6>Severity Level</h6>
            <div className="severity-label a-bg-danger  p-2 rounded">
              High Severity
            </div>
            <div className="severity-label a-bg-warning  p-2 rounded">
              Medium Severity
            </div>
            <div className="severity-label a-bg-info  p-2 rounded">
              Medium Severity
            </div>

            <Button label="Save" style={{ width: "100%" }} className="mt-4" />
          </>
        );

      case "profiles":
        return (
          <>
            <InputSwitch
              label="Scan existing profiles"
              checked={scanProfiles}
              onChange={setScanProfiles}
            />
            <InputSwitch
              label="Scan join requests"
              checked={scanRequests}
              onChange={setScanRequests}
            />
            <InputSwitch
              label="Auto-reject spam joins"
              checked={autoRejectSpam}
              onChange={setAutoRejectSpam}
            />

            <h6 className="mt-3">Sections To Scan</h6>
            {[
              "About",
              "Display Name",
              "Website",
              "Address",
              "Business Category",
              "Status",
              "Company Name",
              "Email Address",
              "Description",
            ].map((item) => (
              <CheckboxInput key={item} label={item} onChange={() => {}} />
            ))}

            <Button label="Save" style={{ width: "100%" }} className="mt-4" />
          </>
        );
      default:
        return null;
    }
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
          {" "}
          <div className="api-status-badge">
            <span className="status-dot"></span>
            <span className="status-text">API Connected</span>
          </div>
          <Button label="Scan Profile" />
          <Button buttonType="import" label="Import" />
          <Button buttonType="export" label="Export" />
          <div className="dropdown"></div>
        </div>
      </div>
      <div className="card-container gap-4 flex-wrap">
        <Row className="metrix-container">
          <Col xs={4} md={3}>
            <MetricCard
              title="Spam Detection"
              operation="count"
              column="col1"
              tableRef={tableRef}
              icon={spam}
              tooltipText="This shows the count of live blogs" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Blocked Users"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={blockuser}
              tooltipText="This shows the count of Draft Blog" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Pending"
              operation="total"
              column="col4"
              tableRef={tableRef}
              icon={pending}
              tooltipText="This shows the total of Views" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Clean Messages"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={message}
              tooltipText="This shows the total of Users" // Tooltip for additional context
            />
          </Col>
        </Row>
      </div>
      <Row>
        <Col md={3}>
          <div
            className="container section_card p-3"
            style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 0 8px rgba(0,0,0,0.1)",
            }}
          >
            <ul className="nav nav-underline d-flex justify-content-between mb-3">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "general" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => setActiveTab("general")}
                >
                  General
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "keywords" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => setActiveTab("keywords")}
                >
                  Keywords
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "profiles" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => setActiveTab("profiles")}
                >
                  Profiles
                </a>
              </li>
            </ul>
            {renderTab()}
          </div>
        </Col>
        <Col md={9} className="form_section">
          <DataTable
            id="table1"
            tableRef={tableRef}
            columns={columns}
            data={productsdata}
            defaultView="table"
            searchable={true}
            filterable={true}
            sortable={true}
            paginated={true}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default WhatsAppSpamManagement;
