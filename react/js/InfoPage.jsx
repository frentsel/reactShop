import React from 'react';
import Purchase from './Purchase.jsx';
import {connect} from 'react-redux';
import { Router, Route, hashHistory, Link } from 'react-router';

const Info = React.createClass({

	render: function () {

		const data = this.props.location.query;

		if(!data.name || !data.status) {
			console.error("Error :(");
			hashHistory.push('/');
			return false;
		}

		if(this.props.store.length){
			this.props.clear();
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
	}
});

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		clear: () => {
			dispatch({
				type: 'CLEAR_CART'
			});
		}
	})
)(Info);