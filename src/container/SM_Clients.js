import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import MetricCard from "../components/MetricCard";
import DateInput from "../components/DateInput";
import DataTable from "../components/DataTable";
import SM_ClientCard from "../components/SM_ClientCard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import clientData from "../assets/json/smclients.json";


import time from "../assets/svg/time-blue.svg";
import pc from "../assets/svg/pc-pink.svg";
import like from "../assets/svg/chat-like.svg";
import img from "../assets/svg/img-green.svg";
import group from "../assets/svg/group.svg";
import pic from "../assets/svg/chat-pic.svg";




const SM_Clients = () => {

  const navigate = useNavigate();

  const clientColumns = [
    { headname: "Client Name", dbcol: "client_name" },
    { headname: "Status", dbcol: "status" },
    { headname: "Industry", dbcol: "industry" },
    { headname: "Profile Managed", dbcol: "profile_managed" },
    { headname: "Last Activity", dbcol: "last_activity" },
    { headname: "Engagement Rate", dbcol: "engagement_rate" },
  ];

  return (
    <Layout>
      <div className="d-flex justify-content-between">
        <div className="mt-3 col-md-3">
          <DateInput label="" type="range" includeTime={false} />
        </div>
        <div className="text-right gap-3 d-flex">
          <Button buttonType="add" onClick={() => navigate("/add-client")} label="Add New Client" />
        </div>
      </div>

      <Row>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Total Clients"
            operation="count"
            column="client_id"
            jsonData={clientData}
            icon={group} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Active Profiles"
            operation="positiveCount"
            column="status"
            jsonData={clientData}
            icon={pic} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Post Published"
            operation="total"
            column="profiles_managed"
            jsonData={clientData}
            icon={img} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Pending Approval"
            operation="count"
            column="profiles_managed"
            jsonData={clientData}
            icon={time} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Campaigns Running"
            operation="total"
            column="profiles_managed"
            jsonData={clientData}
            icon={pc} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
        <Col xs={6} lg={3} md={4}>
          <MetricCard
            title="Total Engagement"
            operation="percentage"
            column="engagement_rate"
            jsonData={clientData}
            icon={like} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
      </Row>


      <DataTable
        id="client-table"
        columns={clientColumns}
        data={clientData}
        defaultView="grid"
        searchable={true}
        filterable={true}
        sortable={true}
        paginated={true}
      >
        <Row>
          {clientData.map((client, index) => (
            <SM_ClientCard key={index} client={client} />
          ))}
        </Row>
      </DataTable>
    </Layout>
  );
};

export default SM_Clients;
