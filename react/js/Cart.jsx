import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import {connect} from 'react-redux';

const Cart = ({ purchases }) => {

	const showCart = () => hashHistory.push('cart');

	let price = purchases.reduce((res, phone) => {
		res += phone.price;
		return res;
	}, 0);

	price = price.toLocaleString('en-US', {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2
	});

	return (
		<div className="cart pull-right" onClick={showCart}>
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
};

export default connect(
	state => ({
		purchases: state.purchases
	}),
)(Cart);