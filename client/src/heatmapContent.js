import React from "react";
import Heatmap from "heatmapjs";
import * as d3 from 'd3';
import {
	generateData
} from './myfunction';
export default class HeatmapContent extends React.Component {
	constructor(props) {
		super(props);
		this.draw = this.draw.bind(this);
		this.handleFlushData = this.handleFlushData.bind(this);
		var data = generateData(700, 700, 300);
		this.state = {
			kernelWidth: 20,
			data: data
		}
	}
	componentDidMount() {
		this.draw(this.state.data);
		this.drawParameters();
	}
	handleParametersUpdated(parameters, name) {
		if (name == 'kernelWidth') {
			d3.select(`#${name}-slider`).node().value = +parameters[name];
			d3.select(`#${name}-spin`).node().value = +parameters[name];
		}
		this.setState({
			kernelWidth: d3.select(`#${name}-slider`).node().value
		})
		d3.select('#heatmap').selectAll('*').remove();
		this.draw(null);
	}

	appendNumberChooser(name, min, max, controls, parameters) {
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
			//updateParameters(name);
			//for (name of ['kernelWidth', 'width', 'height']) {
			this.handleParametersUpdated(parameters, name);
		}, false);

		spin.on('input', () => {
			parameters[name] = spin.node().value;
			//updateParameters(name);
			this.handleParametersUpdated(parameters, name);
		}, false);

		return numberChooser;
	}
	draw(data) {
		console.log("in draw:" + this.state.kernelWidth);
		var heatmapInstance = Heatmap.create({
			// required container
			container: document.getElementById('heatmap'),
			radius: this.state.kernelWidth,
			backgroundColor: 'rgba(0,0,0,.95)',
			gradient: {
				'.5': 'blue',
				'.8': 'red',
				'.95': 'white'
			},
			maxOpacity: .9,
			minOpacity: .3
		});

		heatmapInstance.setData((data == null) ? this.state.data : data);
	}

	drawParameters() {
		//options
		var parameters = {
			kernelWidth: 20
		};
		var controls = d3.select('.heatmapOptions');
		this.appendNumberChooser('kernelWidth', 1, 100, controls, parameters);
	}

	handleFlushData() {
		var data = generateData(700, 700, 300);
		this.setState({
			data: data
		});
		this.draw(data);
	}
	render() {
		return (
			<div className="content-wrapper">
    			<section className="content">  								
					<div className="row">
        				<div className="col-md-8">
        					<div className="box box-solid">
	            				<div className="box-header with-border">
	              					<h3 className="box-title">ScatterPlot</h3>
	              				</div>
				            	<div className="box-body">	
			     					<div id = "heatmapContainer" style = {{ width:700, height: 700, top: 0, left: 0}}>
										<div id = "heatmap" style = {{width: "100%", height: "100%"}} />
									</div>
				             	</div>
				        	</div>
			    		</div>
			    		<div className="col-md-4">
		        			<div className="box box-solid">
			            		<div className="box-header with-border">
			              			<h3 className="box-title">Options</h3>
			              		</div>
					            <div className="box-body">	
					            	<div className="heatmapOptions"></div>
				     				<button className="btn btn-success" style={{marginLeft: '10px', marginBottom: '10px'}} onClick={this.handleFlushData}>flush</button>
					             </div>
					        </div>
					    </div>
					</div>
				</section>
	    	</div>
		)
	}
}