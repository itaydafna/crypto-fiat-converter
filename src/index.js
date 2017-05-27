import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from "./components/app";
import reducers from "./reducers";
import {fetchExchangeRateMiddleware} from './middleware/fetchExchangeRateMiddleware'

import injectTapEventPlugin from 'react-tap-event-plugin';
try { injectTapEventPlugin(); } catch (e) { // Do nothing, just preventing error 
}


const createStoreWithMiddleware = applyMiddleware(fetchExchangeRateMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);


ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.querySelector("#root")
);
