import React, { useState, useEffect, useRef } from "react";
import Layout from "./layout";
import SocialMediaSelect from "../components/SocialMediaSelect";
import DataTable from "../components/DataTable";

import customerservicedata from "../assets/json/customerservice.json";

import notificationData from "../assets/json/notifications.json";
import campaignData from "../assets/json/campaigns.json";

const CustomerService = () => {
  const tableRef = useRef();
  const [notifications, setNotifications] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  useEffect(() => {
    setNotifications(notificationData);
  }, []);

  const [filters, setFilters] = useState([
    { field: "Status", operator: "is", value: "open" },
    { field: "Channel", operator: "is", value: "Email" },
    { field: "Assignee User", operator: "is", value: "John Doe" },
  ]);

  const fieldOptions = ["Status", "Channel", "Assignee User"];
  const operatorOptions = ["is", "is not"];
  const valueOptions = {
    Status: ["open", "closed", "pending"],
    Channel: ["Email", "Live Chat", "WhatsApp"],
    "Assignee User": ["John Doe", "Jane Smith", "Support Bot"],
  };

  const updateFilter = (index, key, newValue) => {
    const updated = [...filters];
    updated[index][key] = newValue;
    // If field is changed, reset value to first valid option
    if (key === "field") {
      updated[index].value = valueOptions[newValue][0];
    }
    setFilters(updated);
  };

  const handleCreateView = () => {
    console.log("📌 Filters Applied:", filters);
    alert("✅ View Created");
  };

  const handleCancel = () => {
    setFilters([]);
  };

  // Handle social media platform selection
  const handlePlatformChange = (selected) => {
    setSelectedPlatforms(selected);
    setCurrentPreviewIndex(0); // Reset preview index when platforms change
  };
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    setCampaigns(campaignData);
  }, []);

  const columns = [
    { headname: "Emails", type: "", dbcol: "col1" },
    { headname: "Tags", type: "tags", dbcol: "col2" },
    { headname: "Channel", type: "", dbcol: "col3" },
    { headname: "Customer Details", type: "currency", dbcol: "col4" },
    { headname: "User assigned", type: "", dbcol: "col5" },
    { headname: "STATUS", type: "badge", dbcol: "col6" },
  ];

  return (
    <Layout>
      <div className="container">
        {/* Announcements Section */}
        <div className="row">
          <div className="col-md">
            <div className="section_card">
              <div className="d-flex justify-content-between">
                <h6 className="p-2">Notifications</h6>
                <a>see all</a>
              </div>
              <div className="home_table">
                {notifications.map((notification, index) => (
                  <div className="d-flex p-2 gap-1">
                    <img
                      src={notification.user}
                      className="profile-pic"
                      alt="profile"
                    />
                    <div className="col">
                      <div className="d-flex justify-content-between">
                        <div>
                          <label>{notification.title}</label>
                          <p>{notification.detail}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-2 home_act">
                      <a href="#">
                        <i className="bi p-1 bi-three-dots"></i>
                      </a>
                      <p>1 hour ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Store Optimisation Section */}
          <div className="col-md">
            <div className="section_card">
              <div className="d-flex justify-content-between">
                <h6 className="p-2">Store Optimisation</h6>
                <a href="#">see all</a>
              </div>
              <div className="home_table">
                {campaigns.map((campaign, index) => (
                  <div className="d-flex p-2 gap-1">
                    <img
                      src={campaign.image}
                      className="profile-pic"
                      alt="profile"
                    />
                    <div className="col">
                      <div className="d-flex justify-content-between">
                        <div>
                          <label>{campaign.name}</label>
                          <p>{campaign.status}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-2 home_act">
                      <a href="#">
                        <i className="bi p-1 bi-three-dots"></i>
                      </a>
                      <p>1 hour ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <SocialMediaSelect onSelectionChange={handlePlatformChange} />
            </div>
          </div>
        </div>
        <div className="form_section">
          {filters.map((filter, index) => (
            <div className="filter-row" key={index}>
              {index > 0 && <span className="and-label">And</span>}

              <div
                className={`dropdown-group ${
                  index === 0 ? "primary-filter" : ""
                }`}
              >
                <select
                  className="dropdown-field"
                  value={filter.field}
                  onChange={(e) => updateFilter(index, "field", e.target.value)}
                >
                  {fieldOptions.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <select
                  className="condition-dropdown operator"
                  value={filter.operator}
                  onChange={(e) =>
                    updateFilter(index, "operator", e.target.value)
                  }
                >
                  {operatorOptions.map((op) => (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
                <select
                  className="condition-dropdown value "
                  value={filter.value}
                  onChange={(e) => updateFilter(index, "value", e.target.value)}
                >
                  {valueOptions[filter.field].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-end gap-2">
            <button className="a-btn-primary" onClick={handleCancel}>
              Cancel
            </button>
            <button className="a-btn-primary" onClick={handleCreateView}>
              Create View
            </button>
          </div>
        </div>

        <DataTable
          id="table1"
          tableRef={tableRef}
          columns={columns}
          data={customerservicedata}
          defaultView="table"
          searchable={true}
          filterable={true}
          sortable={true}
          paginated={true}
        />
      </div>
    </Layout>
  );
};

export default CustomerService;
