import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/clike/clike";

function CodeEditor() {
  const [code, setCode] = React.useState("");

  return (
    <CodeMirror
      value={code}
      options={{
        mode: "text/x-c++src",
        theme: "material",
        lineNumbers: true,
      }}
      onBeforeChange={(editor, data, value) => {
        setCode(value);
        props.onCodeChange(value);
      }}
    />
  );
}

export default CodeEditor;
