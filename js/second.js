"use strict";

var App = {
	data: {},
	cart: {
		products: {},
		get: {
			quantity: function () {
				return Object.keys(App.cart.products).length;
			},
			price: function () {

				var sum = 0;
				$.each(App.cart.products, function (n, product) {
					sum += product.price || 123;
				});

				return sum;
			}
		},
		add: function (id) {

			var _this = this;

			if(this.products[id] === undefined) {

				App.http.getJSON('data/'+id+'.json', {}, function (res) {

					_this.products[id] = res;
					_this.update();
				});
			}
		},
		remove: function (id) {
			delete this.products[id];
			this.update();
		},
		update: function (state) {

			$('.quantity').text(this.get.quantity());
			$('.price').text(this.get.price());

			if(state === undefined) {
				App.handler.cart();
			}
		},
		change: function (id, obj) {
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

						$(document).find('.products-table tr').remove();
						_this.products = {};
						_this.update();
					}
				});
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
		init: function () {}
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

			App.http.getJSON('data/phones.json', {}, function (_data) {

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

			App.cart.products = {};
			App.cart.update(true);
			App.render.page('info');
		},
		cart: function () {

			var cart = App.cart;

			App.render.page('cart', {
				products: cart.products,
				quantity: cart.get.quantity(),
				price: cart.get.price(),
			});
		},
		sendOrder: function (obj) {

			var cart = App.cart,
				data = $(obj).serializeArray();

			$.extend(cart.products, data);
			document.cookie = "order="+JSON.stringify(cart.products);

			eRouter.set('info');
			return false;
		},
		checkout: function () {

			var cart = App.cart;

			if(!cart.get.quantity()) {
				eRouter.set('cart');
				return false;
			}

			App.render.page('checkout', {
				products: cart.products,
				quantity: cart.get.quantity(),
				price: cart.get.price(),
			});
		},
		product: function (id) {

			var path = 'data/'+id+'.json';
			App.http.getJSON(path, {}, App.render.product.bind(App.render));
		},
		notFound: function (page) {
			App.render.page('notFound');
		}
	},
	init: function () {
		eRouter.init(this.handler);
		this.render.init();
	},
};

$(App.init());