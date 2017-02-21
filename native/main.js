"use strict";

var App = {
	store: {},
	current: {},
	products: {},
	cart: {
		add: function () {
			App.store.dispatch('ADD', App.current);
		},
		remove: function (id) {

			var products = App.store.getState();
			var index = 0;

			products.forEach(function (el, n) {
				if(el.id === id) index = n;
			});

			App.store.dispatch('DELETE', index);
		},
		update: function () {

			var products = App.store.getState();
			var price = products.reduce(function (res, el) {
				res += el.price;
				return res;
			}, 0);

			$('.quantity').text(products.length);
			$('.price').text(price.toLocaleString('en-US', {
				maximumFractionDigits: 2,
				minimumFractionDigits: 2
			}));
		},
		clear: function () {

			var confirm = $('#clearConfirm').html(),
				_this = this;

			$.fancybox.open(confirm, {
					smallBtn   : false,
					buttons    : false,
					keyboard   : false,
					afterClose : function( instance, e ) {

						var button = e ? e.target || e.currentTarget : null;

						if(!$(button).data('value')) {
							return false;
						}

						App.store.dispatch('CLEAR');
					}
				});
		}
	},
	render: {
		page: function (page, data) {

			App.http.get('templates/'+page+'.html')
				.then(function (html) {
					$('#content').html(Handlebars.compile(html)(data));
				});
		},
		product: function (data) {

			App.http.get('templates/product.html')
				.then(function (html) {

					$('#content').html(Handlebars.compile(html)(data));

					$(".quick_view").fancybox({

						mainClass: 'quick-view-container',
						infobar: false,
						buttons: false,
						thumbs: false,
						margin: 0,
						touch: {
							vertical: false
						},
						mainTpl: $('#demoProduct').html(),

						onInit: function (instance) {

							// Create bullet navigation links
							var bullets = '<ul class="quick-view-bullets">';

							instance.group.map(function (i) {
								bullets += '<li><a data-index="' + i + '" href="javascript:;"><span>' + ( i + 1 ) + '</span></a></li>';
							});

							bullets += '</ul>';

							$(bullets).on('click touchstart', 'a', function () {

								var index = $(this).data('index');

								$.fancybox.getInstance(function () {
									this.jumpTo(index);
								});

							}).appendTo(instance.$refs.container.find('.quick-view-carousel'));

							// Add product form
							var $element = instance.group[instance.currIndex].opts.$orig,
								form_id = $element.data('qw-form');

							instance.$refs.container
								.find('.quick-view-aside')
								.append($('#' + form_id)
									.clone(true)
									.removeClass('hidden'));
						},

						beforeMove: function (instance) {
							/* Set active current navigation link */
							instance.$refs.container
								.find('.quick-view-bullets').children()
								.removeClass('active').eq(instance.currIndex)
								.addClass('active');
						}

					});
				});
		}
	},
	http: {
		ajaxSpinner: function (status) {
			$('body').toggleClass('loading', status);
		},
		cache: {},
		getJSON: function (path, params) {
			return this.get(path, params, 'json');
		},
		get: function (path, _params, _type) {

			var _this = this,
				params = _params || {},
				type = _type || 'text',
				cacheKey = path + $.param(params);

			return new Promise(function (resolve, reject) {

				if(_this.cache[cacheKey] !== undefined) {
					resolve(_this.cache[cacheKey]);
					return false;
				}

				$.ajax({
					url: path,
					type: 'get',
					dataType: type,
					data: params,
					beforeSend: function() {
						_this.ajaxSpinner(true);
					},
					complete: function(){
						_this.ajaxSpinner(false);
					},
					success: function (response) {
						_this.cache[cacheKey] = response;
						resolve(type === 'json' ? (response) : response);
					},
					error: function (e) {
						reject(e);
						console.error(arguments);
					}
				});
			});
		}
	},
	handler: {
		sort: function (obj) {

			// if not index page
			if(window.location.hash !== '#!/') return false;

			var key = obj.value.toLowerCase();
			var result = App.products.sort(function(a, b) {
				if (a[key] > b[key]) return 1;
				if (a[key] < b[key]) return -1;
				return 0;
			});

			App.render.page('index', {products: result});
		},
		filter: function (obj) {

			// if not index page
			if(window.location.hash !== '#!/') return false;

			var query = obj.value.toLowerCase();
			var result = App.products.filter(function (product) {
				return product.name.toLowerCase().indexOf(query) > -1;
			});

			App.render.page('index', {products: result});
		},
		index: function () {

			App.http.getJSON('../data/phones.json')
				.then(function (products) {
					App.products = products;
					App.render.page('index', {products: products});
				});
		},
		delivery: function () {
			App.render.page('delivery');
		},
		contact: function () {
			App.render.page('contact');
		},
		info: function () {
			App.render.page('info');
		},
		checkout: function () {

			if(window.location.hash !== '#!/checkout') return false;

			var products = App.store.getState();

			if(!products.length) {
				eRouter.set('cart');
				return false;
			}

			var price = products.reduce(function (res, el) {
				res += el.price;
				return res;
			}, 0);

			App.render.page('checkout', {
				products: products,
				quantity: products.length,
				price: price
			});
		},
		cart: function () {

			if(window.location.hash !== '#!/cart') return false;

			var products = App.store.getState();
			var price = products.reduce(function (res, el) {
				res += el.price;
				return res;
			}, 0);

			App.render.page('cart', {
				products: products,
				quantity: products.length,
				price: price
			});
		},
		sendOrder: function (obj) {

			var products = App.store.getState(),
				form = $(obj).serializeArray();

			const key = new Date().getTime();
			const order = {
				user: JSON.stringify(form),
				purchases: JSON.stringify(products)
			};

			localStorage.setItem('Order № '+key, JSON.stringify(order));

			App.store.dispatch('CLEAR');
			eRouter.set('info');
			return false;
		},
		product: function (id) {

			App.http.getJSON('../data/' + id + '.json')
				.then(function (product) {
					App.render.product(product);
					App.current = product;
				});
		},
		notFound: function () {
			App.render.page('notFound');
		}
	},
	init: function () {

		Handlebars.registerHelper('currency', function(price) {
			return Number(price).toLocaleString('en-US', {
				maximumFractionDigits: 2,
				minimumFractionDigits: 2
			});
		});

		var _this = this;
		var initialState = [];
		this.store = new Store(initialState, {
			ADD: function (state, item) {
				state.push(item);
				return state;
			},
			DELETE: function (state, index) {
				state.splice(index, 1);
				return state;
			},
			CLEAR: function (state) {
				return state = [];
			}
		});

		this.store.subscribe(function (state) {
			_this.cart.update();
			_this.handler.cart();
			_this.handler.checkout();
		});

		eRouter.init(this.handler);
	},
};

$(App.init());