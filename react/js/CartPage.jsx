import React from 'react';
import Purchase from './Purchase.jsx';
import {connect} from 'react-redux';
import { Router, Route, hashHistory, Link } from 'react-router';

const CartPage = React.createClass({

	render: function () {

		let _purchases = this.props.store;
		let price = _purchases.reduce(function (res, phone) {
			res += (phone.price || 135);
			return res;
		}, 0);
		let purchases = _purchases.map((product, index) =>
				<Purchase phone={product} key={index} />
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
								<div>Total count: <span className="quantity">{_purchases.length}</span></div>
							</td>
							<td>
								<div>Total price: <span className="price">{Number(price).toFixed(2)}</span>$</div>
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
						Your shopping cart is empty.
					</div>)
				}
			</div>
		);
	}
});

export default connect(
	state => ({
		store: state.purchases
	}),
	dispatch => ({
		onClear: () => {

			var confirm = `<div class="my_dialog">
								<h3>Are you sure?</h3>
								<p>By the way, there are many possibilities for modal dialog to appear using CSS transitions.</p>
								<p class="tright">
									<a data-value="0" data-fancybox-close>Cancel</a>
									<button data-value="1" data-fancybox-close class="btn">Ok</button>
								</p>
							</div>`;

			$.fancybox.open(confirm, {
				smallBtn   : false,
				buttons    : false,
				keyboard   : false,
				afterClose : function( instance, e ) {

					var button = e ? e.target || e.currentTarget : null;

					if(!$(button).data('value')) {
						return false;
					}

					dispatch({
						type: 'CLEAR_CART'
					});
				}
			});
		}
	})
)(CartPage);