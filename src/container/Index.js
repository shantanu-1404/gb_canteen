import React, { useState } from "react";
import FileUploadComponent from "../components/FileUploadComponent";
import SelectComponent from "../components/SelectComponent";
import Aetextarea from "../components/Aetextarea";
import PhoneInput from "../components/PhoneInput";
import EmailInput from "../components/EmailInput";
import DateInput from "../components/DateInput";
import CheckboxInput from "../components/CheckboxInput";
import RadioInput from "../components/RadioInput";
import TextInput from "../components/TextInput";
import Layout from './layout';
import TagInput from "../components/TagInput";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Index = () => {
    const [fileData, setFileData] = useState(null);

    const handleFileChange = (file, isValid) => {
        console.log("Selected file:", file);
        console.log("Is valid:", isValid);
        setFileData(file);
    };

    const [selectedSingle, setSelectedSingle] = useState("");
    const [selectedMulti, setSelectedMulti] = useState([]);

    const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
        { value: "4", label: "Option 4" },
    ];

    const handleTagsChange = (tags) => {
        console.log("Selected Tags:", tags);
    };
    const availableTags = [
        "JavaScript",
        "HTML",
        "CSS",
        "React",
        "Node.js",
        "Angular",
        "Vue",
        "Python",
        "Django",
        "Flask",
    ];

    const handleAgreementChange = (isChecked) => {
        console.log("User agreed:", isChecked);
    };

    const handleOptionChange = (selectedValue) => {
        console.log("Selected:", selectedValue);
    };

    const handleStreetChange = (value) => {
        console.log("Street:", value);
    };

    return (
        <Layout>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>🚀 Welcome to React!</h1>
                <p>This is your first React App.</p>
            </div>
            <h2>Upload Files</h2>
            <Row>
                <Col md={7}>
                    <div className="form_section">
                        <FileUploadComponent
                            label="Recommended Size - 1350px X 1080px"
                            name="imageUpload"
                            allowedClasses="image"
                            onChange={handleFileChange}
                        />
                        <FileUploadComponent
                            label="Video Upload"
                            name="videoUpload"
                            allowedClasses="video"
                            onChange={handleFileChange}
                        />

                        <FileUploadComponent
                            label="PDF Upload"
                            name="pdfUpload"
                            allowedClasses="pdf"
                            onChange={handleFileChange}
                        />

                        <TagInput availableTags={availableTags} onTagsChange={handleTagsChange} />

                        <Aetextarea label="Address" name="address" placeholder="Enter your address..." />

                        <Row>
                            <Col>
                                <DateInput label="Birth Date" type="past" />
                            </Col>
                            <Col>
                                <DateInput label="Event Date" type="future" />
                            </Col>
                        </Row>
                        <CheckboxInput
                            label="I accept the"
                            linkText="Privacy Policy"
                            linkUrl="/privacy-policy"
                            onChange={handleAgreementChange}
                        />
                        <RadioInput
                            label="Choose a Payment Method"
                            name="payment"
                            options={[
                                { label: "Credit Card", value: "credit" },
                                { label: "PayPal", value: "paypal" },
                                { label: "Bank Transfer", value: "bank" }
                            ]}
                            required={true}
                            onChange={handleOptionChange}
                        />

                        <TextInput
                            label="Street"
                            info="Allows the user to specify packaging standards to ensure consistency in handling and delivery"
                            placeholder="Enter street"
                            required={true}
                            onChange={handleStreetChange}
                        />

                    </div>
                </Col>
                <Col md={5}>
                    <div className="form_section">
                        <h2>Custom Select Dropdown</h2>
                        {/* Single Select */}
                        <SelectComponent
                            label="Single Select"
                            name="singleSelect"
                            options={options}
                            isMulti={false}
                            onChange={setSelectedSingle}
                        />

                        {/* Multi-Select */}
                        <SelectComponent
                            label="Multi Select"
                            name="multiSelect"
                            options={options}
                            isMulti={true}
                            onChange={setSelectedMulti}
                        />

                        <Aetextarea
                            label="Description"
                            name="description"
                            placeholder="Enter your description..."
                            isWordCount={true}
                            wordLimit={200}
                        />
                        <div class="form-group">
                            <label for="" class="form-label">Landmark</label>
                            <input type="text" class="form-control" id="" placeholder="Landmark" />
                        </div>
                        <PhoneInput label="Mobile Number" placeholder="Enter your mobile number" />
                        <EmailInput label="Work Email" placeholder="yourname@company.com" />

                        <br /><br />
                        <div class="btn-sack">
                            <button type="submit" class="a-btn-primary">Save</button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
                <Col>
                </Col>
            </Row>
        </Layout>
    );
}

export default Index;