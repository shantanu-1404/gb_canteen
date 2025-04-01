import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./layout";

import DataTable from "../components/DataTable";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import DateInput from "../components/DateInput";
import TextInput from "../components/TextInput";
import SelectComponent from "../components/SelectComponent";
import Modal from "../components/Modal";
import Aetextarea from "../components/Aetextarea";
import CheckboxInput from "../components/CheckboxInput";
import TabPanel from "../components/TabsComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import admindata from "../assets/json/sm_admin.json";
import adminroledata from "../assets/json/adminrole.json";

import MetricCard from "../components/MetricCard";
import messagedata from "../assets/json/messagemanagement.json";
import msgsent from "../assets/svg/Messagesent.svg";
import delivered from "../assets/svg/Delivered.svg";
import Engagementrate from "../assets/svg/EngagementRate.svg";
import mostusedtype from "../assets/svg/MostUsedType.svg";
import batchprocessed from "../assets/svg/BatchProcessed.svg";
import successrate from "../assets/svg/SuccessRate.svg";
import forwardtime from "../assets/svg/ForwardTime.svg";
import mostforwarded from "../assets/svg/MostForwarded.svg";
import errorrate from "../assets/svg/ErrorRate.svg";
import totalgrp from "../assets/svg/TotalGroups.svg";
import Inactive from "../assets/svg/InactiveGroup.svg";
import deletedgrp from "../assets/svg/DeletedGroup.svg";

const MsgGrpManagement = () => {
  const tableRef = useRef();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [modalData, setModalData] = useState(null); // ✅ add this
  const [selectedSingle, setSelectedSingle] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [tableKey, setTableKey] = useState(0);
  const [editAdminName, setEditAdminName] = useState("");
  const [adminData, setAdminData] = useState(adminroledata);

  const columns = [
    { headname: "Message Id", type: "", dbcol: "col1" },
    { headname: "Name", type: "", dbcol: "col2" },
    { headname: "Contact Number", type: "", dbcol: "col3" },
    { headname: "Message Type", type: "", dbcol: "col4" },
    { headname: "Sent at", type: "time", dbcol: "col5" },
    { headname: "Status", type: "badge", dbcol: "col6" },
  ];

  const handleRemoveRow = (
    row,
    currentData = [],
    updateDataFn,
    matchField = "col1"
  ) => {
    if (!Array.isArray(currentData)) {
      console.error("❌ Data must be an array. Received:", currentData);
      return;
    }

    const identifier = row?.[matchField];
    if (!identifier) {
      console.warn(`⚠️ No valid '${matchField}' in row:`, row);
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to remove this row?"
    );
    if (!confirmed) return;

    const updated = currentData.filter((r) => r[matchField] !== identifier);
    updateDataFn(updated);
    setTableKey((prev) => prev + 1);

    console.log("🗑️ Removed row based on", matchField, "=", identifier);
  };

  const handleAgreementChange = (isChecked) => {
    console.log("User agreed:", isChecked);
  };

  const modaladmin = [
    { headname: "Admin name", type: "", dbcol: "col1" },
    { headname: "Contact number", type: "", dbcol: "col2" },
    { headname: "Role", type: "tags", dbcol: "col3" },
    {
      headname: "Remove",
      type: "remove_button",
      dbcol: "col4",
      buttonLabel: "Remove",
      onClick: (row) => handleRemoveRow(row, adminData, setAdminData, "col1"),
    },
  ];
  const modalmember = [
    { headname: "Admin name", type: "", dbcol: "col1" },
    { headname: "Contact number", type: "", dbcol: "col2" },
    { headname: "Role", type: "tags", dbcol: "col3" },
    {
      headname: "More",
      type: "action_button",
      dbcol: "col4",
      buttonLabel: "Unmute",
    },
    {
      headname: "Remove",
      type: "remove_button",
      dbcol: "col5",
      buttonLabel: "Remove",
      onClick: (row) => handleRemoveRow(row, adminData, setAdminData, "col1"),
    },
  ];
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
  ];
  const tabs = [
    {
      label: "Group Info",
      content: (
        <>
          <TextInput
            label="Admin Name"
            placeholder="Name"
            value={editAdminName}
            onChange={setEditAdminName}
          />

          <Aetextarea
            label="TextArea (limited)"
            name="description"
            placeholder="Enter your description..."
          />
          <Row className="mb-2 d-flex align-items-center">
            <Col md="auto">
              <strong className="mb-0">Created On -</strong>
            </Col>
            <Col>
              <h7 className="mb-0">
                {new Date(modalData?.col6).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h7>
            </Col>
          </Row>

          <Row className="mb-2 d-flex align-items-center">
            <Col md="auto">
              <strong className="mb-0">Group ID -</strong>
            </Col>
            <Col>
              <h7 className="mb-0">{modalData?.col4}</h7>
            </Col>
          </Row>
          <br />
          <br />
          <div className="btn-sack">
            <Button
              label="Cancel"
              type="button"
              onClick={() => setIsModalOpen(false)}
            />
            <Button label="Update" type="button" />
          </div>
        </>
      ),
    },
    {
      label: "Admin ",
      content: (
        <form>
          <div className="scrollable-table-wrapper">
            <DataTable
              key={tableKey}
              id="table2"
              tableRef={tableRef}
              columns={modaladmin}
              data={adminData}
              defaultView="table"
              searchable={false}
              filterable={false}
              sortable={false}
              paginated={false}
            />
          </div>

          <br />
          <br />
          <div className="btn-sack">
            <Button
              label="Cancel"
              type="button"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </form>
      ),
    },
    {
      label: "Members ",
      content: (
        <form>
          <div className="scrollable-table-wrapper">
            <DataTable
              key={tableKey}
              id="table2"
              tableRef={tableRef}
              columns={modalmember}
              data={adminData}
              defaultView="table"
              searchable={false}
              filterable={false}
              sortable={false}
              paginated={false}
            />
          </div>

          <br />
          <br />
          <div className="btn-sack">
            <Button
              label="Cancel"
              type="button"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </form>
      ),
    },
    {
      label: "Settings",
      content: (
        <>
          <SelectComponent
            label="Message Restriction"
            name="singleSelect"
            options={options}
            isMulti={false}
            onChange={setSelectedSingle}
          />
          <h6>Assign Permissions</h6>

          <Row style={{ marginLeft: "10px" }}>
            <CheckboxInput
              label="Allow adding members"
              onChange={handleAgreementChange}
              className="ms-2"
            />
            <CheckboxInput
              label="Allow removing members"
              onChange={handleAgreementChange}
              className="ms-2"
            />
          </Row>
          <Row style={{ marginLeft: "10px" }}>
            <CheckboxInput
              label="Allow editing group info"
              onChange={handleAgreementChange}
            />
            <CheckboxInput
              label="Allow deleting messages"
              onChange={handleAgreementChange}
            />
          </Row>
          <h6>Content Moderation</h6>
          <Row style={{ marginLeft: "10px" }}>
            <CheckboxInput
              label="Enable spam filter"
              onChange={handleAgreementChange}
            />
            <CheckboxInput
              label="Enable profanity filter"
              onChange={handleAgreementChange}
            />
          </Row>
          <Row style={{ marginLeft: "10px" }}>
            <CheckboxInput
              label="Restrict external links"
              onChange={handleAgreementChange}
            />
          </Row>
          <br />
          <br />
          <div className="btn-sack">
            <Button
              label="Cancel"
              type="button"
              onClick={() => setIsModalOpen(false)}
            />
            <Button label="Update" type="button" />
          </div>
        </>
      ),
    },
  ];

  const groupoverview = [
    { headname: "Group name", type: "", dbcol: "col1" },
    { headname: "Total Members", type: "", dbcol: "col2" },
    { headname: "Total Admins", type: "", dbcol: "col3" },
    { headname: "STATUS", type: "badge", dbcol: "col4" },
    {
      headname: "More",
      type: "action_button",
      dbcol: "col5",
      buttonLabel: "Manage",
      onClick: (row) => {
        setModalData(row);
        setIsViewDetailsModalOpen(true);
      },
    },
  ];

  const handleRefresh = () => window.location.reload();
  return (
    <Layout>
      <div className="headerclass">
        <h5>Messages Management</h5>
      </div>
      <div className="d-flex justify-content-between">
        <div className="mt-3 d-flex align-items-center">
          <div className="d-flex gap-5 md-date">
            <DateInput label="" type="range" includeTime={false} />
          </div>

          {/* Refresh Button */}
          <div className=" mb-2 ps-3 md-refresh ">
            <i
              className="bi bi-arrow-repeat icon-refresh"
              onClick={handleRefresh}
            ></i>
          </div>
        </div>
        <div className="text-right gap-3 mb-3 mt-3 ie-btn d-flex">
          <Button buttonType="import" label="Import" />
          <Button buttonType="export" label="Export" />
          <div className="dropdown">
            <Button
              buttonType="add"
              onClick={() => navigate("/add-product")}
              label="Add New"
            />
          </div>
        </div>
      </div>

      <div className="card-container gap-4 flex-wrap">
        <Row className="metrix-container">
          <Col xs={4} md={3}>
            <MetricCard
              title="Messages Sent"
              operation="count"
              column="col1"
              tableRef={tableRef}
              icon={msgsent} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of live blogs" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Delivered"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={delivered} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of Draft Blog" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Engagement Rate"
              operation="total"
              column="col4"
              tableRef={tableRef}
              icon={Engagementrate} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Views" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Most Used Type"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={mostusedtype} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Users" // Tooltip for additional context
            />
          </Col>
        </Row>
      </div>

      <DataTable
        id="table1"
        tableRef={tableRef}
        columns={columns}
        data={messagedata}
        defaultView="table"
        searchable={true}
        filterable={true}
        sortable={true}
        paginated={true}
      />
      <div className="headerclass">
        <h5>Batch Message Forwarding</h5>
      </div>
      <div className="d-flex justify-content-between">
        <div className="mt-3 d-flex align-items-center">
          <div className="d-flex gap-5 md-date">
            <DateInput label="" type="range" includeTime={false} />
          </div>

          {/* Refresh Button */}
          <div className=" mb-2 ps-3 md-refresh ">
            <i
              className="bi bi-arrow-repeat icon-refresh"
              onClick={handleRefresh}
            ></i>
          </div>
        </div>
        <div className="text-right gap-3 mb-3 mt-3 ie-btn d-flex">
          <Button buttonType="import" label="Import" />
          <Button buttonType="export" label="Export" />
          <div className="dropdown">
            <Button
              buttonType="add"
              onClick={() => navigate("/add-product")}
              label="Add New"
            />
          </div>
        </div>
      </div>

      <div className="card-container gap-4 flex-wrap">
        <Row className="metrix-container">
          <Col xs={4} md={3}>
            <MetricCard
              title="Batch Processed"
              operation="count"
              column="col1"
              tableRef={tableRef}
              icon={batchprocessed}
              tooltipText="This shows the count of live blogs" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Success Rate"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={successrate} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of Draft Blog" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Forward Time"
              operation="total"
              column="col4"
              tableRef={tableRef}
              icon={forwardtime} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Views" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Most Forwarded"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={mostforwarded} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Users" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Error Rate"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={errorrate} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Users" // Tooltip for additional context
            />
          </Col>
        </Row>
      </div>

      <DataTable
        id="table1"
        tableRef={tableRef}
        columns={columns}
        data={messagedata}
        defaultView="table"
        searchable={true}
        filterable={true}
        sortable={true}
        paginated={true}
      />

      <div className="headerclass">
        <h5>Group & Community Management</h5>
      </div>
      {/* Header Controls */}
      <div className="d-flex align-items-center justify-content-between">
        <div className="mt-3 d-flex align-items-center">
          <div className="d-flex gap-5 md-date">
            <DateInput label="" type="range" includeTime={false} />
          </div>
          <div className="mb-2 ps-3 md-refresh">
            <i
              className="bi bi-arrow-repeat icon-refresh"
              onClick={handleRefresh}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </div>
        <div className="text-right gap-3 ie-btn d-flex">
          <Button buttonType="import" label="Import" />
          <Button buttonType="export" label="Export" />
          <Dropdown
            label="Add New"
            buttonType="add"
            menuItems={[
              {
                label: "Add New Admin",
                onClick: () => setIsModalOpen(true),
              },
            ]}
          />
        </div>
      </div>
      <div className="card-container gap-4 flex-wrap">
        <Row className="metrix-container">
          <Col xs={4} md={3}>
            <MetricCard
              title="Total Groups"
              operation="count"
              column="col1"
              tableRef={tableRef}
              icon={totalgrp}
              tooltipText="This shows the count of live blogs" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Active Groups"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={successrate} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of Draft Blog" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Inactive Groups"
              operation="total"
              column="col4"
              tableRef={tableRef}
              icon={forwardtime} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Views" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="New Groups"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={mostforwarded} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Users" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Deleted Groups"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={deletedgrp} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Users" // Tooltip for additional context
            />
          </Col>
        </Row>
      </div>
      <DataTable
        id="table1"
        tableRef={tableRef}
        columns={groupoverview}
        data={admindata}
        defaultView="table"
        searchable
        filterable
        sortable
        paginated
      />
      <br />

      <Modal
        isOpen={isViewDetailsModalOpen}
        onClose={() => setIsViewDetailsModalOpen(false)}
        title="Admin Details"
      >
        <TabPanel
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className="custom-tabpanel"
        />
      </Modal>
    </Layout>
  );
};

export default MsgGrpManagement;
