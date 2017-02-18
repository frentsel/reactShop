import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import Layout from './Layout.jsx';
import Delivery from './Delivery.jsx';
import Contact from './Contact.jsx';
import CartPage from './CartPage.jsx';
import Product from './Product.jsx';
import Products from './Products.jsx';
import CheckoutPage from './CheckoutPage.jsx';
import InfoPage from './InfoPage.jsx';


const App = React.createClass({
    render(){
        return (
            <Router history={hashHistory}>
                <Route component={Layout}>
                    <Route path="/" component={Products}></Route>
                    <Route path="/delivery" component={Delivery}></Route>
                    <Route path="/contact" component={Contact}></Route>
                    <Route path="/cart" component={CartPage}></Route>
                    <Route path="/checkout" component={CheckoutPage}></Route>
                    <Route path="/info" component={InfoPage}></Route>
                    <Route path="/product/:productId" component={Product}></Route>
                </Route>
            </Router>
        );
    }
});

export default App;