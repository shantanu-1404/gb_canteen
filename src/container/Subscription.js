import React, { useRef } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";

import MetricCard from "../components/MetricCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/DataTable";
import DateInput from "../components/DateInput";
import Button from "../components/Button";
import subscription from "../assets/json/subscriptiondata.json";
import Subscribers from "./Subscriber";

const Subscription = () => {
  const tableRef = useRef();

  const navigate = useNavigate();

  const columns = [
    { headname: "ID", type: "", dbcol: "col1" },
    { headname: "User  Name", type: "", dbcol: "col2" },
    { headname: "email id", type: "", dbcol: "col3" },
    { headname: "Subscription", type: "", dbcol: "col4" },
    { headname: "Start date", type: "date", dbcol: "col5" },
    { headname: "Expiry date", type: "date", dbcol: "col6" },
    { headname: " Total Amount", type: "", dbcol: "col7" },
    { headname: " Payment Status", type: "badge", dbcol: "col8" },
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
          <Button buttonType="export" label="Export" />
          <div className="dropdown"></div>
        </div>
      </div>

      <div className="card-container gap-4 flex-wrap">
        <Row className="metrix-container">
          <Col xs={4} md={3}>
            <MetricCard
              title="Total Subscribers"
              operation="count"
              column="col1"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of live blogs" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Active Plans"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/truck.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of Draft Blog" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Revenue Generated"
              operation="total"
              column="col4"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Views" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Subscription Retention Rate"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_bag.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Users" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Pending Renewals"
              operation="total"
              column="col3"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/truck.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the New Comments" // Tooltip for additional context
            />
          </Col>
        </Row>
      </div>

      <DataTable
        id="table1"
        tableRef={tableRef}
        columns={columns}
        data={subscription}
        defaultView="table"
        searchable={true}
        filterable={true}
        sortable={true}
        paginated={true}
      />
    </Layout>
  );
};

export default Subscription;
