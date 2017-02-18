import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';

import reducers from './reducers';
const store = createStore(reducers);
const history = syncHistoryWithStore(hashHistory, store);

import Layout from './Layout.jsx';
import Delivery from './Delivery.jsx';
import Contact from './Contact.jsx';
import CartPage from './CartPage.jsx';
import Product from './Product.jsx';
import Products from './Products.jsx';
import CheckoutPage from './CheckoutPage.jsx';
import InfoPage from './InfoPage.jsx';
import NotFound from './NotFound.jsx';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={Layout}>
                <Route path="/" component={Products}></Route>
                <Route path="/delivery" component={Delivery}></Route>
                <Route path="/contact" component={Contact}></Route>
                <Route path="/cart" component={CartPage}></Route>
                <Route path="/checkout" component={CheckoutPage}></Route>
                <Route path="/info" component={InfoPage}></Route>
                <Route path="/product/:productId" component={Product}></Route>
                <Route path="*" component={NotFound}></Route>
            </Route>
        </Router>
    </Provider>,
    document.querySelector('#store')
);