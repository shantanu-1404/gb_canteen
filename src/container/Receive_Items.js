import React, { useState } from "react";
import Table from "../components/Table"; // ✅ Import Table component
import DataTable from "../components/DataTable";
import productsData from "../assets/json/product.json"; // ✅ Import JSON data
import FormHeader from "../components/FormHeader";
import Layout from "./layout";

const App = () => {
  const [filteredData, setFilteredData] = useState(productsData); // ✅ Manage table data

  // ✅ Ensure Selected Items Stay Checked in the Modal
  const formattedProducts = productsData.map((product, index) => ({
    id: index + 1,
    imageUrl: product.col1,
    heading: product.col2,
    price: parseFloat(product.col3),
    category: product.col4,
    p1: product.col4,
    p2: product.col6,
    total: 10, // ✅ Set default total value
    accept: 0, // ✅ Default accept value
    cancel: 10, // ✅ Default cancel value (total - accept)// ✅ Ensure previously selected items stay checked
  }));

  const columns = [
    { headname: "Image", dbcol: "imageUrl", type: "img" },
    { headname: "Product", dbcol: "", type: "grouped" },
    { headname: "Price", dbcol: "price", type: "currency" },
    { headname: "Accept", dbcol: "accept", type: "accept" }, // ✅ Accept Column
    { headname: "Cancel", dbcol: "cancel", type: "cancel" }, // ✅ Cancel Column
    { headname: "Progress", dbcol: "progress", type: "ar-progress" }, // ✅ Progress Column
  ];

  // ✅ Function to Update Only One Row's Quantity
  const updateRowData = (productId, columnKey, newValue) => {
    console.log(
      "Updating Row:",
      productId,
      "Column:",
      columnKey,
      "New Value:",
      newValue
    );

    setFilteredData((prevData) => {
      return prevData.map((product) => {
        if (product.id === productId) {
          console.log("✅ Updating Only This Row:", product);
          return { ...product, [columnKey]: newValue }; // ✅ Update only this row
        } else {
          console.log("⏩ Skipping Row:", product);
          return product; // ✅ Keep other rows unchanged
        }
      });
    });
  };

  return (
    <Layout>
      <FormHeader
        title="Receive Items"
        backUrl="/add-inventory_transfer"
        closeUrl="/"
      />
      <div className="container">
        <DataTable
          id="table1"
          columns={columns}
          data={formattedProducts}
          defaultView="table"
          searchable={false}
          filterable={false}
          grid={false}
          sortable={false}
          paginated={false}
          showCheckbox={false}
        />
      </div>
    </Layout>
  );
};

export default App;
