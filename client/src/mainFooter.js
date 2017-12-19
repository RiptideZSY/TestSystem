import React from "react";



export default class MainFooter extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<footer className="main-footer">
				<div className="pull-right hidden-xs">
      				All rights reserved.
   				</div>
   				<strong>Copyright &copy; 2017 <a href="#">ZJUVAG</a>.</strong> 
  			</footer>
		);
	}

}