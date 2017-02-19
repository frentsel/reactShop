import React from 'react';
import {connect} from 'react-redux';
import { Router, Route, hashHistory, Link } from 'react-router';

const Info = ({ purchases, location, clear }) => {

	const data = location.query;

	if(!data.name || !data.status) {
		console.error("Error :(");
		hashHistory.push('/');
		return;
	}

	if(purchases.length){
		clear();
	}

	return (
		<div>
			<ol className="breadcrumb">
				<li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
				<li className="breadcrumb-item active">Info page</li>
			</ol>
			<h1>{data.name.toUpperCase()}, Your order was send</h1>
			<div className="alert alert-info alert-dismissible" role="alert">
				<Link to={'/'}>Back home</Link>
			</div>
		</div>
	);
};

export default connect(
	state => ({
		purchases: state.purchases
	}),
	dispatch => ({
		clear: () => {
			dispatch({
				type: 'CLEAR_CART'
			});
		}
	})
)(Info);