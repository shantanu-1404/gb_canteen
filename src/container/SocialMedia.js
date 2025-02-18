import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from './layout';

import PostCard from "../components/PostCard";
import CampaignCard from "../components/CampaignCard";
import NotificationCard from "../components/NotificationCard";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import postData from "../assets/json/posts.json";
import campaignData from "../assets/json/campaigns.json";
import notificationData from "../assets/json/notifications.json";

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