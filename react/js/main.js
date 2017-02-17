import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

const handler = function (state = [], action) {

	const findPhone = function (phone) {
		return state.reduce((res, _phone) => {
			return (_phone.id === phone.id) ? phone : false;
		}, false);
	};

	if (action.type === 'GET_ALL') {
		return state;
	}

	if (action.type === 'ADD') {
		if(state.length === 0)
			return [...state, action.phone];

		if(!findPhone(action.phone))
			return [...state, action.phone];

		return state;
	}

	if (action.type === 'DELETE') {
		state.splice(action.id, 1);
		return $.extend([], state);
	}

	if (action.type === 'CLEAR') {
		return state = [];
	}

	return state;
};
const store = createStore(handler);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#store')
);