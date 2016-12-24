"use strict";

const rules = [
	{key: "name", title: "Alphabetical"},
	{key: "age", title: "Newest"},
	{key: "carrier", title: "Carrier"},
];

function Product (props) {
	return (
		<div id={props.phone.id} className="phone">
			<strong>{props.phone.name}</strong>
			<img src={props.phone.imageUrl} alt={props.phone.name}/>
		</div>
	)
}

function Search(props) {
	return (
		<form className="navbar-form navbar-left">
			<div className="form-group">
				<input type="text" className="form-control" placeholder="Search" onInput={props.updateFilter} />
			</div>
		</form>
	);
}

class Sort extends React.Component {

	constructor (props) {
		super(props);
		this.rules = props.rules;
	}

	render(){

		let rules = this.rules.map((rule) => <option value={rule.key}>{rule.title}</option>);

		return (
			<div className="sortBy pull-right">
				<div className="pull-left">Sort by:&nbsp;</div>
				<div className="pull-left">
					<select onChange={this.props.updateSort}>{rules}</select>
				</div>
			</div>
		)
	}
}

class Pages extends React.Component {

	constructor(props) {

		super(props);

		this.pages = [
			{path: "#!/", title: "Home"},
			{path: "#!/delivery", title: "Delivery"},
			{path: "#!/contact", title: "Contact"},
		];

		this.state = {path: 'home'};
		this.setPage = this.setPage.bind(this);
	}

	setPage(e){
		this.setState({page: e.target});
	}

	render(){

		var pages = this.pages.map(page =>
			<li><a href={page.path} onClick={this.setPage}>{page.title}</a></li>
		);

		return (
			<ul className="nav navbar-nav">
				{pages}
			</ul>
		);
	}
}

class Store extends React.Component {

	constructor(props){

		super(props);

		this.state = {products: this.props.products};

		this.handleSort = this.handleSort.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
	}

	handleFilter(e){

		let q = e.target.value.toLowerCase();
		let products = this.props.products.filter(function(product){
			return product.name.toLowerCase().indexOf(q) > -1;
		});

		this.setState({
			products: products
		});
	}

	handleSort(e){

		let key = e.target.value;
		let products = this.state.products.sort(function(a, b) {
			if (a[key] > b[key]) return 1;
			if (a[key] < b[key]) return -1;
			return 0;
		});

		this.setState({
			products: products
		});
	}

	render(){

		let products = this.state.products.map((product) => <Product phone={product} />);

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
							<Search updateFilter={this.handleFilter} />
							<Sort updateSort={this.handleSort} rules={rules} />
						</div>
					</div>
				</nav>
				<div>
					{products}
				</div>
			</div>
		);
	}
}

$.getJSON('js/phones.json', {}, function (products) {

	ReactDOM.render(
		<Store products={products} />,
		document.getElementById('store')
	);
});