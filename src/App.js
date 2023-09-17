import React from "react";
import "./App.css";
import CodeEditor from "./CodeEditor";
import VisualizationPanel from "./VisualizationPanel";
import { parseCode } from "./parser";

function App() {
  const [code, setCode] = React.useState("");
  const [parsedData, setParsedData] = React.useState(null);

  function onRunButtonClick() {
    const data = parseCode(code);
    setParsedData(data);
  }

  function handleCodeChange(newCode) {
    setCode(newCode);
  }

  return (
    <div>
      <CodeEditor onCodeChange={handleCodeChange} />
      <VisualizationPanel parsedData={parsedData} />
      <button onClick={onRunButtonClick}>Run</button>
    </div>
  );
}

export default App;
