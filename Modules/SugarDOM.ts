export const inlineCss = (e: HTMLElement, o: Object):void => {
	for (let j in o) {
		e.style[j] = o[j];
	}
}

export const create = (tag: string): HTMLElement => {
	return <HTMLElement>document.createElement(tag);
}

export const attachEvent = (e: HTMLElement, eName: string, callback: EventListener):void => {
	if ('addEventListener' in e) {
		e.addEventListener(eName, callback);
	}
}