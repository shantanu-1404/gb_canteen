import React, { useState, useEffect, useRef } from "react";
import UTMTrackingChart from "./UTMTrackingChart";
import AudienceDemographics from "./AudienceDemographics";
import LoadTimeChart from "./LoadTimeChart";
import PostCard from "./PostCard";
import Layout from "../container/layout";
import Button from "./Button";
import MetricCard from "./MetricCard";
import DateInput from "./DateInput";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import postData from "../assets/json/posts.json";

const App = () => {
  const [posts, setPosts] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    setPosts(postData);
  }, []);

  return (
    <Layout>
      <div className="d-flex justify-content-between">
      <div className="mt-3 col-md-3">
                    <DateInput
                        label=""
                        type="range"
                        includeTime={false}
                    />

                </div>
        <div className="text-right gap-3 d-flex">
          <Button buttonType="import" label="Import" />
          <Button buttonType="export" label="Export" />
        </div>
      </div>

      <div className="card-container d-flex gap-4 flex-wrap">
        <Row>
          <Col md={4}>
            <MetricCard
              title="Total Spend"
              operation="total"
              column="col1"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
            />
          </Col>

          <Col md={4}>
            <MetricCard
              title="ROI per Campaign"
              operation="negativeCount"
              column="col4"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_bag.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
            />
          </Col>

          <Col md={4}>
            <MetricCard
              title="Budget Utilization"
              operation="ratio"
              column="col1,col2"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/return.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
            />
          </Col>
        </Row>
      </div>

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

export default App;
