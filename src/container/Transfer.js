import React, { useState, useEffect, useRef } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";

import MetricCard from "../components/MetricCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/DataTable";
import Button from "../components/Button";
import DateInput from "../components/DateInput";
import transferdata from "../assets/json/transferdata.json";

const Transfer = () => {
  const tableRef = useRef();

  const navigate = useNavigate();

  const columns = [
    { headname: "Transfer", type: "", dbcol: "col1" },
    { headname: "Estimated arrival", type: "", dbcol: "col2" },
    { headname: "STATUS", type: "badge", dbcol: "col3" },
    { headname: "Received", type: "progress", dbcol: "col4" },
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
          <div className=" mb-2 ps-3 md-refresh">
            <i
              className="bi bi-arrow-repeat icon-refresh"
              onClick={handleRefresh}
            ></i>
          </div>
        </div>
        <div className="text-right mb-3 mt-3 ie-btn gap-3 d-flex">
          <Button buttonType="import" label="Import" />
          <Button buttonType="export" label="Export" />
          <div className="dropdown">
            <Button

              buttonType="add"
              onClick={() => navigate("/add-inventory_transfer")}
              label="Add New"
            />
          </div>
        </div>
      </div>
      <div className="card-container gap-4 flex-wrap">
        <Row>
          <Col xs={4} md={3}>
            <MetricCard
              title="Total Transfer Value"
              operation="count"
              column="col1"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of live blogs" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Total Transfers Processed"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/truck.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of Draft Blog" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Pending Transfers"
              operation="total"
              column="col4"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Views" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Average Transfer Processing Time"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_bag.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Users" // Tooltip for additional context
            />
          </Col>

        </Row>
      </div>

      <DataTable
        id="table1"
        tableRef={tableRef}
        columns={columns}
        data={transferdata}
        defaultView="table"
        searchable={true}
        filterable={true}
        sortable={true}
        paginated={true}
      />
    </Layout>
  );
};

export default Transfer;
