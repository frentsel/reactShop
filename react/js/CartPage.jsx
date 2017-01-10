import React from 'react';

const InfoBlock = function () {
	return (
		<div className="alert alert-info alert-dismissible" role="alert">
			<button type="button" className="close" dataDismiss="alert" ariaLabel="Close"><span ariaHidden="true">×</span></button>
			Your shopping cart is empty.
		</div>
	);
};

const Purchase = React.createClass({

	render: function () {

		const product = this.props.product;
		const deleteHandler = this.props.onDelete.bind(null, product);

		return (
			<tr>
				<td>
					<a href="#!/product/id" className="thumbnail">
						<img src={'../images/'+product.images[0]} alt={product.name} />
					</a>
				</td>
				<td>{product.name}</td>
				<td>
					<input type="number" value="1" readOnly />
					<button type="button" onClick={deleteHandler}>Delete</button>
				</td>
				<td>
					Price: {product.price || 135}$
				</td>
			</tr>
		)
	}
});

const Purchases = React.createClass({

	getAll: function () {

		var res = [];

		$.each(localStorage, function (key, el) {
			res.push(JSON.parse(el));
		});

		return res;
	},
	update: function () {

		let products = this.getAll();

		this.setState({
			quantity: products.length,
			price: this.getPrice(products),
			purchases: products,
		});
	},
	getPrice: function (products) {

		return products.reduce(function (sum, el) {
			return sum += (el.price || 135);
		}, 0);
	},
	delete: function (product) {

		localStorage.removeItem(product.id);
		this.update();

		const event = new Event('updateCart');
		document.dispatchEvent(event);
	},
	getInitialState: function () {
		return {
			quantity: 0,
			price: 0,
			purchases: [],
		}
	},
	componentDidMount: function () {
		this.update();
	},
	render: function () {

		let purchases = this.state.purchases.map(product =>
			<Purchase product={product} key={product.id} onDelete={this.delete} />
		) || [];

		let Table = (
			<table className="products-table">
				<thead>
				{purchases}
				<tr>
					<td colSpan="2">&nbsp;</td>
					<td>
						<div>Total count: <span className="quantity">{this.state.quantity}</span></div>
					</td>
					<td>
						<div>Total price: <span className="price">{this.state.price}</span>$</div>
					</td>
				</tr>
				<tr>
					<td colSpan="5">
						<button className="btn inverse">Clear</button>
						<a className="btn" href="#!/checkout">Checkout</a>
					</td>
				</tr>
				</thead>
			</table>
		);

		return (this.state.purchases.length) ? Table : <InfoBlock />;
	}
});

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

export default CartPage