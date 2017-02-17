import React from 'react';
import Purchases from './Purchases.jsx';

const CartPage = React.createClass({

	render: function () {
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

export default CartPage;