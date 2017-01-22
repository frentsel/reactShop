import React from 'react';
import Purchases from './Purchases.jsx';
import {connect} from 'react-redux';

const CartPage = React.createClass({

	render: function () {

		console.info("CartPage store: ", this.props.state);

		return (
			<div>
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><a href="#/">Home</a></li>
					<li className="breadcrumb-item active">Shopping Cart</li>
				</ol>
				<h1>Shoping cart</h1>
				<Purchases />
			</div>
		);
	}
});

export default connect(
	store => ({
		state: store
	})
)(CartPage);