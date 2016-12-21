"use strict";

var filters = [
	{key: "name", title: "Alphabetical"},
	{key: "age", title: "Newest"}
];

class Sorting extends React.Component {

	constructor (props) {

		super(props);
		this.filters = props.filters;
		this.handler = this.handler.bind(this);
	}

	handler(e){
		console.info(this);
	}

	render(){

		let filtersList = this.filters.map((filter) => <option value={filter.key}>{filter.title}</option>);

		return (
			<select onChange={this.handler}>{filtersList}</select>
		)
	}
}

class Product extends React.Component {

	constructor (props) {

		super(props);
		this.phone = props.phone;
		this.handler = this.handler.bind(this);
	}

	handler(e){
		console.info(this);
		window.location.hash = '#/product/'+this.phone.id;
	}

	render(){
		return (
			<div id={this.phone.id} className="phone" onClick={this.handler}>
				<strong>{this.phone.name}</strong>
				<img src={this.phone.imageUrl} alt={this.phone.name}/>
			</div>
		)
	}
}

function ProductsList(props){

	const list = props.products.map((product) => <Product phone={product}/>);
	return <div>{list}</div>;
}


ReactDOM.render(
	<Sorting filters={filters} />,
	document.getElementById('sortBy')
);

$.getJSON('js/phones.json',{},function (products) {

	ReactDOM.render(
		<ProductsList products={products} />,
		document.getElementById('productsList')
	);
});