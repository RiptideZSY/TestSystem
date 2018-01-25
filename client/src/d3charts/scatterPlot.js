import * as d3 from 'd3';
import D3Component from './d3Component';
import "../css/scatterPlot.css"
import $ from 'jquery';

import {
	dataGeneration
} from './dataGeneration';

export default class ScatterPlot extends D3Component {
	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.strokeWidth != this.props.strokeWidth || nextProps.data != this.props.data) {
	// 		this.renderGraph(this.g, nextProps);
	// 	}
	// }
	renderGraph = (gDOM, props) => {
		var mainDivWidth, mainDivHeight,
			svg, gChart, clipPathRect, gXAxis, gYAxis, gCircles,
			dataset, dataPara, xScale, yScale, xAxis, yAxis, circles,
			parameters = {
				circleR: 200,
				width: 0,
				height: 0,
				aspectRatio: 1.0,
			},
			padding = {
				left: 20,
				right: 20,
				top: 20,
				bottom: 20
			},
			xDomain = [0, 50],
			yDomain = [0, 50],
			numVal = 50,
			controls,
			resultGraph;

		function initGraph() {
			parameters.width = Math.min(mainDivWidth - 1, mainDivHeight - 1);
			parameters.height = parameters.width;

			svg = d3.select(gDOM).append('svg')
				.attr('class', 'svg');

			clipPathRect = svg.append('defs').append('clipPath')
				.attr('id', 'chart-area')
				.append('rect')
				.attr('x', 0)
				.attr('y', 0);

			gChart = svg.append('g')
				.attr('class', 'gChart');

			gXAxis = gChart.append('g')
				.attr('class', 'x-axis');
			gYAxis = gChart.append('g')
				.attr('class', 'y-axis');

			xScale = d3.scaleLinear()
				.domain(xDomain);
			yScale = d3.scaleLinear()
				.domain(yDomain);

			xAxis = d3.axisBottom()
				.scale(xScale);
			yAxis = d3.axisLeft()
				.scale(yScale);

			gCircles = gChart.append('g')
				.attr('class', 'circles')
				.attr('clip-path', 'url(#chart-area)');
		}

		function drawGraph() {
			const svgWidth = parameters.width,
				svgHeight = parameters.height,
				innerWidth = svgWidth - padding.left - padding.right,
				innerHeight = svgHeight - padding.top - padding.bottom;

			svg.attr('width', parameters.width)
				.attr('height', parameters.height)
				.attr('transform', `translate(${(mainDivWidth - svgWidth) / 2}, ${(mainDivHeight - svgHeight) / 2})`);

			clipPathRect
				.attr('width', innerWidth)
				.attr('height', innerHeight);

			xScale.range([0, innerWidth]);
			yScale.range([innerHeight, 0]);

			gXAxis
				.attr('transform', `translate(${padding.left}, ${svgHeight - padding.bottom})`)
				.call(xAxis);
			gYAxis
				.attr('transform', `translate(${padding.left}, ${padding.top})`)
				.call(yAxis);

			gCircles.attr('transform', `translate(${padding.left}, ${padding.top})`);

			circles = gCircles
				.selectAll('circle');

			let circles_enter = circles.data(dataset).enter().append('circle')
				.attr('class', 'circle');

			circles_enter.append('title')
				.text((d) => `x: ${d.x}\ny: ${d.y}`);

			circles_enter.merge(circles)
				.attr('cx', (d) => xScale(d.x))
				.attr('cy', (d) => yScale(d.y))
				.attr('r', parameters.circleR / 10);

		}

		function generateData(numVal, xDomain, yDomain) {
			return dataGeneration.gaussian2D({
				row: 25,
				col: 25,
				mu1: 0,
				mu2: 0,
				sigma1: 1,
				sigma2: 1,
				rho: 0
			});
		}

		function initControls() {
			controls = d3.select('.scatterOptions');

			//let container = controls.append('div')
			//	.style('margin', '50px');
			let container = controls;

			function appendButton(name, callback) {
				let buttonLine = controls.append('div')
					.attr('class', 'control button');


				let button = buttonLine.append('button')
					.attr('id', `${name}-button`)
					.attr('class', 'btn btn-success')
					.style('margin-left', '10px')
					.style('margin-bottom', '10px')
					.text(name)
					.on('click', callback);

				return buttonLine;
			}

			function appendNumberChooser(name, min, max) {
				let numberChooser = controls.append('div')
					.attr('class', 'control number-chooser');

				numberChooser.append('span')
					.attr('class', 'label')
					.text(name);

				let slider = numberChooser.append('input')
					.attr('id', `${name}-slider`)
					.attr('type', 'range')
					.attr('min', min || 0)
					.attr('max', max || 0)
					.attr('value', parameters[name]);

				let spin = numberChooser.append('input')
					.attr('id', `${name}-spin`)
					.attr('type', 'number')
					.attr('value', parameters[name]);

				slider.on('input', () => {
					parameters[name] = slider.node().value;
					updateParameters(name);
				}, false);

				spin.on('input', () => {
					parameters[name] = spin.node().value;
					updateParameters(name);
				}, false);

				return numberChooser;
			}

			function appendRatioChooser(name, locked = true) {
				let ratioChooser = controls.append('div')
					.attr('class', 'control ratio-chooser');

				ratioChooser.append('span')
					.attr('class', 'label')
					.text(name);

				let spin = ratioChooser.append('input')
					.attr('id', `${name}-spin`)
					.attr('type', 'number')
					.attr('min', '0.1')
					.attr('max', '10')
					.attr('step', '0.1')
					.attr('disabled', locked)
					.attr('value', parameters[name]);

				let checkbox = ratioChooser.append('input')
					.attr('id', `${name}-checkbox`)
					.attr('type', 'checkbox')
					.attr('checked', true);

				checkbox.on('change', () => {
					let checked = checkbox.node().checked;
					spin.node().disabled = checked;
				});

				return ratioChooser;
			}

			function appendBlank() {
				let blank = controls.append('div')
					.attr('class', 'control blank');

				return blank;
			}

			appendNumberChooser('circleR', 1, 1500);
			appendNumberChooser('width', 100, mainDivWidth - 1);
			appendNumberChooser('height', 100, mainDivHeight - 1);
			appendRatioChooser('aspectRatio');
			appendButton('test reset', () => test.reset());
			appendButton('test next', () => test.next());
			appendButton('save results', () => test.save());
			appendButton('save data', () => test.saveData());
			resultGraph = appendBlank();
			//resultGraph = controls;
		}

		function updateParameters(triggerBy) {
			//console.log(d3.select('#aspectRatio-checkbox').node().checked);
			if (d3.select('#aspectRatio-checkbox').node().checked) { // aspectRatio locked
				if (triggerBy === 'width') {
					let value = parameters['width'] / parameters['aspectRatio'];
					let slider = d3.select('#height-slider').node(),
						min = slider.min,
						max = slider.max;
					if (value < min) {
						value = min;
					} else if (value > max) {
						value = max
					}
					parameters['height'] = value;
					parameters['width'] = parameters['height'] * parameters['aspectRatio'];
				} else if (triggerBy === 'height') {
					let value = parameters['height'] * parameters['aspectRatio'];
					let slider = d3.select('#width-slider').node(),
						min = slider.min,
						max = slider.max;
					if (value < min) {
						value = min;
					} else if (value > max) {
						value = max
					}
					parameters['width'] = value;
					parameters['height'] = parameters['width'] / parameters['aspectRatio'];
				}
			} else {
				parameters['aspectRatio'] = parameters['width'] / parameters['height'];
			}

			for (name of ['circleR', 'width', 'height']) {
				d3.select(`#${name}-slider`).node().value = +parameters[name];
				d3.select(`#${name}-spin`).node().value = +parameters[name];
			}

			for (name of ['aspectRatio']) {
				d3.select(`#${name}-spin`).node().value = +parameters[name];
			}

			drawGraph();
		}

		function init() {
			//mainDivWidth = (document.getElementsByClassName(gDOM))['0'].clientWidth;
			//mainDivHeight = (document.getElementsByClassName(gDOM))['0'].clientHeight;
			mainDivWidth = 1000;
			mainDivHeight = 1000;

			//console.log(mainDivWidth, mainDivHeight);
			let data = generateData(numVal, xDomain, yDomain);
			dataPara = data.localParameters;
			dataset = data.dataSet;
			numVal = dataPara.numVal;
			xDomain = dataPara.xDomain;
			yDomain = dataPara.yDomain;


			initGraph();

			initControls();

			drawGraph();

			window.onresize = drawGraph;
		}

		var test = (function() {
			const TESTS = [{
				circleR: 1,
				width: 900,
				height: 900
			}, {
				circleR: 1,
				width: 850,
				height: 850
			}, {
				circleR: 1,
				width: 800,
				height: 800
			}, {
				circleR: 1,
				width: 750,
				height: 750
			}, {
				circleR: 1,
				width: 700,
				height: 700
			}, {
				circleR: 1,
				width: 650,
				height: 650
			}, {
				circleR: 1,
				width: 600,
				height: 600
			}, {
				circleR: 1,
				width: 550,
				height: 550
			}, {
				circleR: 1,
				width: 500,
				height: 500
			}, {
				circleR: 1,
				width: 450,
				height: 450
			}, {
				circleR: 1,
				width: 400,
				height: 400
			}, {
				circleR: 1,
				width: 350,
				height: 350
			}, ];

			let i = -1,
				records = [];

			var reset = function() {
				resultGraph.selectAll('*').remove();
				i = 0;
				next();
				records = [];
			}

			var next = function() {
				if (i < 0) {
					return;
				}
				records.push(Object.assign({}, parameters));
				if (i < TESTS.length) {
					Object.assign(parameters, TESTS[i]);
					updateParameters();
					i++;
				} else {
					//console.log(records);
					drawResult(resultGraph, records, 'width', 'circleR');
					i = -1;
				}
			}

			var save = function() {
				// var myDate = new Date();
				// myDate.toLocaleDateString(); //获取当前日期
				// var test = '{\"' + myDate.toLocaleString() + '\":' + JSON.stringify(records) + '}';
				var data = JSON.stringify(records);
				$.ajax({
					url: 'http://localhost:3000/scatterPlot/saveResults',
					type: 'POST',
					contentType: "application/json; charset=utf-8",
					data: data,
					success: (data) => {
						console.log(data);
					}
				});
			}

			var saveData = function() {
				console.log("save dataset");
				var data = JSON.stringify(dataset);
				$.ajax({
					url: 'http://localhost:3000/scatterPlot/saveData',
					type: 'POST',
					contentType: "application/json; charset=utf-8",
					data: data,
					success: (data) => {
						console.log(data);
					}
				});
			}

			function drawResult(container, data0, attrX, attrY) {
				//console.log(data0);
				container.selectAll('*').remove();
				var svg = container.append('svg')
					.attr('id', 'result-graph')
					.attr('width', '100%')
					.attr('height', '100%');

				var {
					width,
					height
				} = svg.node().getBoundingClientRect();
				//console.log(svg.node().getBoundingClientRect());
				var margin = {
					top: 20,
					right: 20,
					bottom: 30,
					left: 40
				};
				width -= margin.left + margin.right;
				height -= margin.top + margin.bottom;

				var x = d3.scaleLinear()
					.range([0, width]);

				var y = d3.scaleLinear()
					.range([height, 0]);

				var xAxis = d3.axisBottom().scale(x);

				var yAxis = d3.axisLeft().scale(y);

				var g = svg.append('g')
					.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

				var data = [];
				data0.forEach(d => data.push({
					x: +d[attrX],
					y: +d[attrY],
				}));

				calcRegression(data);
				//console.log(data);

				var line = d3.line()
					.x(d => x(d.x))
					.y(d => y(d.yhat));

				x.domain([d3.min(data, d => d.x), d3.max(data, d => d.x)]);
				y.domain([0, d3.max(data, d => d.y)]);

				g.append('g')
					.attr('class', 'x axis')
					.attr('transform', 'translate(0,' + height + ')')
					.call(xAxis)
					.append('text')
					.attr('class', 'label')
					.attr('x', width)
					.attr('y', -6)
					.style('text-anchor', 'end')
					.text('X-Value');

				g.append('g')
					.attr('class', 'y axis')
					.call(yAxis)
					.append('text')
					.attr('class', 'label')
					.attr('transform', 'rotate(-90)')
					.attr('y', 6)
					.attr('dy', '.71em')
					.style('text-anchor', 'end')
					.text('Y-Value')

				g.append('path')
					.datum(data)
					.attr('class', 'line')
					.attr('d', line);

				g.selectAll('.dot')
					.data(data)
					.enter().append('circle')
					.attr('class', 'dot')
					.attr('r', 7)
					.attr('cx', d => x(d.x))
					.attr('cy', d => y(d.y))
					.on('click', (d, i) => {
						parameters = Object.assign(parameters, data0[i]);
						updateParameters();
					})
					.append('title')
					.text((d) => `${attrX}: ${d.x}\n${attrY}: ${d.y}`);
			}

			function calcRegression(data) {
				let xMean = 0,
					yMean = 0;
				for (let datum of data) {
					xMean += datum.x;
					yMean += datum.y;
				}
				xMean /= data.length;
				yMean /= data.length;

				// calculate coefficients
				let xr = 0,
					yr = 0,
					term1 = 0,
					term2 = 0;
				for (let i = 0; i < data.length; i++) {
					xr = data[i].x - xMean;
					yr = data[i].y - yMean;
					term1 += xr * yr;
					term2 += xr * xr;
				}
				let b1 = term1 / term2,
					b0 = yMean - (b1 * xMean);
				// perform regression 

				// fit line using coeffs
				for (let i = 0; i < data.length; i++) {
					data[i].yhat = b0 + (data[i].x * b1);
				}

				return data;
			}

			return {
				reset,
				next,
				save,
				saveData
			}
		})();


		init();
	}
}