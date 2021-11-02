/* eslint-disable max-len */
export class Modal {
	constructor() {
		this.modalWindow = document.getElementById('modal-window');
		this.options = new Map();
		this.totalPrice = 0;
		this.inputSelect = document.querySelector('#input-select');
		this.selectValue = document.querySelector('.select-value');
	}

	setInputActive(item) {
		item = item.previousElementSibling;
		item.classList.contains('label_active') ? '' : item.classList.add('label_active');
	}

	removeInputActive(item) {
		item.value.trim() !== '' ? '' : item = item.previousElementSibling;

		item.classList.contains('label_active') ? item.classList.remove('label_active') : '';
	}

	setSelectActive() {
		this.selectValue.classList.add('select-value_active');
	}

	removeSelectActive(item) {
		item.closest('.select-value').classList.remove('select-value_active');
	}

	setValueSelect(item) {
		this.inputSelect.value = item.value === 0 ? '' : item.value;

		this.inputSelect.previousElementSibling.textContent = item.textContent;

		this.options.set('Product type', item.value);
		this.setPrise();

		const event = new Event('change');
		this.inputSelect.dispatchEvent(event);

		this.removeSelectActive(item);
	}

	toggleCheckBox(item) {
		item.checked ? this.options.set(item.id, item.value) : this.options.delete(item.id);
		this.setPrise();
	}

	setPrise() {
		let sum = 0;
		this.options.forEach((item) => {
			sum += +item;
		});

		const price = document.querySelector('.form__calc-value');

		price.textContent = '$' + sum;
		this.totalPrice = sum;
	}

	closeModalWindow(item, event) {
		event.preventDefault();
		item.style.display = 'none';
	}

	init() {
		this.modalWindow.addEventListener('focusin', event => {
			const target = event.target;
			if (target.closest('.inputUser')) {
				this.setInputActive(target);
			}
		})

		this.modalWindow.addEventListener('focusout', event => {
			const target = event.target;
			if (target.closest('.inputUser')) {
				this.removeInputActive(target);
			}
		})

		this.modalWindow.addEventListener('click', event => {
			const target = event.target;
			if (target.closest('.input-select')) {
				this.setSelectActive();
			}

			if (target.closest('.select-option')) {
				this.setValueSelect(target.closest('.select-option'));
			}

			if (target.closest('.close-btn')) {
				this.closeModalWindow(target.closest('.modal-window'), event);
			}
		})

		this.modalWindow.addEventListener('input', event => {
			const target = event.target;
			if (target.matches('.checkbox')) {
				this.toggleCheckBox(target);
			}
		})

		// this.modalWindow.addEventListener('change', event => {
		// 	const target = event.target;
		// 	if (target.closest('#form-submit')) {
		// 		console.log(1);
		// 	}
		// })
	}
}
