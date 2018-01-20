import React from "react";
import {
	Link
} from 'react-router-dom';

function UserPanel(props) {
	return (
		<div className="user-panel">
			<div className="pull-left image">
          		<img src="../img/tay.jpg" className="img-circle" alt="User Image" />
       		</div>
        	<div className="pull-left info">
          		<p>user233</p>
          		<a href="#"><i className="fa fa-circle text-success"></i> Online</a>
        	</div>
		</div>
	);
}

function SearchForm(props) {
	return (
		<form action="#" method="get" className="sidebar-form">
			<div className="input-group">
         		<input type="text" name="q" className="form-control" placeholder="查找某题的图..." />
              	<span className="input-group-btn">
                	<button type="submit" name="search" id="search-btn" className="btn btn-flat">
                		<span>GO</span>
                	</button>
              	</span>
        	</div>
		</form>
	);
}

function SideBarMenu(props) {
	return (
		<ul className="sidebar-menu">
			<li className="header">图列表</li>
				<li><Link to='/'><a href="#"><i className="fa fa-circle-o text-red"></i> <span>散点图</span></a></Link></li>
        		<li><Link to='/barchart'><a href="#"><i className="fa fa-circle-o text-yellow"></i> <span>柱形图</span></a></Link></li>
       	 		<li><Link to='/linechart'><a href="#"><i className="fa fa-circle-o text-aqua"></i> <span>折线图</span></a></Link></li>
			<li><a href="#"><i className="fa fa-circle-o text-blue"></i> <span>...</span></a></li>
	 	</ul>
	);
}

function SideBar(props) {
	return (
		<section className="sidebar">
			<UserPanel />
			<SearchForm />
			<SideBarMenu />
		</section>
	);
}

export default class LeftAsider extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<aside className = "main-sidebar">
				<SideBar />
			</aside>
		);
	}

}