import React, { useState, useEffect, useRef } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";

import Metrix from "../components/Metrix";
import MetricCard from "../components/MetricCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/DataTable";
import Button from "../components/Button";
import Modal from "../components/Modal";
import vendordata from "../assets/json/vendordata.json";
import DateInput from "../components/DateInput";


import active from "../assets/svg/pc-yellow.svg";
import pending from "../assets/svg/calender.svg";
import avg from "../assets/svg/chat-like.svg";
import share from "../assets/svg/growth.svg";




const VendorOnboarding = () => {
  const tableRef = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { headname: "Restaurant name", type: "", dbcol: "col1" },
    { headname: "Owner", type: "", dbcol: "col2" },
    { headname: "STATUS", type: "badge", dbcol: "col3" },
    { headname: "Cuisines", type: "", dbcol: "col4" },
    { headname: "Location", type: "", dbcol: "col5" },
    { headname: "Total Orders", type: "", dbcol: "col6" },
    { headname: "Commission", type: "", dbcol: "col7" },
    { headname: "Revenue", type: "", dbcol: "col8" },
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
          <div className=" md-refresh mb-2 ps-3 ">
            <i
              className="bi bi-arrow-repeat icon-refresh"
              onClick={handleRefresh}
            ></i>
          </div>
        </div>
        <div className="text-right ie-btn mt-4 mb-4 gap-3 d-flex">
          <Button buttonType="import" label="Import" />
          <Button buttonType="export" label="Export" />
          <div className="dropdown">
            <Button
              buttonType="add"
              onClick={() => navigate("")}
              label="Add New"
            />
          </div>
        </div>
      </div>

      <div className="card-container gap-4 flex-wrap">
        <Row className="metrix-container">
          <Col xs={4} md={3}>
            <MetricCard
              title="Total Active Restaurants"
              operation="count"
              column="col1"
              tableRef={tableRef}
              icon={active} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of live blogs" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Pending Approvals"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={pending} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of Draft Blog" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Average Approval Time"
              operation="total"
              column="col4"
              tableRef={tableRef}
              icon={avg} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Views" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Average Revenue Share"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={share} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Users" // Tooltip for additional context
            />
          </Col>
        </Row>
      </div>

      <DataTable
        id="table1"
        tableRef={tableRef}
        columns={columns}
        data={vendordata}
        defaultView="table"
        searchable={true}
        filterable={true}
        sortable={true}
        paginated={true}
      />
    </Layout>
  );
};

export default VendorOnboarding;
