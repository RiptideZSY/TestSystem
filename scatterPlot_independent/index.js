const bodyWidth = Math.round(document.body.clientWidth);
const bodyHeight = Math.round(document.body.clientHeight);
const divWidth = (document.getElementsByClassName("leftColumn"))["0"].clientWidth;
let svgWidth = bodyHeight;
let svgHeight = bodyHeight;
let margin = {left: Math.round(bodyHeight * 0.002), 
  right: Math.round(bodyHeight * 0.002), 
  top: Math.round(bodyHeight * 0.002), 
  bottom: Math.round(bodyHeight * 0.002)
};
let outerWidth = svgWidth - margin.left - margin.right;
let outerHeight = svgHeight - margin.top - margin.bottom;
let padding = {left: outerWidth * 0.05, 
  right: outerWidth * 0.05, 
  top: outerWidth * 0.05, 
  bottom: outerWidth * 0.05
};
let innerWidth = outerWidth - padding.left - padding.right;
let innerHeight = outerHeight - padding.top - padding.bottom;
let circlePixel = 1;
const hyperParameter = 100000;
let circleArea = innerWidth * innerHeight / hyperParameter * circlePixel;

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

let svg = d3.select(".leftColumn")
  .append("svg")
  .attr("class", "svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("transform", `translate(${Math.floor((divWidth - svgWidth) / 2)}, ${Math.floor((bodyHeight - svgHeight) / 2)})`);

let gChart = svg.append("g")
  .attr("class", "gChart")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

let clipPath =gChart.append("clipPath")
  .attr("id", "chart-area")
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", innerWidth)
  .attr("height", innerHeight);

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

gChart.append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(${padding.left}, ${outerHeight - padding.bottom})`)
  .call(xAxis);

gChart.append("g")
  .attr("class", "y-axis")
  .attr("transform", `translate(${padding.left}, ${padding.top})`)
  .call(yAxis);

let scatterPoints = gChart.append("g")
  .attr("class", "circles")
  .attr("clip-path", "url(#chart-area)")
  .attr("transform", `translate(${padding.left}, ${padding.top})`)
  .selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d.x))
  .attr("cy", (d) => yScale(d.y))
  .attr("r", (d) => Math.sqrt(circleArea))
  .attr("fill", "teal");

scatterPoints.append("title")
  .text((d) => `(${d.x},${d.y})`);

let scroller = d3.select(".rightColumn")
  .append("div")
  .attr("class", "scroller")
  .style("margin", "50px");
  
//  
let circlePixelScroller = scroller.append("div")
  .attr("class", "circlePixelScroller");

document.querySelector(".circlePixelScroller").innerHTML = "circlePixel";

circlePixelScroller.append("input")
  .attr("id", "scroller1")
  .attr("type", "range")
  .attr("min", 1)
  .attr("max", 1500)
  .attr("value", 1);

let circlePixelSlider = document.querySelector("#scroller1");
//console.log(circlePixelSlider);
circlePixelSlider.addEventListener("input", () => {
  circlePixel = circlePixelSlider.value;
  //console.log(circlePixel);
  circleArea = innerWidth * innerHeight / hyperParameter * circlePixel;
  scatterPoints.attr("r", (d) => Math.sqrt(circleArea));
}, false); 
//

//
let svgWidthScroller = scroller.append("div")
  .attr("class", "svgWidthScroller");

document.querySelector(".svgWidthScroller").innerHTML = "svgWidth";

svgWidthScroller.append("input")
  .attr("id", "scroller2")
  .attr("type", "range")
  .attr("min", 1)
  .attr("max", 100)
  .attr("value", 100);

let svgWidthSlider = document.querySelector("#scroller2");
//console.log(svgWidthSlider);
svgWidthSlider.addEventListener("input", () => {
  svgWidth = bodyHeight * svgWidthSlider.value / 100;
  svg.attr("width", svgWidth);
  updateOuterRim();
  updateInnerRim();
  updateChart();
}, false);
//

//
let svgHeightScroller = scroller.append("div")
  .attr("class", "svgHeightScroller");

document.querySelector(".svgHeightScroller").innerHTML = "svgHeight";

svgHeightScroller.append("input")
  .attr("id", "scroller3")
  .attr("type", "range")
  .attr("min", 1)
  .attr("max", 100)
  .attr("value", 100);

let svgHeightSlider = document.querySelector("#scroller3");
//console.log(svgHeightSlider);
svgHeightSlider.addEventListener("input", () => {
  svgHeight = bodyHeight * svgHeightSlider.value / 100;
  svg.attr("height", svgHeight);
  updateOuterRim();
  updateInnerRim();
  updateChart();
}, false);
//

//
let marginScroller = scroller.append("div")
  .attr("class", "marginScroller");

document.querySelector(".marginScroller").innerHTML = "margin";

marginScroller.append("input")
  .attr("id", "scroller4")
  .attr("type", "range")
  .attr("min", 1)
  .attr("max", 100)
  .attr("value", 1);

let marginSlider = document.querySelector("#scroller4");

marginSlider.addEventListener("input", () => {
  margin = { left: Math.round(bodyHeight * 0.2 * marginSlider.value / 100), 
    right: Math.round(bodyHeight * 0.2 * marginSlider.value / 100), 
    top: Math.round(bodyHeight * 0.2 * marginSlider.value / 100), 
    bottom: Math.round(bodyHeight * 0.2 * marginSlider.value / 100)
  };
  updateOuterRim();
  updateInnerRim();
  updateChart();
}, false);
//

//
let xAxisScroller = scroller.append("div")
  .attr("class", "xAxisScroller");

document.querySelector(".xAxisScroller").innerHTML = "xAxis";

xAxisScroller.append("input")
  .attr("id", "scroller5")
  .attr("type", "range")
  .attr("min", 1)
  .attr("max", 3)
  .attr("step", 0.01)
  .attr("value", 1);

let xAxisSlider = document.querySelector("#scroller5");

xAxisSlider.addEventListener("input", () => {
  xScale.domain([0, maxXVal * xAxisSlider.value]);
  updateOuterRim();
  updateInnerRim();
  updateChart();
}, false);
//

//
let yAxisScroller = scroller.append("div")
  .attr("class", "yAxisScroller");

document.querySelector(".yAxisScroller").innerHTML = "yAxis";

yAxisScroller.append("input")
  .attr("id", "scroller6")
  .attr("type", "range")
  .attr("min", 1)
  .attr("max", 3)
  .attr("step", 0.01)
  .attr("value", 1);

let yAxisSlider = document.querySelector("#scroller6");

yAxisSlider.addEventListener("input", () => {
  yScale.domain([0, maxYVal * yAxisSlider.value]);
  updateOuterRim();
  updateInnerRim();
  updateChart();
}, false);
//

//
let wholeScroller = scroller.append("div")
  .attr("class", "wholeScroller");

document.querySelector(".wholeScroller").innerHTML = "whole";

wholeScroller.append("input")
  .attr("id", "scroller7")
  .attr("type", "range")
  .attr("min", 1)
  .attr("max", 100)
  .attr("value", 1);

let wholeSlider = document.querySelector("#scroller7");

wholeSlider.addEventListener("input", () => {
  margin = { left: Math.round(bodyHeight * 0.2 * wholeSlider.value / 100), 
    right: Math.round(bodyHeight * 0.2 * wholeSlider.value / 100), 
    top: Math.round(bodyHeight * 0.2 * wholeSlider.value / 100), 
    bottom: Math.round(bodyHeight * 0.2 * wholeSlider.value / 100)
  };
  updateOuterRim();
  updateInnerRim();
  updateChart();
  tmpCircleArea = circleArea / wholeSlider.value;
  scatterPoints.attr("r", Math.sqrt(tmpCircleArea));
}, false);
//

//
function updateOuterRim() {
  outerWidth = svgWidth - margin.left - margin.right >= 0 ? svgWidth - margin.left - margin.right : 0;
  outerHeight = svgHeight - margin.top - margin.bottom >= 0 ? svgHeight - margin.top - margin.bottom : 0;
}

function updateInnerRim() {
  innerWidth = outerWidth - padding.left - padding.right >= 0 ? outerWidth - padding.left - padding.right : 0;
  innerHeight = outerHeight - padding.top - padding.bottom >= 0 ? outerHeight - padding.top - padding.bottom : 0;
}

function updateChart() {
  d3.select("#chart-area").select("rect")
    .attr("width", innerWidth)
    .attr("height", innerHeight);
  xScale.range([0, innerWidth]);
  yScale.range([innerHeight, 0]);
  gChart.select(".x-axis")
    .attr("transform", `translate(${padding.left}, ${outerHeight - padding.bottom})`)
    .call(xAxis);
  gChart.select(".y-axis").call(yAxis);
  scatterPoints.attr("cx", (d) => xScale(d.x)).attr("cy", (d) => yScale(d.y));
}