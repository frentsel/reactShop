"use strict";

var filters = [
	{key: "name", title: "Alphabetical"},
	{key: "age", title: "Newest"}
];

class Filter extends React.Component {

	constructor (props) {
		super(props);
		this.filters = props.filters;
	}

	render(){

		let filtersList = this.filters.map((filter) => <option value={filter.key}>{filter.title}</option>);

		return (
			<div className="sortBy pull-right">
				<div className="pull-left">Sort by:&nbsp;</div>
				<div className="pull-left">
					<select onChange={this.props.updateFilter}>{filtersList}</select>
				</div>
			</div>
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

class Pages extends React.Component {

	constructor(props) {

		super(props);

		this.pages = [
			{path: "home", title: "Home"},
			{path: "delivery", title: "Delivery"},
			{path: "contact", title: "Contact"},
		];
		this.state = {path: 'home'};
		this.setPage = this.setPage.bind(this);
	}

	setPage(e){

		console.info("page this: ", this);
		console.info("page e: ", e);

		this.setState({page: e.target});
	}

	render(){

		var pages = this.pages.map(page =>
			<li><a href="#/{page.path}" onClick={this.setPage}>{page.title}</a></li>
		);

		return (
			<ul className="nav navbar-nav">
				{pages}
			</ul>
		);
	}
}

class Search extends React.Component {

	constructor(props) {

		super(props);

		this.state = {q: ''};
		this.search = this.search.bind(this);
	}

	search(e){

		console.info("q: ", e.target.value.toLowerCase());

		this.setState({q: e.target.value.toLowerCase()});
	}

	render(){
		return (
			<form className="navbar-form navbar-left">
				<div className="form-group">
					<input type="text" className="form-control" placeholder="Search" value={this.state.q} onInput={this.search} />
				</div>
			</form>
		);
	}
}

class Store extends React.Component {

	constructor(props){

		super(props);

		this.state = {products: this.props.products};
		this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
	}

	handleFilterUpdate(e){

		console.info("handleFilterUpdate: ", e.target.value);

		const products = this.props.products.filter(product => {
			return product.age == e.target.value;
		});

		this.setState({
			products: products
		});

		console.info("products: ", products);
	}

	render(){

		return (
			<div>
				<nav className="navbar navbar-default">
					<div className="container-fluid">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<a className="navbar-brand" href="#/">ReactJS Shop</a>
						</div>
						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<Pages />
							<Search />
							<Filter updateFilter={this.handleFilterUpdate} filters={filters} />
						</div>
					</div>
				</nav>
				<ProductsList products={this.state.products} />
			</div>
		);
	}
}

$.getJSON('js/phones.json',{},function (products) {

	ReactDOM.render(
		<Store products={products} />,
		document.getElementById('store')
	);
});