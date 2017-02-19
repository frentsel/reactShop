// https://github.com/frentsel/tinyRedux

var Store = function(initialState, _handlers){
	var handlers = {},
		state = initialState,
		handler,
		key;
	for(key in _handlers){
		handlers[key] = _handlers[key].bind(this);
	}
	this.getState = function () {
		return state;
	};
	this.subscribe = function (_handler) {
		handler = _handler;
	};
	this.dispatch = function (type, item) {
		state = handlers[type](state, item || {});
		handler(state);
	};
	return this;
};