import React from "react";
import ScatterPlot from './d3charts/ScatterPlot';
import {
	observer
} from 'mobx-react'
import {
	observable
} from 'mobx';
import $ from 'jquery';

class ContentScheduleBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div >
				
				<svg style = {{width: 1000,height: 1000,top: 0,left: 0}}>
					<g>
						<ScatterPlot />
					</g> 
				</svg>		        
			</div>
		);

	}

}

class ContentBody extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="row">
        		<div className="col-md-8">
        			<div className="box box-solid">
	            		<div className="box-header with-border">
	              			<h3 className="box-title">ScatterPlot</h3>
	              		</div>
			            <div className="box-body">	
		     				<ContentScheduleBar />
			             </div>
			        </div>
			    </div>
			    <div className="col-md-4">
        			<div className="box box-solid">
	            		<div className="box-header with-border">
	              			<h3 className="box-title">Options</h3>
	              		</div>
			            <div className="box-body">	
			            	<div className="scatterOptions"></div>
		     				
			             </div>
			        </div>
			    </div>
            </div>
		);
	}
}
//<ContentHeader />
export default class ScatterContent extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="content-wrapper">
    			<section className="content">  				
					
					<ContentBody />
					
				</section>
	    	</div>
		);
	}

}