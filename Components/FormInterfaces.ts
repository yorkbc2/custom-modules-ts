export interface CoordsObjectForInput {
	top: number;
	left: number;
}

export interface FormInterface {
	container: Element|null;
	data: Object;
	successCallback: Function|null;
	errorCallback: Function|null;
	// errorPopupMessage: Element|null;
	// errorMessage: string;
}

export interface FormPattern {
	name: string;
	pattern: RegExp;
}