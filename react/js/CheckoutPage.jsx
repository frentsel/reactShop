import React from 'react';
import Purchase from './Purchase.jsx';
import {connect} from 'react-redux';
import { Router, Route, hashHistory, Link } from 'react-router';

const CheckoutPage = ({ purchases }) => {

	const sendForm = (e) => {

		e.preventDefault();

		const key = new Date().getTime();
		const order = {
			date: new Date().toLocaleString(),
			name: e.target.name.value,
			email: e.target.email.value,
			phone: e.target.phone.value,
			purchases: JSON.stringify(purchases)
		};

		hashHistory.push({
			pathname: '/info',
			query: {
				name: order.name
			}
		});

		localStorage.setItem(`Order № ${key}`, JSON.stringify(order));
	};

	let price = purchases.reduce((res, phone) => {
		res += phone.price;
		return res;
	}, 0).toFixed(2);

	let _purchases = purchases.map((product, index) =>
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
					{_purchases}
					<tr>
						<td colSpan="2">&nbsp;</td>
						<td>
							<div>Total count: <span className="quantity">{purchases.length}</span></div>
						</td>
						<td>
							<div>Total price: <span className="price">{price}</span>$</div>
						</td>
					</tr>
					<tr>
						<td colSpan="5">
							<form className="form-horizontal" onSubmit={sendForm}>
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
};

export default connect(
	state => ({
		purchases: state.purchases
	})
)(CheckoutPage);