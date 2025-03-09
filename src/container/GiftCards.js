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
import giftcardData from "../assets/json/giftcard.json";


const GiftCards = () => {
  const tableRef = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { headname: "Gift Card Id", type: "", dbcol: "col1" },
    { headname: "Gift Card code", type: "", dbcol: "col2" },
    { headname: "Creation Date", type: "time", dbcol: "col3" },
    { headname: "Expiration Date", type: "time", dbcol: "col4" },
    { headname: "Initial Value", type: "", dbcol: "col7" },
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
              onClick={() => navigate("/add-giftcards")}
              label="Add New"
            />
          </div>
        </div>
      </div>

      <div className="card-container gap-4 flex-wrap">
        <Row className="metrix-container">
          <Col xs={4} md={3}>
            <MetricCard
              title="Total Gift Cards Issued"
              operation="count"
              column="col1"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of live blogs" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Total Sales Revenue"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/truck.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of Draft Blog" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title=" Active Gift Cards"
              operation="average"
              column="col3"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Views" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Redeemed Gift Cards"
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
        data={giftcardData}
        defaultView="table"
        searchable={true}
        filterable={true}
        sortable={true}
        paginated={true}
      />
    </Layout>
  );
};

export default GiftCards;
