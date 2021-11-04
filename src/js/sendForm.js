// send-ajax-form

export class SendForm {
	constructor({errorMessage, loadMessage, sucsessMessage}) {
		this.errorMessage = errorMessage;
		this.loadMessage = loadMessage;
		this.sucsessMessage = sucsessMessage;
	}

	postData(body, outputData, errorData, form, _this, sendBlock) {
		const request = new XMLHttpRequest();

		request.addEventListener('readystatechange', () => {
			if (request.readyState !== 4) {
				return;
			}
			if (request.status === 200) {
				outputData();
			} else {
				errorData(request.status);
			}

			_this.clearForm(form, sendBlock);
		});

		request.open('POST', './server.php');
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(JSON.stringify(body));
	}

	init(form, _this) {
		const sendBlock = document.querySelector('.send');
		const sendMess = sendBlock.querySelector('.send-mess');
		sendBlock.style.display = 'block';
		sendMess.textContent = this.loadMessage;

		const formData = new FormData(form);
		const body = {};

		formData.forEach((val, key) => {
			body[key] = val;
		});

		this.postData(body,
			() => {
				sendMess.textContent = this.sucsessMessage;
			},
			error => {
				sendMess.textContent = this.errorMessage;
				console.error(error);
			},
			form,
			_this,
			sendBlock);
	}
}
