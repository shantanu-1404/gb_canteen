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

import layout from "../assets/svg/layout.svg";
import calender from "../assets/svg/calender.svg";
import time from "../assets/svg/time-yellow.svg";
import tick from "../assets/svg/tick-pink.svg";
import wallet from "../assets/svg/wallet-blue.svg";

import orderdata from "../assets/json/orderdata.json";


const Shipment = () => {
    const navigate = useNavigate();
    // ✅ Refresh page
    const handleRefresh = () => {
        window.location.reload(); // This will refresh the page
    };

    const columns = [
        { headname: "Order ID", dbcol: "order_id", type: "text" },
        { headname: "Date", dbcol: "date", type: "time" },
        { headname: "Channel", dbcol: "channel", type: "text" },
        { headname: "Customer Name", dbcol: "customer_name", type: "text" },
        { headname: "Status", dbcol: "status", type: "badge" },
        { headname: "Items", dbcol: "items", type: "product" }, // ✅ New column for products
        { headname: "Order Value", dbcol: "order_value", type: "currency" },
    ];


    return (
        <Layout>

            <div className="d-flex align-items-center justify-content-between">

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

                <div className="text-right gap-3 ie-btn d-flex">
                    <Button buttonType="import" label="Import" />
                    <Button buttonType="export" label="Export" />
                    <div className="dropdown">
                        <Button
                            buttonType="add"
                            onClick={() => navigate("/add-shipment")}
                            label="Add New"
                        />
                    </div>
                </div>
            </div>

            <div className="card-container gap-4 flex-wrap">
                <Row className="metrix-container">
                    <Col xs={4} md={3}>
                        <MetricCard
                            title="Total Orders Shipped"
                            operation="count"
                            column="col1"
                            jsonData={orderdata}
                            icon={layout} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                            tooltipText="This shows the count of live blogs" // Tooltip for additional context
                        />
                    </Col>
                    <Col xs={4} md={3}>
                        <MetricCard
                            title="Average Delivery Time"
                            operation="count"
                            column="col2"
                            jsonData={orderdata}
                            icon={calender}// You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                            tooltipText="This shows the count of Draft Blog" // Tooltip for additional context
                        />
                    </Col>
                    <Col xs={4} md={3}>
                        <MetricCard
                            title="Total Pending Deliveries"
                            operation="total"
                            column="col4"
                            jsonData={orderdata}
                            icon={time} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                            tooltipText="This shows the total of Views" // Tooltip for additional context
                        />
                    </Col>
                    <Col xs={4} md={3}>
                        <MetricCard
                            title="Shipment Cost Per Order"
                            operation="count"
                            column="col2"
                            jsonData={orderdata}
                            icon={tick} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                            tooltipText="This shows the total of Users" // Tooltip for additional context
                        />
                    </Col>
                    <Col xs={4} md={3}>
                        <MetricCard
                            title="Delivery Delays Reasons"
                            tooltipText="Overall engagement statistics"
                        >
                            <div className="col">
                                <Metrix
                                    title="Traffic Delays"
                                    operation="1000+"
                                    column="col1"
                                    jsonData={orderdata}
                                />
                                <Metrix
                                    title="Staff Shortage"
                                    operation="ratio"
                                    column="col1"
                                    jsonData={orderdata}
                                />
                                <Metrix
                                    title="Other Reasons"
                                    operation="ratio"
                                    column="col3,col2"
                                    jsonData={orderdata}
                                />
                            </div>
                        </MetricCard>
                    </Col>
                </Row>
            </div>

            <DataTable
                id="orderdata"
                columns={columns}
                data={orderdata}
                defaultView="table"
                searchable={true}
                filterable={true}
                sortable={true}
                paginated={true}
            />
        </Layout>
    );
};

export default Shipment;