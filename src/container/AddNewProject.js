import React, { useState, useEffect } from "react";
import Layout from './layout';
import Aetextarea from "../components/Aetextarea";
import CheckboxInput from "../components/CheckboxInput";
import RadioInput from "../components/RadioInput";
import TextInput from "../components/TextInput";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SelectComponent from "../components/SelectComponent";
import DateInput from "../components/DateInput";


const Index = () => {
 
    const handleAgreementChange = (isChecked) => {
        console.log("User agreed:", isChecked);
    };

    const handleOptionChange = (selectedValue) => {
        console.log("Selected:", selectedValue);
    };

    const handleTextInputChange = (value) => {
        console.log("TextInput:", value);
    };
    const [PostFrequency, setPostFrequency] = useState("");
    const [selectedMulti, setSelectedMulti] = useState([]);
    const post_frequency = [
        { value: "1", label: "Only once" },
        { value: "2", label: "Daily" },
        { value: "3", label: "Weekly" },
        { value: "4", label: "Monthly" },
    ];
    const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
        { value: "4", label: "Option 4" },
    ];

    return (
        <Layout>
            <Row>
                <Col md={12}>

                    <div className="form_section">
                    <h6 className="card-title">Project Details</h6>
                        <TextInput
                            label="Project Title"
                            placeholder="Title"
                            required={true}
                            onChange={handleTextInputChange}
                        />
                          <SelectComponent
                            label="Default Task View"
                            name="post_frequency"
                            options={post_frequency}
                            isMulti={false}
                            onChange={setPostFrequency}
                        />
                        <SelectComponent
                            label="Project Privacy"
                            name="post_frequency"
                            options={post_frequency}
                            isMulti={false}
                            onChange={setPostFrequency}
                        />
                        <SelectComponent
                            label="Number of People"
                            name="post_frequency"
                            options={post_frequency}
                            isMulti={false}
                            onChange={setPostFrequency}
                        />
                        <Row>
                            <Col>
                                <DateInput label="Select Past Date" type="past" />
                            </Col>
                            <Col>
                                <DateInput label="Select Future Date" type="future" />
                            </Col>
                        </Row>
                        <SelectComponent
                            label="Project Lead"
                            name="post_frequency"
                            options={post_frequency}
                            isMulti={false}
                            onChange={setPostFrequency}
                        />
                        <Aetextarea label="TextArea" name="address" placeholder="Enter your address..." />
                        <SelectComponent
                            label="Client"
                            name="post_frequency"
                            options={post_frequency}
                            isMulti={false}
                            onChange={setPostFrequency}
                        />
                        <TextInput
                            label="Budget"
                            placeholder="Budget"
                            required={true}
                            onChange={handleTextInputChange}
                        />
                        <SelectComponent
                            label="Add Tags"
                            name="multiSelect"
                            options={options}
                            isMulti={true}
                            onChange={setSelectedMulti}
                        />
                        
                        <CheckboxInput
                            label="CheckboxInput"
                            linkText="Know More"
                            linkUrl="/"
                            onChange={handleAgreementChange}
                        />
                        <RadioInput
                            label="RadioInput"
                            name="payment"
                            options={[
                                { label: "Credit Card", value: "credit" },
                                { label: "PayPal", value: "paypal" },
                                { label: "Bank Transfer", value: "bank" }
                            ]}
                            required={true}
                            onChange={handleOptionChange}
                        />
                    </div>
                </Col>              
            </Row>
        </Layout>
    );
}

export default Index;