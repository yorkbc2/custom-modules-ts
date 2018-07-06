import {
	sendPromisedRequest
} from "./../Modules/AjaxModule";

interface FormInterface {
	container: Element|null;
	data: Object;
	SQLInjectionRegular: RegExp;
	successCallback: Function|null;
	errorCallback: Function|null;
	maxSymbolsLengthForInputs: number;
	maxSymbolsLengthForTextareas: number;
}

interface FormPattern {
	name: string;
	pattern: RegExp;
}

interface FormOptions {
	maxLengthInputs: number|null;
	maxLengthTextareas: number|null;
}

interface CheckInputLengthOptions {
	maxInputs: number;
	maxAreas: number;
}

class Form implements FormInterface {
	container: Element|null;
	data: Object = {};
	successCallback: Function|null = null;
	errorCallback: Function|null = null;
	invalidInputCallback: Function|null = null;
	maxSymbolsLengthForInputs: number = 24;
	maxSymbolsLengthForTextareas: number = 360;
	patterns: FormPattern[] = [
		{
			name: "phone",
			pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
		}
	];
	SQLInjectionRegular: RegExp = /<[^>]{0,}[^/]>/g;
	
	constructor(selector: string, options: FormOptions|null) {
		this.container = document.querySelector(selector) || null;
		if (options) {
			this.maxSymbolsLengthForInputs = options.maxLengthInputs || this.maxSymbolsLengthForInputs;
			this.maxSymbolsLengthForTextareas = options.maxLengthTextareas || this.maxSymbolsLengthForTextareas;
		}

		if (this.container) {
			var inputs: NodeListOf<HTMLInputElement> = this.container.querySelectorAll('input, select, textarea');
			if (inputs && inputs.length > 0) {
				addInputEvent(inputs, this.data)
			}
			this.container.addEventListener('submit', this.submit.bind(this));
		}
	}

	beforeSendCallback: Function = function () {
		this.container.classList.add('form-loading');
	}

	submit(event:any) {
		event.preventDefault();
		
		var action:string = event.target.getAttribute('action');
		var method:string = event.target.getAttribute('method') || "POST";
		var isPrepared = true;
		for (var i in this.data) {
			var input: HTMLInputElement = this.container.querySelector(`input[name="${i}"],select[name="${i}"]`);
			if (this.data[i] === "" || checkPattern(input, this.patterns) === false || checkInputLength(input, {
				maxInputs: this.maxSymbolsLengthForInputs,
				maxAreas: this.maxSymbolsLengthForTextareas
			}) === false) {
				isPrepared = false;
				if (input.className.indexOf("form-error") == -1) input.className = "form-error";
				if (typeof this.invalidInputCallback === 'function') this.invalidInputCallback(input, this.container);
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

	setInvalidInputCallback (callback: Function) {
		if (typeof callback === 'function') this.invalidInputCallback = callback;
		else this.invalidInputCallback = null;
		return this;
	}

}

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

function inputEvent (data:Object, event: any, SQLInjectionRegular: RegExp = /<[^>]{0,}[^/]>/g) {
	if (event.target.name !== "")
		data[event.target.name] = event.target.value.replace(SQLInjectionRegular, '');
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

function checkInputLength (input: HTMLInputElement, options: CheckInputLengthOptions) {
	switch (input.tagName) {
		case "INPUT": {
			return input.value.length > options.maxInputs? false: true;
		}
		case "TEXTAREA": {
			return input.value.length > options.maxAreas? false: true;
		}
		default: {
			return false;
		}
	}
}

export default Form;