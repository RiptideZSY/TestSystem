import MainHeader from "./mainHeader";
import LeftAsider from "./leftAsider";
import MainFooter from "./mainFooter";
import MainContent from "./mainContent";

import ScatterContent from './ScatterContent';
import HeatmapContent from "./heatmapContent";
import React from "react";
import ReactDOM from "react-dom";

import {
	HashRouter,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import "./css/app.css";
import "./css/color.css";
import "./bootstrap/css/bootstrap.min.css";
import "./css/style.css";
import "./css/charts.css"

//import createHistory from 'history/createHashHistory';
//const history = createHistory();

class Wrapper extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="wrapper">
				<MainHeader />
				<LeftAsider />
						
				<MainFooter />
			</div>
		);
	}
}

const Chart = () => (
	<div className="wrapper">
		<MainHeader />
		<LeftAsider />
		<Switch>	
			<Route exact path='/' component = {ScatterContent} />
			<Route path='/heatmap' component = {HeatmapContent} />
			<Route path='/barchart' component = {MainContent} />
			<Route path='/linechart' component = {MainContent} />
		</Switch>
		<MainFooter />
	</div>
)

ReactDOM.render((
	<HashRouter>	
		<div>
			<Chart />
		</div>
	</HashRouter>
), document.getElementById("root"));