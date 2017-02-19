import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import {connect} from 'react-redux';

const Cart = React.createClass({

	show: function (e) {
		hashHistory.push('cart');
	},
	render: function () {

		let purchases = this.props.store;
		let price = purchases.reduce(function (res, phone) {
			res += (phone.price || 135);
			return res;
		}, 0);

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
							<td className="cart-option-value price">{Number(price).toLocaleString('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 2})}$</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});

export default connect(
	state => ({
		store: state.purchases
	}),
)(Cart);