import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./layout";

import DataTable from "../components/DataTable";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import DateInput from "../components/DateInput";
import TextInput from "../components/TextInput";
import SelectComponent from "../components/SelectComponent";
import PhoneInput from "../components/PhoneInput";
import Modal from "../components/Modal";
import Aetextarea from "../components/Aetextarea";
import CheckboxInput from "../components/CheckboxInput";
import TabPanel from "../components/TabsComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import admindata from "../assets/json/sm_admin.json";
import adminroledata from "../assets/json/adminrole.json";
import recentadmindata from "../assets/json/recentAdmin.json";

const permissionOptions = [
  "Add/Remove Admins",
  "Delete Messages",
  "Assign Admin Roles",
  "Block Spam Users",
  "Pin Messages",
  "Add/Remove Members",
  "Set Group Info",
  "Mute Members",
  "Approve Messages",
  "Answer Support Queries",
];

const SocialMediaAdmin = () => {
  const tableRef = useRef();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [phone, setPhone] = useState("");
  const [assignRole, setAssignRole] = useState(null);
  const [assignGroup, setAssignGroup] = useState(null);
  const [status, setStatus] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [modalData, setModalData] = useState(null); // ✅ add this
  const [selectedSingle, setSelectedSingle] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [tableKey, setTableKey] = useState(0);
  const [isAdminEditModalOpen, setIsAdminEditModalOpen] = useState(false);
  const [editAdminName, setEditAdminName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editRole, setEditRole] = useState(null);
  const [editGroup, setEditGroup] = useState(null);
  const [editStatus, setEditStatus] = useState(null);
  const [adminData, setAdminData] = useState(adminroledata);

  // Roles List (Default + New)
  const [roleCards, setRoleCards] = useState([
    {
      roleName: "Moderator Admin",
      roleDescription:
        "Can moderate content and users, but cannot manage other admins",
      permissions: ["Add/Remove Members", "Delete Messages", "Mute Members"],
    },
    {
      roleName: "Finance Admin",
      roleDescription: "Can access and manage financial reports",
      permissions: ["Set Group Info", "Approve Messages"],
    },
    {
      roleName: "Support Admin",
      roleDescription:
        "Handles user queries, spam reports, and message approvals.",
      permissions: [
        "Answer Support Queries",
        "Block Spam Users",
        "Approve Messages",
      ],
    },
    {
      roleName: "Content Manager",
      roleDescription:
        "Manages pinned messages and group settings for content flow.",
      permissions: ["Pin Messages", "Set Group Info", "Assign Admin Roles"],
    },
  ]);

  const handlePermissionChange = (label) => {
    setSelectedPermissions((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleCaptionChange = (text) => setRoleDescription(text);

  const handleAddAdmin = () => {
    const newAdmin = {
      adminName,
      phone,
      assignRole,
      assignGroup,
      status,
    };
    console.log("✅ Admin Added:", newAdmin);
    setIsModalOpen(false);
  };

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
          <div className="scrollable-table-wrapper">
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
              handleButtonClick={handleEditClick}
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

  const handleAddOrUpdateRole = () => {
    const updatedRole = {
      roleName,
      roleDescription,
      permissions: selectedPermissions,
    };

    if (isEditing) {
      const updatedCards = [...roleCards];
      updatedCards[editingIndex] = updatedRole;
      setRoleCards(updatedCards);
    } else {
      setRoleCards((prev) => [...prev, updatedRole]);
    }

    // Reset form
    setIsRoleModalOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
    setRoleName("");
    setRoleDescription("");
    setSelectedPermissions([]);
  };

  const assign_role = [
    { value: "super_admin", label: "Super Admin" },
    { value: "manager", label: "Manager" },
    { value: "team_lead", label: "Team Lead" },
    { value: "support_admin", label: "Support Admin" },
    { value: "finance_admin", label: "Finance Admin" },
    { value: "hr_admin", label: "HR Admin" },
    { value: "developer_admin", label: "Developer Admin" },
    { value: "ops_admin", label: "Ops Admin" },
  ];

  const assign_to_group = [
    { value: "marketing", label: "Marketing Team" },
    { value: "sales", label: "Sales Squad" },
    { value: "product", label: "Product Dev Group" },
    { value: "customer_success", label: "Customer Success" },
    { value: "finance", label: "Finance Department" },
    { value: "hr", label: "HR Management" },
    { value: "engineering", label: "Engineering Core" },
    { value: "design", label: "Design Studio" },
    { value: "ops", label: "Operations Hub" },
    { value: "legal", label: "Legal Affairs" },
  ];

  const status_options = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
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

  const recentadmin = [
    { headname: "Admin name", type: "", dbcol: "col1" },
    { headname: "Admin name", type: "tags", dbcol: "col2" },
    { headname: "Action", type: "", dbcol: "col3" },
    { headname: "Details", type: "", dbcol: "col4" },
    { headname: "Group name", type: "", dbcol: "col5" },
    { headname: "Date and time", type: "time", dbcol: "col6" },
  ];

  const handleRefresh = () => window.location.reload();

  const RoleCard = ({ role, index }) => (
    <div className="section_card flex-column">
      <h6>{role.roleName}</h6>
      <p className="text-muted">{role.roleDescription}</p>
      <ul className="list-unstyled">
        {permissionOptions.map((perm, i) => (
          <li key={i} className="d-flex align-items-center gap-2 mb-1">
            {role.permissions.includes(perm) ? (
              <i className="bi bi-check-circle-fill text-success"></i>
            ) : (
              <i className="bi bi-x-circle-fill text-danger"></i>
            )}
            <span>{perm}</span>
          </li>
        ))}
        <div className="btn-sack-top">
          <span></span>
        </div>
      </ul>

      <Button
        className="d-flex justify-content-between"
        label="Edit"
        onClick={() => {
          setRoleName(role.roleName);
          setRoleDescription(role.roleDescription);
          setSelectedPermissions(role.permissions);
          setIsRoleModalOpen(true);
          setIsEditing(true);
          setEditingIndex(index);
        }}
      />
    </div>
  );

  return (
    <Layout>
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
              {
                label: "Add New Role",
                onClick: () => setIsRoleModalOpen(true),
              },
            ]}
          />
        </div>
      </div>

      <div className="section-header">
        <span>Groups Overview</span>
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
      
      {/* Admin Table */}

      <div className="section-header">
      <span>Admin Role Management</span>
      </div>
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
          <br />
          <br />
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
      <br />

      <div className="section-header">
        <span>Role Permissions</span>
      </div>
      {/* Role Cards Section */}
      <div className=" form_section mt-4">
        <div className="row">
          {roleCards.map((role, index) => (
            <div key={index} className="col-md-4">
              <RoleCard role={role} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Add New Admin Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Admin"
      >
        <form>
          <TextInput
            label="Admin Name"
            placeholder="Name"
            required
            value={adminName}
            onChange={setAdminName}
          />
          <PhoneInput
            label="Contact Number"
            placeholder="Enter your mobile number"
            value={phone}
            onChange={setPhone}
          />
          <div className="row">
            <div className="col-md-6">
              <SelectComponent
                label="Assign Role"
                name="Assign Role"
                listStyle="col-md-6"
                options={assign_role}
                value={assignRole}
                onChange={setAssignRole}
              />
            </div>
            <div className="col-md-6">
              <SelectComponent
                label="Assign To Group"
                name="Assign_Group"
                listStyle="col-md-6"
                options={assign_to_group}
                value={assignGroup}
                onChange={setAssignGroup}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <SelectComponent
                label="Status"
                name="Status"
                listStyle="col-md-6"
                options={status_options}
                value={status}
                onChange={setStatus}
              />
            </div>
          </div>
          <br />
          <div className="btn-sack">
            <Button
              label="Cancel"
              type="button"
              onClick={() => setIsModalOpen(false)}
            />
            <Button label="Add" type="button" onClick={handleAddAdmin} />
          </div>
        </form>
      </Modal>

      {/* Add New Role Modal */}
      <Modal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        title="Add New Role"
      >
        <form>
          <TextInput
            label="Role Name"
            placeholder="Name"
            required
            value={roleName}
            onChange={setRoleName}
          />
          <Aetextarea
            label="Role Description"
            name="Meta Description"
            placeholder="Description"
            onChange={handleCaptionChange}
          />
          <h6>Assign Permissions</h6>
          <Row>
            <Col md={6}>
              {permissionOptions.slice(0, 5).map((perm, i) => (
                <CheckboxInput
                  key={i}
                  label={perm}
                  checked={selectedPermissions.includes(perm)}
                  onChange={() => handlePermissionChange(perm)}
                />
              ))}
            </Col>
            <Col md={6}>
              {permissionOptions.slice(5).map((perm, i) => (
                <CheckboxInput
                  key={i + 5}
                  label={perm}
                  checked={selectedPermissions.includes(perm)}
                  onChange={() => handlePermissionChange(perm)}
                />
              ))}
            </Col>
          </Row>
          <br />
          <div className="btn-sack">
            <Button
              label="Cancel"
              type="button"
              onClick={() => setIsRoleModalOpen(false)}
            />
            <Button
              label={isEditing ? "Update Role" : "Add Role"}
              type="button"
              onClick={handleAddOrUpdateRole}
            />
          </div>
        </form>
      </Modal>
      <br />
      {/* Admin Table */}

      <div className="section-header">
        <span>Recent Admin Activities</span>
      </div>
      <DataTable
        id="table2"
        tableRef={tableRef}
        columns={recentadmin}
        data={recentadmindata}
        defaultView="table"
        searchable
        filterable
        sortable
        paginated
      />
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

export default SocialMediaAdmin;
