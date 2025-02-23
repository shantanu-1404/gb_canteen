import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./layout";

import PostCard from "../components/PostCard";
import CampaignCard from "../components/CampaignCard";
import MetricCard from "../components/MetricCard";
import NotificationCard from "../components/NotificationCard";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import DateInput from "../components/DateInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import postData from "../assets/json/posts.json";
import campaignData from "../assets/json/campaigns.json";
import notificationData from "../assets/json/notifications.json";
import tabledata from "../assets/json/tabledata.json";

import layout from "../assets/svg/layout.svg";
import calender from "../assets/svg/calender.svg";
import time from "../assets/svg/time-yellow.svg";
import tick from "../assets/svg/tick-pink.svg";
import wallet from "../assets/svg/wallet-blue.svg";
import percent from "../assets/svg/percent.svg";
import channel from "../assets/svg/channel.svg";
import growth from "../assets/svg/growth.svg";
import pc from "../assets/svg/pc-yellow.svg";

const SocialMedia = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(postData);
  }, []);

  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    setCampaigns(campaignData);
  }, []);

  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    setNotifications(notificationData);
  }, []);

  const navigate = useNavigate();
  // ✅ Refresh page
  const handleRefresh = () => {
    window.location.reload(); // This will refresh the page
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between">

        <div className="mt-3 d-flex align-items-center">
          <div className="d-flex gap-5 ">
            <DateInput label="" type="range" includeTime={false} />
          </div>

          {/* Refresh Button */}
          <div className=" mb-2 ps-3 ">
            <i
              className="bi bi-arrow-repeat icon-refresh"
              onClick={handleRefresh}
            ></i>
          </div>
        </div>

        <div className="text-right gap-3 d-flex">
          <Button buttonType="import" label="Import" />
          <Button buttonType="export" label="Export" />
          <Dropdown
            label="Add New"
            buttonType="add"
            menuItems={[
              { label: "Add New Post", onClick: () => navigate("/add-post") },
              {
                label: "Add New Campaign",
                onClick: () => navigate("/add-campaign"),
              },
            ]}
          />
        </div>
      </div>

      <Row>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Total Posts"
            operation="total"
            column="col1"
            jsonData={tabledata}
            icon={layout} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Scheduled Posts"
            operation="count"
            column="col2"
            jsonData={tabledata}
            icon={calender} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Pending Approvals"
            operation="positiveCount"
            column="col4"
            jsonData={tabledata}
            icon={time} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Active Campaigns"
            operation="negativeCount"
            column="col4"
            jsonData={tabledata}
            icon={tick} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Total Ad Spend"
            operation="mean"
            column="col1"
            jsonData={tabledata}
            icon={wallet} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Engagement Rate"
            operation="average"
            column="col5,col6"
            jsonData={tabledata}
            icon={percent} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Top Channel"
            operation="ratio"
            column="col1,col2"
            jsonData={tabledata}
            icon={channel} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Follower Growth"
            operation="percentage"
            column="col2"
            jsonData={tabledata}
            icon={growth} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="ROI on Ads"
            operation="1000+"
            column="col1"
            jsonData={tabledata}
            icon={pc} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
      </Row>
      <div className="form_section">
        <div className="d-flex justify-content-between">
          <h6 className="card-title">Recent Posts</h6>
          <a>see all</a>
        </div>
        <Row>
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </Row>
      </div>

      <div className="form_section">
        <div className="d-flex justify-content-between">
          <h6 className="card-title">Recent Campaigns</h6>
          <a>see all</a>
        </div>
        <Row>
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} campaign={campaign} />
          ))}
        </Row>
      </div>

      <div className="form_section">
        <div className="d-flex justify-content-between">
          <h6 className="p-2">Notifications</h6>
          <a>See all</a>
        </div>
        <div className="home_table">
          {notifications.map((notification, index) => (
            <NotificationCard key={index} notification={notification} />
          ))}
        </div>
      </div>

      <br />
    </Layout>
  );
};

export default SocialMedia;
