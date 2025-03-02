import React, { useRef } from "react";
import Layout from "./layout";



import MetricCard from "../components/MetricCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/DataTable";
import Button from "../components/Button";
import inventorydata from "../assets/json/inventory.json";
import DateInput from "../components/DateInput";


const InventoryManagement = () => {
  const tableRef = useRef();


  const columns = [
    { headname: "Image", type: "img", dbcol: "col1" },
    { headname: "Product name", type: "", dbcol: "col2" },
    { headname: "SKU", type: "", dbcol: "col3" },
    { headname: "Committed", type: "", dbcol: "col4" },
    { headname: "In Transit", type: "", dbcol: "col5" },
    { headname: "In Stock", type: "", dbcol: "col6" },
    { headname: "", type: "button", dbcol: "col7" },
  ];

    // ✅ Refresh page
    const handleRefresh = () => {
      window.location.reload(); // This will refresh the page
    };
  

  return (
    <Layout>
      <div className="d-flex justify-content-between">
        <div className="mt-3 d-flex align-items-center">
          <div className="d-flex gap-5 ">
            <DateInput label="" type="range" includeTime={false} />
          </div>
          {/* Refresh Button */}
          <div className=" mb-2 ps-3 ">
            <i
              className="bi bi-arrow-repeat icon-refresh"
              onClick={handleRefresh}
            ></i>
          </div>
        </div>
        <div className="text-right gap-3 d-flex">
          <Button buttonType="import" label="Import" />
          <Button buttonType="export" label="Export" />
         
        </div>
      </div>
      <div className="card-container gap-4 flex-wrap">
        <Row>
          <Col xs={4} md={3}>
            <MetricCard
              title="Total Inventory Value"
              operation="count"
              column="col1"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of live blogs" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Out of Stock Products"
              operation="count"
              column="col2"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/truck.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the count of Draft Blog" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Low Stock Products"
              operation="total"
              column="col4"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_pending.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Views" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Average Time in Stock"
              operation="total"
              column="col4"
              tableRef={tableRef}
              icon="http://localhost/gb_canteen/svg/order_bag.svg" // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Users" // Tooltip for additional context
            />
          </Col>
        </Row>
      </div>

      <DataTable
        id="table1"
        tableRef={tableRef}
        columns={columns}
        data={inventorydata}
        defaultView="table"
        searchable={true}
        filterable={true}
        sortable={true}
        paginated={true}
      />
    </Layout>
  );
};

export default InventoryManagement;
