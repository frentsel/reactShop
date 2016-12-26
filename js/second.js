"use strict";

var App = {
	data: {},
	render: {
		index: function (products) {

			console.info("products: ", products);

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
		},
		init: function () {

		}
	},
	handler: {
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
			_this.render.init();

			eRouter.init(_this.handler);
		});
	},
};

$(function () {
	App.init();
});