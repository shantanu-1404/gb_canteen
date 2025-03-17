import React, { useState } from "react";
import Layout from "./layout";
import FormHeader from "../components/FormHeader";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInput from "../components/CheckboxInput";
import Button from "../components/Button";

const CustomerDetails = () => {
  // ✅ Checkbox State
  const [sameAsShipping, setSameAsShipping] = useState(false);

  // ✅ Shipping Address State
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // ✅ Billing Address State (Initially Empty)
  const [billingAddress, setBillingAddress] = useState({
    address: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // ✅ Handle Checkbox Change
  const handleCheckboxChange = (isChecked) => {
    console.log("📌 Checkbox Checked:", isChecked);
    setSameAsShipping(isChecked);

    if (isChecked) {
      console.log("✅ Copying Shipping Address to Billing Address...");
      setBillingAddress({ ...shippingAddress }); // ✅ Ensures billing updates immediately
    }
  };

  // ✅ Handle Shipping Input Change
  const handleShippingChange = (field, value) => {
    console.log(`✏️ Shipping ${field} Changed:`, value);
    setShippingAddress((prev) => {
      const updatedShipping = { ...prev, [field]: value };

      // ✅ If checkbox is checked, sync billing address immediately
      if (sameAsShipping) {
        console.log("🔄 Syncing with Billing Address...");
        setBillingAddress({ ...updatedShipping });
      }

      return updatedShipping;
    });
  };

  return (
    <Layout>
      <Row>
        <FormHeader title="Customer Details" backUrl="/dashboard" closeUrl="/" />

        {/* ✅ Shipping Address */}
        <Col md={6}>
          <div className="form_section">
            <h6 className="card-title">Shipping Address</h6>
            <TextInput
              label="Address"
              placeholder="Enter address"
              value={shippingAddress.address}
              onChange={(value) => handleShippingChange("address", value)}
            />
            <TextInput
              label="Street Name"
              placeholder="Street"
              value={shippingAddress.street}
              onChange={(value) => handleShippingChange("street", value)}
            />
            <Row>
              <Col md={4}>
                <TextInput
                  label="City"
                  placeholder="City"
                  value={shippingAddress.city}
                  onChange={(value) => handleShippingChange("city", value)}
                />
              </Col>
              <Col md={4}>
                <TextInput
                  label="State"
                  placeholder="State"
                  value={shippingAddress.state}
                  onChange={(value) => handleShippingChange("state", value)}
                />
              </Col>
              <Col md={4}>
                <TextInput
                  label="Postal Code"
                  placeholder="Code"
                  value={shippingAddress.postalCode}
                  onChange={(value) => handleShippingChange("postalCode", value)}
                />
              </Col>
            </Row>
          </div>
        </Col>

        {/* ✅ Checkbox to Sync Billing Address */}
        <Col md={12} className="mt-3">
          <CheckboxInput
            label="My billing and shipping addresses are the same"
            onChange={handleCheckboxChange}
            checked={sameAsShipping}
          />
        </Col>

        {/* ✅ Billing Address */}
        <Col md={6}>
          <div className="form_section">
            <h6 className="card-title">Billing Address</h6>
            <TextInput
              label="Address"
              placeholder="Enter address"
              value={billingAddress.address}
              onChange={(value) =>
                !sameAsShipping &&
                setBillingAddress((prev) => ({ ...prev, address: value }))
              }
              disabled={sameAsShipping}
            />
            <TextInput
              label="Street Name"
              placeholder="Street"
              value={billingAddress.street}
              onChange={(value) =>
                !sameAsShipping &&
                setBillingAddress((prev) => ({ ...prev, street: value }))
              }
              disabled={sameAsShipping}
            />
            <Row>
              <Col md={4}>
                <TextInput
                  label="City"
                  placeholder="City"
                  value={billingAddress.city}
                  onChange={(value) =>
                    !sameAsShipping &&
                    setBillingAddress((prev) => ({ ...prev, city: value }))
                  }
                  disabled={sameAsShipping}
                />
              </Col>
              <Col md={4}>
                <TextInput
                  label="State"
                  placeholder="State"
                  value={billingAddress.state}
                  onChange={(value) =>
                    !sameAsShipping &&
                    setBillingAddress((prev) => ({ ...prev, state: value }))
                  }
                  disabled={sameAsShipping}
                />
              </Col>
              <Col md={4}>
                <TextInput
                  label="Postal Code"
                  placeholder="Code"
                  value={billingAddress.postalCode}
                  onChange={(value) =>
                    !sameAsShipping &&
                    setBillingAddress((prev) => ({ ...prev, postalCode: value }))
                  }
                  disabled={sameAsShipping}
                />
              </Col>
            </Row>
          </div>
        </Col>

        {/* ✅ Submit Buttons */}
        <Col md={12} className="text-center mt-3">
          <Button label="Save and Continue" buttonType="primary" />
        </Col>
      </Row>
    </Layout>
  );
};

export default CustomerDetails;
