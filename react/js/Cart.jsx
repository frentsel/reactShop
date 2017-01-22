import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import {connect} from 'react-redux';

const Cart = React.createClass({

	price: function (products) {

		let sum = 0;

		$.each(products, function (k, phone) {
			sum += (phone.price || 135);
		});

		return sum;
	},
	show: function (e) {
		hashHistory.push('cart');
	},
	render: function () {

		const purchases = this.props.store;
		const price = this.price(purchases);

		console.info("Cart purchases: ", purchases);

		return (
			<div className="cart pull-right" onClick={this.show}>
				<table className="cart-options">
					<tbody>
						<tr>
							<td>Qtt:</td>
							<td className="cart-option-value quantity">{purchases.length}</td>
						</tr>
						<tr>
							<td>Price:</td>
							<td className="cart-option-value price">{price}$</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});

export default connect(
	state => ({
		store: state
	})
)(Cart);