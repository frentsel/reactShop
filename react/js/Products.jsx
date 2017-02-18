import React from 'react';
import { Router, Route, hashHistory, Link } from 'react-router';
import http from './http.js';
import {connect} from 'react-redux';

const Products = React.createClass({

    componentWillMount: function() {
        http.getJSON(
            '../data/phones.json',
            {},
            this.props.init.bind(this)
        );
    },

    render: function(){

        let products = this.props.store;

        if(products.q){
            products = products.filter(function(product){
                return product.name && product.name.toLowerCase().indexOf(products.q) > -1;
            });
        }

        let list = products.map((phone, index) =>
            <div id={phone.id} className="phone" key={index}>
                <Link to={'/product/' + phone.id}>
                    <strong>{phone.name}</strong>
                    <img src={'../images/' + phone.imageUrl} alt={phone.name}/>
                </Link>
            </div>
        );

        return <div>{list}</div>;
    }
});

export default connect(
    state => ({
        store: state.products
    }),
    dispatch => ({
        init: (products) => {
            dispatch({
                type: 'INIT',
                products: products
            });
        }
    })
)(Products);