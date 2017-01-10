import React from 'react';
import { Router, Route, hashHistory, Link } from 'react-router';
import http from './http.js';

const Products = React.createClass({

    products: [],

    _sort: function(data, key){
        return data.sort(function(a, b) {
            if (a[key] > b[key]) return 1;
            if (a[key] < b[key]) return -1;
            return 0;
        });
    },

    sorting: function (e) {

        let products = this.state.products,
            key = e.key;

        this.setState({
            products: this._sort(products, key)
        });
    },

    filtering: function (e) {

        let q = e.key,
            products = this.products.filter(function(product){
                return product.name.toLowerCase().indexOf(q) > -1;
            });

        this.setState({
            products: products
        });
    },

    getInitialState: function() {
        return {products: []};
    },

    componentDidMount: function() {

        document.addEventListener(
            'productsSorting',
            this.sorting,
            false
        );

        document.addEventListener(
            'productsFiltering',
            this.filtering,
            false
        );
    },

    componentWillMount: function() {

        var _this = this;

        http.getJSON('../data/phones.json', {}, function (_products) {

            _this.setState({products: _this._sort(_products, 'name')});
            _this.products = _this.state.products;
        });
    },

    componentWillUnmount: function () {
        document.removeEventListener('productsSorting');
        document.removeEventListener('productsFiltering');
    },

    render: function(){

        var list = this.state.products.map((phone) =>
            <div id={phone.id} className="phone" key={phone.id}>
                <Link to={'/product/'+phone.id}>
                    <strong>{phone.name}</strong>
                    <img src={'../images/'+phone.imageUrl} alt={phone.name} />
                </Link>
            </div>
        );

        return <div>{list}</div>;
    }
});

export default Products;