import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import products from './products';
import purchases from './purchases';

export default combineReducers({
	routing: routerReducer,
	products,
	purchases
});