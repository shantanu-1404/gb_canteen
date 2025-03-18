import React, { useRef } from "react";
import Layout from "./layout";

import DataTable from "../components/DataTable";
import Button from "../components/Button";
import FormHeader from "../components/FormHeader";
import RateTabledata from "../assets/json/ratetable.json";

const RateComparisonTable = () => {
  const tableRef = useRef();

  const RateTable = [
    { headname: "Carrier", type: "", dbcol: "col1" },
    { headname: "Service Type", type: "", dbcol: "col2" },
    { headname: "Estimated Cost", type: "", dbcol: "col3" },
    { headname: "Transit Time", type: "", dbcol: "col4" },
    { headname: "Tracking", type: "", dbcol: "col5" },
    { headname: "Insurance", type: "", dbcol: "col6" },
    { headname: "Weight", type: "time", dbcol: "col7" },
  ];

  return (
    <Layout>
      <FormHeader
        title="Rate Comparison Table"
        backUrl="/shipping-rates"
        closeUrl="/"
      />
      <div className=" gap-2 d-flex ie-btn  justify-content-end">
        <Button label="Convert to CSV" />
      </div>
      <DataTable
        id="table1"
        tableRef={tableRef}
        columns={RateTable}
        data={RateTabledata}
        defaultView="table"
        searchable={false}
        filterable={true}
        sortable={false}
        paginated={false}
        grid={false}
      />
      <div className=" gap-2 d-flex ie-btn  justify-content-end">
        <Button label="Save" />
      </div>
    </Layout>
  );
};

export default RateComparisonTable;
