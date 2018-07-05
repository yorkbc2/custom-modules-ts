interface ModalInterface {
	isOpened: boolean;
	container: any;
	constructor(containerSelector:string, options?: any|null);
}

class Modal {
	isOpened: boolean = false;
	container = null;
	constructor(containerSelector:string, options?: any|null) {
		this.container = document.querySelector(containerSelector);
		if (this.container) {
			this.addHandlers();
		}
		if (typeof options === 'object') {
			if ('toggleAfterLoad' in options && options.toggleAfterLoad === true) {
				this.toggle();
			}
		}
	}
	toggle() {
		this.isOpened = !this.isOpened;
		this.hideOrShowContainer();
	}
	hideOrShowContainer() {
		this.container.style.display = this.isOpened === true? 'block': 'none';
	}
	addHandlersToElements(elements) {
		elements.forEach((element:Element) => {
			element.addEventListener('click', this.toggle.bind(this));
		})
	}
	addHandlers() {
		const elementsToClose: NodeListOf<Element> = this.container.querySelectorAll('.modal-window-background, .modal-window-close');
		if (elementsToClose && elementsToClose.length > 0) {
			this.addHandlersToElements(elementsToClose)
		}
	}
	addToggleHandlerToButtons(selector:string) {
		if (typeof selector === 'string') {
			var buttons: NodeListOf<Element> = document.querySelectorAll(selector);
			if (buttons && buttons.length > 0) {
				this.addHandlersToElements(buttons)
			}
		}
		return false;
	}
}

export default Modal;