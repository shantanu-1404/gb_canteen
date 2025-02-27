import React, { useState } from "react";
import AddSubsection from "../components/AddSubsection";
import TextInput from "../components/TextInput";
import Aetextarea from "../components/Aetextarea";

const App = () => {
  const [caption, setCaption] = useState("");
  const [hashtag, setHashtag] = useState("");

  const handleCaptionChange = (e) => setCaption(e.target.value);
  const handleHashtagChange = (e) => setHashtag(e.target.value);

  return (
    <div>
      {/* Using Dynamic Section with Cardtitle prop */}
      <AddSubsection Cardtitle="Addmenu">
          {/* Pass form components dynamically */}
          <TextInput
            label="Hashtag"
            placeholder="Enter hashtag"
            required={true}
            onChange={handleHashtagChange}
          />
          <Aetextarea
            label="Caption"
            name="caption"
            placeholder="Write here..."
            isWordCount={true}
            wordLimit={500}
            onChange={handleCaptionChange}
          />
          <Aetextarea
            label="Caption"
            name="caption"
            placeholder="Write here..."
            isWordCount={true}
            wordLimit={500}
            onChange={handleCaptionChange}
          />
        
      </AddSubsection>
      
    </div>
    
  );
};

export default App;
