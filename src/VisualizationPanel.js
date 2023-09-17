import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

function VisualizationPanel({ parsedData }) {
  const [graphData, setGraphData] = useState(null);
  const visualizationRef = useRef(null);

  useEffect(() => {
    if (parsedData) {
      setGraphData(convertParsedDataToGraphData(parsedData));
    }
  }, [parsedData]);

  useEffect(() => {
    if (graphData) {
      createVisualizations();
    }
  }, [graphData]);

  const convertParsedDataToGraphData = (data) => {
    return data.map((variable) => ({
      name: variable.name,
      type: variable.type,
      value: variable.value,
      memoryAddress: Math.floor(Math.random() * 10000),
    }));
  };

  const createVisualizations = () => {
    const visualizationDiv = d3.select(visualizationRef.current);

    visualizationDiv
      .selectAll("rect")
      .data(graphData)
      .enter()
      .append("rect")
      .attr("width", 100)
      .attr("height", 50)
      .attr("x", (d, i) => i * 110)
      .attr("y", 20)
      .attr("class", "rectangle");

    visualizationDiv
      .selectAll("text")
      .data(graphData)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * 110 + 10)
      .attr("y", 50)
      .attr("class", "text")
      .text((d) => `${d.name}: ${d.value}`);
  };

  return <div ref={visualizationRef}></div>;
}

export default VisualizationPanel;
