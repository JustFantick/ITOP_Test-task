import React, { useEffect, useState } from 'react';
import { roundingDegree } from '../App.jsx';

export default function Header(props) {
	//main currencies that should be interpret into UAH
	const [usdToUan, setUsdToUan] = useState(0);
	const [eurToUan, setEurToUan] = useState(0);

	useEffect(() => {
		setUsdToUan((1 * props.rates.UAH / props.rates.USD).toFixed(roundingDegree));
		setEurToUan((1 * props.rates.UAH / props.rates.EUR).toFixed(roundingDegree));
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
