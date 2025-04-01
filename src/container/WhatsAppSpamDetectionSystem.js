import React, { useState, useRef } from "react";
import Layout from "./layout";

import FormHeader from "../components/FormHeader";
import FileUploadComponent from "../components/FileUploadComponent";
import SelectComponent from "../components/SelectComponent";
import Aetextarea from "../components/Aetextarea";
import PhoneInput from "../components/PhoneInput";
import DataTable from "../components/DataTable";
import Button from "../components/Button";
import WhatsAppSpamDetectiondata from "../assets/json/WhatsappSpamData.json";

const WhatsAppSpamDetection = () => {
  const tableRef = useRef();
  const [fileData, setFileData] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedSingle, setSelectedSingle] = useState("");

  const handleFileChange = (file, isValid) => {
    console.log("Selected file:", file);
    console.log("Is valid:", isValid);
    setFileData(file);
  };

  const messageTypeOptions = [
    { value: "text", label: "Text Message" },
    { value: "image", label: "Image Message" },
    { value: "video", label: "Video Message" },
    { value: "document", label: "Document File" },
  ];
  const spamCategoryOptions = [
    { value: "phishing", label: "Phishing Attempt" },
    { value: "malware", label: "Malware or Virus" },
    { value: "advertisement", label: "Unwanted Advertisement" },
    { value: "scam", label: "Scam or Fraud" },
    { value: "repetition", label: "Repeated Messages" },
    { value: "offensive", label: "Offensive Content" },
    { value: "suspicious_links", label: "Suspicious Links" },
    { value: "fake_identity", label: "Fake Identity or Impersonation" },
  ];
  const columns = [
    { headname: "Sender", type: "", dbcol: "col1" },
    { headname: "Recipient", type: "", dbcol: "col2" },
    { headname: "Message Type", type: "", dbcol: "col3" },
    { headname: "Spam Category", type: "", dbcol: "col4" },
    { headname: "Confidence Score", type: "", dbcol: "col5" },
  ];

  return (
    <Layout>
      <FormHeader
        title="WhatsApp Spam Detection System"
        backUrl=""
        closeUrl="/"
      />

      <div className="form_section">
        <PhoneInput
          label="Sender Contacts"
          placeholder="Enter Sender Contacts number"
        />
        <PhoneInput
          label="Recipient Contacts"
          placeholder="Enter Recipient Contacts number"
        />
        <Aetextarea
          label="Message Content"
          name="Message"
          placeholder="Type your message content here ..."
        />{" "}
        <SelectComponent
          label="Message Content"
          name="Message Content"
          options={messageTypeOptions}
          isMulti={false}
          onChange={setSelectedSingle}
        />
        <FileUploadComponent
          label="Recommended Size - 1350px X 1080px"
          name="imageUpload"
          allowedClasses="image"
          onChange={handleFileChange}
        />
        <SelectComponent
          label="Spam Category"
          name="Spam Category"
          options={spamCategoryOptions}
          isMulti={false}
          onChange={setSelectedSingle}
        />
      </div>

      <div className="gap-2 d-flex justify-content-end">
        <Button type="button" label="Reset" />
        <Button type="button" label="Submit Spam Report" />
      </div>
      <div className="form_section">
        <h6 className="card-title">Reported Spam Messages</h6>
        <DataTable
          id="table1"
          tableRef={tableRef}
          columns={columns}
          data={WhatsAppSpamDetectiondata}
          defaultView="table"
          searchable={true}
          filterable={true}
          sortable={false}
          paginated={false}
          grid={false}
        />
      </div>
    </Layout>
  );
};

export default WhatsAppSpamDetection;
