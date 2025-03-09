import React, { useState, useEffect } from "react";
import SelectTable from "../components/SelectTable";
import Table from "../components/Table";
import productsData from "../assets/json/product.json"; // ✅ Import JSON data
import AddSubsection from "../components/AddSubsection";
import Aetextarea from "../components/Aetextarea";
import TextInput from "../components/TextInput";

const App = () => {
   const [message, setMessage] = useState("");
 
  const handleCaptionChange = (text) => {
    setMessage(text);
  };

    const handleTextInputChange = (value) => {
      console.log("TextInput:", value);
    };
  return (
 
    <AddSubsection Cardtitle="Platform Tutorials" layoutType="list">
       <TextInput
              label="Title"
              placeholder=""
              required={true}
              onChange={handleTextInputChange}
            />
            <Aetextarea
              label="Description"
              name="Description"
              placeholder="Description"
              onChange={handleCaptionChange}
            />
  </AddSubsection>
  


    
  );
};

export default App;
