import React from 'react';
import {connect} from 'react-redux';

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
		const deleteHandler = this.props.onDelete.bind(this, product);

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

	render: function () {

		const products = this.props.store;
		const deleteProduct = (index) => {
			this.props.onDeleteProduct(index);
			this.props.getAll();
		};

		let purchases = products.map((product, index) => {
			return <Purchase product={product} key={product.id} onDelete={deleteProduct.bind(this, index)} />;
		}) || [];

		let Table = (
			<table className="products-table">
				<thead>
				{purchases}
				<tr>
					<td colSpan="2">&nbsp;</td>
					<td>
						<div>Total count: <span className="quantity">{products.length}</span></div>
					</td>
					<td>
						<div>Total price: <span className="price">{135}</span>$</div>
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

		return (this.props.store.length) ? Table : <InfoBlock />;
	}
});

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		getAll: () => {
			dispatch({
				type: 'GET_ALL'
			});
		},
		onDeleteProduct: (id) => {
			dispatch({
				type: 'DELETE',
				id: id
			});
		}
	})
)(Purchases);