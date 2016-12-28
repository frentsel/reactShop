"use strict";

const rules = [
	{key: "name", title: "Alphabetical"},
	{key: "age", title: "Newest"}
];

function Product (props) {
	return (
		<div id={props.phone.id} className="phone">
			<strong>{props.phone.name}</strong>
			<img src={props.phone.imageUrl} alt={props.phone.name}/>
		</div>
	)
}

class Search extends React.Component {

	constructor (props) {
		super(props);
		this.props = props;
		this.state = {search: ''};

		this.searchHandle = this.searchHandle.bind(this);
	}

	searchHandle(e){
		this.setState({
			search: e.target.value
		});
		this.props.updateFilter(e);
	}

	render(){
		return (
			<form className="navbar-form navbar-left">
				<div className="form-group">
					<input type="text" className="form-control" placeholder="Search" value={this.state.search} onInput={this.searchHandle} />
				</div>
			</form>
		);
	}
}

class Sort extends React.Component {

	constructor (props) {
		super(props);

		this.rules = props.rules;
		this.state = {sort: null};

		this.sortHandle = this.sortHandle.bind(this);
	}

	sortHandle(e){
		this.setState({
			sort: e.target.value
		});
		this.props.updateSort(e);
	}

	render(){

		let rules = this.rules.map((rule) => <option value={rule.key}>{rule.title}</option>);

		return (
			<div className="sortBy pull-right">
				<div className="pull-left">Sort by:&nbsp;</div>
				<div className="pull-left">
					<select onChange={this.sortHandle} value={this.state.sort}>{rules}</select>
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

		let products = this.props.products;

		products = this._Sort(products, rules[0].key);
		this.state = {products: products};

		this.handleSort = this.handleSort.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
	}

	_Sort(data, key){
		return data.sort(function(a, b) {
			if (a[key] > b[key]) return 1;
			if (a[key] < b[key]) return -1;
			return 0;
		});
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

		let key = e.target.value,
			products = this.props.products;

		this.setState({
			products: this._Sort(products, key)
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

$.getJSON('data/phones.json', {}, function (products) {

	ReactDOM.render(
		<Store products={products} />,
		document.querySelector('#store')
	);
});