import React from "react";


function Logo(props) {
	return (
		<a href="#" className="logo">
      		<span className="logo-mini"><b>VAG</b></span>
      		<span className="logo-lg"><b>ZJUVAG</b></span>
    	</a>
	)
}

function UserMenu(props) {
	return (
		<div className="navbar-custom-menu">
			<ul className="nav navbar-nav">
            	<li className="dropdown user user-menu">
            		<a href="#" className="dropdown-toggle" data-toggle="dropdown">
              			<img src="../img/tay.jpg" className="user-image" alt="User Image" />
              			<span className="hidden-xs">user233</span>
            		</a>
           		</li>
        	</ul>
		</div>
	)
}
//<a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button" />
function HeaderNavBar(props) {
	return (
		<nav className="navbar navbar-static-top" role="navigation">
			
			<UserMenu />
		</nav>
	)
}

export default class MainHeader extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<header className = "main-header">
				<Logo />
				<HeaderNavBar />
			</header>
		);
	}

}