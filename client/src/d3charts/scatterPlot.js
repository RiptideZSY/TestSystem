import * as d3 from 'd3';
import D3Component from './d3Component';
import "../css/scatterPlot.css"
import $ from 'jquery';

let dataGeneration = (function() {

	let parameters = {
		xDomain: [0, 50],
		yDomain: [0, 50],
		numVal: 50
	}

	function _setGlobalPara(num_Val, x_Domain, y_Domain) {
		numVal = num_Val;
		xDomain = x_Domain;
		yDomain = y_Domain;
	}

	function _setLocalPara(numVal, xSet, ySet) {
		let dataSet = [];
		for (let i = 0; i < numVal; i++) {
			dataSet.push({
				x: xSet[i],
				y: ySet[i]
			});
		}

		return {
			localParameters: {
				numVal: numVal,
				xDomain: [d3.min(xSet), d3.max(xSet)],
				yDomain: [d3.min(ySet), d3.max(ySet)],
			},
			dataSet: dataSet
		};
	}

	function _generateRandom(numVal = parameters.numVal, Domain = parameters.xDomain) {
		let randomSet = d3.range(numVal).map(() => Math.random() * (Domain[1] - Domain[0]) + Domain[0]);
		return randomSet;
	}

	function random(numVal = parameters.numVal, xDomain = parameters.xDomain, yDomain = parameters.yDomain) {
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = _generateRandom(numVal, yDomain);
		return _setLocalPara(numVal, xSet, ySet);
	}

	function linear(k = 1, b = 0, numVal = parameters.numVal, xDomain = parameters.xDomain) {
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = xSet.map(x => k * x + b);
		return _setLocalPara(numVal, xSet, ySet);
	}

	function log(base = 2, numVal = parameters.numVal, xDomain = parameters.xDomain) {
		if (xDomain[0] <= 0) {
			throw "x must be positive!";
		}
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = xSet.map(x => Math.log(x) / Math.log(base));
		return _setLocalPara(numVal, xSet, ySet);
	}

	function exponent(exp = 2, numVal = parameters.numVal, xDomain = parameters.xDomain) {
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = xSet.map(x => exp ** x);
		return _setLocalPara(numVal, xSet, ySet);
	}

	function multinomial(para, numVal = parameters.numVal, xDomain = parameters.xDomain) {
		// para = [ {coeff: xxx, pow: xxx}, ...]
		if (!para) {
			throw "Please specify coefficients and powers as [ {coeff: xxx, pow: xxx}, ...]";
		}
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = xSet.map(x => {
			let sum = 0;
			for (entry of para) {
				sum += entry.coeff * (x ** entry.pow);
			}
			return sum;
		});
		return _setLocalPara(numVal, xSet, ySet);
	}

	function sign(numVal = parameters.numVal, xDomain = parameters.xDomain) {
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = xSet.map(x => Math.sign(x));
		return _setLocalPara(numVal, xSet, ySet);
	}

	function logistic(numVal = parameters.numVal, xDomain = parameters.xDomain) {
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = xSet.map(x => 1 / (1 + Math.exp(-x)));
		return _setLocalPara(numVal, xSet, ySet);
	}

	function sin(numVal = parameters.numVal, xDomain = parameters.xDomain) {
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = xSet.map(x => Math.sin(x));
		return _setLocalPara(numVal, xSet, ySet);
	}

	function cos(numVal = parameters.numVal, xDomain = parameters.xDomain) {
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = xSet.map(x => Math.cos(x));
		return _setLocalPara(numVal, xSet, ySet);
	}

	function tan(numVal = parameters.numVal, xDomain = parameters.xDomain) {
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = xSet.map(x => Math.tan(x));
		return _setLocalPara(numVal, xSet, ySet);
	}

	function sinh(numVal = parameters.numVal, xDomain = parameters.xDomain) {
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = xSet.map(x => Math.sinh(x));
		return _setLocalPara(numVal, xSet, ySet);
	}

	function cosh(numVal = parameters.numVal, xDomain = parameters.xDomain) {
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = xSet.map(x => Math.cosh(x));
		return _setLocalPara(numVal, xSet, ySet);
	}

	function tanh(numVal = parameters.numVal, xDomain = parameters.xDomain) {
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = xSet.map(x => Math.tanh(x));
		return _setLocalPara(numVal, xSet, ySet);
	}

	function gaussian(para = {
		mu: 0,
		sigma: 2
	}, numVal = parameters.numVal) {
		let {
			mu,
			sigma
		} = para;
		let xDomain = [mu - 3 * sigma, mu + 3 * sigma];
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = xSet.map(x =>
			1 / Math.sqrt(2 * Math.PI) / sigma * Math.exp(-((x - mu) ** 2) / (2 * sigma ** 2))
		);
		return _setLocalPara(numVal, xSet, ySet);
	}

	function uniform(numVal = parameters.numVal, xDomain = parameters.xDomain) {
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = xSet.map(x => 1 / (xDomain[1] - xDomain[0]));
		return _setLocalPara(numVal, xSet, ySet);
	}

	function exponential(lambda = 2, numVal = parameters.numVal, xDomain = parameters.xDomain) {
		if (lambda <= 0) {
			throw "lambda should be positive!"
		}
		let xSet = _generateRandom(numVal, xDomain);
		let ySet = xSet.map(x =>
			x >= 0 ? (lambda * Math.exp(-lambda * x)) : 0
		);
		return _setLocalPara(numVal, xSet, ySet);
	}

	function circle(para = {
		x0: 0,
		y0: 0,
		r: 2
	}, numVal = parameters.numVal) {
		let {
			x0,
			y0,
			r
		} = para;
		let xSet = [],
			ySet = [];
		let step = 2 * Math.PI / numVal;
		for (let i = 0; i < numVal; i++) {
			xSet.push(x0 + r * Math.cos(step * i));
			ySet.push(y0 + r * Math.sin(step * i));
		}
		return _setLocalPara(numVal, xSet, ySet);
	}

	function ellipse(para = {
		x0: 0,
		y0: 0,
		a: 4,
		b: 2
	}, numVal = parameters.numVal) {
		let {
			x0,
			y0,
			a,
			b
		} = para;
		let xSet = [],
			ySet = [];
		let step = 2 * Math.PI / numVal;
		for (let i = 0; i < numVal; i++) {
			xSet.push(x0 + a * Math.cos(step * i));
			ySet.push(y0 + b * Math.sin(step * i));
		}
		return _setLocalPara(numVal, xSet, ySet);
	}

	function parabola(para = {
		x0: 0,
		y0: 0,
		p: 2
	}, numVal = parameters.numVal) {
		let {
			x0,
			y0,
			p
		} = para;
		let xSet = [],
			ySet = [];
		let step = 2 * Math.PI / numVal;
		for (let i = 0; i < numVal; i++) {
			xSet.push(x0 + 2 * p * ((step * i) ** 2));
			ySet.push(y0 + 2 * p * (step * i));
		}
		return _setLocalPara(numVal, xSet, ySet);
	}

	function hyperbola(para = {
		x0: 0,
		y0: 0,
		a: 2,
		b: 4
	}, numVal = parameters.numVal) {
		let {
			x0,
			y0,
			a,
			b
		} = para;
		let xSet = [],
			ySet = [];
		let step = 2 * Math.PI / numVal;
		for (let i = 0; i < numVal; i++) {
			xSet.push(x0 + a / Math.cos(step * i));
			ySet.push(y0 + b * Math.tan(step * i));
		}
		return _setLocalPara(numVal, xSet, ySet);
	}

	function heartShape(para = {
		x0: 0,
		y0: 0,
		a: 5
	}, numVal = parameters.numVal) {
		let {
			x0,
			y0,
			a
		} = para;
		let xSet = [],
			ySet = [];
		let step = 2 * Math.PI / numVal;
		for (let i = 0; i < numVal; i++) {
			let theta = i * step;
			let r = a * (1 + Math.cos(theta));
			xSet.push(x0 + r * Math.cos(theta));
			ySet.push(y0 + r * Math.sin(theta));
		}
		return _setLocalPara(numVal, xSet, ySet);
	}

	function starShape(para = {
		x0: 0,
		y0: 0,
		a: 5
	}, numVal = parameters.numVal) {
		let {
			x0,
			y0,
			a
		} = para;
		let xSet = [],
			ySet = [];
		let step = 2 * Math.PI / numVal;
		for (let i = 0; i < numVal; i++) {
			let theta = i * step;
			xSet.push(x0 + a * Math.cos(theta) ** 3);
			ySet.push(y0 + a * Math.sin(theta) ** 3);
		}
		return _setLocalPara(numVal, xSet, ySet);
	}

	function ArchimedesSpiral(para = {
		x0: 0,
		y0: 0,
		a: 5,
		numCircle: 5
	}, numVal = parameters.numVal) {
		let {
			x0,
			y0,
			a,
			numCircle
		} = para;
		let xSet = [],
			ySet = [];
		let step = numCircle * 2 * Math.PI / numVal;
		for (let i = 0; i < numVal; i++) {
			let theta = i * step;
			xSet.push(x0 + a * theta * Math.cos(theta));
			ySet.push(y0 + a * theta * Math.sin(theta));
		}
		return _setLocalPara(numVal, xSet, ySet);
	}

	function lattice(para = {
		row: 5,
		col: 5
	}, xDomain, yDomain) {
		let {
			row,
			col
		} = para;
		let xSet = [],
			ySet = [];
		let xStep = (xDomain[1] - xDomain[0]) / col;
		let yStep = (yDomain[1] - yDomain[0]) / row;
		for (let j = 0; j < col; j++) {
			for (let i = 0; i < row; i++) {
				xSet.push(xDomain[0] + i * xStep);
				ySet.push(yDomain[0] + j * yStep);
			}
		}
		//console.log(xSet, ySet);
		return _setLocalPara(xSet.length, xSet, ySet);
	}

	function gaussian2D(para = {
		row: 30,
		col: 30,
		mu1: 0,
		mu2: 0,
		sigma1: 1,
		sigma2: 1,
		rho: 0
	}) {
		var maxProbability;
		let {
			row,
			col,
			mu1,
			mu2,
			sigma1,
			sigma2,
			rho
		} = para;
		if (!(rho > -1 && rho < 1)) {
			throw "rho must be in range (-1, 1)!";
		}
		let xSet = [],
			ySet = [];
		let xDomain = [mu1 - 3 * sigma1, mu1 + 3 * sigma1];
		let yDomain = [mu2 - 3 * sigma2, mu2 + 3 * sigma2];
		let xStep = (xDomain[1] - xDomain[0]) / row;
		let yStep = (yDomain[1] - yDomain[0]) / col;
		for (let j = 0; j < col; j++) {
			for (let i = 0; i < row; i++) {
				let [x, y] = [xDomain[0] + i * xStep, yDomain[0] + j * yStep];
				let probability = 1 / (2 * Math.PI * sigma1 * sigma2 * Math.sqrt(1 - rho ** 2)) * Math.exp(-(((x - mu1) ** 2 / (sigma1 ** 2)) - (2 * rho * (x - mu1) * (y - mu2) / sigma1 / sigma2) + ((y - mu2) ** 2 / (sigma2 ** 2))) / (2 * (1 - rho ** 2)));
				maxProbability = 1 / (2 * Math.PI * sigma1 * sigma2 * Math.sqrt(1 - rho ** 2));
				if (_isTrue(probability, maxProbability)) {
					xSet.push(x);
					ySet.push(y);
				}
			}
		}
		return _setLocalPara(xSet.length, xSet, ySet);

		function _isTrue(probability, maxProbability) {
			if (Math.random() * maxProbability <= probability) {
				return true;
			}
			return false;
		}
	}

	return {
		random: random,
		linear: linear,
		log: log,
		exponent: exponent,
		multinomial: multinomial,
		sign: sign,
		logistic: logistic,
		sin: sin,
		cos: cos,
		tan: tan,
		sinh: sinh,
		cosh: cosh,
		tanh: tanh,
		gaussian: gaussian,
		uniform: uniform,
		exponential: exponential,
		circle: circle,
		ellipse: ellipse,
		parabola: parabola,
		hyperbola: hyperbola,
		heartShape: heartShape,
		starShape: starShape,
		ArchimedesSpiral: ArchimedesSpiral,
		lattice: lattice,
		gaussian2D: gaussian2D
	};
})();

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
			appendButton('save', () => test.save());
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
			const TESTS = [
				{
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
				},
				{
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
				},
			];

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
					url: 'http://localhost:3000/scatterPlot/',
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
				save
			}
		})();


		init();
	}
}