import React from "react";


// function ContentHeader(props) {
// 	return (
// 		<section className="content-header">
//       		<h1>放内容的面板</h1>
//       		<ol className="breadcrumb">
//         		<li><a href="#"><i className="fa fa-dashboard"></i> USERSTUDY</a></li>
//         		<li className="active">主页面</li>
//       		</ol>
//     	</section>
// 	);
// }

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
			all:10//to modify
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
		var style = {width:this.state.current * 100.0/this.state.all + '%'};
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
function ContentBody(props) {
	return (
			<div className="row">
        		<div className="col-md-6">
        			<div className="box box-solid">
	            		<div className="box-header with-border">
	              			<h3 className="box-title">1</h3>
	              		</div>
			            <div className="box-body">
			             	
			            </div>
			        </div>
			    </div>
			    <div className="col-md-6">
        			<div className="box box-solid">
	            		<div className="box-header with-border">
	              			<h3 className="box-title">2</h3>
	              		</div>
			            <div className="box-body">
			            	
			            </div>
			        </div>
			    </div>
            </div>
			);
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