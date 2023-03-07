import React from 'react'

export default function Convert() {
	return (
		<main className='convert'>
			<div className="convert__body">
				<div className="convert__section convert-section">
					<div className="convert-section__selected">
						<div className="convert-section__extra-info">US Dollar, $1 = €0.903</div>
						<div className="convert-section__input">
							<input type="number" name="amount1" id="amount1" />
						</div>
					</div>
					<div className="convert-section__select-options">
						<div className="convert-section__option">Euro €</div>
						<div className="convert-section__option">Hryvnia ₴</div>

					</div>

				</div>

				<div className="convert__arrows">
					<img src={require('../../img/arrows-icon.svg')} alt="arrows-icon" />
				</div>
				<div className="convert__section convert-section">
					<div className="convert-section__selected">
						<div className="convert-section__extra-info">US Dollar, $1 = €0.903</div>
						<div className="convert-section__input">
							<input type="number" name="amount1" id="amount1" />
						</div>
					</div>
					<div className="convert-section__select-options">
						<div className="convert-section__option">Euro €</div>
						<div className="convert-section__option">Hryvnia ₴</div>

					</div>

				</div>
			</div>

		</main>
	)
}
