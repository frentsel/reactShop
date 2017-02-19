"use strict";

var App = {
	data: {},
	cart: {
		storage: {
			getAll: function () {

				var res = [];

				$.each(localStorage, function (key, el) {
					res.push(JSON.parse(el));
				});

				return res;
			},
			getById: function (id) {

				if(localStorage[id] !== undefined) {
					return JSON.parse(localStorage[id]);
				}

				return undefined;
			},
			quantity: function () {
				return App.cart.storage.getAll().length;
			},
			price: function () {

				var sum = 0;
				var products = App.cart.storage.getAll();

				$.each(products, function (n, product) {
					sum += product.price || 123;
				});

				return sum;
			},
			set: function (id, obj) {
				localStorage.setItem(id, JSON.stringify(obj));
			},
			remove: function (id) {
				localStorage.removeItem(id);
			},
			clear: function () {
				localStorage.clear();
			}
		},
		add: function (id) {

			var _this = this;

			App.http.getJSON('../data/'+id+'.json', {}, function (product) {
				_this.storage.set(id, product);
				App.cart.update();
			});
		},
		remove: function (id) {
			this.storage.remove(id);
			this.update();
		},
		update: function (state) {

			$('.quantity').text(this.storage.quantity());
			$('.price').text(this.storage.price());

			if(state === undefined) {
				App.handler.cart();
			}
		},
		change: function (id, obj) {},
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

						$(document).find('.products-table tr').remove();
						_this.storage.clear();
						_this.update();
					}
				});
		},
		init: function () {
			$('.quantity').text(this.storage.quantity());
			$('.price').text(this.storage.price());
		}
	},
	render: {
		_load: function (page, callback) {
			App.http.load('templates/'+page+'.html', {}, callback);
		},
		page: function (page, data) {
			this._load(page, function (html) {
				$('#content').html(Handlebars.compile(html)(data));
			});
		},
		product: function (data) {

			this._load('product', function (html) {

				$('#content').html(Handlebars.compile(html)(data));

				$(".quick_view").fancybox({

					mainClass	: 'quick-view-container',
					infobar		: false,
					buttons		: false,
					thumbs		: false,
					margin      : 0,
					touch       : {
						vertical : false
					},
					mainTpl     : $('#demoProduct').html(),

					onInit : function( instance ) {

						// Create bullet navigation links
						var bullets = '<ul class="quick-view-bullets">';

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
			});
		},
		init: function () {
			App.cart.init();
		}
	},
	http: {
		ajaxSpinner: function (status) {
			$('body').toggleClass('loading', status);
		},
		cache: {},
		load: function (path, params, callback) {

			var _this = this,
				cacheKey = path + $.param(params);

			if(this.cache[cacheKey] !== undefined) {
				callback(this.cache[cacheKey]);
				return false;
			}

			$.ajax({
				url: path,
				type: 'get',
				dataType: 'text',
				data: params,
				beforeSend: function() {
					_this.ajaxSpinner(true);
				},
				complete: function(){
					_this.ajaxSpinner(false);
				},
				success: function (response) {
					_this.cache[cacheKey] = response;
					callback(response);
				},
				error: function (e) {
					if(e.status === 404) {
						App.render.page('notFound');
					}
				}
			});
		},
		getJSON: function (path, params, callback) {

			this.load(path, params, function (response) {
				callback(JSON.parse(response));
			});
		}
	},
	handler: {
		sort: function (obj) {

			// if not index page
			if(window.location.hash !== '#!/') return false;

			var key = obj.value.toLowerCase();
			var result = App.data.sort(function(a, b) {
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
			var result = App.data.filter(function (product) {
				return product.name.toLowerCase().indexOf(query) > -1;
			});

			App.render.page('index', {products: result});
		},
		index: function () {

			App.http.getJSON('../data/phones.json', {}, function (_data) {

				App.data = _data;
				App.render.page('index', {products: _data});
			});
		},
		delivery: function () {
			App.render.page('delivery');
		},
		contact: function () {
			App.render.page('contact');
		},
		info: function () {

			App.cart.storage.clear();
			App.cart.update(true);
			App.render.page('info');
		},
		cart: function () {

			var storage = App.cart.storage;

			App.render.page('cart', {
				products: storage.getAll(),
				quantity: storage.quantity(),
				price: storage.price(),
			});
		},
		sendOrder: function (obj) {

			var products = App.cart.storage.getAll(),
				data = $(obj).serializeArray(),
				key = 'Order: ' + Date.now();

			$.extend(products, JSON.stringify(data));

			document.cookie = key+"="+JSON.stringify(products);

			eRouter.set('info');
			return false;
		},
		checkout: function () {

			var storage = App.cart.storage;

			if(!storage.quantity()) {
				eRouter.set('cart');
				return false;
			}

			App.render.page('checkout', {
				products: storage.getAll(),
				quantity: storage.quantity(),
				price: storage.price(),
			});
		},
		product: function (id) {

			var path = '../data/'+id+'.json';
			App.http.getJSON(path, {}, App.render.product.bind(App.render));
		},
		notFound: function (page) {
			App.render.page('notFound');
		}
	},
	init: function () {

		Handlebars.registerHelper('toFixed', function(price) {
			return price.toFixed(2);
		});

		eRouter.init(this.handler);
		this.render.init();
	},
};

$(App.init());