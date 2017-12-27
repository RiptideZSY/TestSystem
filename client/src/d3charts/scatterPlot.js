import * as d3 from "d3";
import D3Component from "./d3Component";


export default class ScatterPlot extends D3Component {
  renderGraph = (gDOM, props) => {
    console.log("scatterPlot!");
    console.log(gDOM);
    console.log(props);
    const { svgWidth, svgHeight, color } = props;
    let outerWidth = outerHeight = Math.round(svgWidth) > Math.round(svgHeight) ? Math.round(svgHeight) : Math.round(svgWidth);
    let gChart = d3.select(gDOM);
    
    let maxXVal = 50, maxYVal = 50, numVal = 15;
    let dataset = generateData(numVal, maxXVal, maxYVal);
    console.log(dataset);
    function generateData(numVal, maxXVal, maxYVal) {
      let dataset = [];
      d3.range(numVal).map(
        () => dataset.push({
          x: Math.round(Math.random()*maxXVal),
          y: Math.round(Math.random()*maxYVal)
        })
      );
      return dataset;
    }; 

    let padding = {
      left: outerWidth * 0.05,
      right: outerWidth * 0.05,
      top: outerHeight * 0.05,
      bottom: outerHeight * 0.05
    };

    let innerWidth = outerWidth - padding.left - padding.right;
    let innerHeight = outerHeight - padding.top - padding.bottom;

    let circlePixel = 10;
    const hyperParameter = 100000;
    let circleArea = innerWidth * innerHeight / hyperParameter * circlePixel;

    let xScale = d3.scaleLinear()
      .domain([0, maxXVal])
      .range([0, innerWidth]);
    let yScale = d3.scaleLinear()
      .domain([0, maxYVal])
      .range([innerHeight, 0]);
    
    let xAxis = d3.axisBottom()
      .scale(xScale);
    let yAxis = d3.axisLeft()
      .scale(yScale);

    gChart.append("clipPath")
      .attr("id", "scatterPlot-area")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", innerWidth)
      .attr("height", innerHeight);
    
    gChart.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(${padding.left}, ${outerHeight - padding.bottom})`)
      .call(xAxis);

    gChart.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${padding.left}, ${padding.top})`)
      .call(yAxis);

    let scatterPoints = gChart.append("g")
      .attr("class", "circles")
      .attr("clip-path", "url(#scatterPlot-area)")
      .attr("transform", `translate(${padding.left}, ${padding.top})`)
      .selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", (d) => Math.sqrt(circleArea))
      .attr("fill", color);

    scatterPoints.append("title")
      .text((d) => `(${d.x},${d.y})`);
  }
}