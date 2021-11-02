import {Modal} from './js/modalWin';
import {ValidatorInput} from './js/validatorInput';
import '/scss/index.scss';

window.addEventListener('DOMContentLoaded', () => {
	const modalWin = new Modal();

	const validInput = new ValidatorInput({
		selector: '#form',
		pattern: {
			name: /^[A-Za-z]{2,}$/,
			num: /^[0-9]{1,}$/
		},
		method: {
			'user-email': [
				['notEmpty'],
				['pattern', 'email']
			],
			'form-first-name': [
				['notEmpty'],
				['pattern', 'name']
			],
			'form-last-name': [
				['notEmpty'],
				['pattern', 'name']
			],
			'input-select': [
				['notEmpty'],
				['pattern', 'num']
			]
		},
		message: {
			'user-email': 'Please fill in email.',
			'form-first-name': 'Please fill in first name.',
			'form-last-name': 'Please fill in second name.',
			'input-select': 'Please select product type.'
		}
	});


	modalWin.init();
	validInput.init();
});
