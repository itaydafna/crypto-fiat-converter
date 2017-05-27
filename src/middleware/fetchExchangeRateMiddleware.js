import axios from "axios";
import { receiveExchangeRate } from "../actions/";

export const fetchExchangeRateMiddleware = store => next => action => {
	if (action.type === "FETCH_EXCHANGE_RATE") {
		next(action);
		const { from, to } = action;
		return axios
			.get(
				`https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`
			)
			.then(res => {
				if (res.status === 200 && res.data && res.data[to]) {
					store.dispatch(
						receiveExchangeRate({ exchangeRate: res.data[to] })
					);
				} else {
					throw new Error("exchange rate not found");
				}
			})
			.catch(e => {
				store.dispatch(receiveExchangeRate({exchangeRate: 'not-found'}));
			});
	}
	return next(action);
};
