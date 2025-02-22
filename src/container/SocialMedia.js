import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from './layout';

import PostCard from "../components/PostCard";
import CampaignCard from "../components/CampaignCard";
import MetricCard from "../components/MetricCard";
import NotificationCard from "../components/NotificationCard";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import postData from "../assets/json/posts.json";
import campaignData from "../assets/json/campaigns.json";
import notificationData from "../assets/json/notifications.json";
import tabledata from "../assets/json/tabledata.json";

const SocialMedia = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(postData);
    }, []);


    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        setCampaigns(campaignData);
    }, []);


    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        setNotifications(notificationData);
    }, []);

    const navigate = useNavigate();

    return (
        <Layout>
            <div className="d-flex justify-content-between">
                <div>

                </div>
                <div className="text-right gap-3 d-flex">
                    <Button buttonType="import" label="Import" />
                    <Button buttonType="export" label="Export" />
                    <Dropdown
                        label="Add New"
                        buttonType="add"
                        menuItems={[
                            { label: "Add New Post", onClick: () => navigate("/add-post") },
                            { label: "Add New Campaign", onClick: () => navigate("/add-campaign") }
                        ]}
                    />

                </div>
            </div>

            <Row>
                <Col xs={6} lg={3}  md={4}>
                    <MetricCard
                        title="Total of Col-1"
                        operation="total"
                        column="col1"
                        jsonData={tabledata}
                        icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                        tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
                    />
                </Col>
                <Col xs={6} lg={3}  md={4}>
                    <MetricCard
                        title="Count for Col-2"
                        operation="count"
                        column="col2"
                        jsonData={tabledata}
                        icon="http://localhost/gb_canteen/svg/truck.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                        tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
                    />
                </Col>
                <Col xs={6} lg={3}  md={4}>
                    <MetricCard
                        title="Positive Count"
                        operation="positiveCount"
                        column="col4"
                        jsonData={tabledata}
                        icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                        tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
                    />
                </Col>
                <Col xs={6} lg={3}  md={4}>
                    <MetricCard
                        title="Negative Count"
                        operation="negativeCount"
                        column="col4"
                        jsonData={tabledata}
                        icon="http://localhost/gb_canteen/svg/order_bag.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                        tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
                    />
                </Col>
                <Col xs={6} lg={3} md={4}>
                    <MetricCard
                        title="Mean of Col-1"
                        operation="mean"
                        column="col1"
                        jsonData={tabledata}
                        icon="http://localhost/gb_canteen/svg/truck.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                        tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
                    />
                </Col>
                <Col xs={6} lg={3}  md={4}>
                    <MetricCard
                        title="Average of Col-5 & Col-6"
                        operation="average"
                        column="col5,col6"
                        jsonData={tabledata}
                        icon="http://localhost/gb_canteen/svg/order_bag.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                        tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
                    />
                </Col>
                <Col xs={6} lg={3}  md={4}>
                    <MetricCard
                        title="Ratio (Col-1 / Col-2)"
                        operation="ratio"
                        column="col1,col2"
                        jsonData={tabledata}
                        icon="http://localhost/gb_canteen/svg/return.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                        tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
                    />
                </Col>
                <Col xs={6} lg={3}  md={4}>
                    <MetricCard
                        title="Percentage of Positive (Col-2)"
                        operation="percentage"
                        column="col2"
                        jsonData={tabledata}
                        icon="http://localhost/gb_canteen/svg/order_bag.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                        tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
                    />
                </Col>
                <Col xs={6} lg={3}  md={4}>
                    <MetricCard
                        title="Count of Values()"
                        operation="1000+"
                        column="col1"
                        jsonData={tabledata}
                        icon="http://localhost/gb_canteen/svg/return.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                        tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
                    />
                </Col>
                <Col xs={6} lg={3}  md={4}>
                    <MetricCard
                        title="Total of Col-1"
                        operation="total"
                        column="col1"
                        jsonData={tabledata}
                        icon="http://localhost/gb_canteen/svg/wallet.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
                        tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
                    />
                </Col>
            </Row>
            <div className="form_section">
                <div className="d-flex justify-content-between">
                    <h6 className="card-title">Recent Posts</h6>
                    <a>see all</a>
                </div>
                <Row>
                    {posts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))}
                </Row>
            </div>

            <div className="form_section">
                <div className="d-flex justify-content-between">
                    <h6 className="card-title">Recent Campaigns</h6>
                    <a>see all</a>
                </div>
                <Row>
                    {campaigns.map((campaign, index) => (
                        <CampaignCard key={index} campaign={campaign} />
                    ))}
                </Row>
            </div>

            <div className="form_section">
                <div className="d-flex justify-content-between">
                    <h6 className="p-2">Notifications</h6>
                    <a>See all</a>
                </div>
                <div className="home_table">
                    {notifications.map((notification, index) => (
                        <NotificationCard key={index} notification={notification} />
                    ))}
                </div>
            </div>

            <br />
        </Layout>
    );
}

export default SocialMedia;