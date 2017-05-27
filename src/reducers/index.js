import { combineReducers } from "redux";
const exchangeRate = (state = 0, action) => {
	switch (action.type) {
		case "RECEIVE_EXCHANGE_RATE":
			return action.exchangeRate;
	}
	return state;
};

const fetchingExchangeRate = (state = false, action) => {
	switch (action.type) {
		case "FETCH_EXCHANGE_RATE":
			return true;
		case "RECEIVE_EXCHANGE_RATE":
			return false;
	}
	return state
};

const rootReducer = combineReducers({
	fetchingExchangeRate,
	exchangeRate
});

export default rootReducer;
