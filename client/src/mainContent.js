import React from "react";
import BarChart from "./d3charts/barChart"
import LineChart from "./d3charts/lineChart"
import DropDown from "./dropDown"
import {
	observer
} from 'mobx-react'
import {
	observable
} from 'mobx';

function PreviousButton(props) {
	return (
		<button className="progressBarButton btn btn-default" onClick={props.onClick} style={{float:"left"}}>
			<span className="glyphicon glyphicon-menu-left"></span>
		</button>
	)
}

function NextButton(props) {
	return (
		<button className="progressBarButton btn btn-default" onClick={props.onClick} style={{float:"right"}}>
			<span className="glyphicon glyphicon-menu-right"></span>
		</button>
	)
}

class ProgressBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.handlePreviousClick = this.handlePreviousClick.bind(this);
		this.state = {
			current: 0,
			all: 10 //to modify
		};
	}

	handleNextClick() {
		if (this.state.current < this.state.all) {
			this.setState(prevState => ({
				current: prevState.current + 1
			}));
		}
	}

	handlePreviousClick() {
		if (this.state.current > 0) {
			this.setState(prevState => ({
				current: prevState.current - 1
			}));
		}
	}

	render() {
		var style = {
			width: this.state.current * 100.0 / this.state.all + '%'
		};
		return (
			<div>
							
				<div className = "progress">	
					<PreviousButton onClick = {this.handlePreviousClick}/>
						<div className="progress-bar progress-bar-primary progress-bar-striped" style={style}>
                		
            			</div> 
            		<NextButton onClick = {this.handleNextClick}/> 
            	</div>
            	
            </div>
		);
	}
}

// <div className="box-header"><h3 className="box-title">啊啊啊</h3></div>

function ContentProgressBar(props) {
	return (
		<div className="row">
		        <div className="col-xs-12">
		          	<div className="box box-solid">
				  			
		            	<div className="box-body">
					 		<ProgressBar />
						</div>
		          	</div>
		        </div>
		    </div>
	);
}
/*<div className="box">
				<div className="box-header with-border">
          			<h3 className="box-title">图类型</h3>
            	</div>
				<div className="box-body">
         			<div className="row">
         				<div className="col-md-6">
							<div className="box box-primary">
			  			
	            				<div className="box-body">
				 					xixixi
								</div>
	          				</div>
	        			</div>
         			</div>
        		</div>
			</div>*/
function ScheduleBar(props) {
	return (
		<div id="scheduleBar" onMouseMove={props.onMouseMove} onMouseUp={props.onMouseUp}>        		
	        <input type="text" value={props.inputValue} autoComplete="off" onChange={props.onChange}/>%
	        <div id="backBar">
	            <div id="circle" onMouseDown={props.onMouseDown} style={props.styleCircle}></div>
	            <div id="frontBar" style={props.styleFrontBar}></div>
	        </div>
        </div>
	);

}
class ContentScheduleBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		//this.handleFlushData = this.handleFlushData.bind(this);
		// var datatmp = [];
		// var dataCount = 20;
		// for (var i = 0; i < dataCount; i++) {
		// 	datatmp.push(Math.round(Math.random() * 500));
		// }
		this.state = {
			isfalse: false, //控制鼠标点击
			inputValue: 0,
			x: 0,
			offsetLeft: 0, //圆离最左边的距离
			barWidth: 0, //进度条的总宽度
			circleMarginLeft: 0, //圆离进度条最左边的距离
			frontBarWidth: 0,
			//myData: datatmp
		};
	}
	//控制鼠标点击拖动
	handleMouseDown(event) {
		var currentX = event.clientX;
		var circle = document.getElementById("circle");
		var offleft = circle.offsetLeft;
		var backBar = document.getElementById("backBar");
		var max = backBar.offsetWidth - circle.offsetWidth;
		this.setState({
			isfalse: true,
			x: currentX,
			offsetLeft: offleft,
			barWidth: max
		});
	}
	handleMouseMove(event) {
		if (this.state.isfalse == false) {
			return;
		}
		var changeX = event.clientX;
		var moveX = Math.min(this.state.barWidth, Math.max(-2, this.state.offsetLeft + (changeX - this.state.x))); //超过总宽度取最大宽
		var value = Math.round(Math.max(0, moveX / this.state.barWidth) * 100);
		this.setState({
			inputValue: value,
			circleMarginLeft: Math.max(0, moveX) + "px",
			frontBarWidth: moveX + "px"
		});
		// console.log("x:" + this.state.x);
		// console.log("offsetLeft:" + this.state.offsetLeft);
		// console.log("circleMarginLeft:" + this.state.circleMarginLeft);
		// console.log("barWidth:" + this.state.barWidth);
		// console.log("frontBarWidth:" + this.state.frontBarWidth);
	}
	handleMouseUp(event) {
		this.setState({
			isfalse: false
		});

	}
	//处理用户输入
	handleInputChange(event) {
		var minValue = 0;
		var maxValue = 100;
		var currentValue = event.target.value;
		if (currentValue > maxValue || currentValue < minValue) {
			alert("输入的数值不正确");
			//input.value ="";
			this.setState({
				inputValue: 0,
				circleMarginLeft: "0px",
				frontBarWidth: "0px"
			});
		} else {
			var backBar = document.getElementById("backBar");
			var val = currentValue / 100 * backBar.offsetWidth;
			this.setState({
				inputValue: currentValue,
				circleMarginLeft: val + "px",
				frontBarWidth: val + "px"
			});
		}
	}
	// handleFlushData() {
	// 	var datatmp = [];
	// 	var dataCount = 20;
	// 	for (var i = 0; i < dataCount; i++) {
	// 		datatmp.push(Math.round(Math.random() * 500));
	// 	}
	// 	this.setState({
	// 		myData: datatmp
	// 	});
	// }
	render() {
		var styleCircle = {
			marginLeft: this.state.circleMarginLeft
		};
		var styleFrontBar = {
			width: this.state.frontBarWidth
		};
		//var arr = ["宽度", "坐标轴", "整体"];
		return (
			<div>
				<ScheduleBar onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}
				onChange={this.handleInputChange} onMouseDown={this.handleMouseDown} styleCircle={styleCircle}
				styleFrontBar = {styleFrontBar} inputValue={this.state.inputValue}/>
				
				
        		<svg id="main-svg" style={{width: 529.5, height: 529.5, top: 0, left: 0}}>
			        <g>
						<BarChart widthPercent = {this.state.inputValue} data= {this.props.data}/>
			        </g>
			    </svg>		       
			</div>
		);
	}

}
/*<div id="scheduleBar" onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}>
	        		
	        		<input type="text" value={this.state.inputValue} autoComplete="off" onChange={this.handleInputChange}/>%
	        		<div id="backBar">
	            		<div id="circle" onMouseDown={this.handleMouseDown} style={styleCircle}></div>
	            		<div id="frontBar" style={styleFrontBar}></div>
	        		</div>
        		</div>*/
class ContentBody extends React.Component {

	constructor(props) {
		super(props);
		this.handleFlushData = this.handleFlushData.bind(this);
		var datatmp = [];
		var dataCount = 20;
		for (var i = 0; i < dataCount; i++) {
			datatmp.push(Math.round(Math.random() * 500));
		}
		this.state = {
			data: datatmp
		};
		//console.log(this.state.data);
	}
	handleFlushData() {
		var datatmp = [];
		var dataCount = 20;
		for (var i = 0; i < dataCount; i++) {
			datatmp.push(Math.round(Math.random() * 500));
		}
		this.setState({
			data: datatmp
		});
		console.log(this.state.data);
	}

	render() {
		return (
			<div className="row">
        		<div className="col-md-6">
        			<div className="box box-solid">
	            		<div className="box-header with-border">
	              			<h3 className="box-title">BarChart</h3>
	              		</div>
			            <div className="box-body">	
			           		<button className="btn btn-success" onClick={this.handleFlushData}>刷新数据</button>           	
							<ContentScheduleBar data={this.state.data}/>		             		     
			             </div>
			        </div>
			    </div>
			    <div className="col-md-6">
        			<div className="box box-solid">
	            		<div className="box-header with-border">
	              			<h3 className="box-title">LineChart</h3>
	              		</div>
			            <div className="box-body">
							
			            	<svg id="main-svg" style={{width: 529.5, height: 529.5, top: 0, left: 0}}>
						        <g>
									<LineChart />
						        </g>
						    </svg>	
			            </div>
			        </div>
			    </div>
            </div>
		);
	}
}
//<ContentHeader />
export default class MainContent extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="content-wrapper">
    			<section className="content">  				
					<ContentProgressBar />
					<ContentBody />
				</section>
	    	</div>
		);
	}

}