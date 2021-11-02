/* eslint-disable max-len */
export class ValidatorInput {
	constructor({selector, pattern = {}, method, message}) {
		this.form = document.querySelector(selector);
		this.pattern = pattern;
		this.method = method;
		this.elementsForm = [...this.form.elements].filter(item => {
			return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
		});
		this.error = new Set();
		this.message = message;
	}

	init() {
		this.applyStyle();
		this.setPattern();
		this.elementsForm.forEach(elem => elem.addEventListener('change', this.chekIt.bind(this)));
		this.form.addEventListener('submit', event => {
			this.elementsForm.forEach(elem => this.chekIt({target: elem}));
			if (this.error.size) {
				event.preventDefault();
			}
		});
	}

	isValid(elem) {
		const validatorMethod = {
			notEmpty(elem) {
				if (elem.value.trim() === '') {
					return false;
				}
				return true;
			},

			pattern(elem, pattern) {
				return pattern.test(elem.value)
			}
		};

		if (this.method) {
			const method = this.method[elem.id];

			if (method) {
				return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
			}
		} else {
			console.warn('Необходимо передать id полей ввода и методы проверки этих полей.')
		}

		return true;
	}

	chekIt(event) {
		const target = event.target;
		if (this.isValid(target)) {
			this.showSuccess(target);
			this.error.delete(target);
		} else {
			this.showError(target);
			this.error.add(target);
		}
	}

	showError(elem) {
		elem.classList.add('error');
		elem.previousElementSibling.classList.add('error-label');

		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
			return;
		}

		const errorDiv = document.createElement('div');
		errorDiv.textContent = this.message[elem.id];
		errorDiv.classList.add('validator-error');
		elem.insertAdjacentElement('afterend', errorDiv);
	}

	showSuccess(elem) {
		if (elem.classList.contains('error') && elem.previousElementSibling.classList.contains('error-label')) {
			elem.previousElementSibling.classList.remove('error-label');

			elem.classList.remove('error');
		}

		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
			elem.nextElementSibling.remove();
		}
	}

	applyStyle() {
		const style = document.createElement('style');
		style.textContent = `
    .validator-error {
			padding-top: 10px;
      font-size: 10px; 
      color: rgb(237, 89, 111);
    }
    `
		document.head.appendChild(style);
	}

	setPattern() {
		if (!this.pattern.phone) {
			this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
		}

		if (!this.pattern.email) {
			this.pattern.email = /^\w+@\w+\.\w{2,}$/;
		}
	}
}
