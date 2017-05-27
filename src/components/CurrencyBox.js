import React, { Component } from "react";
import TextField from "material-ui/TextField";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import Paper from "material-ui/Paper";

export default ({
	title,
	currencyData,
	currencyValue,
	onCoinChange,
	value,
	onValueChange,
	fetchingExchangeRate
}) => {
	const style = {
		title: {
			fontWeight: "normal"
		},
		paper: {
			height: 200,
			width: 300,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center'
		},
		textField: {
			width: 200
			
		},
		textFieldInput: {
			textAlign: 'center',
			fontSize: 30
		},
		dropDownMenu: {
			width: 240
		}
	};

	return (
		<div className="currencyBox">
			<h5 style={style.title}>{title}</h5>
			<Paper zDepth={5} rounded={false} style={style.paper}>
				<div>
					<TextField
						name={title}
						value={fetchingExchangeRate?'':value?value:''}
						style={style.textField}
						inputStyle={style.textFieldInput}
						onChange={(e, newValue) => onValueChange(newValue)}
					/>
				</div>
				<div>
					<DropDownMenu
						value={currencyValue}
						style={style.dropDownMenu}
						onChange={(e, index, newValue) => {
							onCoinChange(newValue);
						}}
					>

						{currencyData.map((currency, idx) => (
							<MenuItem
								key={idx}
								value={currency.code}
								primaryText={currency.name}
							/>
						))}
					</DropDownMenu>
				</div>
			</Paper>
		</div>
	);
};
