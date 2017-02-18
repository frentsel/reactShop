import React from 'react';
import { Router, Route, hashHistory, Link } from 'react-router';

const Delivery = function() {
	return (
		<div>
			<ol className="breadcrumb">
				<li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
				<li className="breadcrumb-item active">Delivery</li>
			</ol>
			<h1>Delivery page</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae dolor eaque error eum explicabo facere illum itaque minima necessitatibus nihil pariatur placeat porro quia reiciendis, rerum. Assumenda eos ex incidunt labore natus praesentium quis, ratione temporibus voluptas.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur id mollitia repellendus, sequi similique ullam ut voluptatum! Aspernatur atque cum, dolorum esse et exercitationem ipsam itaque nostrum praesentium, quisquam rem vitae. Cum dignissimos ducimus natus repellendus sapiente.</p>
		</div>
	);
};

export default Delivery;