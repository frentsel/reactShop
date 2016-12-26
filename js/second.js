"use strict";

var App = {
	data: {},
	render: {
		index: function (products) {

			var template = $('#productTpl').html(),
				html = '';

			products.map(function (product) {
				html += tpl(template, product);
			});

			$('#content').html(html);
		},
		page: function (page) {
			var html = $('#'+page+'PageTpl').html();
			$('#content').html(html);
		},
		product: function (product) {

			var template = $('#productItemTpl').html(),
				html = tpl(template, product);

			$('#content').html(html);
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
			App.render.index(App.data);
		},
		delivery: function () {
			App.render.page('delivery');
		},
		contact: function () {
			App.render.page('contact');
		},
		product: function (id) {

			var products = App.data,
				phone = {};

			$.each(products, function (n, product) {
				if(product.id === id) phone = product;
			});

			if(!phone.id) {
				App.render.page('notFound');
				return false;
			}

			App.render.product(phone);
		},
		notFound: function (page) {
			App.render.page('notFound');
		}
	},
	init: function () {

		var _this = this;

		$.getJSON('js/phones.json', {}, function (_data) {
			_this.data = _data;
			eRouter.init(_this.handler);
		});
	},
};

$(App.init());