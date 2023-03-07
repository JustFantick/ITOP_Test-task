import React, { useEffect, useState } from 'react'

export default function Convert(props) {

	const [extraValue1, setExtraValue1] = useState('US Dollar, $1 = €0.9373');
	const [extraValue2, setExtraValue2] = useState('Euro, €1 = ');

	function arrowClickhandler(e) {
		if (e.target.className !== 'input') {
			e.target.closest('.convert-section').classList.toggle('active');
		}
	}

	function onOptionClickHandler1(e) {
		//unmark all options and mark the actual one
		const options = e.target.closest('.convert-section__select-options').querySelectorAll('.convert-section__option');
		options.forEach(option => {
			option.classList.remove('selected');
		});
		e.target.classList.add('selected');

		//actualize 'currency1' in parent`s state
		let tempCurrency = '';
		if (e.target.classList.contains('_usd')) {
			props.setCurrency1('USD');
			tempCurrency = 'USD';
		} else if (e.target.classList.contains('_eur')) {
			props.setCurrency1('EUR');
			tempCurrency = 'EUR';
		} else if (e.target.classList.contains('_uan')) {
			props.setCurrency1('UAH');
			tempCurrency = 'UAH';
		}

		//actualize 'amount2' when currency1 changes
		props.setAmount2((props.amount1 * props.rates[props.currency2] / props.rates[tempCurrency]).toFixed(4));

		//extra-info actualize
		let currencyFullname =
			tempCurrency === 'USD' ? 'US Dollar, $1 = ' :
				tempCurrency === 'EUR' ? 'Euro, €1 = ' : 'Hryvnia, ₴1 = ';

		let secondCurrencySymbol =
			props.currency2 === 'USD' ? '$' :
				props.currency2 === 'EUR' ? '€' : '₴';

		setExtraValue1(currencyFullname + secondCurrencySymbol + (1 * props.rates[props.currency2] / props.rates[tempCurrency]).toFixed(4));
	}

	function onOptionClickHandler2(e) {
		//unmark all options and mark the actual one
		const options = e.target.closest('.convert-section__select-options').querySelectorAll('.convert-section__option');
		options.forEach(option => {
			option.classList.remove('selected');
		});
		e.target.classList.add('selected');

		//actualize 'currency2' in parent`s state
		let tempCurrency = '';
		if (e.target.classList.contains('_usd')) {
			props.setCurrency2('USD');
			tempCurrency = 'USD';
		} else if (e.target.classList.contains('_eur')) {
			props.setCurrency2('EUR');
			tempCurrency = 'EUR';
		} else if (e.target.classList.contains('_uan')) {
			props.setCurrency2('UAH');
			tempCurrency = 'UAH';
		}

		//actualize 'amount1' when currency2 changes
		props.setAmount1((props.amount2 * props.rates[props.currency1] / props.rates[tempCurrency]).toFixed(4));

		//extra-info actualize
		let currencyFullname =
			tempCurrency === 'USD' ? 'US Dollar, $1 = ' :
				tempCurrency === 'EUR' ? 'Euro, €1 = ' : 'Hryvnia, ₴1 = ';

		let secondCurrencySymbol =
			props.currency1 === 'USD' ? '$' :
				props.currency1 === 'EUR' ? '€' : '₴';

		setExtraValue2(currencyFullname + secondCurrencySymbol + (1 * props.rates[props.currency1] / props.rates[tempCurrency]).toFixed(4));
	}

	function onInputChangeHandler1(target) {
		if (target.value !== '') {
			props.setAmount1(parseFloat(target.value));
			props.setAmount2((target.value * props.rates[props.currency2] / props.rates[props.currency1]).toFixed(4));

			target.value = target.value.replace(/^0+/, '');
		} else {
			props.setAmount1(0);
			props.setAmount2(0);
		}
	}

	function onInputChangeHandler2(target) {
		if (target.value !== '') {
			props.setAmount2(parseFloat(target.value));
			props.setAmount1((target.value * props.rates[props.currency1] / props.rates[props.currency2]).toFixed(4));

			target.value = target.value.replace(/^0+/, '');
		} else {
			props.setAmount1(0);
			props.setAmount2(0);
		}
	}

	return (
		<main className='convert'>
			<div className="convert__body">
				<div className="convert__section convert-section" onClick={(e) => arrowClickhandler(e)}>
					<div className="convert-section__selected">
						<div className="convert-section__extra-info">{extraValue1}</div>
						<div className="convert-section__input">
							<span>
								{
									props.currency1 === 'USD' ? '$' :
										props.currency1 === 'EUR' ? '€' : '₴'
								}
							</span>
							<input className='input' type="number" name="amount1" id="amount1"
								value={props.amount1}
								onChange={(e) => onInputChangeHandler1(e.target)} />
							<img src={require('../../img/arrow-down.svg')} alt="arrows-down" />
						</div>
					</div>
					<div className="convert-section__select-options" onClick={(e) => onOptionClickHandler1(e)}>
						<div className="convert-section__option selected _usd">US Dollar $</div>
						<div className="convert-section__option _eur">Euro €</div>
						<div className="convert-section__option _uan">Hryvnia ₴</div>

					</div>

				</div>

				<div className="convert__arrows">
					<img src={require('../../img/arrows-icon.svg')} alt="arrows-icon" />
				</div>

				<div className="convert__section convert-section" onClick={(e) => arrowClickhandler(e)}>
					<div className="convert-section__selected">
						<div className="convert-section__extra-info">{extraValue2}</div>
						<div className="convert-section__input">
							<span>
								{
									props.currency2 === 'USD' ? '$' :
										props.currency2 === 'EUR' ? '€' : '₴'
								}
							</span>
							<input className='input' type="number" name="amount1" id="amount1"
								value={props.amount2}
								onChange={(e) => onInputChangeHandler2(e.target)} />
							<img src={require('../../img/arrow-down.svg')} alt="arrows-down" />
						</div>
					</div>
					<div className="convert-section__select-options" onClick={(e) => onOptionClickHandler2(e)}>
						<div className="convert-section__option _usd">US Dollar $</div>
						<div className="convert-section__option _eur selected">Euro €</div>
						<div className="convert-section__option _uan">Hryvnia ₴</div>

					</div>

				</div>
			</div>

		</main>
	)
}
