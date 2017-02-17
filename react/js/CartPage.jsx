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
						type: 'CLEAR'
					});
				}
			});
		}
	})
)(CartPage);