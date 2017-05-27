export const normalizeInput = input => addCommasToNumber(input);

export const normalizeOutput = output => {
	if (Number(output) < 1000) {
		return addCommasToNumber(Number(output).toFixed(2));
	} else return addCommasToNumber(Math.round(Number(output)));
};

const addCommasToNumber = number => {
	if (Number(number) >= 1000) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}else{
		return number.toString();
	}
};
