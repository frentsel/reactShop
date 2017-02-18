import {combineReducers} from 'redux';
import products from './products';
import purchases from './purchases';

export default combineReducers({
	products,
	purchases
});