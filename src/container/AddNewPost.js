import React, { useState, useEffect } from "react";
import Layout from './layout';



import FormHeader from "../components/FormHeader";
import FileUploadComponent from "../components/FileUploadComponent";
import SelectComponent from "../components/SelectComponent";
import Aetextarea from "../components/Aetextarea";
import DateInput from "../components/DateInput";
import RadioInput from "../components/RadioInput";
import ColorPicker from "../components/ColorPicker";
import TextInput from "../components/TextInput";
import PostPreview from "../components/PostPreview";
import Button from "../components/Button";
import SocialMediaSelect from "../components/SocialMediaSelect";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AddNewPost = () => {



    const [PostType, setPostType] = useState("");
    const [PostFrequency, setPostFrequency] = useState("");
    const [Reviewer, setReviewer] = useState("");

    const post_type = [
        { value: "1", label: "Single Post" },
        { value: "2", label: "Carousel" },
        { value: "3", label: "Reel" },
        { value: "4", label: "Story" },
    ];
    const post_frequency = [
        { value: "1", label: "Only once" },
        { value: "2", label: "Daily" },
        { value: "3", label: "Weekly" },
        { value: "4", label: "Monthly" },
    ];
    const reviewer = [
        { value: "1", label: "Anuj Avhad" },
        { value: "2", label: "Shantanu Sadafale" },
        { value: "4", label: "Sakshi Tajane" },
        { value: "3", label: "Aparna Suryavanshi" }
    ];

    const [showDateInput, setShowDateInput] = useState(false);
    const handlePreferencesChange = (selectedValue) => {
        setShowDateInput(selectedValue === "later");
    };



    const [fileData, setFileData] = useState(null);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [caption, setCaptionChange] = useState([]);
    const [buttonText, setButtonText] = useState("");
    const [buttonUrl, setButtonUrl] = useState("");
    const [buttonColor, setButtonColor] = useState("#e6e6e6");
    const [selectedPosition, setSelectedPosition] = useState("centre");
    const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
    const [message, setMessage] = useState("");
    const [hashtag, setHashtag] = useState("");
    const [userTags, setUserTags] = useState("");


    // Handle media file selection
    const handleMediaChange = (file, isValid) => {
        if (isValid) {
            setFileData(file);
        }
    };

    // Handle social media platform selection
    const handlePlatformChange = (selected) => {
        setSelectedPlatforms(selected);
        setCurrentPreviewIndex(0); // Reset preview index when platforms change
    };

    // Handle button text change
    const handleButtonTextChange = (text) => {
        setButtonText(text);
    };

    // Handle button URL change
    const handleButtonUrlChange = (url) => {
        setButtonUrl(url);
    };

    // Handle button color change
    const handleColorChange = (color) => {
        setButtonColor(color);
    };

    // Handle position change
    const handlePositionChange = (selectedValue) => {
        setSelectedPosition(selectedValue);
    };


    // Handle caption change
    const handleCaptionChange = (text) => {
        setMessage(text);
    };

    // Handle hashtag change
    const handleHashtagChange = (text) => {
        setHashtag(text);
    };

    // Handle user tags change
    const handleUserTagsChange = (text) => {
        setUserTags(text);
    };

    // Combine all inputs into a final caption
    const combinedCaption = `${message}\n${hashtag}\n${userTags}`;



    return (
        <Layout>
            <FormHeader title="Add New Post" backUrl="/social-media" closeUrl="/" />
            <Row>
                <Col md={7}>
                    <div className="form_section">
                        <h6 className="card-title">Post Details</h6>
                        <SelectComponent
                            label="Post Type"
                            name="post_type"
                            options={post_type}
                            isMulti={false}
                            onChange={setPostType}
                        />
                        <Aetextarea
                            label="Broadcast Your Message"
                            name="caption"
                            placeholder="Write here..."
                            isWordCount={true}
                            wordLimit={500}
                            onChange={handleCaptionChange}
                        />
                        <TextInput
                            label="Hashtag"
                            placeholder="Hashtag"
                            required={true}
                            onChange={(e) => handleHashtagChange(e)}
                        />
                        <TextInput
                            label="Tag Users/Brands"
                            placeholder="@Tag"
                            required={true}
                            onChange={(e) => handleUserTagsChange(e)}
                        />
                        <RadioInput
                            label="Publishing Preferences"
                            name="preference"
                            options={[
                                { label: "Publish Now", value: "now" },
                                { label: "Schedule For Later", value: "later" }
                            ]}
                            required={true}
                            onChange={handlePreferencesChange}
                        />
                        {showDateInput &&
                            <>
                                <DateInput label="Date & Time" includeTime={true} type="future" />
                                <SelectComponent
                                    label="Post Frequency"
                                    name="post_frequency"
                                    options={post_frequency}
                                    isMulti={false}
                                    onChange={setPostFrequency}
                                />
                            </>

                        }
                        <div className="form-group">
                            <label className="form-label">
                                Add To Campaign
                            </label>
                            <label>
                                <small>Incorporate this social post into a campaign to track, manage, and report on it along with other related marketing assets. Explore the advantages of using <a>campaigns</a>.</small>
                            </label>
                        </div>
                    </div>
                    <div className="form_section">
                        <h6 className="card-title">Polls for Stories/Posts</h6>
                        <TextInput
                            label="Question to Ask"
                            placeholder="Question"
                        />
                        <TextInput
                            label="Options"
                            placeholder="Option 1"
                        />
                        <TextInput
                            label=""
                            placeholder="Option 2"
                        />
                        <TextInput
                            label=""
                            placeholder="Option 3"
                        />
                        <TextInput
                            label=""
                            placeholder="Option 4"
                        />
                    </div>
                </Col>
                <Col md={5}>
                    <SocialMediaSelect onSelectionChange={handlePlatformChange} />
                    <div className="form_section">
                        <h6 className="card-title">Add Media</h6>
                        <FileUploadComponent
                            label="Recommended Size - 1350px X 1080px"
                            name="imageUpload"
                            allowedClasses="image video"
                            onChange={handleMediaChange}
                        />
                    </div>
                    <div className="form_section">
                        <h6 className="card-title">Add Link Buttons</h6>
                        <ColorPicker
                            label="Background Colour"
                            defaultColor={buttonColor}
                            onChange={handleColorChange}
                        />
                        <TextInput
                            label="Button Text"
                            placeholder="Text"
                            onChange={handleButtonTextChange}
                        />
                        <TextInput
                            label="URL"
                            type="url"
                            placeholder="Url"
                            onChange={handleButtonUrlChange}
                        />
                        <RadioInput
                            label="Position"
                            name="position"
                            options={[
                                { label: "Left", value: "left" },
                                { label: "Right", value: "right" },
                                { label: "Centre", value: "center" }
                            ]}
                            required={true}
                            onChange={handlePositionChange}
                        />
                    </div>
                    <PostPreview
                        fileData={fileData}
                        selectedPlatforms={selectedPlatforms}
                        buttonText={buttonText}
                        buttonUrl={buttonUrl}
                        buttonColor={buttonColor}
                        selectedPosition={selectedPosition}
                        captionText={combinedCaption}
                    />
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
                    <div className="form-group row p-3 gap-2 text-center">
                        <Button
                            label="Save and continue later"
                            btnStyle="col"
                            type="submit"
                        />

                        <Button
                            label="Publish"
                            btnStyle="col-4"
                            type="button"
                        />
                    </div>
                </Col>
            </Row>

        </Layout>
    );
}

export default AddNewPost;