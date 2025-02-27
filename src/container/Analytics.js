import React, { useState, useEffect, useRef } from "react";
import UTMTrackingChart from "../components/UTMTrackingChart";
import AudienceDemographics from "../components/AudienceDemographics";
import LoadTimeChart from "../components/LoadTimeChart";
import PostCard from "../components/PostCard";
import Layout from "../container/layout";
import Button from "../components/Button";
import MetricCard from "../components/MetricCard";
import DateInput from "../components/DateInput";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import postData from "../assets/json/posts.json";



const Analytics = () => {
  const [posts, setPosts] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    setPosts(postData);
  }, []);
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
        </div>
      </div>

      <Row>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Total Spend"
            operation="total"
            column="col1"
            tableRef={tableRef}
            icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total Spend" // Tooltip for additional context
          />
        </Col>

        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="ROI per Campaign"
            operation="negativeCount"
            column="col4"
            tableRef={tableRef}
            icon="http://localhost/gb_canteen/svg/order_bag.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows ROI per Campaign" // Tooltip for additional context
          />
        </Col>

        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Budget Utilization"
            operation="ratio"
            column="col1,col2"
            tableRef={tableRef}
            icon="http://localhost/gb_canteen/svg/return.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the Budget Utilization" // Tooltip for additional context
          />
        </Col>
      </Row>

      <div className="form_section">
        <div className="d-flex justify-content-between">
          <h6 className="card-title">Highest Engagement Post</h6>
          <a>see all</a>
        </div>

        <Row>
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </Row>
      </div>
      <Row>
        <Col md={7}>
          <UTMTrackingChart />
          <LoadTimeChart />
        </Col>
        <Col md={5}>
          <AudienceDemographics />
        </Col>
      </Row>

    </Layout>
  );
};

export default Analytics;
