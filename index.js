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
        xhr.setRequestHeader('Content-Type', 'application/json');
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
        method === "GET" ? xhr.send() : xhr.send(JSON.stringify(data));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQ29tcG9uZW50cy9Gb3JtLnRzIiwid2VicGFjazovLy8uL0NvbXBvbmVudHMvTW9kYWwudHMiLCJ3ZWJwYWNrOi8vLy4vTW9kdWxlcy9BamF4TW9kdWxlLnRzIiwid2VicGFjazovLy8uL01vZHVsZXMvU3VnYXJET00udHMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLGlHQUVpQztBQVdqQyx1QkFBd0IsUUFBUSxFQUFFLElBQVc7SUFBN0MsaUJBV0M7SUFWQSxJQUFJLFFBQVEsRUFBRTtRQUNiLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBQztZQUNqQixJQUFJLGtCQUFrQixJQUFJLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLENBQUMsSUFBSSxL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TSxLQUFLLEtBQUssRUFBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUMsQ0FBQztBQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3pCWSxpQkFBUyxHQUFHLFVBQUMsQ0FBYyxFQUFFLENBQVM7SUFDbEQsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDaEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbEI7QUFDRixDQUFDO0FBRVksY0FBTSxHQUFHLFVBQUMsR0FBVztJQUNqQyxPQUFvQixRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFWSxtQkFBVyxHQUFHLFVBQUMsQ0FBYyxFQUFFLEtBQWEsRUFBRSxRQUF1QjtJQUNqRixJQUFJLGtCQUFrQixJQUFJLENBQUMsRUFBRTtRQUM1QixDQUFDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ3BDO0FBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDZEQscUZBQXVDO0FBQ3ZDLGtGQUFxQztBQUNyQywyRUFBOEI7QUFDOUIsdUVBQTRCO0FBQzVCLHlGQUFxQztBQUVyQyxDQUFDO0lBQ00sTUFBTyxDQUFDLEtBQUssR0FBRyxlQUFLLENBQUM7SUFDdEIsTUFBTyxDQUFDLElBQUksR0FBRyxjQUFJLENBQUM7QUFDM0IsQ0FBQyxFQUFFLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHtcclxuXHRzZW5kUHJvbWlzZWRSZXF1ZXN0XHJcbn0gZnJvbSBcIi4vLi4vTW9kdWxlcy9BamF4TW9kdWxlXCI7XHJcbi8vIGltcG9ydCB7XHJcbi8vIFx0aW5saW5lQ3NzLFxyXG4vLyBcdGNyZWF0ZSxcclxuLy8gXHRhdHRhY2hFdmVudFxyXG4vLyB9IGZyb20gJy4vLi4vTW9kdWxlcy9TdWdhckRPTSdcclxuaW1wb3J0IHtcclxuXHRGb3JtSW50ZXJmYWNlLFxyXG5cdEZvcm1QYXR0ZXJuXHJcbn0gZnJvbSBcIi4vRm9ybUludGVyZmFjZXNcIlxyXG5cclxuZnVuY3Rpb24gYWRkSW5wdXRFdmVudCAoZWxlbWVudHMsIGRhdGE6T2JqZWN0KSB7XHJcblx0aWYgKGVsZW1lbnRzKSB7XHJcblx0XHRlbGVtZW50cy5mb3JFYWNoKGkgPT4ge1xyXG5cdFx0XHRpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIGkpIHtcclxuXHRcdFx0XHRpZiAoaS5uYW1lICE9PSBcIlwiKSB7XHJcblx0XHRcdFx0XHRkYXRhW2kubmFtZV0gPSBpLnZhbHVlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGkuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBpbnB1dEV2ZW50LmJpbmQodGhpcywgZGF0YSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5wdXRFdmVudCAoZGF0YTpPYmplY3QsIGV2ZW50OiBhbnkpIHtcclxuXHRpZiAoZXZlbnQudGFyZ2V0Lm5hbWUgIT09IFwiXCIpXHJcblx0XHRkYXRhW2V2ZW50LnRhcmdldC5uYW1lXSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXNlUGF0dGVybiAocGF0dGVybjogRm9ybVBhdHRlcm4sIHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRpZiAocGF0dGVybi5wYXR0ZXJuLnRlc3QpIHtcclxuXHRcdHJldHVybiBwYXR0ZXJuLnBhdHRlcm4udGVzdCh2YWx1ZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrUGF0dGVybiAoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQsIHBhdHRlcm5MaXN0OiBGb3JtUGF0dGVybltdKTpib29sZWFuIHtcclxuXHR2YXIgY3VycmVudFBhdHRlcm46IEZvcm1QYXR0ZXJuOyBcclxuXHR2YXIgZGF0YVBhdHRlcm46IHN0cmluZyA9IGlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1wYXR0ZXJuJykgfHwgJyc7XHJcblx0aWYgKGRhdGFQYXR0ZXJuID09PSBudWxsIHx8IGRhdGFQYXR0ZXJuID09PSAnJykge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSBlbHNlIHtcclxuXHJcblx0XHRjdXJyZW50UGF0dGVybiA9IHBhdHRlcm5MaXN0LmZpbHRlcihwID0+IHAubmFtZSA9PT0gZGF0YVBhdHRlcm4pWzBdO1xyXG5cclxuXHRcdGlmIChjdXJyZW50UGF0dGVybikge1xyXG5cclxuXHRcdFx0cmV0dXJuIHVzZVBhdHRlcm4oY3VycmVudFBhdHRlcm4sIGlucHV0LnZhbHVlKVxyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHQgXHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdH1cclxufVxyXG5cclxuXHJcbmNsYXNzIEZvcm0gaW1wbGVtZW50cyBGb3JtSW50ZXJmYWNlIHtcclxuXHRjb250YWluZXI6IEVsZW1lbnR8bnVsbDtcclxuXHRkYXRhOiBPYmplY3QgPSB7fTtcclxuXHRzdWNjZXNzQ2FsbGJhY2s6IEZ1bmN0aW9ufG51bGwgPSBudWxsO1xyXG5cdGVycm9yQ2FsbGJhY2s6IEZ1bmN0aW9ufG51bGwgPSBudWxsO1xyXG5cdC8vIGVycm9yUG9wdXBNZXNzYWdlOiBFbGVtZW50fG51bGwgPSBudWxsO1xyXG5cdC8vIGVycm9yTWVzc2FnZTogc3RyaW5nID0gJ9Ct0YLQviDQv9C+0LvQtSDQt9Cw0L/QvtC70L3QtdC90L4g0L3QtdC/0YDQsNCy0LjQu9GM0L3QviEg0J7QvdC+INC/0YPRgdGC0L7QtSDQu9C40LHQviDQvdC1INGB0L7QvtGC0LLQtdGC0YHRgtCy0YPQtdGCINGI0LDQsdC70L7QvdGDINCy0LLQvtC00LAuJztcclxuXHRwYXR0ZXJuczogRm9ybVBhdHRlcm5bXSA9IFtcclxuXHRcdHtcclxuXHRcdFx0bmFtZTogXCJwaG9uZVwiLFxyXG5cdFx0XHRwYXR0ZXJuOiAvXltcXCtdP1soXT9bMC05XXszfVspXT9bLVxcc1xcLl0/WzAtOV17M31bLVxcc1xcLl0/WzAtOV17NCw2fSQvaW1cclxuXHRcdH1cclxuXHRdO1xyXG5cdGJlZm9yZVNlbmRDYWxsYmFjazogRnVuY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmb3JtLWxvYWRpbmcnKTtcclxuXHR9XHJcblx0Y29uc3RydWN0b3Ioc2VsZWN0b3I6IHN0cmluZykge1xyXG5cdFx0dGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSB8fCBudWxsO1xyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5jb250YWluZXIpIHtcclxuXHRcdFx0dmFyIGlucHV0czogTm9kZUxpc3RPZjxIVE1MSW5wdXRFbGVtZW50PiA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJyk7XHJcblx0XHRcdGlmIChpbnB1dHMgJiYgaW5wdXRzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRhZGRJbnB1dEV2ZW50KGlucHV0cywgdGhpcy5kYXRhKVxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0LmJpbmQodGhpcykpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3VibWl0KGV2ZW50OmFueSkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFxyXG5cdFx0dmFyIGFjdGlvbjpzdHJpbmcgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdhY3Rpb24nKTtcclxuXHRcdHZhciBtZXRob2Q6c3RyaW5nID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnbWV0aG9kJykgfHwgXCJQT1NUXCI7XHJcblx0XHR2YXIgaXNQcmVwYXJlZCA9IHRydWU7XHJcblx0XHQvLyB0aGlzLnJlbW92ZUVycm9yUG9wdXBNZXNzYWdlKCk7XHJcblx0XHRmb3IgKHZhciBpIGluIHRoaXMuZGF0YSkge1xyXG5cdFx0XHR2YXIgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPVwiJHtpfVwiXSxzZWxlY3RbbmFtZT1cIiR7aX1cIl1gKTtcclxuXHRcdFx0aWYgKHRoaXMuZGF0YVtpXSA9PT0gXCJcIiB8fCBjaGVja1BhdHRlcm4oaW5wdXQsIHRoaXMucGF0dGVybnMpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdGlzUHJlcGFyZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRpZiAoaW5wdXQuY2xhc3NOYW1lLmluZGV4T2YoXCJmb3JtLWVycm9yXCIpID09IC0xKSBpbnB1dC5jbGFzc05hbWUgPSBcImZvcm0tZXJyb3JcIjtcclxuXHRcdFx0XHQvLyB0aGlzLmNyZWF0ZUVycm9yUG9wdXBNZXNzYWdlKCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aW5wdXQuY2xhc3NOYW1lID0gaW5wdXQuY2xhc3NOYW1lLnJlcGxhY2UoXCJmb3JtLWVycm9yXCIsIFwiXCIpLnRyaW0oKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGlmIChpc1ByZXBhcmVkID09PSB0cnVlKSB7XHJcblx0XHRcdHRoaXMuYmVmb3JlU2VuZENhbGxiYWNrKClcclxuXHRcdFx0c2VuZFByb21pc2VkUmVxdWVzdChhY3Rpb24sIHtcclxuXHRcdFx0XHRtZXRob2Q6IG1ldGhvZCxcclxuXHRcdFx0XHRkYXRhOiB0aGlzLmRhdGFcclxuXHRcdFx0fSkudGhlbihyZXNwb25zZSA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMuc3VjY2Vzc0NhbGxiYWNrICE9PSBudWxsKSB0aGlzLnN1Y2Nlc3NDYWxsYmFjayhyZXNwb25zZSwgdGhpcy5jb250YWluZXIpO1xyXG5cdFx0XHR9KS5jYXRjaChlcnJvciA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMuZXJyb3JDYWxsYmFjayAhPT0gbnVsbCkgdGhpcy5lcnJvckNhbGxiYWNrKGVycm9yLm1lc3NhZ2UsIHRoaXMuY29udGFpbmVyKTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNldEJlZm9yZVNlbmRDYWxsYmFjayAoY2FsbGJhY2s6RnVuY3Rpb24pIHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHRoaXMuYmVmb3JlU2VuZENhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRlbHNlIHRoaXMuYmVmb3JlU2VuZENhbGxiYWNrID0gbnVsbDtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0c2V0U3VjY2Vzc0NhbGxiYWNrIChjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHRoaXMuc3VjY2Vzc0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRlbHNlIHRoaXMuc3VjY2Vzc0NhbGxiYWNrID0gbnVsbDtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0c2V0RXJyb3JDYWxsYmFjayAoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB0aGlzLmVycm9yQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdGVsc2UgdGhpcy5lcnJvckNhbGxiYWNrID0gbnVsbDtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0Ly8gc2V0RXJyb3JNZXNzYWdlIChtZXNzYWdlOnN0cmluZykge1xyXG5cdC8vIFx0dGhpcy5lcnJvck1lc3NhZ2UgPSBtZXNzYWdlO1xyXG5cdC8vIH1cclxuXHJcblx0Ly8gcmVtb3ZlRXJyb3JQb3B1cE1lc3NhZ2UgKCkge1xyXG5cdC8vIFx0aWYgKHRoaXMuZXJyb3JQb3B1cE1lc3NhZ2UgIT09IG51bGwpIHtcclxuXHQvLyBcdFx0dGhpcy5lcnJvclBvcHVwTWVzc2FnZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZXJyb3JQb3B1cE1lc3NhZ2UpO1xyXG5cdC8vIFx0XHR0aGlzLmVycm9yUG9wdXBNZXNzYWdlID0gbnVsbDtcclxuXHQvLyBcdH1cclxuXHQvLyB9XHJcblxyXG5cdC8vIGNyZWF0ZUVycm9yUG9wdXBNZXNzYWdlICgpIHtcclxuXHQvLyBcdGlmICh0aGlzLmVycm9yUG9wdXBNZXNzYWdlID09PSBudWxsKSB7XHJcblx0Ly8gXHRcdHRoaXMuZXJyb3JQb3B1cE1lc3NhZ2UgPSBjcmVhdGUoJ2RpdicpO1xyXG5cdC8vIFx0XHR0aGlzLmVycm9yUG9wdXBNZXNzYWdlLnRleHRDb250ZW50ID0gdGhpcy5lcnJvck1lc3NhZ2U7XHJcblx0Ly8gXHRcdHRoaXMuZXJyb3JQb3B1cE1lc3NhZ2UuY2xhc3NOYW1lID0gXCJmb3JtLWVycm9yLXBvcHVwLW1lc3NhZ2VcIjtcclxuXHQvLyBcdFx0YXR0YWNoRXZlbnQoPEhUTUxFbGVtZW50PnRoaXMuZXJyb3JQb3B1cE1lc3NhZ2UsICdjbGljaycsICgpID0+IHtcclxuXHQvLyBcdFx0XHR0aGlzLnJlbW92ZUVycm9yUG9wdXBNZXNzYWdlKCk7XHJcblx0Ly8gXHRcdH0pXHJcblx0Ly8gXHRcdHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZXJyb3JQb3B1cE1lc3NhZ2UpO1xyXG5cdC8vIFx0fVxyXG5cdC8vIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZvcm07IiwiaW50ZXJmYWNlIE1vZGFsSW50ZXJmYWNlIHtcclxuXHRpc09wZW5lZDogYm9vbGVhbjtcclxuXHRjb250YWluZXI6IGFueTtcclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXJTZWxlY3RvcjpzdHJpbmcsIG9wdGlvbnM/OiBhbnl8bnVsbCk7XHJcbn1cclxuXHJcbmNsYXNzIE1vZGFsIHtcclxuXHRpc09wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdGNvbnRhaW5lciA9IG51bGw7XHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyU2VsZWN0b3I6c3RyaW5nLCBvcHRpb25zPzogYW55fG51bGwpIHtcclxuXHRcdHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XHJcblx0XHRpZiAodGhpcy5jb250YWluZXIpIHtcclxuXHRcdFx0dGhpcy5hZGRIYW5kbGVycygpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpZiAoJ3RvZ2dsZUFmdGVyTG9hZCcgaW4gb3B0aW9ucyAmJiBvcHRpb25zLnRvZ2dsZUFmdGVyTG9hZCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHRoaXMudG9nZ2xlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0dG9nZ2xlKCkge1xyXG5cdFx0dGhpcy5pc09wZW5lZCA9ICF0aGlzLmlzT3BlbmVkO1xyXG5cdFx0dGhpcy5oaWRlT3JTaG93Q29udGFpbmVyKCk7XHJcblx0fVxyXG5cdGhpZGVPclNob3dDb250YWluZXIoKSB7XHJcblx0XHR0aGlzLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gdGhpcy5pc09wZW5lZCA9PT0gdHJ1ZT8gJ2Jsb2NrJzogJ25vbmUnO1xyXG5cdH1cclxuXHRhZGRIYW5kbGVyc1RvRWxlbWVudHMoZWxlbWVudHMpIHtcclxuXHRcdGVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQ6RWxlbWVudCkgPT4ge1xyXG5cdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGUuYmluZCh0aGlzKSk7XHJcblx0XHR9KVxyXG5cdH1cclxuXHRhZGRIYW5kbGVycygpIHtcclxuXHRcdGNvbnN0IGVsZW1lbnRzVG9DbG9zZTogTm9kZUxpc3RPZjxFbGVtZW50PiA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbC13aW5kb3ctYmFja2dyb3VuZCwgLm1vZGFsLXdpbmRvdy1jbG9zZScpO1xyXG5cdFx0aWYgKGVsZW1lbnRzVG9DbG9zZSAmJiBlbGVtZW50c1RvQ2xvc2UubGVuZ3RoID4gMCkge1xyXG5cdFx0XHR0aGlzLmFkZEhhbmRsZXJzVG9FbGVtZW50cyhlbGVtZW50c1RvQ2xvc2UpXHJcblx0XHR9XHJcblx0fVxyXG5cdGFkZFRvZ2dsZUhhbmRsZXJUb0J1dHRvbnMoc2VsZWN0b3I6c3RyaW5nKSB7XHJcblx0XHRpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR2YXIgYnV0dG9uczogTm9kZUxpc3RPZjxFbGVtZW50PiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cdFx0XHRpZiAoYnV0dG9ucyAmJiBidXR0b25zLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR0aGlzLmFkZEhhbmRsZXJzVG9FbGVtZW50cyhidXR0b25zKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RhbDsiLCJleHBvcnQgY29uc3Qgc2VuZFByb21pc2VkUmVxdWVzdCA9ICh1cmw9XCJcIiwgb3B0aW9ucykgPT4ge1xyXG5cdHZhciBtZXRob2Q6IHN0cmluZyA9IG9wdGlvbnMubWV0aG9kIHx8IFwiUE9TVFwiO1xyXG5cdHZhciBkYXRhOiBPYmplY3QgPSBvcHRpb25zLmRhdGEgfHwge307XHJcblxyXG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHR2YXIgeGhyOiBYTUxIdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwpO1xyXG5cdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMSkge1xyXG5cdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcblx0XHRcdFx0cmVqZWN0KHtcclxuXHRcdFx0XHRcdGNvcmU6IHhocixcclxuXHRcdFx0XHRcdG1lc3NhZ2U6IFwiSW5jb3JyZWN0IEFKQVggUmVxdWVzdCEgVHJ5IGFnYWluIHdpdGggYW5vdGhlciBvcHRpb25zLlwiXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG1ldGhvZCA9PT0gXCJHRVRcIj8geGhyLnNlbmQoKTogeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG5cdH0pXHJcbn0iLCJleHBvcnQgY29uc3QgaW5saW5lQ3NzID0gKGU6IEhUTUxFbGVtZW50LCBvOiBPYmplY3QpOnZvaWQgPT4ge1xyXG5cdGZvciAobGV0IGogaW4gbykge1xyXG5cdFx0ZS5zdHlsZVtqXSA9IG9bal07XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlID0gKHRhZzogc3RyaW5nKTogSFRNTEVsZW1lbnQgPT4ge1xyXG5cdHJldHVybiA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYXR0YWNoRXZlbnQgPSAoZTogSFRNTEVsZW1lbnQsIGVOYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBFdmVudExpc3RlbmVyKTp2b2lkID0+IHtcclxuXHRpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIGUpIHtcclxuXHRcdGUuYWRkRXZlbnRMaXN0ZW5lcihlTmFtZSwgY2FsbGJhY2spO1xyXG5cdH1cclxufSIsImltcG9ydCBNb2RhbCBmcm9tICcuL0NvbXBvbmVudHMvTW9kYWwnO1xyXG5pbXBvcnQgRm9ybSBmcm9tICcuL0NvbXBvbmVudHMvRm9ybSc7XHJcbmltcG9ydCAnLi9Nb2R1bGVzL0FqYXhNb2R1bGUnO1xyXG5pbXBvcnQgJy4vTW9kdWxlcy9TdWdhckRPTSc7XHJcbmltcG9ydCAnLi9Db21wb25lbnRzL0Zvcm1JbnRlcmZhY2VzJztcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblx0KDxhbnk+d2luZG93KS5Nb2RhbCA9IE1vZGFsO1xyXG5cdCg8YW55PndpbmRvdykuRm9ybSA9IEZvcm07XHJcbn0oKSkgICJdLCJzb3VyY2VSb290IjoiIn0=