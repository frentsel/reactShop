import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Navigation from './Navigation.jsx';
import Sort from './Sort.jsx';
import Search from './Search.jsx';
import Cart from './Cart.jsx';

import Delivery from './Delivery.jsx';
import Contact from './Contact.jsx';
import CartPage from './CartPage.jsx';
import Product from './Product.jsx';
import Products from './Products.jsx';
import CheckoutPage from './CheckoutPage.jsx';

import { connect } from 'react-redux';

const App = React.createClass({
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
                            <Search />
                            <Cart />
                            <Sort />
                        </div>
                    </div>
                </nav>
                <Router history={hashHistory}>
                    <Route path="/" component={Products}></Route>
                    <Route path="/delivery" component={Delivery}></Route>
                    <Route path="/contact" component={Contact}></Route>
                    <Route path="/cart" component={CartPage}></Route>
                    <Route path="/checkout" component={CheckoutPage}></Route>
                    <Route path="/product/:productId" component={Product}></Route>
                </Router>
            </div>
        );
    }
});

export default connect(
    state => ({
        store: state
    })
)(App);