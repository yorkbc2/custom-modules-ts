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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQ29tcG9uZW50cy9Gb3JtLnRzIiwid2VicGFjazovLy8uL0NvbXBvbmVudHMvTW9kYWwudHMiLCJ3ZWJwYWNrOi8vLy4vTW9kdWxlcy9BamF4TW9kdWxlLnRzIiwid2VicGFjazovLy8uL01vZHVsZXMvU3VnYXJET00udHMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLGlHQUVpQztBQVdqQyx1QkFBd0IsUUFBUSxFQUFFLElBQVc7SUFBN0MsaUJBV0M7SUFWQSxJQUFJLFFBQVEsRUFBRTtRQUNiLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBQztZQUNqQixJQUFJLGtCQUFrQixJQUFJLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLENBQUMsSUFBSSxL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TSxLQUFLLEtBQUssRUFBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDekJZLGlCQUFTLEdBQUcsVUFBQyxDQUFjLEVBQUUsQ0FBUztJQUNsRCxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNoQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNsQjtBQUNGLENBQUM7QUFFWSxjQUFNLEdBQUcsVUFBQyxHQUFXO0lBQ2pDLE9BQW9CLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVZLG1CQUFXLEdBQUcsVUFBQyxDQUFjLEVBQUUsS0FBYSxFQUFFLFFBQXVCO0lBQ2pGLElBQUksa0JBQWtCLElBQUksQ0FBQyxFQUFFO1FBQzVCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDcEM7QUFDRixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNkRCxxRkFBdUM7QUFDdkMsa0ZBQXFDO0FBQ3JDLDJFQUE4QjtBQUM5Qix1RUFBNEI7QUFDNUIseUZBQXFDO0FBRXJDLENBQUM7SUFDTSxNQUFPLENBQUMsS0FBSyxHQUFHLGVBQUssQ0FBQztJQUN0QixNQUFPLENBQUMsSUFBSSxHQUFHLGNBQUksQ0FBQztBQUMzQixDQUFDLEVBQUUsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXgudHNcIik7XG4iLCJpbXBvcnQge1xyXG5cdHNlbmRQcm9taXNlZFJlcXVlc3RcclxufSBmcm9tIFwiLi8uLi9Nb2R1bGVzL0FqYXhNb2R1bGVcIjtcclxuLy8gaW1wb3J0IHtcclxuLy8gXHRpbmxpbmVDc3MsXHJcbi8vIFx0Y3JlYXRlLFxyXG4vLyBcdGF0dGFjaEV2ZW50XHJcbi8vIH0gZnJvbSAnLi8uLi9Nb2R1bGVzL1N1Z2FyRE9NJ1xyXG5pbXBvcnQge1xyXG5cdEZvcm1JbnRlcmZhY2UsXHJcblx0Rm9ybVBhdHRlcm5cclxufSBmcm9tIFwiLi9Gb3JtSW50ZXJmYWNlc1wiXHJcblxyXG5mdW5jdGlvbiBhZGRJbnB1dEV2ZW50IChlbGVtZW50cywgZGF0YTpPYmplY3QpIHtcclxuXHRpZiAoZWxlbWVudHMpIHtcclxuXHRcdGVsZW1lbnRzLmZvckVhY2goaSA9PiB7XHJcblx0XHRcdGlmICgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gaSkge1xyXG5cdFx0XHRcdGlmIChpLm5hbWUgIT09IFwiXCIpIHtcclxuXHRcdFx0XHRcdGRhdGFbaS5uYW1lXSA9IGkudmFsdWVcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGlucHV0RXZlbnQuYmluZCh0aGlzLCBkYXRhKSk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnB1dEV2ZW50IChkYXRhOk9iamVjdCwgZXZlbnQ6IGFueSkge1xyXG5cdGlmIChldmVudC50YXJnZXQubmFtZSAhPT0gXCJcIilcclxuXHRcdGRhdGFbZXZlbnQudGFyZ2V0Lm5hbWVdID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1c2VQYXR0ZXJuIChwYXR0ZXJuOiBGb3JtUGF0dGVybiwgdmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdGlmIChwYXR0ZXJuLnBhdHRlcm4udGVzdCkge1xyXG5cdFx0cmV0dXJuIHBhdHRlcm4ucGF0dGVybi50ZXN0KHZhbHVlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tQYXR0ZXJuIChpbnB1dDogSFRNTElucHV0RWxlbWVudCwgcGF0dGVybkxpc3Q6IEZvcm1QYXR0ZXJuW10pOmJvb2xlYW4ge1xyXG5cdHZhciBjdXJyZW50UGF0dGVybjogRm9ybVBhdHRlcm47IFxyXG5cdHZhciBkYXRhUGF0dGVybjogc3RyaW5nID0gaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBhdHRlcm4nKSB8fCAnJztcclxuXHRpZiAoZGF0YVBhdHRlcm4gPT09IG51bGwgfHwgZGF0YVBhdHRlcm4gPT09ICcnKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9IGVsc2Uge1xyXG5cclxuXHRcdGN1cnJlbnRQYXR0ZXJuID0gcGF0dGVybkxpc3QuZmlsdGVyKHAgPT4gcC5uYW1lID09PSBkYXRhUGF0dGVybilbMF07XHJcblxyXG5cdFx0aWYgKGN1cnJlbnRQYXR0ZXJuKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gdXNlUGF0dGVybihjdXJyZW50UGF0dGVybiwgaW5wdXQudmFsdWUpXHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdCBcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG59XHJcblxyXG5cclxuY2xhc3MgRm9ybSBpbXBsZW1lbnRzIEZvcm1JbnRlcmZhY2Uge1xyXG5cdGNvbnRhaW5lcjogRWxlbWVudHxudWxsO1xyXG5cdGRhdGE6IE9iamVjdCA9IHt9O1xyXG5cdHN1Y2Nlc3NDYWxsYmFjazogRnVuY3Rpb258bnVsbCA9IG51bGw7XHJcblx0ZXJyb3JDYWxsYmFjazogRnVuY3Rpb258bnVsbCA9IG51bGw7XHJcblx0Ly8gZXJyb3JQb3B1cE1lc3NhZ2U6IEVsZW1lbnR8bnVsbCA9IG51bGw7XHJcblx0Ly8gZXJyb3JNZXNzYWdlOiBzdHJpbmcgPSAn0K3RgtC+INC/0L7Qu9C1INC30LDQv9C+0LvQvdC10L3QviDQvdC10L/RgNCw0LLQuNC70YzQvdC+ISDQntC90L4g0L/Rg9GB0YLQvtC1INC70LjQsdC+INC90LUg0YHQvtC+0YLQstC10YLRgdGC0LLRg9C10YIg0YjQsNCx0LvQvtC90YMg0LLQstC+0LTQsC4nO1xyXG5cdHBhdHRlcm5zOiBGb3JtUGF0dGVybltdID0gW1xyXG5cdFx0e1xyXG5cdFx0XHRuYW1lOiBcInBob25lXCIsXHJcblx0XHRcdHBhdHRlcm46IC9eW1xcK10/WyhdP1swLTldezN9WyldP1stXFxzXFwuXT9bMC05XXszfVstXFxzXFwuXT9bMC05XXs0LDZ9JC9pbVxyXG5cdFx0fVxyXG5cdF07XHJcblx0YmVmb3JlU2VuZENhbGxiYWNrOiBGdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Zvcm0tbG9hZGluZycpO1xyXG5cdH1cclxuXHRjb25zdHJ1Y3RvcihzZWxlY3Rvcjogc3RyaW5nKSB7XHJcblx0XHR0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIHx8IG51bGw7XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLmNvbnRhaW5lcikge1xyXG5cdFx0XHR2YXIgaW5wdXRzOiBOb2RlTGlzdE9mPEhUTUxJbnB1dEVsZW1lbnQ+ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKTtcclxuXHRcdFx0aWYgKGlucHV0cyAmJiBpbnB1dHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdGFkZElucHV0RXZlbnQoaW5wdXRzLCB0aGlzLmRhdGEpXHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXQuYmluZCh0aGlzKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdWJtaXQoZXZlbnQ6YW55KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHJcblx0XHR2YXIgYWN0aW9uOnN0cmluZyA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FjdGlvbicpO1xyXG5cdFx0dmFyIG1ldGhvZDpzdHJpbmcgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdtZXRob2QnKSB8fCBcIlBPU1RcIjtcclxuXHRcdHZhciBpc1ByZXBhcmVkID0gdHJ1ZTtcclxuXHRcdC8vIHRoaXMucmVtb3ZlRXJyb3JQb3B1cE1lc3NhZ2UoKTtcclxuXHRcdGZvciAodmFyIGkgaW4gdGhpcy5kYXRhKSB7XHJcblx0XHRcdHZhciBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9XCIke2l9XCJdLHNlbGVjdFtuYW1lPVwiJHtpfVwiXWApO1xyXG5cdFx0XHRpZiAodGhpcy5kYXRhW2ldID09PSBcIlwiIHx8IGNoZWNrUGF0dGVybihpbnB1dCwgdGhpcy5wYXR0ZXJucykgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0aXNQcmVwYXJlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdGlmIChpbnB1dC5jbGFzc05hbWUuaW5kZXhPZihcImZvcm0tZXJyb3JcIikgPT0gLTEpIGlucHV0LmNsYXNzTmFtZSA9IFwiZm9ybS1lcnJvclwiO1xyXG5cdFx0XHRcdC8vIHRoaXMuY3JlYXRlRXJyb3JQb3B1cE1lc3NhZ2UoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpbnB1dC5jbGFzc05hbWUgPSBpbnB1dC5jbGFzc05hbWUucmVwbGFjZShcImZvcm0tZXJyb3JcIiwgXCJcIikudHJpbSgpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblxyXG5cdFx0aWYgKGlzUHJlcGFyZWQgPT09IHRydWUpIHtcclxuXHRcdFx0dGhpcy5iZWZvcmVTZW5kQ2FsbGJhY2soKVxyXG5cdFx0XHRzZW5kUHJvbWlzZWRSZXF1ZXN0KGFjdGlvbiwge1xyXG5cdFx0XHRcdG1ldGhvZDogbWV0aG9kLFxyXG5cdFx0XHRcdGRhdGE6IHRoaXMuZGF0YVxyXG5cdFx0XHR9KS50aGVuKHJlc3BvbnNlID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy5zdWNjZXNzQ2FsbGJhY2sgIT09IG51bGwpIHRoaXMuc3VjY2Vzc0NhbGxiYWNrKHJlc3BvbnNlLCB0aGlzLmNvbnRhaW5lcik7XHJcblx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy5lcnJvckNhbGxiYWNrICE9PSBudWxsKSB0aGlzLmVycm9yQ2FsbGJhY2soZXJyb3IubWVzc2FnZSwgdGhpcy5jb250YWluZXIpO1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0QmVmb3JlU2VuZENhbGxiYWNrIChjYWxsYmFjazpGdW5jdGlvbikge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5iZWZvcmVTZW5kQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdGVsc2UgdGhpcy5iZWZvcmVTZW5kQ2FsbGJhY2sgPSBudWxsO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHRzZXRTdWNjZXNzQ2FsbGJhY2sgKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5zdWNjZXNzQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdGVsc2UgdGhpcy5zdWNjZXNzQ2FsbGJhY2sgPSBudWxsO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHRzZXRFcnJvckNhbGxiYWNrIChjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHRoaXMuZXJyb3JDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0ZWxzZSB0aGlzLmVycm9yQ2FsbGJhY2sgPSBudWxsO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHQvLyBzZXRFcnJvck1lc3NhZ2UgKG1lc3NhZ2U6c3RyaW5nKSB7XHJcblx0Ly8gXHR0aGlzLmVycm9yTWVzc2FnZSA9IG1lc3NhZ2U7XHJcblx0Ly8gfVxyXG5cclxuXHQvLyByZW1vdmVFcnJvclBvcHVwTWVzc2FnZSAoKSB7XHJcblx0Ly8gXHRpZiAodGhpcy5lcnJvclBvcHVwTWVzc2FnZSAhPT0gbnVsbCkge1xyXG5cdC8vIFx0XHR0aGlzLmVycm9yUG9wdXBNZXNzYWdlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lcnJvclBvcHVwTWVzc2FnZSk7XHJcblx0Ly8gXHRcdHRoaXMuZXJyb3JQb3B1cE1lc3NhZ2UgPSBudWxsO1xyXG5cdC8vIFx0fVxyXG5cdC8vIH1cclxuXHJcblx0Ly8gY3JlYXRlRXJyb3JQb3B1cE1lc3NhZ2UgKCkge1xyXG5cdC8vIFx0aWYgKHRoaXMuZXJyb3JQb3B1cE1lc3NhZ2UgPT09IG51bGwpIHtcclxuXHQvLyBcdFx0dGhpcy5lcnJvclBvcHVwTWVzc2FnZSA9IGNyZWF0ZSgnZGl2Jyk7XHJcblx0Ly8gXHRcdHRoaXMuZXJyb3JQb3B1cE1lc3NhZ2UudGV4dENvbnRlbnQgPSB0aGlzLmVycm9yTWVzc2FnZTtcclxuXHQvLyBcdFx0dGhpcy5lcnJvclBvcHVwTWVzc2FnZS5jbGFzc05hbWUgPSBcImZvcm0tZXJyb3ItcG9wdXAtbWVzc2FnZVwiO1xyXG5cdC8vIFx0XHRhdHRhY2hFdmVudCg8SFRNTEVsZW1lbnQ+dGhpcy5lcnJvclBvcHVwTWVzc2FnZSwgJ2NsaWNrJywgKCkgPT4ge1xyXG5cdC8vIFx0XHRcdHRoaXMucmVtb3ZlRXJyb3JQb3B1cE1lc3NhZ2UoKTtcclxuXHQvLyBcdFx0fSlcclxuXHQvLyBcdFx0dGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lcnJvclBvcHVwTWVzc2FnZSk7XHJcblx0Ly8gXHR9XHJcblx0Ly8gfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRm9ybTsiLCJpbnRlcmZhY2UgTW9kYWxJbnRlcmZhY2Uge1xyXG5cdGlzT3BlbmVkOiBib29sZWFuO1xyXG5cdGNvbnRhaW5lcjogYW55O1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lclNlbGVjdG9yOnN0cmluZywgb3B0aW9ucz86IGFueXxudWxsKTtcclxufVxyXG5cclxuY2xhc3MgTW9kYWwge1xyXG5cdGlzT3BlbmVkOiBib29sZWFuID0gZmFsc2U7XHJcblx0Y29udGFpbmVyID0gbnVsbDtcclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXJTZWxlY3RvcjpzdHJpbmcsIG9wdGlvbnM/OiBhbnl8bnVsbCkge1xyXG5cdFx0dGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcclxuXHRcdGlmICh0aGlzLmNvbnRhaW5lcikge1xyXG5cdFx0XHR0aGlzLmFkZEhhbmRsZXJzKCk7XHJcblx0XHR9XHJcblx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdGlmICgndG9nZ2xlQWZ0ZXJMb2FkJyBpbiBvcHRpb25zICYmIG9wdGlvbnMudG9nZ2xlQWZ0ZXJMb2FkID09PSB0cnVlKSB7XHJcblx0XHRcdFx0dGhpcy50b2dnbGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHR0b2dnbGUoKSB7XHJcblx0XHR0aGlzLmlzT3BlbmVkID0gIXRoaXMuaXNPcGVuZWQ7XHJcblx0XHR0aGlzLmhpZGVPclNob3dDb250YWluZXIoKTtcclxuXHR9XHJcblx0aGlkZU9yU2hvd0NvbnRhaW5lcigpIHtcclxuXHRcdHRoaXMuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSB0aGlzLmlzT3BlbmVkID09PSB0cnVlPyAnYmxvY2snOiAnbm9uZSc7XHJcblx0fVxyXG5cdGFkZEhhbmRsZXJzVG9FbGVtZW50cyhlbGVtZW50cykge1xyXG5cdFx0ZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudDpFbGVtZW50KSA9PiB7XHJcblx0XHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKTtcclxuXHRcdH0pXHJcblx0fVxyXG5cdGFkZEhhbmRsZXJzKCkge1xyXG5cdFx0Y29uc3QgZWxlbWVudHNUb0Nsb3NlOiBOb2RlTGlzdE9mPEVsZW1lbnQ+ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLm1vZGFsLXdpbmRvdy1iYWNrZ3JvdW5kLCAubW9kYWwtd2luZG93LWNsb3NlJyk7XHJcblx0XHRpZiAoZWxlbWVudHNUb0Nsb3NlICYmIGVsZW1lbnRzVG9DbG9zZS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHRoaXMuYWRkSGFuZGxlcnNUb0VsZW1lbnRzKGVsZW1lbnRzVG9DbG9zZSlcclxuXHRcdH1cclxuXHR9XHJcblx0YWRkVG9nZ2xlSGFuZGxlclRvQnV0dG9ucyhzZWxlY3RvcjpzdHJpbmcpIHtcclxuXHRcdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHZhciBidXR0b25zOiBOb2RlTGlzdE9mPEVsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcblx0XHRcdGlmIChidXR0b25zICYmIGJ1dHRvbnMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHRoaXMuYWRkSGFuZGxlcnNUb0VsZW1lbnRzKGJ1dHRvbnMpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGFsOyIsImV4cG9ydCBjb25zdCBzZW5kUHJvbWlzZWRSZXF1ZXN0ID0gKHVybD1cIlwiLCBvcHRpb25zKSA9PiB7XHJcblx0dmFyIG1ldGhvZDogc3RyaW5nID0gb3B0aW9ucy5tZXRob2QgfHwgXCJQT1NUXCI7XHJcblx0dmFyIGRhdGE6IE9iamVjdCA9IG9wdGlvbnMuZGF0YSB8fCB7fTtcclxuXHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdHZhciB4aHI6IFhNTEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblx0XHR4aHIub3BlbihtZXRob2QsIHVybCk7XHJcblx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAxKSB7XHJcblx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuXHRcdFx0XHRyZWplY3Qoe1xyXG5cdFx0XHRcdFx0Y29yZTogeGhyLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTogXCJJbmNvcnJlY3QgQUpBWCBSZXF1ZXN0ISBUcnkgYWdhaW4gd2l0aCBhbm90aGVyIG9wdGlvbnMuXCJcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0bWV0aG9kID09PSBcIkdFVFwiPyB4aHIuc2VuZCgpOiB4aHIuc2VuZChkYXRhKTtcclxuXHR9KVxyXG59IiwiZXhwb3J0IGNvbnN0IGlubGluZUNzcyA9IChlOiBIVE1MRWxlbWVudCwgbzogT2JqZWN0KTp2b2lkID0+IHtcclxuXHRmb3IgKGxldCBqIGluIG8pIHtcclxuXHRcdGUuc3R5bGVbal0gPSBvW2pdO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9ICh0YWc6IHN0cmluZyk6IEhUTUxFbGVtZW50ID0+IHtcclxuXHRyZXR1cm4gPEhUTUxFbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGF0dGFjaEV2ZW50ID0gKGU6IEhUTUxFbGVtZW50LCBlTmFtZTogc3RyaW5nLCBjYWxsYmFjazogRXZlbnRMaXN0ZW5lcik6dm9pZCA9PiB7XHJcblx0aWYgKCdhZGRFdmVudExpc3RlbmVyJyBpbiBlKSB7XHJcblx0XHRlLmFkZEV2ZW50TGlzdGVuZXIoZU5hbWUsIGNhbGxiYWNrKTtcclxuXHR9XHJcbn0iLCJpbXBvcnQgTW9kYWwgZnJvbSAnLi9Db21wb25lbnRzL01vZGFsJztcclxuaW1wb3J0IEZvcm0gZnJvbSAnLi9Db21wb25lbnRzL0Zvcm0nO1xyXG5pbXBvcnQgJy4vTW9kdWxlcy9BamF4TW9kdWxlJztcclxuaW1wb3J0ICcuL01vZHVsZXMvU3VnYXJET00nO1xyXG5pbXBvcnQgJy4vQ29tcG9uZW50cy9Gb3JtSW50ZXJmYWNlcyc7XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdCg8YW55PndpbmRvdykuTW9kYWwgPSBNb2RhbDtcclxuXHQoPGFueT53aW5kb3cpLkZvcm0gPSBGb3JtO1xyXG59KCkpICAiXSwic291cmNlUm9vdCI6IiJ9