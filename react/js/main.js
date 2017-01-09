const { Router, Route, IndexRoute, IndexLink, Link } = ReactRouter;
const hashHistory = Router.hashHistory;

const http = {
	ajaxSpinner: function (status) {
		$('body').toggleClass('loading', status);
	},
	cache: {},
	load: function (path, params, callback) {

		var _this = this,
			cacheKey = path + $.param(params);

		if (this.cache[cacheKey] !== undefined) {
			callback(this.cache[cacheKey]);
			return false;
		}

		$.ajax({
			url: path,
			type: 'get',
			dataType: 'text',
			data: params,
			beforeSend: function () {
				_this.ajaxSpinner(true);
			},
			complete: function () {
				_this.ajaxSpinner(false);
			},
			success: function (response) {
				_this.cache[cacheKey] = response;
				callback(response);
			},
			error: function (e) {
				if (e.status === 404) {
					render.page('notFound');
				}
			}
		});
	},
	getJSON: function (path, params, callback) {

		this.load(path, params, function (response) {
			callback(JSON.parse(response));
		});
	}
};

const rules = [
	{key: "name", title: "Alphabetical"},
	{key: "age", title: "Newest"}
];

const Cart = React.createClass({

	getAll: function () {

		var res = [];

		$.each(localStorage, function (key, el) {
			res.push(JSON.parse(el));
		});

		return res;
	},
	quantity: function () {
		let products = this.state.products;
		return Object.keys(products).length;
	},
	price: function () {

		let products = this.state.products,
			sum = 0;

		$.each(products, function (k, phone) {
			sum += (phone.price || 135);
		});

		return sum;
	},
	add: function (e) {

		let phone = e.data;
		localStorage.setItem(phone.id, JSON.stringify(phone));
		this.update();
	},
	update: function () {

		let products = this.getAll();

		this.setState({
			products: products,
			quantity: this.quantity(),
			price: this.price(),
		});
	},
	getInitialState: function () {

		return {
			products: this.getAll(),
			quantity: 0,
			price: 0,
		}
	},
	componentDidMount: function () {
		document.addEventListener(
			'addToCart',
			this.add.bind(this),
			false
		);
		this.update();
	},
	componentWillUnmount: function () {
		document.removeEventListener('addToCart');
	},
	show: function (e) {
		ReactRouter.hashHistory.push('cart');
	},
	render: function () {

		let cart = this.state;
		return (
			<div className="cart pull-right" onClick={this.show}>
				<table className="cart-options">
					<tr>
						<td>Qtt:</td>
						<td className="cart-option-value quantity">{cart.quantity}</td>
					</tr>
					<tr>
						<td>Price:</td>
						<td className="cart-option-value price">{cart.price}$</td>
					</tr>
				</table>
			</div>
		);
	}
});

const Product = React.createClass({

	getInitialState: function () {
		return {phone: {}};
	},

	componentWillMount: function () {

		let path = '../data/'+this.props.params.productId+'.json',
			_this = this;

		http.getJSON(path, {}, function (_phone) {
			_this.setState({phone: _phone});
		});
	},

	componentDidMount: function () {

		let fancyGalleryBlock =
			`<div className="fancybox-container" role="dialog">
				<div className="quick-view-content">
					<div className="quick-view-carousel">
						<div className="fancybox-slider-wrap">
							<ul className="fancybox-slider"></ul>
						</div>
					</div>
					<div className="quick-view-aside"></div>
					<button data-fancybox-close className="quick-view-close">X</button>
				</div>
			</div>`;

		$(".quick_view").fancybox({

			mainClass	: 'quick-view-container',
			infobar		: false,
			buttons		: false,
			thumbs		: false,
			margin      : 0,
			touch       : {
				vertical : false
			},
			mainTpl     : fancyGalleryBlock,

			onInit : function( instance ) {

				// Create bullet navigation links
				var bullets = '<ul className="quick-view-bullets">';

				instance.group.map(function (i) {
					bullets += '<li><a data-index="' + i + '" href="javascript:;"><span>' + ( i + 1 ) + '</span></a></li>';
				});

				bullets += '</ul>';

				$( bullets ).on('click touchstart', 'a', function() {

					var index = $(this).data('index');

					$.fancybox.getInstance(function() {
						this.jumpTo( index );
					});

				}).appendTo( instance.$refs.container.find('.quick-view-carousel') );

				// Add product form
				var $element = instance.group[ instance.currIndex ].opts.$orig,
					form_id = $element.data('qw-form');

				instance.$refs.container
					.find('.quick-view-aside')
					.append( $( '#' + form_id )
						.clone( true )
						.removeClass('hidden') );
			},

			beforeMove : function( instance ) {
				/* Set active current navigation link */
				instance.$refs.container
					.find('.quick-view-bullets').children()
					.removeClass('active').eq( instance.currIndex )
					.addClass('active');
			}

		});
	},

	addToCartHandler: function (phone) {

		const event = new Event('addToCart');
		event.data = phone;
		document.dispatchEvent(event);
	},

	render: function () {

		if(this.state.phone.id === undefined){
			return <div>Loading...</div>
		}

		let phone = this.state.phone,
			img = '../images/' + phone.images[0],
			thumbnails = phone.images.map(img =>
				<a data-fancybox="gallery" className="fancybox thumbnail" href={'http://angular.github.io/angular-phonecat/step-13/app/img/phones/'+img}>
					<img src={'http://angular.github.io/angular-phonecat/step-13/app/img/phones/'+img} />
				</a>
			),
			gallery = phone.images.map(img =>
				<a className="quick_view" data-fancybox="qw1" href={'http://angular.github.io/angular-phonecat/step-13/app/img/phones/'+img}>#</a>
			);

		return (
			<div>
				<div className="row">
					<div className="col-md-6">
						<a href={img} className="quick_view" data-fancybox="qw1" data-qw-form="qw-form-1">
							<img src={img} alt={phone.name} />
						</a>
					</div>
					<div className="col-md-6 info">
						<h1>{phone.name}</h1>
						<p>{phone.description}</p>
						<table className="product-table">
							<tr>
								<td>
									<label for="qtt">Qtt:
										<input type="number" id="qtt" className="product-quantity" value="1" />
									</label>
								</td>
								<td>
									<strong>Price: 123.00$</strong>
								</td>
							</tr>
							<tr>
								<td>
									<a href="javascript:" className="btn product-buy" onClick={this.addToCartHandler.bind(this, phone)}>Add to cart</a>
								</td>
							</tr>
						</table>
						<span className="hidden">
							{gallery}
						</span>
						<div id="qw-form-1" className="hidden">
							<h3>{phone.name}</h3>
							<p>{phone.description}</p>
							<p>
								<button className="btn" onClick={this.addToCartHandler.bind(this, phone)}>Add to cart</button>
							</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 product-thumbnails">
						{thumbnails}
					</div>
				</div>
			</div>
		);
	}
});

const Products = React.createClass({

	getInitialState: function() {
		return {products: []};
	},

	componentWillMount: function() {

		var _this = this;
		http.getJSON('../data/phones.json', {}, function (_products) {
			_this.setState({products: _products});
		});
	},
	
	render: function(){

		var list = this.state.products.map((phone) =>
			<div id={phone.id} className="phone">
				<Link to={'/product/'+phone.id}>
					<strong>{phone.name}</strong>
					<img src={'../images/'+phone.imageUrl} alt={phone.name} />
				</Link>
			</div>
		);

		return <div>{list}</div>;
	}
});

const Navigation = React.createClass({

	render: function () {
		return (
			<ul className="nav navbar-nav">
				<li><a href="#/">Home</a></li>
				<li><a href="#/delivery">Delivery</a></li>
				<li><a href="#/contact">Contact</a></li>
			</ul>
		);
	}
});

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

const App = React.createClass({

	// constructor(props){
	//
	// 	super(props);
	//
	// 	console.info("products: ", this.props.products);
	//
	// 	this.props.products = this.sort(this.props.products, rules[0].key);
	// 	this.state = {products: this.props.products};
	//
	// 	this.handleSort = this.handleSort.bind(this);
	// 	this.handleFilter = this.handleFilter.bind(this);
	// }
	//
	// sort(data, key){
	// 	return data.sort(function(a, b) {
	// 		if (a[key] > b[key]) return 1;
	// 		if (a[key] < b[key]) return -1;
	// 		return 0;
	// 	});
	// }
	//
	// handleFilter(e){
	//
	// 	let q = e.target.value.toLowerCase();
	// 	let products = this.props.products.filter(function(product){
	// 		return product.name.toLowerCase().indexOf(q) > -1;
	// 	});
	//
	// 	this.setState({
	// 		products: products
	// 	});
	// }
	//
	// handleSort(e){
	//
	// 	let key = e.target.value,
	// 		products = this.props.products = [];
	//
	// 	this.setState({
	// 		products: this.sort(products, key)
	// 	});
	// }

	render: function(){
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
							<Navigation />
							<Search updateFilter={this.handleFilter} />
							<Cart />
							<Sort updateSort={this.handleSort} rules={rules} />
						</div>
					</div>
				</nav>
				<Router history={hashHistory}>
					<Route path="/" component={Products}></Route>
					<Route path="/delivery" component={window.Delivery}></Route>
					<Route path="/contact" component={window.Contact}></Route>
					<Route path="/cart" component={window.Cart} ></Route>
					<Route path="/product/:productId" component={Product}></Route>
				</Router>
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.querySelector('#store')
);