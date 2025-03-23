
import React, { useState, useEffect } from "react";
import Layout from "./layout";
import FormHeader from "../components/FormHeader";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInput from "../components/CheckboxInput";
import Button from "../components/Button";

const CustomerDetails = () => {
  const [sameAsShipping, setSameAsShipping] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [billingAddress, setBillingAddress] = useState({
    address: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // ✅ Automatically update billing if checkbox is checked
  useEffect(() => {
    if (sameAsShipping) {
      console.log("📦 Auto-updating billing address from shipping...");
      setBillingAddress({ ...shippingAddress });
    }
  }, [shippingAddress, sameAsShipping]);

  // ✅ Checkbox toggle
  const handleCheckboxChange = (isChecked) => {
    console.log("📌 Checkbox Checked:", isChecked);
    setSameAsShipping(isChecked);

    if (isChecked) {
      console.log("✅ Copying Shipping Address to Billing Address...");
      setBillingAddress({ ...shippingAddress });
    }
  };

  // ✅ Update shipping fields
  const handleShippingChange = (field, value) => {
    console.log(`✏️ Shipping ${field} Changed:`, value);
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <Row>
        <FormHeader
          title="Customer Details"
          backUrl="/dashboard"
          closeUrl="/"
        />

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
                  onChange={(value) =>
                    handleShippingChange("postalCode", value)
                  }
                />
              </Col>
            </Row>
  

        {/* ✅ Checkbox */}
   
          <CheckboxInput
            label="My billing and shipping addresses are the same"
            checked={sameAsShipping}
            onChange={handleCheckboxChange}
          />
  
            <h6 className="card-title">Billing Address</h6>
            <TextInput
              label="Address"
              placeholder="Enter address"
              value={billingAddress.address}
              disabled={sameAsShipping}
              onChange={(value) =>
                !sameAsShipping &&
                setBillingAddress((prev) => ({ ...prev, address: value }))
              }
            />
            <TextInput
              label="Street Name"
              placeholder="Street"
              value={billingAddress.street}
              disabled={sameAsShipping}
              onChange={(value) =>
                !sameAsShipping &&
                setBillingAddress((prev) => ({ ...prev, street: value }))
              }
            />
            <Row>
              <Col md={4}>
                <TextInput
                  label="City"
                  placeholder="City"
                  value={billingAddress.city}
                  disabled={sameAsShipping}
                  onChange={(value) =>
                    !sameAsShipping &&
                    setBillingAddress((prev) => ({ ...prev, city: value }))
                  }
                />
              </Col>
              <Col md={4}>
                <TextInput
                  label="State"
                  placeholder="State"
                  value={billingAddress.state}
                  disabled={sameAsShipping}
                  onChange={(value) =>
                    !sameAsShipping &&
                    setBillingAddress((prev) => ({ ...prev, state: value }))
                  }
                />
              </Col>
              <Col md={4}>
                <TextInput
                  label="Postal Code"
                  placeholder="Code"
                  value={billingAddress.postalCode}
                  disabled={sameAsShipping}
                  onChange={(value) =>
                    !sameAsShipping &&
                    setBillingAddress((prev) => ({
                      ...prev,
                      postalCode: value,
                    }))
                  }
                />
              </Col>
            </Row>
          </div>
        </Col>

        {/* ✅ Submit */}
        <Col md={12} className="text-center mt-3">
          <Button label="Save and Continue" buttonType="primary" />
        </Col>
      </Row>
    </Layout>
  );
};

export default CustomerDetails;
