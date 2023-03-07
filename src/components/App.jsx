import React, { Component, useEffect, useState } from 'react';

import Header from './header/header.jsx';
import Convert from './convert/convert.jsx';

export default function App() {
	const [amount1, setAmount1] = useState(0);
	const [amount2, setAmount2] = useState(0);

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
	}, [rates])

	return (
		<div className="wrapper">
			<Header usdToUan={usdToUan} eurToUan={eurToUan} />
			<Convert />
		</div>
	)
}