export const sendPromisedRequest = (url="", options) => {
	var method: string = options.method || "POST";
	var data: Object = options.data || {};

	return new Promise((resolve, reject) => {
		var xhr: XMLHttpRequest = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = function () {
			if (xhr.status >= 200 && xhr.status < 301) {
				resolve(xhr.responseText);
			}
		}

		xhr.onerror = function () {
			if (xhr.readyState === 4) {
				reject({
					core: xhr,
					message: "Incorrect AJAX Request! Try again with another options."
				})
			}
		}

		method === "GET"? xhr.send(): xhr.send(JSON.stringify(data));
	})
}