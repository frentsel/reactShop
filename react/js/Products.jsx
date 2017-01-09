import React from 'react';
import { Router, Route, hashHistory, Link } from 'react-router';
import http from './http.js';

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