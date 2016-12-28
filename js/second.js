"use strict";

var App = {
	data: {},
	cart: {
		products: {},
		totalPrice: 0,
		_getById: function (id) {
		},
		add: function (id) {

			var _this = this;

			if(this.products[id] === undefined) {

				App.http.get('data/'+id+'.json', {}, function (res) {
					_this.products[id] = res;

					console.info(_this.products);
				});
			}
		},
		remove: function (id) {

		},
		clear: function () {
			this.data = [];
			this.totalPrice = 0;
		}
	},
	render: {
		_tpl: function (str, data){
			var fn = new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);}; with(obj){p.push('" +
				str.replace(/[\r\t\n]/g, " ")
					.split("<%").join("\t")
					.replace(/((^|%>)[^\t]*)'/g, "$1\r")
					.replace(/\t=(.*?)%>/g, "',$1,'")
					.split("\t").join("');")
					.split("%>").join("p.push('")
					.split("\r").join("\\'") + "');}return p.join('');");
			return data ? fn( data ) : fn;
		},
		index: function (products) {

			var template = $('#productTpl').html(),
				html = '',
				_this = this;

			products.map(function (product) {
				html += _this._tpl(template, product);
			});

			$('#content').html(html);
		},
		page: function (page) {
			var html = $('#'+page+'PageTpl').html();
			$('#content').html(html);
		},
		product: function (product) {

			var template = $('#productItemTpl').html(),
				html = this._tpl(template, product);

			$('#content').html(html);

			$(".fancybox").fancybox({
				openEffect	: 'none',
				closeEffect	: 'none'
			});
		}
	},
	http: {
		ajaxSpinner: function (status) {
			$('body').toggleClass('loadMore', status);
		},
		get: function (path, params, callback) {

			var _this = this;

			$.ajax({
				url: path,
				type: 'get',
				dataType: 'json',
				data: params,
				beforeSend: function() {
					_this.ajaxSpinner(true);
				},
				complete: function(){
					_this.ajaxSpinner(false);
				},
				success: callback,
				error: function (e) {
					if(e.status === 404) {
						App.render.page('notFound');
					}
				}
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

			App.render.index(result);
		},
		filter: function (obj) {

			// if not index page
			if(window.location.hash !== '#!/') return false;

			var query = obj.value.toLowerCase();
			var result = App.data.filter(function (product) {
				return product.name.toLowerCase().indexOf(query) > -1;
			});

			App.render.index(result);
		},
		index: function () {

			App.http.get('data/phones.json', {}, function (_data) {

				App.data = _data;
				App.render.index(_data);
			});
		},
		delivery: function () {
			App.render.page('delivery');
		},
		contact: function () {
			App.render.page('contact');
		},
		product: function (id) {

			var path = 'data/'+id+'.json';

			App.http.get(path, {}, App.render.product.bind(App.render));
		},
		notFound: function (page) {
			App.render.page('notFound');
		}
	},
	init: function () {
		eRouter.init(this.handler);
	},
};

$(App.init());