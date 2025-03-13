import React, { useRef } from "react";
import Layout from "./layout";
import DataTable from "../components/DataTable";
import Cuisinedata from "../assets/json/Cuisine.json";
import DateInput from "../components/DateInput";

const CuisinesLocation = () => {
  const tableRef = useRef();

  const columns = [
    { headname: "Cuisine Name", type: "", dbcol: "col1" },
    { headname: "Total location served", type: "", dbcol: "col2" },
    { headname: "STATUS", type: "badge", dbcol: "col3" },
    { headname: "Tags", type: "tags", dbcol: "col4" },
    { headname: "Featured restaurants", type: "", dbcol: "col5" },
  ];

  // ✅ Refresh page
  const handleRefresh = () => {
    window.location.reload(); // This will refresh the page
  };
  return (
    <Layout>
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
      </div>

      <DataTable
        id="table1"
        tableRef={tableRef}
        columns={columns}
        data={Cuisinedata}
        defaultView="table"
        searchable={true}
        filterable={true}
        sortable={true}
        paginated={true}
      />
    </Layout>
  );
};

export default CuisinesLocation;
