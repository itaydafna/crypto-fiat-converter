import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchExchangeRate } from "../actions";
import {
	normalizeInput,
	normalizeOutput
} from "../helpers/number-normalizing-helpers";

import CurrencyBox from "./CurrencyBox";

import RefreshIndicator from "material-ui/RefreshIndicator";
import Error from "material-ui/svg-icons/alert/error";
import { red500 } from "material-ui/styles/colors";

import CRYPTOCURRENCY_CODES from "../constants/cryptocurrency_codes";
import FIAT_CURRENCIES from "../constants/fiat-currencies";

class CurrencyConverter extends Component {
	state = {
		from: "BTC",
		to: "USD",
		fromValue: "1",
		toValue: ""

	};

	componentWillMount() {
		this.fetchExchangeRate();
	}

	componentWillUpdate(newProps) {
		if (this.props.exchangeRate !== newProps.exchangeRate) {
			this.onFromValueChange(newProps.exchangeRate,this.state.fromValue);
		}
	}

	fetchExchangeRate() {
		const { from, to } = this.state;
		this.props.fetchExchangeRate({ from, to });
	}

	onCoinChange(stateProperty, newValue) {
		this.setState({
			[stateProperty]: newValue
		});
		this.fetchExchangeRate();
	}

	isInputValid(input) {
		if (isNaN(Number(input))) {
			return false;
		}
		if (input === "" || input.includes(" ")) {
			this.setState({
				fromValue: "",
				toValue: ""
			});
			return false;
		}
		return true;
	}

	onFromValueChange(exchangeRate,newValue) {
		const commasRemovedInput = newValue.replace(/,/g, "");
		if (this.isInputValid(commasRemovedInput)) {
			const output = exchangeRate * commasRemovedInput;
			this.setState({
				fromValue: normalizeInput(commasRemovedInput),
				toValue: normalizeOutput(output)
			});
		}
	}

	onToValueChange(newValue) {
		const commasRemovedInput = newValue.replace(/,/g, "");
		if (this.isInputValid(commasRemovedInput)) {
			const output = commasRemovedInput / this.props.exchangeRate;
			this.setState({
				fromValue: normalizeOutput(output),
				toValue: normalizeInput(commasRemovedInput)
			});
		}
	}

	render() {
		const style = {
			container: {
				width: 700,
				display: "flex",
				justifyContent: "space-around",
				alignItems: "center"
			},
			equal: {
				fontSize: 100
			},
			refresh: {
				display: "inline-block",
				position: "relative"
			},
			errorMessage: {
				color: "red"
			}
		};
		return (
			<div className="app">
				<div className="container" style={style.container}>
					<CurrencyBox
						title={"Crypto"}
						currencyData={CRYPTOCURRENCY_CODES}
						weight={1}
						currencyValue={this.state.from}
						onCoinChange={this.onCoinChange.bind(this, "from")}
						value={this.state.fromValue}
						onValueChange={this.onFromValueChange.bind(this,this.props.exchangeRate)}
					/>
					{this.props.fetchingExchangeRate
						? <RefreshIndicator
								style={style.refresh}
								size={50}
								left={0}
								top={0}
								status="loading"
								style={style.refresh}
							/>
						: this.props.exchangeRate === "not-found"
								? <Error color={red500} />
								: <div style={style.equal}>=</div>}
					<CurrencyBox
						title={"Fiat"}
						currencyData={FIAT_CURRENCIES}
						weight={this.props.exchangeRate}
						currencyValue={this.state.to}
						onCoinChange={this.onCoinChange.bind(this, "to")}
						value={this.state.toValue}
						onValueChange={this.onToValueChange.bind(this)}
						fetchingExchangeRate={this.props.fetchingExchangeRate}
					/>
				</div>
				{this.props.exchangeRate === "not-found" &&
					<ul style={style.errorMessage}>
						<li>
							There was an error fetching the exchange rate - please try again later.
						</li>
						<li>Chose a different currency to continue.</li>
					</ul>}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	exchangeRate: state.exchangeRate,
	fetchingExchangeRate: state.fetchingExchangeRate
});

export default connect(mapStateToProps, {
	fetchExchangeRate
})(CurrencyConverter);
