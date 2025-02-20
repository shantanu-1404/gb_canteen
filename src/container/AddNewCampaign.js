import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from './layout';
import addCampaignImg from "../assets/image/addcampaign.png";
import currentcampaign from "../assets/image/currentcampaign.png";

import FormHeader from "../components/FormHeader";
import FileUploadComponent from "../components/FileUploadComponent";
import SelectComponent from "../components/SelectComponent";
import Aetextarea from "../components/Aetextarea";
import RangeInput from "../components/RangeInput";
import PhoneInput from "../components/PhoneInput";
import DateInput from "../components/DateInput";
import CheckboxInput from "../components/CheckboxInput";
import RadioInput from "../components/RadioInput";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import PostCard from "../components/PostCard";
import CampaignCard from "../components/CampaignCard";
import TagInput from "../components/TagInput";
import Modal from "../components/Modal";
import NotificationCard from "../components/NotificationCard";


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AddNewCampaign = () => {
    const [selectedAudience, setSelectedAudience] = useState(""); // Initially no selection
    const [savedAudience, setSavedAudience] = useState("");
    const [looklikeAudience, setLooklikeAudience] = useState("");
    const [location, setLocation] = useState("");
    const [AdFormat, setAdFormat] = useState("");
    const [Reviewer, setReviewer] = useState("");
    const [ABAudiance, setABAudiance] = useState("");
    const [Goal, setGoal] = useState("");

    const audienceOptions = [
        { value: "1", label: "Anuj Avhad" },
        { value: "2", label: "Shantanu Sadafale" },
        { value: "4", label: "Sakshi Tajane" },
        { value: "3", label: "Aparna Suryavanshi" }
    ];

    const looklikeAudienceOptions = [
        { value: "1", label: "High-Value Customers" },
        { value: "2", label: "Frequent Shoppers" },
        { value: "4", label: "Top Engaged Users" },
        { value: "3", label: "Geolocation-Based Audience" }
    ];

    const locationOptions = [
        { value: "1", label: "India" },
        { value: "2", label: "United States" },
        { value: "3", label: "United Kingdom" }
    ];

    const ad_format = [
        { value: "img", label: "Image" },
        { value: "vid", label: "Video" }
    ];

    const reviewer = [
        { value: "1", label: "Anuj Avhad" },
        { value: "2", label: "Shantanu Sadafale" },
        { value: "4", label: "Sakshi Tajane" },
        { value: "3", label: "Aparna Suryavanshi" }
    ];

    const goal = [
        { value: "clicks", label: "Clicks" },
        { value: "impressions", label: "Impressions" },
        { value: "conversions", label: "Conversions" }
    ];

    const ab_audiance = [
        { value: "all", label: "All Users" },
        { value: "new", label: "New Users" },
        { value: "returning", label: "Returning Users" }
    ];

    const [isModalOpen, addCampaign] = useState(false);
    const [fileData, setFileData] = useState(null);

    // Handle media file selection
    const handleMediaChange = (file, isValid) => {
        if (isValid && file) {
            setFileData(file);
        }
    };


    return (
        <Layout>
            <FormHeader title="Add New Campaign" backUrl="/social-media" closeUrl="/" />
            <Row>
                <Col md={7}>
                    <div className="form_section">
                        <h6 className="card-title">Ad Campaign Details</h6>
                        <TextInput
                            label="Campaign Name"
                            placeholder="Name"
                            required={true}
                        />
                        <TextInput
                            label="Campaign Objective"
                            placeholder="Objective"
                            required={true}
                        />
                    </div>
                    <div className="form_section">
                        <h6 className="card-title">Ad Sets</h6>
                        {/* Audience Type Selection */}
                        <RadioInput
                            label="Audience"
                            name="audience"
                            options={[
                                { label: "Saved Audiences", value: "1" },
                                { label: "Custom Audiences", value: "2" },
                                { label: "Lookalike Audiences", value: "3" }
                            ]}
                            required={true}
                            onChange={(value) => setSelectedAudience(value)}
                        />

                        {/* Show fields based on selected audience type */}
                        {selectedAudience === "1" && (
                            <SelectComponent
                                label="Select From Saved Audience"
                                name="audience"
                                options={audienceOptions}
                                isMulti={false}
                                onChange={setSavedAudience}
                            />
                        )}

                        {selectedAudience === "2" && (
                            <Button
                                label="Add Customer"
                                buttonType="add"
                                btnStyle="mb-3"
                                type="button"
                            />
                        )}

                        {selectedAudience === "3" && (
                            <Row>
                                <Col>
                                    <SelectComponent
                                        label="Select Type"
                                        listStyle="col-md-6"
                                        name="looklike_audience"
                                        options={looklikeAudienceOptions}
                                        isMulti={false}
                                        onChange={setLooklikeAudience}
                                    />
                                </Col>
                                <Col>
                                    {/* Conditional Inputs for Lookalike Audiences */}
                                    {looklikeAudience === "1" && (
                                        <TextInput label="Top Spend" type="number" placeholder="Amount" />
                                    )}
                                    {looklikeAudience === "2" && (
                                        <TextInput label="Purchase Frequency" type="number" placeholder="Times per month" />
                                    )}
                                    {looklikeAudience === "4" && (
                                        <TextInput label="Engagement Rate" type="number" placeholder="%" />
                                    )}
                                    {looklikeAudience === "3" && (
                                        <SelectComponent
                                            label="Select Location"
                                            listStyle="col-md-6"
                                            name="looklike_audience"
                                            options={locationOptions}
                                            isMulti={false}
                                            onChange={setLocation}
                                        />
                                    )}
                                </Col>
                            </Row>
                        )}




                        <RadioInput
                            label="Placements"
                            name="placements"
                            options={[
                                { label: "Automatic", value: "1" },
                                { label: "Manual Placement", value: "2" }
                            ]}
                            required={true}
                        />

                        <Row>
                            <Col md={3}>
                                <div className="form-group">
                                    <label className="form-label">
                                        Facebook -
                                    </label>
                                </div>
                            </Col>
                            <Col>
                                <CheckboxInput
                                    label="Stories"
                                    name="fbstories"
                                />
                            </Col>
                            <Col>
                                <CheckboxInput
                                    label="Marketplace"
                                    name="fbmarketplace"
                                />
                            </Col>
                            <Col>
                                <CheckboxInput
                                    label="News Feed"
                                    name="fbnewsfeed"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <div className="form-group">
                                    <label className="form-label">
                                        Instagram -
                                    </label>
                                </div>
                            </Col>
                            <Col>
                                <CheckboxInput
                                    label="Feed"
                                    name="igfeed"
                                />
                            </Col>
                            <Col>
                                <CheckboxInput
                                    label="Story"
                                    name="igstory"
                                />
                            </Col>
                            <Col>
                                <CheckboxInput
                                    label="Reel"
                                    name="igreel"
                                />
                            </Col>
                        </Row>
                        <div className="form-group">
                            <label className="form-label">
                                Budget
                            </label>
                        </div>
                        <Row>
                            <Col>
                                <TextInput
                                    label="Daily Budget"
                                    type="number"
                                    placeholder="Daily Budget"
                                />
                            </Col>
                            <Col>
                                <TextInput
                                    label="Lifetime Budget"
                                    type="number"
                                    placeholder="Lifetime Budget"
                                />
                            </Col>
                        </Row>
                        <div className="form-group">
                            <label className="form-label">
                                Schedule
                            </label>
                        </div>
                        <Row>
                            <Col>
                                <DateInput label="Start Date" type="future" />
                            </Col>
                            <Col>
                                <DateInput label="End Date" type="future" />
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col md={5}>
                    <div className="form_section">
                        <h6 className="card-title">Ad Creatives</h6>
                        <SelectComponent
                            label="Ad Format"
                            name="post_frequency"
                            options={ad_format}
                            isMulti={false}
                            onChange={setAdFormat}
                        />
                        <TextInput
                            label="Ad Heading"
                            name="heading"
                            placeholder="Heading"
                            required={true}
                        />
                        <Aetextarea
                            label="Ad Description"
                            name="Description"
                            placeholder="Description"
                            isWordCount={true}
                            wordLimit={50}
                        />
                        <div className="form-group">
                            <label className="form-label">
                                Call-to-action-
                            </label>
                        </div>
                        <Row>
                            <Col md={6}>
                                <CheckboxInput
                                    label="Learn More"
                                    name="learnmore"
                                />
                            </Col>
                            <Col md={6}>
                                <CheckboxInput
                                    label="Get Offer"
                                    name="getoffer"
                                />
                            </Col>
                            <Col md={6}>
                                <CheckboxInput
                                    label="Sign Up"
                                    name="signup"
                                />
                            </Col>
                            <Col md={6}>
                                <CheckboxInput
                                    label="Download"
                                    name="download"
                                />
                            </Col>
                            <Col md={6}>
                                <CheckboxInput
                                    label="Buy Now"
                                    name="buynow"
                                />
                            </Col>
                            <Col md={6}>
                                <CheckboxInput
                                    label="Shop Now"
                                    name="shopnow"
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="form_section">
                        <h6 className="card-title">Approval Workflow</h6>
                        <SelectComponent
                            label="Assign Reviewer"
                            name="reviewer"
                            options={reviewer}
                            isMulti={false}
                            onChange={setReviewer}
                        />
                        <div className="form-group">
                            <label className="form-label">
                                Approval Status
                            </label>
                            <br />
                            <span class="pending">Pending</span>
                        </div>
                    </div>
                    <div className="form_section">
                        <h6 className="card-title">Add Media</h6>
                        <FileUploadComponent
                            label="Recommended Size - 1350px X 1080px"
                            name="imageUpload"
                            allowedClasses="image video"
                            onChange={handleMediaChange}
                        />
                    </div>
                </Col>
            </Row>

            <div className="form_section">
                <h6 className="card-title">A/B Testing</h6>
                <Row className="position-relative">
                    <Col md={6} className="p-3">
                        <div className="form-group">
                            <label className="form-label">
                                Current Campaign
                            </label>
                            <img src={fileData ? URL.createObjectURL(fileData) : currentcampaign} className="post-preview" />
                        </div>
                    </Col>

                    {/* Vertical line */}
                    <div className="vertical-line d-none d-md-block"></div>

                    <Col md={6} className="p-3">
                        <div className="form-group">
                            <label className="form-label">
                                Recent Campaign
                            </label>
                            <a onClick={() => addCampaign(true)} >
                                <img src={addCampaignImg} className="object-cover post-preview" alt="Campaign" />
                            </a>
                            <Modal isOpen={isModalOpen} onClose={() => addCampaign(false)} title="Add Campaign">
                                <form>
                                    <br/><br/>
                                    <div className="btn-sack">
                                        <Button
                                            label="Cancel"
                                            type="button"
                                            onClick={() => addCampaign(false)}
                                        />
                                        <Button
                                            label="Save"
                                            type="submit"
                                        />
                                    </div>
                                </form>
                            </Modal>


                        </div>
                    </Col>
                    <div className="form-group row p-3 gap-2 justify-content-end">
                        <Button
                            label="Remove"
                            btnStyle="red"
                            type="button"
                        />
                    </div>
                </Row>
                <Row >
                    <Col md={6} className="mt-5" >
                        <SelectComponent
                            label="Select Audience"
                            listStyle="col-md-6 "
                            name="ab_audiance"
                            options={ab_audiance}
                            isMulti={false}
                            onChange={setABAudiance}
                        />
                        <RangeInput
                            title="Split Audience Percentage"
                            from="Current Campaign"
                            to="Recent Campaign"
                            min={0}
                            max={100}
                            defaultValue={50}
                        />

                    </Col>
                    <Col md={6} >
                        <div className="form-group">
                            <label className="form-label">
                                Duration
                            </label>
                        </div>
                        <Row>
                            <Col>
                                <DateInput
                                    label="start"
                                    name="campaignstart_date"
                                    type="future"
                                />
                            </Col>
                            <Col>
                                <DateInput
                                    label="end"
                                    name="campaignend_date"
                                    type="future"
                                />
                            </Col>
                        </Row>

                        <SelectComponent
                            label="Goal"
                            listStyle="col-md-6"
                            name="goal"
                            options={goal}
                            isMulti={false}
                            onChange={setGoal}
                        />
                    </Col>
                </Row>
                <h6 className="card-title">A/B Testing</h6>
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                GOALS
                            </th>
                            <th>
                                CAMPAIGN 1
                            </th>
                            <th>
                                CAMPAIGN 2
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Impression
                            </td>
                            <td>
                                50%
                            </td>
                            <td>
                                50%
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Clicks
                            </td>
                            <td>
                                857
                            </td>
                            <td>
                                935
                            </td>
                        </tr>
                        <tr>
                            <td>
                                CTR
                            </td>
                            <td>
                                17%
                            </td>
                            <td>
                                14.9%
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Conversion  Rate
                            </td>
                            <td>
                                6%
                            </td>
                            <td>
                                2%
                            </td>
                        </tr>
                        <tr style={{ border: "transparent"}}>
                            <td>

                            </td>
                            <td>
                                <d className="green-text">
                                    High Impact
                                </d>
                            </td>
                            <td>

                            </td>
                        </tr>
                    </tbody>
                </table>


            </div>
            <div className="form-group row p-3 gap-2 justify-content-end">

                <Button
                    label="Start Testing"
                    btnStyle="col-3"
                    type="button"
                />

                <Button
                    label="Save and continue later"
                    btnStyle="col-3"
                    type="submit"
                />

                <Button
                    label="Publish Optimal Version"
                    btnStyle="col-3"
                    type="button"
                />
            </div>
        </Layout>
    );
}

export default AddNewCampaign;