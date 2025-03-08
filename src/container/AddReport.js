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
import CheckboxInput from "../components/CheckboxInput";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AddReport = () => {

    const [SelectTable, setSelectTable] = useState("");


    const select_table = [
        { value: "1", label: "Single Post" },
        { value: "2", label: "Carousel" },
        { value: "3", label: "Reel" },
        { value: "4", label: "Story" },
    ];


    return (
        <Layout>
            <FormHeader title="Add Report" backUrl="/social-media/reports" closeUrl="/" />
            <div className="form_section">
                <h6 className="card-title">Post Details</h6>
                <TextInput
                    label="File Name"
                    placeholder="Text"
                />
                <SelectComponent
                    label="Select Table"
                    name="select_table"
                    options={select_table}
                    isMulti={false}
                    onChange={setSelectTable}
                />

                <Row>
                    <Col md={6}>
                        <CheckboxInput
                            label="Report Attribute 1"
                            name="r1"
                        />
                        <CheckboxInput
                            label="Report Attribute 2"
                            name="r2"
                        />
                        <CheckboxInput
                            label="Report Attribute 3"
                            name="r3"
                        />
                    </Col>
                    <Col md={6}>
                        <CheckboxInput
                            label="Report Attribute 4"
                            name="r4"
                        />
                        <CheckboxInput
                            label="Report Attribute 5"
                            name="r5"
                        />
                        <CheckboxInput
                            label="Report Attribute 6"
                            name="r6"
                        />
                    </Col>
                </Row>
            </div>
            <div className="form-group row p-3 gap-2 text-center">
                <span className="col-lg"></span>
                <Button
                    label="Save and continue later"
                    btnStyle="col col-md-5"
                    type="submit"
                />

                <Button
                    label="Add"
                    btnStyle="col col-md-4"
                    type="button"
                />
            </div>
        </Layout>
    );
}

export default AddReport;