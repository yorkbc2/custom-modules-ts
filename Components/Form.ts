import {
	sendPromisedRequest
} from "./../Modules/AjaxModule";
// import {
// 	inlineCss,
// 	create,
// 	attachEvent
// } from './../Modules/SugarDOM'
import {
	FormInterface,
	FormPattern
} from "./FormInterfaces"

function addInputEvent (elements, data:Object) {
	if (elements) {
		elements.forEach(i => {
			if ('addEventListener' in i) {
				if (i.name !== "") {
					data[i.name] = i.value
				}
				i.addEventListener('input', inputEvent.bind(this, data));
			}
		})
	}
}

function inputEvent (data:Object, event: any) {
	if (event.target.name !== "")
		data[event.target.name] = event.target.value;
}

function usePattern (pattern: FormPattern, value: string): boolean {
	if (pattern.pattern.test) {
		return pattern.pattern.test(value);
	} else {
		return false;
	}
}

function checkPattern (input: HTMLInputElement, patternList: FormPattern[]):boolean {
	var currentPattern: FormPattern; 
	var dataPattern: string = input.getAttribute('data-pattern') || '';
	if (dataPattern === null || dataPattern === '') {
		return true;
	} else {

		currentPattern = patternList.filter(p => p.name === dataPattern)[0];

		if (currentPattern) {

			return usePattern(currentPattern, input.value)

		} else {
		 	return false;
		}

	}
}


class Form implements FormInterface {
	container: Element|null;
	data: Object = {};
	successCallback: Function|null = null;
	errorCallback: Function|null = null;
	// errorPopupMessage: Element|null = null;
	// errorMessage: string = 'Это поле заполнено неправильно! Оно пустое либо не соответствует шаблону ввода.';
	patterns: FormPattern[] = [
		{
			name: "phone",
			pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
		}
	];
	beforeSendCallback: Function = function () {
		this.container.classList.add('form-loading');
	}
	constructor(selector: string) {
		this.container = document.querySelector(selector) || null;
		
		if (this.container) {
			var inputs: NodeListOf<HTMLInputElement> = this.container.querySelectorAll('input, select, textarea');
			if (inputs && inputs.length > 0) {
				addInputEvent(inputs, this.data)
			}
			this.container.addEventListener('submit', this.submit.bind(this));
		}
	}

	submit(event:any) {
		event.preventDefault();
		
		var action:string = event.target.getAttribute('action');
		var method:string = event.target.getAttribute('method') || "POST";
		var isPrepared = true;
		// this.removeErrorPopupMessage();
		for (var i in this.data) {
			var input: HTMLInputElement = this.container.querySelector(`input[name="${i}"],select[name="${i}"]`);
			if (this.data[i] === "" || checkPattern(input, this.patterns) === false) {
				isPrepared = false;
				if (input.className.indexOf("form-error") == -1) input.className = "form-error";
				// this.createErrorPopupMessage();
				break;
			} else {
				input.className = input.className.replace("form-error", "").trim()
			}
		}


		if (isPrepared === true) {
			this.beforeSendCallback()
			sendPromisedRequest(action, {
				method: method,
				data: this.data
			}).then(response => {
				if (this.successCallback !== null) this.successCallback(response, this.container);
			}).catch(error => {
				if (this.errorCallback !== null) this.errorCallback(error.message, this.container);
			})
		}
	}

	setBeforeSendCallback (callback:Function) {
		if (typeof callback === 'function') this.beforeSendCallback = callback;
		else this.beforeSendCallback = null;
		return this;
	}

	setSuccessCallback (callback: Function) {
		if (typeof callback === 'function') this.successCallback = callback;
		else this.successCallback = null;
		return this;
	}

	setErrorCallback (callback: Function) {
		if (typeof callback === 'function') this.errorCallback = callback;
		else this.errorCallback = null;
		return this;
	}

	// setErrorMessage (message:string) {
	// 	this.errorMessage = message;
	// }

	// removeErrorPopupMessage () {
	// 	if (this.errorPopupMessage !== null) {
	// 		this.errorPopupMessage.parentNode.removeChild(this.errorPopupMessage);
	// 		this.errorPopupMessage = null;
	// 	}
	// }

	// createErrorPopupMessage () {
	// 	if (this.errorPopupMessage === null) {
	// 		this.errorPopupMessage = create('div');
	// 		this.errorPopupMessage.textContent = this.errorMessage;
	// 		this.errorPopupMessage.className = "form-error-popup-message";
	// 		attachEvent(<HTMLElement>this.errorPopupMessage, 'click', () => {
	// 			this.removeErrorPopupMessage();
	// 		})
	// 		this.container.appendChild(this.errorPopupMessage);
	// 	}
	// }

}

export default Form;