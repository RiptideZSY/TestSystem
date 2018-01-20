import * as d3 from 'd3'
import D3Component from './d3Component'

export default class LineChart extends D3Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.strokeWidth != this.props.strokeWidth || nextProps.data != this.props.data) {
			this.renderGraph(this.g, nextProps);
		}
	}
	renderGraph = (gDOM, props) => {
		const {
			strokeWidth,
			data,
			lineNames
		} = props;
		d3.select(gDOM).select('svg').selectAll('g').remove();
		d3.select(gDOM).select('svg').remove();
		var dataset = [];
		//var lines = []; //保存折线图对象
		var lines = [];
		var xMarks = [];
		var lineColor = ["#757575", "#43A047", "#795548"];
		var w = 800;
		var h = 800;
		var padding = 40;
		var currentLineNum = 0;

		//用一个变量存储标题和副标题的高度，如果没有标题则为0
		var head_height = padding;

		//用一个变量计算底部的高度，如果不是多系列，就为0
		var foot_height = padding;

		//模拟数据
		//getData();
		dataset = data;
		//console.log(dataset);
		for (var i = 0; i < dataset[0].length; i++) {
			xMarks.push(i);
		}
		//判断是否多维数组，如果不是，则转为多维数组
		if (!(dataset[0] instanceof Array)) {
			var tempArr = [];
			tempArr.push(dataset);
			dataset = tempArr;
		}

		//保存数组长度，也就是系列的个数
		currentLineNum = dataset.length;

		//图例的预留位置
		foot_height += 25;

		//定义画布
		var svg = d3.select(gDOM)
			.append("svg")
			.attr("width", w)
			.attr("height", h);

		//添加背景
		svg.append("g")
			.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", w)
			.attr("height", h)
			.style("fill", "#FAFAFA")
			.style('background', '#757575')
			.style("stroke-width", 2);
		//.style("stroke", "#E7E7E7");

		var maxdata = getMaxdata(dataset);

		//横坐标轴比例尺
		var xScale = d3.scaleLinear()
			.domain([0, dataset[0].length - 1])
			.range([padding, w - padding]);

		//纵坐标轴比例尺
		var yScale = d3.scaleLinear()
			.domain([0, maxdata])
			.range([h - foot_height, head_height]);

		//定义横轴网格线
		var xInner = d3.axisBottom()
			.scale(xScale)
			.tickSize(-(h - head_height - foot_height), 0, 0)
			.tickFormat("")
			//.orient("bottom")
			.ticks(dataset[0].length);

		//添加横轴网格线
		var xInnerBar = svg.append("g")
			.attr("class", "inner_line")
			.attr("transform", "translate(0," + (h - padding) + ")")
			.call(xInner);

		//定义纵轴网格线
		var yInner = d3.axisLeft()
			.scale(yScale)
			.tickSize(-(w - padding * 2), 0, 0)
			.tickFormat("")
			//.orient("left")
			.ticks(10);

		//添加纵轴网格线
		var yInnerBar = svg.append("g")
			.attr("class", "inner_line")
			.attr("transform", "translate(" + padding + ",0)")
			.call(yInner);
		//定义横轴
		var xAxis = d3.axisBottom()
			.scale(xScale)
			//.orient("bottom")
			.ticks(dataset[0].length);

		//添加横坐标轴
		var xBar = svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0," + (h - foot_height) + ")")
			.call(xAxis);

		//通过编号获取对应的横轴标签
		xBar.selectAll("text")
			.text(function(d) {
				return xMarks[d];
			});

		//定义纵轴
		var yAxis = d3.axisLeft()
			.scale(yScale)
			//.orient("left")
			.ticks(10);

		//添加纵轴
		var yBar = svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + padding + ",0)")
			.call(yAxis);

		//添加图例
		var legend = svg.append("g");

		addLegend();

		//添加折线
		lines = [];
		for (var i = 0; i < currentLineNum; i++) {
			var newLine = new CrystalLineObject();
			newLine.init(i);
			lines.push(newLine);
		}

		//定义折线类
		function CrystalLineObject() {
			this.group = null;
			this.path = null;
			this.oldData = [];

			this.init = function(id) {
				var arr = dataset[id];
				this.group = svg.append("g");

				var line = d3.line()
					.x(function(d, i) {
						return xScale(i);
					})
					.y(function(d) {
						return yScale(d);
					});

				//添加折线
				this.path = this.group.append("path")
					.attr("d", line(arr))
					.style("fill", "none")
					.style("stroke-width", strokeWidth * 0.2)
					.style("stroke", lineColor[id])
					.style("stroke-opacity", 0.9);

				this.oldData = arr;
			};

			//动画初始化方法
			this.movieBegin = function(id) {
				var arr = dataset[i];
				//补足/删除路径
				var olddata = this.oldData;
				var line = d3.line()
					.x(function(d, i) {
						if (i >= olddata.length) return w - padding;
						else return xScale(i);
					})
					.y(function(d, i) {
						if (i >= olddata.length) return h - foot_height;
						else return yScale(olddata[i]);
					});

				//路径初始化
				this.path.attr("d", line(arr));

				//截断旧数据
				var tempData = olddata.slice(0, arr.length);
				var circle = this.group.selectAll("circle").data(tempData);

				this.oldData = arr;
			};

			//重绘加动画效果
			this.reDraw = function(id, _duration) {
				var arr = dataset[i];
				var line = d3.line()
					.x(function(d, i) {
						return xScale(i);
					})
					.y(function(d) {
						return yScale(d);
					}).interpolate("basis-closed");

				//路径动画
				this.path.transition().duration(_duration).attr("d", line(arr));

			};

			//从画布删除折线
			this.remove = function() {
				this.group.remove();
			};
		}

		//添加图例
		function addLegend() {
			var textGroup = legend.selectAll("text")
				.data(lineNames);

			textGroup.exit().remove();

			legend.selectAll("text")
				.data(lineNames)
				.enter()
				.append("text")
				.text(function(d) {
					return d;
				})
				.attr("class", "legend")
				.attr("x", function(d, i) {
					return i * 100;
				})
				.attr("y", 0)
				.attr("fill", function(d, i) {
					return lineColor[i];
				});

			var rectGroup = legend.selectAll("rect")
				.data(lineNames);

			rectGroup.exit().remove();

			legend.selectAll("rect")
				.data(lineNames)
				.enter()
				.append("rect")
				.attr("x", function(d, i) {
					return i * 100 - 20;
				})
				.attr("y", -10)
				.attr("width", 12)
				.attr("height", 12)
				.attr("fill", function(d, i) {
					return lineColor[i];
				});

			legend.attr("transform", "translate(" + ((w - lineNames.length * 100) / 2) + "," + (h - 10) + ")");
		}

		//取得多维数组最大值
		function getMaxdata(arr) {
			var maxdata = 0;
			for (var i = 0; i < arr.length; i++) {
				maxdata = d3.max([maxdata, d3.max(arr[i])]);
			}
			return maxdata;
		}
	}
}