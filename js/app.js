"use strict";

const products = [1, 2, 3, 4, 5];

function ProductsList(props){

	const list = props.products.map((product) =>
		<div>{product}</div>
	);

	return <div>{list}</div>;
}

ReactDOM.render(
	<ProductsList products={products} />,
	document.getElementById('productsList')
);