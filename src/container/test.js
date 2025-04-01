import React, { useState, useRef } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";

import DataTable from "../components/DataTable";
import Button from "../components/Button";
import Modal from "../components/Modal";
import TextInput from "../components/TextInput";
import PhoneInput from "../components/PhoneInput";
import SelectComponent from "../components/SelectComponent";
import TabPanel from "../components/TabsComponent";
import Aetextarea from "../components/Aetextarea";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInput from "../components/CheckboxInput";
import adminroledata from "../assets/json/adminrole.json";

const SocialMediaAdmin = () => {
  const tableRef = useRef();
  const navigate = useNavigate();
  const [modalData, setModalData] = useState(null); // ✅ add this
  const [isModalOpen, setIsModalOpen] = useState(false); // if not already added
  const [selectedSingle, setSelectedSingle] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [tableKey, setTableKey] = useState(0);
  const [isAdminEditModalOpen, setIsAdminEditModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editAdminName, setEditAdminName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editRole, setEditRole] = useState(null);
  const [editGroup, setEditGroup] = useState(null);
  const [editStatus, setEditStatus] = useState(null);
  const [adminData, setAdminData] = useState(adminroledata);

  const assign_role = [
    { value: "hr_admin", label: "HR Admin" },
    { value: "team_lead", label: "Team Lead" },
    { value: "ops_admin", label: "Ops Admin" },
  ];
  const assign_to_group = [
    { value: "hr", label: "HR Management" },
    { value: "engineering", label: "Engineering Core" },
    { value: "ops", label: "Operations Hub" },
  ];

  const status_options = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ];

  const handleEditClick = (rowData) => {
    const index = adminData.findIndex((item) => item.col1 === rowData.col1);
    setEditingIndex(index);
    setEditAdminName(rowData.col1 || "");
    setEditPhone(rowData.col2 || "");

    const role = assign_role.find((r) => r.label === rowData.col3);
    const group = assign_to_group.find((g) => g.label === rowData.col4);
    const status = status_options.find((s) => s.label === rowData.col5);

    console.log("🛠️ Editing row index:", index);
    console.log("➡️ Loaded values into form:", {
      adminName: rowData.col1,
      phone: rowData.col2,
      role,
      group,
      status,
    });

    setEditRole(
      role ?? { value: "unknown", label: rowData.col3 || "Not Assigned" }
    );
    setEditGroup(
      group ?? { value: "unknown", label: rowData.col4 || "Not Assigned" }
    );
    setEditStatus(
      status ?? { value: "pending", label: rowData.col5 || "Pending" }
    );

    setIsAdminEditModalOpen(true);
  };

  const handleUpdateAdmin = () => {
    if (editingIndex === null || editingIndex < 0) {
      console.warn("⚠️ Invalid editing index:", editingIndex);
      return;
    }

    const updatedRow = {
      col1: editAdminName,
      col2: editPhone,
      col3: editRole?.label ?? "Not Assigned",
      col4: editGroup?.label ?? "Not Assigned",
      col5: editStatus?.label ?? "Pending",
      col6: new Date().toISOString(),
    };

    const updated = [...adminData];
    console.log("📝 Before update:", updated[editingIndex]);
    console.log("🔁 New Row:", updatedRow);

    updated[editingIndex] = updatedRow;

    setAdminData(updated); // ✅ updates data
    setIsAdminEditModalOpen(false); // ✅ closes modal
    setEditingIndex(null); // ✅ reset
    setTableKey((prev) => prev + 1); // ✅ triggers table rerender
  };

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
  const adminrole = [
    { headname: "Admin name", type: "", dbcol: "col1" },
    { headname: "Contact number", type: "", dbcol: "col2" },
    { headname: "Role", type: "", dbcol: "col3" },
    { headname: "Group name", type: "", dbcol: "col4" },
    { headname: "STATUS", type: "badge", dbcol: "col5" },
    {
      headname: "Action",
      type: "button",
      dbcol: "col6",
    },
    {
      headname: "More",
      type: "action_button",
      dbcol: "col7",
      buttonLabel: "Manage",
      onClick: (row) => {
        // Example: open modal
        setModalData(row); // populate modal state
        setIsModalOpen(true);
      },
    },
    {
      headname: "Remove",
      type: "remove_button",
      dbcol: "col8",
      buttonLabel: "Remove",
      onClick: (row) => handleRemoveRow(row, adminData, setAdminData, "col1"),
    },
  ];

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
          <DataTable
            key={tableKey}
            id="table2"
            tableRef={tableRef}
            columns={modaladmin}
            data={adminData}
            handleButtonClick={handleEditClick}
            defaultView="table"
            searchable={false}
            filterable={false}
            sortable={false}
            paginated={false}
          />

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
          <DataTable
            key={tableKey}
            id="table2"
            tableRef={tableRef}
            columns={modalmember}
            data={adminData}
            handleButtonClick={handleEditClick}
            defaultView="table"
            searchable={false}
            filterable={false}
            sortable={false}
            paginated={false}
          />

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

  return (
    <Layout>
      <h4 className="mb-4">Admin Role Management</h4>
      <DataTable
        key={tableKey}
        id="table2"
        tableRef={tableRef}
        columns={adminrole}
        data={adminData}
        handleButtonClick={handleEditClick}
        defaultView="table"
        searchable
        filterable
        sortable
        paginated
      />

      {/* Edit Modal */}
      <Modal
        isOpen={isAdminEditModalOpen}
        onClose={() => setIsAdminEditModalOpen(false)}
        title="Edit Admin"
      >
        <form>
          <TextInput
            label="Admin Name"
            placeholder="Name"
            value={editAdminName}
            onChange={setEditAdminName}
          />
          <PhoneInput
            label="Contact Number"
            placeholder="Enter phone"
            value={editPhone}
            onChange={setEditPhone}
          />
          <div className="row">
            <div className="col-md-6">
              <SelectComponent
                label="Assign Role"
                options={assign_role}
                value={editRole}
                onChange={(val) => {
                  setEditRole(val); // assuming val = { value, label }
                }}
              />
            </div>
            <div className="col-md-6">
              <SelectComponent
                label="Assign To Group"
                options={assign_to_group}
                value={editGroup}
                onChange={(val) => {
                  setEditRole(val); // assuming val = { value, label }
                }}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <SelectComponent
                label="Status"
                options={status_options}
                value={editStatus}
                onChange={(val) => {
                  setEditRole(val); // assuming val = { value, label }
                }}
              />
            </div>
          </div>
          <div className="btn-sack mt-4 d-flex gap-2">
            <Button
              label="Cancel"
              type="button"
              onClick={() => setIsAdminEditModalOpen(false)}
            />
            <Button
              label="Update Admin"
              type="button"
              onClick={handleUpdateAdmin}
            />
          </div>
        </form>
      </Modal>
      {/* 👀 View Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Admin Details"
      >
        <TabPanel
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Modal>
    </Layout>
  );
};

export default SocialMediaAdmin;
