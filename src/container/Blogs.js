import React, { useState, useEffect, useRef } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";

import Metrix from "../components/Metrix";
import MetricCard from "../components/MetricCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/DataTable";
import Button from "../components/Button";
import Modal from "../components/Modal";
import blogsdata from "../assets/json/blogsdata.json";
import logsdata from "../assets/json/logsdata.json";

import live from "../assets/svg/chat-like.svg";
import draft from "../assets/svg/channel.svg";
import view from "../assets/svg/chat-pic.svg";
import user from "../assets/svg/growth.svg";
import comments from "../assets/svg/pc-yellow.svg";

const Blogs = () => {
  const tableRef = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { headname: "Image", type: "img", dbcol: "col1" },
    { headname: "Title", type: "", dbcol: "col2" },
    { headname: "Posted by", type: "", dbcol: "col3" },
    { headname: "Visibility", type: "", dbcol: "col4" },
    { headname: "tags", type: "tags", dbcol: "col5" },
    { headname: "Category", type: "", dbcol: "col6" },
    { headname: "Date and time", type: "time", dbcol: "col7" },
  ];
  const columns1 = [
    { headname: "id", type: "id", dbcol: "col1" },
    { headname: "Title", type: "", dbcol: "col2" },
    { headname: "Deleted at", type: "time", dbcol: "col3" },
    { headname: "Action by", type: "", dbcol: "col4" },
    { headname: "Action Taken", type: "", dbcol: "col5" },
  ];

  return (
    <Layout>
      <div className=" gap-2 d-flex ie-btn  justify-content-end">
        <Button buttonType="import" btnStyle="col col-md-3" label="Import" />
        <Button buttonType="export" btnStyle="col col-md-3" label="Export" />
        <Button
          type="submit"
          label="Logs"
          btnStyle="col col-md-3"
          className="a-btn-primary"
          onClick={() => setModalOpen(true)}
        />

        <div className="dropdown">
          <Button buttonType="add" label="Add New" onClick={() => navigate("/add-blogs")} />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Logs"
      >
        <DataTable
          id="table1"
          tableRef={tableRef}
          columns={columns1}
          data={logsdata}
          defaultView="table"
          searchable={true}
          filterable={true}
          sortable={true}
          paginated={false}
        />
      </Modal>
      <div className="card-container gap-4 flex-wrap">
        <Row className="metrix-container">
          <Col xs={4} md={3}>
            <MetricCard
              title="Blogs Live"
              operation="count"
              column="col1"
              tableRef={tableRef}
              icon={live} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of live blogs" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Draft Blog"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={draft} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of Draft Blog" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Total Views"
              operation="total"
              column="col4"
              tableRef={tableRef}
              icon={view} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Views" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Total Users"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon={user} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Users" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="New Comments"
              operation="count"
              column="col1"
              tableRef={tableRef}
              icon={comments} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the New Comments" // Tooltip for additional context
            />
          </Col>
        </Row>
      </div>

      <DataTable
        id="table1"
        tableRef={tableRef}
        columns={columns}
        data={blogsdata}
        defaultView="table"
        searchable={true}
        filterable={true}
        sortable={true}
        paginated={true}
      />
    </Layout>
  );
};

export default Blogs;
