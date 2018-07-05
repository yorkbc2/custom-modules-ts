/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Components/Form.ts":
/*!****************************!*\
  !*** ./Components/Form.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AjaxModule_1 = __webpack_require__(/*! ./../Modules/AjaxModule */ "./Modules/AjaxModule.ts");
function addInputEvent(elements, data) {
    var _this = this;
    if (elements) {
        elements.forEach(function (i) {
            if ('addEventListener' in i) {
                if (i.name !== "") {
                    data[i.name] = i.value;
                }
                i.addEventListener('input', inputEvent.bind(_this, data));
            }
        });
    }
}
function inputEvent(data, event) {
    if (event.target.name !== "")
        data[event.target.name] = event.target.value;
}
function usePattern(pattern, value) {
    if (pattern.pattern.test) {
        return pattern.pattern.test(value);
    }
    else {
        return false;
    }
}
function checkPattern(input, patternList) {
    var currentPattern;
    var dataPattern = input.getAttribute('data-pattern') || '';
    if (dataPattern === null || dataPattern === '') {
        return true;
    }
    else {
        currentPattern = patternList.filter(function (p) { return p.name === dataPattern; })[0];
        if (currentPattern) {
            return usePattern(currentPattern, input.value);
        }
        else {
            return false;
        }
    }
}
var Form = /** @class */ (function () {
    function Form(selector) {
        this.data = {};
        this.successCallback = null;
        this.errorCallback = null;
        // errorPopupMessage: Element|null = null;
        // errorMessage: string = 'Это поле заполнено неправильно! Оно пустое либо не соответствует шаблону ввода.';
        this.patterns = [
            {
                name: "phone",
                pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
            }
        ];
        this.beforeSendCallback = function () {
            this.container.classList.add('form-loading');
        };
        this.container = document.querySelector(selector) || null;
        if (this.container) {
            var inputs = this.container.querySelectorAll('input, select, textarea');
            if (inputs && inputs.length > 0) {
                addInputEvent(inputs, this.data);
            }
            this.container.addEventListener('submit', this.submit.bind(this));
        }
    }
    Form.prototype.submit = function (event) {
        var _this = this;
        event.preventDefault();
        var action = event.target.getAttribute('action');
        var method = event.target.getAttribute('method') || "POST";
        var isPrepared = true;
        // this.removeErrorPopupMessage();
        for (var i in this.data) {
            var input = this.container.querySelector("input[name=\"" + i + "\"],select[name=\"" + i + "\"]");
            if (this.data[i] === "" || checkPattern(input, this.patterns) === false) {
                isPrepared = false;
                if (input.className.indexOf("form-error") == -1)
                    input.className = "form-error";
                // this.createErrorPopupMessage();
                break;
            }
            else {
                input.className = input.className.replace("form-error", "").trim();
            }
        }
        if (isPrepared === true) {
            this.beforeSendCallback();
            AjaxModule_1.sendPromisedRequest(action, {
                method: method,
                data: this.data
            }).then(function (response) {
                if (_this.successCallback !== null)
                    _this.successCallback(response, _this.container);
            }).catch(function (error) {
                if (_this.errorCallback !== null)
                    _this.errorCallback(error.message, _this.container);
            });
        }
    };
    Form.prototype.setBeforeSendCallback = function (callback) {
        if (typeof callback === 'function')
            this.beforeSendCallback = callback;
        else
            this.beforeSendCallback = null;
        return this;
    };
    Form.prototype.setSuccessCallback = function (callback) {
        if (typeof callback === 'function')
            this.successCallback = callback;
        else
            this.successCallback = null;
        return this;
    };
    Form.prototype.setErrorCallback = function (callback) {
        if (typeof callback === 'function')
            this.errorCallback = callback;
        else
            this.errorCallback = null;
        return this;
    };
    return Form;
}());
exports.default = Form;


/***/ }),

/***/ "./Components/FormInterfaces.ts":
/*!**************************************!*\
  !*** ./Components/FormInterfaces.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./Components/Modal.ts":
/*!*****************************!*\
  !*** ./Components/Modal.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Modal = /** @class */ (function () {
    function Modal(containerSelector, options) {
        this.isOpened = false;
        this.container = null;
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
    Modal.prototype.toggle = function () {
        this.isOpened = !this.isOpened;
        this.hideOrShowContainer();
    };
    Modal.prototype.hideOrShowContainer = function () {
        this.container.style.display = this.isOpened === true ? 'block' : 'none';
    };
    Modal.prototype.addHandlersToElements = function (elements) {
        var _this = this;
        elements.forEach(function (element) {
            element.addEventListener('click', _this.toggle.bind(_this));
        });
    };
    Modal.prototype.addHandlers = function () {
        var elementsToClose = this.container.querySelectorAll('.modal-window-background, .modal-window-close');
        if (elementsToClose && elementsToClose.length > 0) {
            this.addHandlersToElements(elementsToClose);
        }
    };
    Modal.prototype.addToggleHandlerToButtons = function (selector) {
        if (typeof selector === 'string') {
            var buttons = document.querySelectorAll(selector);
            if (buttons && buttons.length > 0) {
                this.addHandlersToElements(buttons);
            }
        }
        return false;
    };
    return Modal;
}());
exports.default = Modal;


/***/ }),

/***/ "./Modules/AjaxModule.ts":
/*!*******************************!*\
  !*** ./Modules/AjaxModule.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPromisedRequest = function (url, options) {
    if (url === void 0) { url = ""; }
    var method = options.method || "POST";
    var data = options.data || {};
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 301) {
                resolve(xhr.responseText);
            }
        };
        xhr.onerror = function () {
            if (xhr.readyState === 4) {
                reject({
                    core: xhr,
                    message: "Incorrect AJAX Request! Try again with another options."
                });
            }
        };
        method === "GET" ? xhr.send() : xhr.send(data);
    });
};


/***/ }),

/***/ "./Modules/SugarDOM.ts":
/*!*****************************!*\
  !*** ./Modules/SugarDOM.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.inlineCss = function (e, o) {
    for (var j in o) {
        e.style[j] = o[j];
    }
};
exports.create = function (tag) {
    return document.createElement(tag);
};
exports.attachEvent = function (e, eName, callback) {
    if ('addEventListener' in e) {
        e.addEventListener(eName, callback);
    }
};


/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Modal_1 = __webpack_require__(/*! ./Components/Modal */ "./Components/Modal.ts");
var Form_1 = __webpack_require__(/*! ./Components/Form */ "./Components/Form.ts");
__webpack_require__(/*! ./Modules/AjaxModule */ "./Modules/AjaxModule.ts");
__webpack_require__(/*! ./Modules/SugarDOM */ "./Modules/SugarDOM.ts");
__webpack_require__(/*! ./Components/FormInterfaces */ "./Components/FormInterfaces.ts");
(function () {
    window.Modal = Modal_1.default;
    window.Form = Form_1.default;
}());


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQ29tcG9uZW50cy9Gb3JtLnRzIiwid2VicGFjazovLy8uL0NvbXBvbmVudHMvTW9kYWwudHMiLCJ3ZWJwYWNrOi8vLy4vTW9kdWxlcy9BamF4TW9kdWxlLnRzIiwid2VicGFjazovLy8uL01vZHVsZXMvU3VnYXJET00udHMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLGlHQUVpQztBQVdqQyx1QkFBd0IsUUFBUSxFQUFFLElBQVc7SUFBN0MsaUJBV0M7SUFWQSxJQUFJLFFBQVEsRUFBRTtRQUNiLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBQztZQUNqQixJQUFJLGtCQUFrQixJQUFJLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLENBQUMsSUFBSSxL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RyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUM7QUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMxQlksaUJBQVMsR0FBRyxVQUFDLENBQWMsRUFBRSxDQUFTO0lBQ2xELEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2hCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xCO0FBQ0YsQ0FBQztBQUVZLGNBQU0sR0FBRyxVQUFDLEdBQVc7SUFDakMsT0FBb0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRVksbUJBQVcsR0FBRyxVQUFDLENBQWMsRUFBRSxLQUFhLEVBQUUsUUFBdUI7SUFDakYsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLEVBQUU7UUFDNUIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNwQztBQUNGLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2RELHFGQUF1QztBQUN2QyxrRkFBcUM7QUFDckMsMkVBQThCO0FBQzlCLHVFQUE0QjtBQUM1Qix5RkFBcUM7QUFFckMsQ0FBQztJQUNNLE1BQU8sQ0FBQyxLQUFLLEdBQUcsZUFBSyxDQUFDO0lBQ3RCLE1BQU8sQ0FBQyxJQUFJLEdBQUcsY0FBSSxDQUFDO0FBQzNCLENBQUMsRUFBRSxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7XHJcblx0c2VuZFByb21pc2VkUmVxdWVzdFxyXG59IGZyb20gXCIuLy4uL01vZHVsZXMvQWpheE1vZHVsZVwiO1xyXG4vLyBpbXBvcnQge1xyXG4vLyBcdGlubGluZUNzcyxcclxuLy8gXHRjcmVhdGUsXHJcbi8vIFx0YXR0YWNoRXZlbnRcclxuLy8gfSBmcm9tICcuLy4uL01vZHVsZXMvU3VnYXJET00nXHJcbmltcG9ydCB7XHJcblx0Rm9ybUludGVyZmFjZSxcclxuXHRGb3JtUGF0dGVyblxyXG59IGZyb20gXCIuL0Zvcm1JbnRlcmZhY2VzXCJcclxuXHJcbmZ1bmN0aW9uIGFkZElucHV0RXZlbnQgKGVsZW1lbnRzLCBkYXRhOk9iamVjdCkge1xyXG5cdGlmIChlbGVtZW50cykge1xyXG5cdFx0ZWxlbWVudHMuZm9yRWFjaChpID0+IHtcclxuXHRcdFx0aWYgKCdhZGRFdmVudExpc3RlbmVyJyBpbiBpKSB7XHJcblx0XHRcdFx0aWYgKGkubmFtZSAhPT0gXCJcIikge1xyXG5cdFx0XHRcdFx0ZGF0YVtpLm5hbWVdID0gaS52YWx1ZVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaW5wdXRFdmVudC5iaW5kKHRoaXMsIGRhdGEpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlucHV0RXZlbnQgKGRhdGE6T2JqZWN0LCBldmVudDogYW55KSB7XHJcblx0aWYgKGV2ZW50LnRhcmdldC5uYW1lICE9PSBcIlwiKVxyXG5cdFx0ZGF0YVtldmVudC50YXJnZXQubmFtZV0gPSBldmVudC50YXJnZXQudmFsdWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZVBhdHRlcm4gKHBhdHRlcm46IEZvcm1QYXR0ZXJuLCB2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0aWYgKHBhdHRlcm4ucGF0dGVybi50ZXN0KSB7XHJcblx0XHRyZXR1cm4gcGF0dGVybi5wYXR0ZXJuLnRlc3QodmFsdWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja1BhdHRlcm4gKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50LCBwYXR0ZXJuTGlzdDogRm9ybVBhdHRlcm5bXSk6Ym9vbGVhbiB7XHJcblx0dmFyIGN1cnJlbnRQYXR0ZXJuOiBGb3JtUGF0dGVybjsgXHJcblx0dmFyIGRhdGFQYXR0ZXJuOiBzdHJpbmcgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGF0dGVybicpIHx8ICcnO1xyXG5cdGlmIChkYXRhUGF0dGVybiA9PT0gbnVsbCB8fCBkYXRhUGF0dGVybiA9PT0gJycpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH0gZWxzZSB7XHJcblxyXG5cdFx0Y3VycmVudFBhdHRlcm4gPSBwYXR0ZXJuTGlzdC5maWx0ZXIocCA9PiBwLm5hbWUgPT09IGRhdGFQYXR0ZXJuKVswXTtcclxuXHJcblx0XHRpZiAoY3VycmVudFBhdHRlcm4pIHtcclxuXHJcblx0XHRcdHJldHVybiB1c2VQYXR0ZXJuKGN1cnJlbnRQYXR0ZXJuLCBpbnB1dC52YWx1ZSlcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0IFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBGb3JtIGltcGxlbWVudHMgRm9ybUludGVyZmFjZSB7XHJcblx0Y29udGFpbmVyOiBFbGVtZW50fG51bGw7XHJcblx0ZGF0YTogT2JqZWN0ID0ge307XHJcblx0c3VjY2Vzc0NhbGxiYWNrOiBGdW5jdGlvbnxudWxsID0gbnVsbDtcclxuXHRlcnJvckNhbGxiYWNrOiBGdW5jdGlvbnxudWxsID0gbnVsbDtcclxuXHQvLyBlcnJvclBvcHVwTWVzc2FnZTogRWxlbWVudHxudWxsID0gbnVsbDtcclxuXHQvLyBlcnJvck1lc3NhZ2U6IHN0cmluZyA9ICfQrdGC0L4g0L/QvtC70LUg0LfQsNC/0L7Qu9C90LXQvdC+INC90LXQv9GA0LDQstC40LvRjNC90L4hINCe0L3QviDQv9GD0YHRgtC+0LUg0LvQuNCx0L4g0L3QtSDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0LXRgiDRiNCw0LHQu9C+0L3RgyDQstCy0L7QtNCwLic7XHJcblx0cGF0dGVybnM6IEZvcm1QYXR0ZXJuW10gPSBbXHJcblx0XHR7XHJcblx0XHRcdG5hbWU6IFwicGhvbmVcIixcclxuXHRcdFx0cGF0dGVybjogL15bXFwrXT9bKF0/WzAtOV17M31bKV0/Wy1cXHNcXC5dP1swLTldezN9Wy1cXHNcXC5dP1swLTldezQsNn0kL2ltXHJcblx0XHR9XHJcblx0XTtcclxuXHRiZWZvcmVTZW5kQ2FsbGJhY2s6IEZ1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9ybS1sb2FkaW5nJyk7XHJcblx0fVxyXG5cdGNvbnN0cnVjdG9yKHNlbGVjdG9yOiBzdHJpbmcpIHtcclxuXHRcdHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgfHwgbnVsbDtcclxuXHRcdFxyXG5cdFx0aWYgKHRoaXMuY29udGFpbmVyKSB7XHJcblx0XHRcdHZhciBpbnB1dHM6IE5vZGVMaXN0T2Y8SFRNTElucHV0RWxlbWVudD4gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpO1xyXG5cdFx0XHRpZiAoaW5wdXRzICYmIGlucHV0cy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0YWRkSW5wdXRFdmVudChpbnB1dHMsIHRoaXMuZGF0YSlcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdC5iaW5kKHRoaXMpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN1Ym1pdChldmVudDphbnkpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcclxuXHRcdHZhciBhY3Rpb246c3RyaW5nID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnYWN0aW9uJyk7XHJcblx0XHR2YXIgbWV0aG9kOnN0cmluZyA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ21ldGhvZCcpIHx8IFwiUE9TVFwiO1xyXG5cdFx0dmFyIGlzUHJlcGFyZWQgPSB0cnVlO1xyXG5cdFx0Ly8gdGhpcy5yZW1vdmVFcnJvclBvcHVwTWVzc2FnZSgpO1xyXG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzLmRhdGEpIHtcclxuXHRcdFx0dmFyIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT1cIiR7aX1cIl0sc2VsZWN0W25hbWU9XCIke2l9XCJdYCk7XHJcblx0XHRcdGlmICh0aGlzLmRhdGFbaV0gPT09IFwiXCIgfHwgY2hlY2tQYXR0ZXJuKGlucHV0LCB0aGlzLnBhdHRlcm5zKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRpc1ByZXBhcmVkID0gZmFsc2U7XHJcblx0XHRcdFx0aWYgKGlucHV0LmNsYXNzTmFtZS5pbmRleE9mKFwiZm9ybS1lcnJvclwiKSA9PSAtMSkgaW5wdXQuY2xhc3NOYW1lID0gXCJmb3JtLWVycm9yXCI7XHJcblx0XHRcdFx0Ly8gdGhpcy5jcmVhdGVFcnJvclBvcHVwTWVzc2FnZSgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlucHV0LmNsYXNzTmFtZSA9IGlucHV0LmNsYXNzTmFtZS5yZXBsYWNlKFwiZm9ybS1lcnJvclwiLCBcIlwiKS50cmltKClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRpZiAoaXNQcmVwYXJlZCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHR0aGlzLmJlZm9yZVNlbmRDYWxsYmFjaygpXHJcblx0XHRcdHNlbmRQcm9taXNlZFJlcXVlc3QoYWN0aW9uLCB7XHJcblx0XHRcdFx0bWV0aG9kOiBtZXRob2QsXHJcblx0XHRcdFx0ZGF0YTogdGhpcy5kYXRhXHJcblx0XHRcdH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLnN1Y2Nlc3NDYWxsYmFjayAhPT0gbnVsbCkgdGhpcy5zdWNjZXNzQ2FsbGJhY2socmVzcG9uc2UsIHRoaXMuY29udGFpbmVyKTtcclxuXHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLmVycm9yQ2FsbGJhY2sgIT09IG51bGwpIHRoaXMuZXJyb3JDYWxsYmFjayhlcnJvci5tZXNzYWdlLCB0aGlzLmNvbnRhaW5lcik7XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXRCZWZvcmVTZW5kQ2FsbGJhY2sgKGNhbGxiYWNrOkZ1bmN0aW9uKSB7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB0aGlzLmJlZm9yZVNlbmRDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0ZWxzZSB0aGlzLmJlZm9yZVNlbmRDYWxsYmFjayA9IG51bGw7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblxyXG5cdHNldFN1Y2Nlc3NDYWxsYmFjayAoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB0aGlzLnN1Y2Nlc3NDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0ZWxzZSB0aGlzLnN1Y2Nlc3NDYWxsYmFjayA9IG51bGw7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblxyXG5cdHNldEVycm9yQ2FsbGJhY2sgKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5lcnJvckNhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRlbHNlIHRoaXMuZXJyb3JDYWxsYmFjayA9IG51bGw7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblxyXG5cdC8vIHNldEVycm9yTWVzc2FnZSAobWVzc2FnZTpzdHJpbmcpIHtcclxuXHQvLyBcdHRoaXMuZXJyb3JNZXNzYWdlID0gbWVzc2FnZTtcclxuXHQvLyB9XHJcblxyXG5cdC8vIHJlbW92ZUVycm9yUG9wdXBNZXNzYWdlICgpIHtcclxuXHQvLyBcdGlmICh0aGlzLmVycm9yUG9wdXBNZXNzYWdlICE9PSBudWxsKSB7XHJcblx0Ly8gXHRcdHRoaXMuZXJyb3JQb3B1cE1lc3NhZ2UucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVycm9yUG9wdXBNZXNzYWdlKTtcclxuXHQvLyBcdFx0dGhpcy5lcnJvclBvcHVwTWVzc2FnZSA9IG51bGw7XHJcblx0Ly8gXHR9XHJcblx0Ly8gfVxyXG5cclxuXHQvLyBjcmVhdGVFcnJvclBvcHVwTWVzc2FnZSAoKSB7XHJcblx0Ly8gXHRpZiAodGhpcy5lcnJvclBvcHVwTWVzc2FnZSA9PT0gbnVsbCkge1xyXG5cdC8vIFx0XHR0aGlzLmVycm9yUG9wdXBNZXNzYWdlID0gY3JlYXRlKCdkaXYnKTtcclxuXHQvLyBcdFx0dGhpcy5lcnJvclBvcHVwTWVzc2FnZS50ZXh0Q29udGVudCA9IHRoaXMuZXJyb3JNZXNzYWdlO1xyXG5cdC8vIFx0XHR0aGlzLmVycm9yUG9wdXBNZXNzYWdlLmNsYXNzTmFtZSA9IFwiZm9ybS1lcnJvci1wb3B1cC1tZXNzYWdlXCI7XHJcblx0Ly8gXHRcdGF0dGFjaEV2ZW50KDxIVE1MRWxlbWVudD50aGlzLmVycm9yUG9wdXBNZXNzYWdlLCAnY2xpY2snLCAoKSA9PiB7XHJcblx0Ly8gXHRcdFx0dGhpcy5yZW1vdmVFcnJvclBvcHVwTWVzc2FnZSgpO1xyXG5cdC8vIFx0XHR9KVxyXG5cdC8vIFx0XHR0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmVycm9yUG9wdXBNZXNzYWdlKTtcclxuXHQvLyBcdH1cclxuXHQvLyB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGb3JtOyIsImludGVyZmFjZSBNb2RhbEludGVyZmFjZSB7XHJcblx0aXNPcGVuZWQ6IGJvb2xlYW47XHJcblx0Y29udGFpbmVyOiBhbnk7XHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyU2VsZWN0b3I6c3RyaW5nLCBvcHRpb25zPzogYW55fG51bGwpO1xyXG59XHJcblxyXG5jbGFzcyBNb2RhbCB7XHJcblx0aXNPcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRjb250YWluZXIgPSBudWxsO1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lclNlbGVjdG9yOnN0cmluZywgb3B0aW9ucz86IGFueXxudWxsKSB7XHJcblx0XHR0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xyXG5cdFx0aWYgKHRoaXMuY29udGFpbmVyKSB7XHJcblx0XHRcdHRoaXMuYWRkSGFuZGxlcnMoKTtcclxuXHRcdH1cclxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aWYgKCd0b2dnbGVBZnRlckxvYWQnIGluIG9wdGlvbnMgJiYgb3B0aW9ucy50b2dnbGVBZnRlckxvYWQgPT09IHRydWUpIHtcclxuXHRcdFx0XHR0aGlzLnRvZ2dsZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHRvZ2dsZSgpIHtcclxuXHRcdHRoaXMuaXNPcGVuZWQgPSAhdGhpcy5pc09wZW5lZDtcclxuXHRcdHRoaXMuaGlkZU9yU2hvd0NvbnRhaW5lcigpO1xyXG5cdH1cclxuXHRoaWRlT3JTaG93Q29udGFpbmVyKCkge1xyXG5cdFx0dGhpcy5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9IHRoaXMuaXNPcGVuZWQgPT09IHRydWU/ICdibG9jayc6ICdub25lJztcclxuXHR9XHJcblx0YWRkSGFuZGxlcnNUb0VsZW1lbnRzKGVsZW1lbnRzKSB7XHJcblx0XHRlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50OkVsZW1lbnQpID0+IHtcclxuXHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlLmJpbmQodGhpcykpO1xyXG5cdFx0fSlcclxuXHR9XHJcblx0YWRkSGFuZGxlcnMoKSB7XHJcblx0XHRjb25zdCBlbGVtZW50c1RvQ2xvc2U6IE5vZGVMaXN0T2Y8RWxlbWVudD4gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwtd2luZG93LWJhY2tncm91bmQsIC5tb2RhbC13aW5kb3ctY2xvc2UnKTtcclxuXHRcdGlmIChlbGVtZW50c1RvQ2xvc2UgJiYgZWxlbWVudHNUb0Nsb3NlLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0dGhpcy5hZGRIYW5kbGVyc1RvRWxlbWVudHMoZWxlbWVudHNUb0Nsb3NlKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRhZGRUb2dnbGVIYW5kbGVyVG9CdXR0b25zKHNlbGVjdG9yOnN0cmluZykge1xyXG5cdFx0aWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dmFyIGJ1dHRvbnM6IE5vZGVMaXN0T2Y8RWxlbWVudD4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuXHRcdFx0aWYgKGJ1dHRvbnMgJiYgYnV0dG9ucy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dGhpcy5hZGRIYW5kbGVyc1RvRWxlbWVudHMoYnV0dG9ucylcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7IiwiZXhwb3J0IGNvbnN0IHNlbmRQcm9taXNlZFJlcXVlc3QgPSAodXJsPVwiXCIsIG9wdGlvbnMpID0+IHtcclxuXHR2YXIgbWV0aG9kOiBzdHJpbmcgPSBvcHRpb25zLm1ldGhvZCB8fCBcIlBPU1RcIjtcclxuXHR2YXIgZGF0YTogT2JqZWN0ID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xyXG5cclxuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0dmFyIHhocjogWE1MSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcblx0XHR4aHIub3BlbihtZXRob2QsIHVybCk7XHJcblxyXG5cdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDEpIHtcclxuXHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG5cdFx0XHRcdHJlamVjdCh7XHJcblx0XHRcdFx0XHRjb3JlOiB4aHIsXHJcblx0XHRcdFx0XHRtZXNzYWdlOiBcIkluY29ycmVjdCBBSkFYIFJlcXVlc3QhIFRyeSBhZ2FpbiB3aXRoIGFub3RoZXIgb3B0aW9ucy5cIlxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRtZXRob2QgPT09IFwiR0VUXCI/IHhoci5zZW5kKCk6IHhoci5zZW5kKGRhdGEpO1xyXG5cdH0pXHJcbn0iLCJleHBvcnQgY29uc3QgaW5saW5lQ3NzID0gKGU6IEhUTUxFbGVtZW50LCBvOiBPYmplY3QpOnZvaWQgPT4ge1xyXG5cdGZvciAobGV0IGogaW4gbykge1xyXG5cdFx0ZS5zdHlsZVtqXSA9IG9bal07XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlID0gKHRhZzogc3RyaW5nKTogSFRNTEVsZW1lbnQgPT4ge1xyXG5cdHJldHVybiA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYXR0YWNoRXZlbnQgPSAoZTogSFRNTEVsZW1lbnQsIGVOYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBFdmVudExpc3RlbmVyKTp2b2lkID0+IHtcclxuXHRpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIGUpIHtcclxuXHRcdGUuYWRkRXZlbnRMaXN0ZW5lcihlTmFtZSwgY2FsbGJhY2spO1xyXG5cdH1cclxufSIsImltcG9ydCBNb2RhbCBmcm9tICcuL0NvbXBvbmVudHMvTW9kYWwnO1xyXG5pbXBvcnQgRm9ybSBmcm9tICcuL0NvbXBvbmVudHMvRm9ybSc7XHJcbmltcG9ydCAnLi9Nb2R1bGVzL0FqYXhNb2R1bGUnO1xyXG5pbXBvcnQgJy4vTW9kdWxlcy9TdWdhckRPTSc7XHJcbmltcG9ydCAnLi9Db21wb25lbnRzL0Zvcm1JbnRlcmZhY2VzJztcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblx0KDxhbnk+d2luZG93KS5Nb2RhbCA9IE1vZGFsO1xyXG5cdCg8YW55PndpbmRvdykuRm9ybSA9IEZvcm07XHJcbn0oKSkiXSwic291cmNlUm9vdCI6IiJ9