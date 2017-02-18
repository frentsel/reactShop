export default function purchases(state = [], action) {

	if (action.type === 'GET_ALL') {
		return state;
	}

	if (action.type === 'ADD_TO_CART') {
		return [...state, action.phone];
	}

	if (action.type === 'DELETE_FORM_CART') {

		let index = 0;
		state.forEach(function (el, n) {
			if(el.id === action.id)
				index = n;
		});
		state.splice(index, 1);
		return $.extend([], state);
	}

	if (action.type === 'CLEAR_CART') {
		return state = [];
	}

	return state;
}