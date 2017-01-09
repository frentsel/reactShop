import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

const Cart = React.createClass({

	getAll: function () {

		var res = [];

		$.each(localStorage, function (key, el) {
			res.push(JSON.parse(el));
		});

		return res;
	},
	quantity: function () {
		let products = this.state.products;
		return Object.keys(products).length;
	},
	price: function () {

		let products = this.state.products,
			sum = 0;

		$.each(products, function (k, phone) {
			sum += (phone.price || 135);
		});

		return sum;
	},
	add: function (e) {

		let phone = e.data;
		localStorage.setItem(phone.id, JSON.stringify(phone));
		this.update();
	},
	update: function () {

		let products = this.getAll();

		this.setState({
			products: products,
			quantity: this.quantity(),
			price: this.price(),
		});
	},
	getInitialState: function () {

		return {
			products: this.getAll(),
			quantity: 0,
			price: 0,
		}
	},
	componentDidMount: function () {
		document.addEventListener(
			'addToCart',
			this.add.bind(this),
			false
		);
		this.update();
	},
	componentWillUnmount: function () {
		document.removeEventListener('addToCart');
	},
	show: function (e) {
		hashHistory.push('cart');
	},
	render: function () {

		let cart = this.state;
		return (
			<div className="cart pull-right" onClick={this.show}>
				<table className="cart-options">
					<tbody>
						<tr>
							<td>Qtt:</td>
							<td className="cart-option-value quantity">{cart.quantity}</td>
						</tr>
						<tr>
							<td>Price:</td>
							<td className="cart-option-value price">{cart.price}$</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});

export default Cart