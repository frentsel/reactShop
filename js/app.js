"use strict";

class Product extends React.Component {

	constructor (props) {

		super(props);
		this.phone = props.phone;
	}

	handler(e){
		console.info(e.target);
	}

	render(){
		return (
			<div id={this.phone.id} className="phone" onClick={this.handler}>
				<strong>{this.phone.name}</strong>
				<img src={this.phone.imageUrl} alt={this.phone.name}/>
				{/*<p>{this.phone.snippet}</p>*/}
			</div>
		)
	}
}

function ProductsList(props){

	const list = props.products.map((product) => <Product phone={product}/>);
	return <div>{list}</div>;
}


$.getJSON('js/phones.json',{},function (products) {

	ReactDOM.render(
		<ProductsList products={products} />,
		document.getElementById('productsList')
	);
});