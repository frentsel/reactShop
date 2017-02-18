import React from 'react';
import Purchase from './Purchase.jsx';
import {connect} from 'react-redux';
import { Router, Route, hashHistory, Link } from 'react-router';

const CheckoutPage = React.createClass({

	sendForm: function (e) {

		e.preventDefault();

		hashHistory.push({
			pathname: '/info',
			query: {
				name: e.target.name.value,
				// email: e.target.name.email,
				// phone: e.target.name.phone,
				status: true
			}
		});
	},

	render: function () {

		let products = this.props.store;
		let price = products.reduce(function (res, phone) {
			res += (phone.price || 135);
			return res;
		}, 0);
		let purchases = products.map((product, index) =>
				<Purchase phone={product} key={index} />
			) || [];

		return (
			<div>
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
					<li className="breadcrumb-item"><Link to={'/cart'}>Shopping Cart</Link></li>
					<li className="breadcrumb-item active">Checkout</li>
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
								<div>Total price: <span className="price">{price}</span>$</div>
							</td>
						</tr>
						<tr>
							<td colSpan="5">
								<form className="form-horizontal" onSubmit={this.sendForm.bind(this)}>
									<div className="form-group">
										<label className="col-sm-2 control-label">Email</label>
										<div className="col-sm-10">
											<input type="email" className="form-control" name="email" placeholder="Email" required />
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-2 control-label">Name</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" name="name" placeholder="Name" />
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-2 control-label">Phone</label>
										<div className="col-sm-10">
											<input type="tel" className="form-control" name="phone" placeholder="Phone" />
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
	})
)(CheckoutPage);