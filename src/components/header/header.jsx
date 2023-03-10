import React, { useEffect, useState } from 'react';
import { convertTo } from '../App.jsx';

export default function Header(props) {
	//main currencies that should be converted into UAH
	const [usdToUan, setUsdToUan] = useState(0);
	const [eurToUan, setEurToUan] = useState(0);

	useEffect(() => {
		setUsdToUan(convertTo(1, props.rates.UAH, props.rates.USD));
		setEurToUan(convertTo(1, props.rates.UAH, props.rates.EUR));
	}, [props.rates]);

	return (
		<header className='header'>
			<div className="header__body">
				<div className="header__currency-rate currency-rate">1 USD = {usdToUan} UAN</div>
				<div className="header__currency-rate currency-rate">1 EUR = {eurToUan} UAN</div>

			</div>

		</header>
	)
}
