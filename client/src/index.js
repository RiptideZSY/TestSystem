import MainHeader from "./mainHeader";
import LeftAsider from "./leftAsider";
import MainFooter from "./mainFooter";
import MainContent from "./mainContent";
import React from "react";
import ReactDOM from "react-dom";
import "./css/app.css";
import "./css/color.css";
import "./bootstrap/css/bootstrap.min.css";
import "./css/style.css";


function Wrapper(props) {
	return (
		<div className="wrapper">
			<MainHeader />
			<LeftAsider />
			<MainContent />
			<MainFooter />
		</div>
	);
}
ReactDOM.render(
	<Wrapper />,
	document.getElementById("root")
);