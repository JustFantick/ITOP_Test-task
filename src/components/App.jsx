import React, { useEffect, useState } from 'react';
import Header from './header/header.jsx';
import Convert from './convert/convert.jsx';

//converts 'startValue' of 'startCurrency' to  'finishCurrency'
export function convertTo(startValue, finishCurrency, startCurrency, roundingDegree = 3) {
	return (startValue * finishCurrency / startCurrency).toFixed(roundingDegree);
}

export default function App() {
	const [rates, setRates] = useState([]);

	useEffect(() => {
		let url = 'https://v6.exchangerate-api.com/v6/a5b5e34fb74721b636035bc6/latest/EUR';
		fetch(url).then(response => response.json()).then(result => {
			setRates(result.conversion_rates);
		});
	}, []);

	return (
		<div className="wrapper">
			<Header rates={rates} />
			<Convert rates={rates} />
		</div>
	)
}