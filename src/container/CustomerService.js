import React, { useState, useEffect, useRef } from "react";
import Layout from "./layout";
import MetricCard from "../components/MetricCard";
import SocialMediaSelect from "../components/SocialMediaSelect";
import DataTable from "../components/DataTable";
import DateInput from "../components/DateInput";
import Button from "../components/Button";
import customerservicedata from "../assets/json/customerservice.json";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import positive from "../assets/svg/positive_metrix.svg";
import negative from "../assets/svg/negative_metrix.svg";

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
