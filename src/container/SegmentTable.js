import React, { useRef } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";

import DataTable from "../components/DataTable";

import segmentdata from "../assets/json/segmentdata.json";

const Segment = () => {
  const tableRef = useRef();

  const columns = [
    { headname: "Segment Name", type: "", dbcol: "col1" },
    { headname: "Segment size", type: "", dbcol: "col2" },
    { headname: "Last Activity", type: "time", dbcol: "col3" },
    { headname: "Author", type: "", dbcol: "col4" },
  ];

  return (
    <Layout>
      <div className="card-container gap-4 flex-wrap"></div>
      <DataTable
        id="table1"
        tableRef={tableRef}
        columns={columns}
        data={segmentdata}
        defaultView="table"
        searchable={true}
        filterable={true}
        sortable={true}
        paginated={false}
      />
    </Layout>
  );
};

export default Segment;
