import React, { useState } from "react";
import Layout from "./layout";

import FormHeader from "../components/FormHeader";
import FileUploadComponent from "../components/FileUploadComponent";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ColorCard from "../components/ColorCards"; // ✅ Import ColorCard Component

const ShipmentProtection = () => {
  const [fileData, setFileData] = useState(null);

  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const handleFileChange = (file, isValid) => {
    console.log("Selected file:", file);
    console.log("Is valid:", isValid);
    setFileData(file);
  };

  return (
    <Layout>
      <FormHeader title="Shipment Protection" backUrl="/" closeUrl="/" />
      <Row>
        <Col lg={12}>
          <div className="form_section">
            <h6 className="card-title">Shipment Protection Defaults</h6>
            <label>
              Ensure the safety of your shipments with Shipment Protection. Our
              award-winning partner Cover provides coverage for loss, damage,
              and theft. View the policy details and pricing.
            </label>
            <Row>
              <TextInput
                label="Contract Name "
                placeholder="Contract Name  "
                required={true}
                onChange={handleTextInputChange}
              />
              <TextInput
                label="Account ID"
                placeholder="Account ID"
                required={true}
                onChange={handleTextInputChange}
              />
            </Row>
            <Row>
              <TextInput
                label="General Service Passphrase "
                placeholder="General Service Passphrase  "
                required={true}
                onChange={handleTextInputChange}
              />
              <TextInput
                label="Tracking Service Passphrase"
                placeholder="Tracking Service Passphrase"
                required={true}
                onChange={handleTextInputChange}
              />
            </Row>
            <br />
            <br />
            <div className="btn-sack">
              <Button label="Update Settings" />
            </div>
          </div>
          <div className="form_section ">
            <strong>Why shipment protection matters</strong>
            <Row
            className="d-flex justify-content-around"
            >
              <ColorCard
                style={{
                  backgroundColor: "#EDFEFF",
                  borderRadius: "12px 100px 12px 12px", // top-left, top-right, bottom-right, bottom-left
                  padding: "20px",
                  width: "300px",
                  textAlign: "center",
                }}
                image="https://s3-alpha-sig.figma.com/img/efc3/bf70/2756a82be3fafdcd981439e61015d763?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=BLR2oyBSzs-DrolXyEL8XkSsFOtN00fXGy5U5CGf3tKBbBcfT3-5NTNItkK8xQRLsUWMktNC2g7E5H6XxWs3jNI4qML90AnxG1~lfvp6s4mIffjaLDlJtJDB5vP0fWXlS1Yr2ZEBem2uuCbJ-BVMP0TR0apSm1ab0-DDaW8iB9EjBxIOmxJsyp~9N6EvLEXwpKhVECW5Qvd6jcQQI0a6nCHEEJCW7C9Xtc9b4PYwKfaf2ZP6Be6ATfcZbSXlxBfT4zs2m9PSCAGc8smGnhz1h2PHmE4893HwLd2W2KLl60Rgkpb017tktN2xIH6TDFDrvP2sxFDrojzC5AwQVgamcQ__"
                title="Check your specific contract pricing."
              />
              <ColorCard
                style={{
                  backgroundColor:"#F4FFED",
                  borderRadius: "12px 12px 100px 12px", // top-left, top-right, bottom-right, bottom-left
                  padding: "20px",
                  width: "300px",
                  textAlign: "center",
                }}
                title="Understand the specific price for each shipping service."
                image="https://s3-alpha-sig.figma.com/img/916f/0009/7c78d90c0967ac649b704aa1c72de43d?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UGMm56tF3E3D29izSH1DuxmSVYm0N3bAil~lPwOQyu2Nf0XTamgjyu3HmpDp-gBUSIxhCv3KitIL51DbvQKanzon5DI-sLvPSnKZ97wQocx74nBBjQ0qPn05r2XvBGGi3UqG18ZSlozPgr-gQf1Th13VctB7zMD1m77WCaYZUG3MSV0pGMidWvCwfnrCHxda3BXp55SbmzJA5xQQlHda7LGTsD4LDKofjHpsCXFZT7k30PXDG2T0dGxe4k-16to7BLVwzRIgDI0p5wl7bpAL9UQD327IEEHkPHAXPCiIr84Be5g~HXQ44q6sXkYtDsvaO4O3F~fhjghu2yIPS~B3Fw__"
              />
              <ColorCard
                style={{
                  backgroundColor: "#FFEDFE",
                  borderRadius: "12px 100px 12px 12px", // top-left, top-right, bottom-right, bottom-left
                  padding: "20px",
                  width: "300px",
                  textAlign: "center",
                }}
                image="https://s3-alpha-sig.figma.com/img/40cc/fbad/19842444f26c1e1b2b83a1a137ffb2e0?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WWQBhMkX2VRnaR1jaK7GhX4YnWbSoZ99l4QByq4yWca-5vCsHtHIgfgTl~DSukt2o5END1bQnCHyPy2wOlNdmLNboGNPRSgxhJG2ldFGLygoVNvUpKkgW9WeTQk~stvKSJ2qF3KQ-2B3TM27EXN2fZBnnDMLBFncxK-6ZLthZljZUSUhlZVWbD9y9VPR7sq~JSrOidl5lcrC~KcOgGemIanockSRpgxU1CghpkeumC6sUw7trTXfGrZsIlB4ZUKJ9JvLqTClzG8foFjaFbYD-y2L2VSPqXcjWFd-vJYVDXQPrFx1Ymlft2OBeFiGSU8nniUo0NnljJmJHk~2KXYxhQ__"
                title="Compare your negotiated rates with carrier costs."
              />
            </Row>
            <label>
            You've set up some rules for shipment protection. 
            To enable them or create more advanced ones, go to Shipping rules.
            </label>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default ShipmentProtection;
