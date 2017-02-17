import React from 'react';
import {connect} from 'react-redux';
import { Router, Route, hashHistory, Link } from 'react-router';

let Purchase = React.createClass({

	render: function () {

		let phone = this.props.phone;

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
					<button type="button" onClick={this.props.onDeleteProduct.bind(this, phone)}>Delete</button>
				</td>
				<td>
					Price: {phone.price || 135}$
				</td>
			</tr>
		)
	}
});

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		onDeleteProduct: (id) => {
			dispatch({
				type: 'DELETE',
				id: id
			});
		}
	})
)(Purchase);