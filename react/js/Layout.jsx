import React from 'react';
import { Router, Route, hashHistory, Link } from 'react-router';

import Navigation from './Navigation.jsx';
import Sort from './Sort.jsx';
import Search from './Search.jsx';
import Cart from './Cart.jsx';

const Layout = React.createClass({
	render: function(){
		return (
			<div>
				<nav className="navbar navbar-default">
					<div className="container-fluid">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar" key='1'></span>
								<span className="icon-bar" key='2'></span>
								<span className="icon-bar" key='3'></span>
							</button>
							<Link className="navbar-brand" to={'/'}>ReactJS Shop</Link>
						</div>
						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<Navigation />
							<Search />
							<Cart />
							<Sort />
						</div>
					</div>
				</nav>
				{this.props.children}
			</div>
		);
	}
});

export default Layout;