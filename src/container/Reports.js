import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import MetricCard from "../components/MetricCard";
import Metrix from "../components/Metrix";
import ReportsCard from "../components/ReportsCard";
import Modal from "../components/Modal";
import DataTable from "../components/DataTable";
import DateInput from "../components/DateInput";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import reportsData from "../assets/json/report.json";

import wallet from "../assets/svg/wallet-blue.svg";
import credit from "../assets/svg/credit-card.svg";
import like from "../assets/svg/like.svg";

const Reports = () => {
  const navigate = useNavigate();
  const recentReports = reportsData
    .sort((a, b) => new Date(b.latestUpdate) - new Date(a.latestUpdate))
    .slice(0, 3);
  const [isModalOpen, setModalOpen] = useState(false);

  const reportcolumns = [
    { headname: "Campaign", dbcol: "campaign" },
    { headname: "Clicks", dbcol: "clicks" },
    { headname: "ctr", dbcol: "ctr" },
    { headname: "cpc", dbcol: "cpc" },
    { headname: "Conversions", dbcol: "conversions" },
    { headname: "Reach (Organic vs Paid)", dbcol: "reach" },
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
        <div className="text-right ie-btn mt-4 mb-4 gap-3 d-flex">
          <Button buttonType="import" label="Import" />
          <Button buttonType="export" label="Export" />
          <div className="dropdown">
            <Button
              buttonType="add"
              onClick={() => navigate("/add-report")}
              label="Add New"
            />
          </div>
        </div>
      </div>
      <Row className="metrix-container">
        <Col xs={4} lg={3} md={3}>
          <MetricCard
            title="Engagement"
            tooltipText="Overall engagement statistics"
          >
            <div className="col-md-6">
              <Metrix
                title="Likes"
                operation="1000+"
                column="col1"
                jsonData={reportsData}
              />
              <Metrix
                title="Shares"
                operation="ratio"
                column="col1"
                jsonData={reportsData}
              />
            </div>
            <div className="col-md-6">
              <Metrix
                title="Comments"
                operation="ratio"
                column="col3,col2"
                jsonData={reportsData}
              />
              <Metrix
                title="Reach"
                operation="total"
                column="col1"
                jsonData={reportsData}
              />
            </div>
          </MetricCard>
        </Col>
        <Col xs={4} lg={3} md={3}>
          <MetricCard title="Reach" tooltipText="Overall engagement statistics">
            <div className="col-md-6">
              <Metrix
                title="Likes"
                operation="1000+"
                column="col1"
                jsonData={reportsData}
              />
              <Metrix
                title="Shares"
                operation="ratio"
                column="col1"
                jsonData={reportsData}
              />
            </div>
            <div className="col-md-6">
              <Metrix
                title="Comments"
                operation="ratio"
                column="col3,col2"
                jsonData={reportsData}
              />
              <Metrix
                title="Reach"
                operation="total"
                column="col1"
                jsonData={reportsData}
              />
            </div>
          </MetricCard>
        </Col>
        <Col xs={4} lg={3} md={3}>
          <MetricCard
            title="Follower Growth"
            tooltipText="Overall engagement statistics"
          >
            <div className="col-md-6">
              <Metrix
                title="Likes"
                operation="1000+"
                column="col1"
                jsonData={reportsData}
              />
              <Metrix
                title="Shares"
                operation="ratio"
                column="col1"
                jsonData={reportsData}
              />
            </div>
            <div className="col-md-6">
              <Metrix
                title="Comments"
                operation="ratio"
                column="col3,col2"
                jsonData={reportsData}
              />
              <Metrix
                title="Reach"
                operation="total"
                column="col1"
                jsonData={reportsData}
              />
            </div>
          </MetricCard>
        </Col>
        <Col xs={4} lg={3} md={3}>
          <MetricCard title="CTR" tooltipText="Overall engagement statistics">
            <div className="col-md-6">
              <Metrix
                title="Likes"
                operation="1000+"
                column="col1"
                jsonData={reportsData}
              />
              <Metrix
                title="Shares"
                operation="ratio"
                column="col1"
                jsonData={reportsData}
              />
            </div>
            <div className="col-md-6">
              <Metrix
                title="Comments"
                operation="ratio"
                column="col3,col2"
                jsonData={reportsData}
              />
              <Metrix
                title="Reach"
                operation="total"
                column="col1"
                jsonData={reportsData}
              />
            </div>
          </MetricCard>
        </Col>
        <Col xs={4} lg={3} md={3}>
          <MetricCard
            title="Conversions"
            tooltipText="Overall engagement statistics"
          >
            <div className="col-md-6">
              <Metrix
                title="Likes"
                operation="1000+"
                column="col1"
                jsonData={reportsData}
              />
              <Metrix
                title="Shares"
                operation="ratio"
                column="col1"
                jsonData={reportsData}
              />
            </div>
            <div className="col-md-6">
              <Metrix
                title="Comments"
                operation="ratio"
                column="col3,col2"
                jsonData={reportsData}
              />
              <Metrix
                title="Reach"
                operation="total"
                column="col1"
                jsonData={reportsData}
              />
            </div>
          </MetricCard>
        </Col>
        <Col xs={4} lg={3} md={3}>
          <MetricCard
            title="Impressions"
            operation="total"
            column="col1"
            jsonData={reportsData}
            icon={like} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
        <Col xs={4} lg={3} md={3}>
          <MetricCard
            title="Cost Per Click (CPC)"
            operation="count"
            column="col2"
            jsonData={reportsData}
            icon={credit} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
        <Col xs={4} lg={3} md={3}>
          <MetricCard
            title="Cost Per Mille (CPM)"
            operation="positiveCount"
            column="col4"
            jsonData={reportsData}
            icon={wallet} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
            tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
          />
        </Col>
      </Row>

      <div className="d-flex justify-content-between">
        <h6 className="card-title h6">Recent Reports</h6>
        <a>see all</a>
      </div>
      <Row className="metrix-container">
        {recentReports.map((report, index) => (
          <ReportsCard key={index} report={report} />
        ))}
      </Row>

      <DataTable
        id="table1"
        columns={reportcolumns}
        data={reportsData}
        defaultView="table"
        searchable={true}
        filterable={true}
        sortable={true}
        paginated={true}
      />
      <div className="form-group row p-3 gap-2 text-center">
        <span className="col"></span>
        <Button onClick={() => setModalOpen(true)} label="Start Comparison" />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="A/B Testing"
        >
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>GOALS</th>
                  <th>CAMPAIGN 1</th>
                  <th>CAMPAIGN 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Impression</td>
                  <td>50%</td>
                  <td>50%</td>
                </tr>
                <tr>
                  <td>Clicks</td>
                  <td>857</td>
                  <td>935</td>
                </tr>
                <tr>
                  <td>CTR</td>
                  <td>17%</td>
                  <td>14.9%</td>
                </tr>
                <tr>
                  <td>Conversion Rate</td>
                  <td>6%</td>
                  <td>2%</td>
                </tr>
                <tr style={{ border: "transparent" }}>
                  <td></td>
                  <td>
                    <d className="green-text">High Impact</d>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <br />
          <div className="btn-sack">
            <Button
              label="Cancel"
              type="button"
              onClick={() => setModalOpen(false)}
            />
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Reports;
