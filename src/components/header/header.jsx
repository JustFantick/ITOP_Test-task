import React from 'react'

export default function Header(props) {
	return (
		<header className='header'>
			<div className="header__body">
				<div className="header__currency-rate currency-rate">1 USD = {props.usdToUan} UAN</div>
				<div className="header__currency-rate currency-rate">1 EUR = {props.eurToUan} UAN</div>

			</div>

		</header>
	)
}
