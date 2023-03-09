import React, { Component, useEffect, useState } from 'react';

import Header from './header/header.jsx';
import Convert from './convert/convert.jsx';

export const roundingDegree = 3;

export default function App() {
	const [rates, setRates] = useState([]);

	useEffect(() => {
		if (localStorage.getItem('rates')) {
			setRates(JSON.parse(localStorage.getItem('rates')));
			console.log('parsed from localStorage');
		} else {
			let url = 'https://v6.exchangerate-api.com/v6/a5b5e34fb74721b636035bc6/latest/EUR';
			fetch(url).then(response => response.json()).then(result => {
				setRates(result.conversion_rates);
				localStorage.setItem('rates', JSON.stringify(result.conversion_rates));
			});
			console.log('set localStorage');
		}
	}, []);

	return (
		<div className="wrapper">
			<Header rates={rates} />
			<Convert rates={rates} />
		</div>
	)
}