import React, { useState, useEffect, useRef } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";

import Metrix from "../components/Metrix";
import MetricCard from "../components/MetricCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/DataTable";
import DateInput from "../components/DateInput";
import Button from "../components/Button";
import storemanagement from "../assets/json/storemanagement.json";

import live from "../assets/svg/chat-like.svg";
import draft from "../assets/svg/channel.svg";
import view from "../assets/svg/chat-pic.svg";
import user from "../assets/svg/growth.svg";

const Blogs = () => {
  const tableRef = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { headname: "Restaurant Name", type: "", dbcol: "col1" },
    { headname: "Cuisine Types", type: "", dbcol: "col2" },
    { headname: "Location ", type: "", dbcol: "col3" },
    { headname: "Visibility", type: "", dbcol: "col4" },
    { headname: "STATUS", type: "badge", dbcol: "col5" },
    { headname: "Average Customer Rating", type: "rating", dbcol: "col6" },
    { headname: "Last Update", type: "time", dbcol: "col7" },
  ];

  // ✅ Refresh page
  const handleRefresh = () => {
    window.location.reload(); // This will refresh the page
  };
  return (
    <Layout>
      <div className="d-flex  justify-content-between">
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
      </div>

      <div className="card-container gap-4 flex-wrap">
        <Row className="metrix-container">
          <Col xs={4} md={3}>
            <MetricCard
              title="Total Restaurants Listed"
              operation="count"
              column="col1"
              tableRef={tableRef}
              icon={live} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="Total Restaurants Listed" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Restaurants Pending Approval"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={draft} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of Restaurants Pending Approval" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Top-Performing Restaurants"
              operation="total"
              column="col4"
              tableRef={tableRef}
              icon={view} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the Top-Performing Restaurants" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Low-Performing Restaurants"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={user} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Low-Performing Restaurants" // Tooltip for additional context
            />
          </Col>
        </Row>
      </div>

      <DataTable
        id="table1"
        tableRef={tableRef}
        columns={columns}
        data={storemanagement}
        defaultView="table"
        searchable={true}
        filterable={true}
        sortable={true}
        paginated={true}
      />
    </Layout>
  );
};

export default Blogs;
