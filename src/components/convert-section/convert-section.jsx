import React, { useEffect } from 'react';
import { convertTo } from '../App.jsx';

export default function ConvertSection(props) {
	function onOptionClickHandler(e) {
		//unmark all options and mark the actual one
		const options = e.target.closest('.convert-section__select-options').querySelectorAll('.convert-section__option');
		options.forEach(option => {
			option.classList.remove('selected');
		});
		e.target.classList.add('selected');

		//actualize 'chosenCurrencies' in parent`s state
		let clickedCurrency = e.target.getAttribute('data-currency');
		if (props.index === 0) {
			props.setChosenCurrencies(
				prev => [clickedCurrency, prev[1]]
			)
			props.setChosenAmounts(
				prev => [
					prev[0],
					convertTo(props.chosenAmount, props.rates[props.chosenCurrencies[1]], props.rates[clickedCurrency])
				]
			);
		} else if (props.index === 1) {
			props.setChosenCurrencies(
				prev => [prev[0], clickedCurrency]
			)
			props.setChosenAmounts(
				prev => [
					convertTo(props.chosenAmount, props.rates[props.chosenCurrencies[0]], props.rates[clickedCurrency]),
					prev[1]]
			);
		}
	}

	function onInputChangeHandler(target) {
		if (target.value !== '') {
			if (props.index === 0) {
				props.setChosenAmounts(
					[
						parseFloat(target.value),
						convertTo(target.value, props.rates[props.chosenCurrencies[1]], props.rates[props.chosenCurrencies[0]])
					]
				);
			} else if (props.index === 1) {
				props.setChosenAmounts(
					[
						convertTo(target.value, props.rates[props.chosenCurrencies[0]], props.rates[props.chosenCurrencies[1]]),
						parseFloat(target.value)
					]
				);
			}
			target.value = target.value.replace(/^0+/, '');
		} else {
			props.setChosenAmounts([0, 0]);
		}
	}

	function arrowClickhandler(e) {
		if (e.target.className !== 'input') {
			e.target.closest('.convert-section').classList.toggle('active');
		}
	}

	return (
		<div className="convert__section convert-section" onClick={(e) => arrowClickhandler(e)}>
			<div className="convert-section__selected">
				<div className="convert-section__extra-info">{props.descriptionText}</div>
				<div className="convert-section__input">
					<span>{props.currentCurrencySymbol}</span>
					<input className='input' type="number" name="amount1" id="amount1"
						value={props.chosenAmount}
						onChange={(e) => onInputChangeHandler(e.target)} />
					<img src={require('../../img/arrow-down.svg')} alt="arrows-down" />
				</div>
			</div>
			<div className="convert-section__select-options" onClick={(e) => onOptionClickHandler(e)}>
				<div data-currency={'USD'} className="convert-section__option selected">US Dollar $</div>
				<div data-currency={'EUR'} className="convert-section__option">Euro €</div>
				<div data-currency={'UAH'} className="convert-section__option">Hryvnia ₴</div>

			</div>

		</div>
	)
}
