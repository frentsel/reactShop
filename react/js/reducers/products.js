export default function products(state = [], action) {

	if (action.type === 'GET_ALL_PRODUCTS') {
		return state;
	}

	if (action.type === 'SORT') {

		state = state.sort(function(a, b) {
			if (a[action.key] > b[action.key]) return 1;
			if (a[action.key] < b[action.key]) return -1;
			return 0;
		});

		return $.extend([], state);
	}

	if (action.type === 'FILTER') {

		let tmpState = $.extend([], state);
		tmpState.q = action.q;
		return tmpState;
	}

	if (action.type === 'INIT') {
		return state = action.products;
	}

	return state;
}