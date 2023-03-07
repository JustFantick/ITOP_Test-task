import React, { Component, useEffect, useState } from 'react';

import Header from './header/header.jsx';
import Convert from './convert/convert.jsx';

export default function App() {
	const [amount1, setAmount1] = useState(10.0000);
	const [amount2, setAmount2] = useState(9);

	const [rates, setRates] = useState([]);

	const [usdToUan, setUsdToUan] = useState(0);
	const [eurToUan, setEurToUan] = useState(0);

	const [currency1, setCurrency1] = useState('USD');
	const [currency2, setCurrency2] = useState('EUR');



	useEffect(() => {
		let url = 'https://v6.exchangerate-api.com/v6/a5b5e34fb74721b636035bc6/latest/EUR';
		fetch(url).then(response => response.json()).then(result => {
			setRates(result.conversion_rates);
		});
	}, []);

	useEffect(() => {
		setUsdToUan((1 * rates.UAH / rates.USD).toFixed(3));
		setEurToUan((1 * rates.UAH / rates.EUR).toFixed(3));
		setAmount2((amount1 * rates[currency2] / rates[currency1]).toFixed(4));
	}, [rates]);

	// useEffect(() => {
	// 	setAmount2((amount1 * rates[currency2] / rates[currency1]).toFixed(4));
	// }, [currency1]);

	// useEffect(() => {
	// 	setAmount1((amount2 * rates[currency1] / rates[currency2]).toFixed(4));
	// }, [currency2]);

	return (
		<div className="wrapper">
			<Header usdToUan={usdToUan} eurToUan={eurToUan} />
			<Convert
				rates={rates}
				amount1={amount1} setAmount1={setAmount1}
				amount2={amount2} setAmount2={setAmount2}
				currency1={currency1} setCurrency1={setCurrency1}
				currency2={currency2} setCurrency2={setCurrency2}
			/>
		</div>
	)
}