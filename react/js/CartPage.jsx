import React from 'react';
import Purchase from './Purchase.jsx';
import {connect} from 'react-redux';
import { Router, Route, hashHistory, Link } from 'react-router';

const CartPage = React.createClass({

	render: function () {

		let products = this.props.store;
		let purchases = products.map((product, index) =>
				<Purchase phone={product} key={product.id} />
			) || [];

		return (
			<div>
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
					<li className="breadcrumb-item active">Shopping Cart</li>
				</ol>
				<h1>Shopping cart</h1>
				{purchases.length ?
					(<table className="products-table">
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
								<button className="btn inverse" onClick={this.props.onClear.bind(this)}>Clear</button>
								<Link className="btn" to={'/checkout'}>Checkout</Link>
							</td>
						</tr>
						</thead>
					</table>)
					:
					(<div className="alert alert-info alert-dismissible" role="alert">
						<button type="button" className="close" dataDismiss="alert" ariaLabel="Close"><span ariaHidden="true">×</span></button>
						Your shopping cart is empty.
					</div>)
				}
			</div>
		);
	}
});

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		onClear: () => {
			dispatch({
				type: 'CLEAR'
			});
		}
	})
)(CartPage);