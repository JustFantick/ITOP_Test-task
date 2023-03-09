import React, { useEffect, useState } from 'react';
import ConvertSection from '../convert-section/convert-section.jsx';

import { roundingDegree } from '../App.jsx';

export default function Convert(props) {
	//10 is default value of first 'ConvertSection', second calculates automatically
	const [chosenAmounts, setChosenAmounts] = useState([10, 0]);

	const [chosenCurrencies, setChosenCurrencies] = useState(['USD', 'EUR']);
	const [descriptionText, setDescriptionText] = useState(['US Dollar, $1 = €0.9373', 'Euro, €1 = $1.06']);

	const currenciesInfo = {
		USD: { 'symbol': '$', 'fullName': 'US Dollar' },
		EUR: { 'symbol': '€', 'fullName': 'Euro' },
		UAH: { 'symbol': '₴', 'fullName': 'Hryvnia' },
	};

	function updateDescriptionText() {
		let firstStr = currenciesInfo[chosenCurrencies[0]].fullName + ', ' + currenciesInfo[chosenCurrencies[0]].symbol + '1 = ';
		let firstValue = (1 * props.rates[chosenCurrencies[1]] / props.rates[chosenCurrencies[0]]).toFixed(roundingDegree);
		firstStr += currenciesInfo[chosenCurrencies[1]].symbol + firstValue;

		let secondStr =
			currenciesInfo[chosenCurrencies[1]].fullName + ', ' + currenciesInfo[chosenCurrencies[1]].symbol + '1 = ';
		let secondValue = (1 * props.rates[chosenCurrencies[0]] / props.rates[chosenCurrencies[1]]).toFixed(roundingDegree);
		secondStr += currenciesInfo[chosenCurrencies[0]].symbol + secondValue;

		setDescriptionText([firstStr, secondStr]);
	}

	useEffect(() => {
		updateDescriptionText();
	}, [chosenCurrencies]);

	useEffect(() => {
		setChosenAmounts(
			prev => [
				prev[0],
				(chosenAmounts[0] * props.rates[chosenCurrencies[1]] / props.rates[chosenCurrencies[0]]).toFixed(roundingDegree)
			]
		);
		updateDescriptionText();
	}, [props.rates]);

	return (
		<main className='convert'>
			<div className="convert__body">
				<ConvertSection index={0} rates={props.rates}
					currentCurrencySymbol={currenciesInfo[chosenCurrencies[0]].symbol}
					descriptionText={descriptionText[0]}
					chosenAmount={chosenAmounts[0]} setChosenAmounts={setChosenAmounts}
					chosenCurrencies={chosenCurrencies} setChosenCurrencies={setChosenCurrencies} />

				<div className="convert__arrows">
					<img src={require('../../img/arrows-icon.svg')} alt="arrows-icon" />
				</div>

				<ConvertSection index={1} rates={props.rates}
					currentCurrencySymbol={currenciesInfo[chosenCurrencies[1]].symbol}
					descriptionText={descriptionText[1]}
					chosenAmount={chosenAmounts[1]} setChosenAmounts={setChosenAmounts}
					chosenCurrencies={chosenCurrencies} setChosenCurrencies={setChosenCurrencies} />
			</div>

		</main>
	)
}
