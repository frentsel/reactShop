import React from 'react';
import {connect} from 'react-redux';
import { Router, Route, hashHistory, Link } from 'react-router';

let Purchase = ({ phone, deleteProduct }) => {

	return (
		<tr>
			<td>
				<Link to={'/product/'+phone.id} className="thumbnail">
					<img src={'../images/'+phone.images[0]} alt={phone.name} />
				</Link>
			</td>
			<td>{phone.name}</td>
			<td>
				<input type="number" value="1" readOnly />
				<button type="button" onClick={deleteProduct.bind(this, phone)}>Delete</button>
			</td>
			<td>
				Price: {Number(phone.price).toFixed(2)}$
			</td>
		</tr>
	)
}

export default connect(
	state => ({
		store: state.purchases
	}),
	dispatch => ({
		deleteProduct: (phone) => {
			dispatch({
				type: 'DELETE_FORM_CART',
				id: phone.id
			});
		}
	})
)(Purchase);