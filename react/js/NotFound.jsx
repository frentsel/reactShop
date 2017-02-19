import React from 'react';
import { Router, Route, hashHistory, Link } from 'react-router';

const NotFound = () => {
	return (
		<div>
			<ol className="breadcrumb">
				<li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
				<li className="breadcrumb-item active">404</li>
			</ol>
			<img src={'../img/404.png'} alt="404"/>
		</div>
	);
};

export default NotFound;