// components/SmartTextEditor.jsx

import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const SmartTextEditor = ({
  placeholder = "Type your message here...",
  onChange = () => {},
  initialEditorState = EditorState.createEmpty(),
  height = "200px",
}) => {
  const [editorState, setEditorState] = useState(initialEditorState);

  const handleEditorChange = (state) => {
    setEditorState(state);
    const htmlContent = draftToHtml(convertToRaw(state.getCurrentContent()));
    onChange(htmlContent);
  };

  return (
    <div className="smart-editor-wrapper">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="smart-editor-wrapper"
        editorClassName="smart-editor"
        toolbarClassName="smart-editor-toolbar"
        placeholder={placeholder}
        toolbar={{
          options: [
            "inline",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "link",
            "emoji",
            "remove",
          ],
          inline: {
            options: ["bold", "italic", "underline"],
          },
          fontSize: {
            options: [8, 10, 12, 14, 16, 18, 24],
          },
          fontFamily: {
            options: ["Roboto", "Arial", "Georgia", "Times New Roman", "Courier New"],
          },
        }}
      />
    </div>
  );
};

export default SmartTextEditor;
