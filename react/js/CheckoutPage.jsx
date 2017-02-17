import React from 'react';
import Purchase from './Purchase.jsx';
import {connect} from 'react-redux';
import { Router, Route, hashHistory, Link } from 'react-router';

const CheckoutPage = React.createClass({

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
				<h1>Checkout</h1>
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
								<form className="form-horizontal">
									<div className="form-group">
										<label className="col-sm-2 control-label">Email</label>
										<div className="col-sm-10">
											<input type="email" className="form-control" name="email" placeholder="Email" required />
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-2 control-label">Name</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" name="name" placeholder="Name" required />
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-2 control-label">Phone</label>
										<div className="col-sm-10">
											<input type="tel" className="form-control" name="phone" placeholder="Phone" required />
										</div>
									</div>
									<div className="form-group">
										<div className="col-sm-offset-2 col-sm-10">
											<button type="submit" className="btn btn-default">Send order</button>
										</div>
									</div>
								</form>
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
	})
)(CheckoutPage);