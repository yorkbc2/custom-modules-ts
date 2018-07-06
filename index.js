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
var Form = /** @class */ (function () {
    function Form(selector, options) {
        this.data = {};
        this.successCallback = null;
        this.errorCallback = null;
        this.invalidInputCallback = null;
        this.maxSymbolsLengthForInputs = 24;
        this.maxSymbolsLengthForTextareas = 360;
        this.patterns = [
            {
                name: "phone",
                pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
            }
        ];
        this.SQLInjectionRegular = /<[^>]{0,}[^/]>/g;
        this.beforeSendCallback = function () {
            this.container.classList.add('form-loading');
        };
        this.container = document.querySelector(selector) || null;
        if (options) {
            this.maxSymbolsLengthForInputs = options.maxLengthInputs || this.maxSymbolsLengthForInputs;
            this.maxSymbolsLengthForTextareas = options.maxLengthTextareas || this.maxSymbolsLengthForTextareas;
        }
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
        for (var i in this.data) {
            var input = this.container.querySelector("input[name=\"" + i + "\"],select[name=\"" + i + "\"]");
            if (this.data[i] === "" || checkPattern(input, this.patterns) === false || checkInputLength(input, {
                maxInputs: this.maxSymbolsLengthForInputs,
                maxAreas: this.maxSymbolsLengthForTextareas
            }) === false) {
                isPrepared = false;
                if (input.className.indexOf("form-error") == -1)
                    input.className = "form-error";
                if (typeof this.invalidInputCallback === 'function')
                    this.invalidInputCallback(input, this.container);
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
    Form.prototype.setInvalidInputCallback = function (callback) {
        if (typeof callback === 'function')
            this.invalidInputCallback = callback;
        else
            this.invalidInputCallback = null;
        return this;
    };
    return Form;
}());
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
        data[event.target.name] = event.target.value.replace(this.SQLInjectionRegular, '');
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
function checkInputLength(input, options) {
    switch (input.tagName) {
        case "INPUT": {
            return input.value.length > options.maxInputs ? false : true;
        }
        case "TEXTAREA": {
            return input.value.length > options.maxAreas ? false : true;
        }
        default: {
            return false;
        }
    }
}
exports.default = Form;


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
(function () {
    window.Modal = Modal_1.default;
    window.Form = Form_1.default;
}());


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQ29tcG9uZW50cy9Gb3JtLnRzIiwid2VicGFjazovLy8uL0NvbXBvbmVudHMvTW9kYWwudHMiLCJ3ZWJwYWNrOi8vLy4vTW9kdWxlcy9BamF4TW9kdWxlLnRzIiwid2VicGFjazovLy8uL01vZHVsZXMvU3VnYXJET00udHMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLGlHQUVpQztBQTJCakM7SUFnQkMsY0FBWSxRQUFnQixFQUFFLE9BQXlCO1FBZHZELFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsb0JBQWUsR0FBa0IsSUFBSSxDQUFDO1FBQ3RDLGtCQUFhLEdBQWtCLElBQUksQ0FBQztRQUNwQyx5QkFBb0IsR0FBa0IsSUFBSSxDQUFDO1FBQzND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dHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXgudHNcIik7XG4iLCJpbXBvcnQge1xyXG5cdHNlbmRQcm9taXNlZFJlcXVlc3RcclxufSBmcm9tIFwiLi8uLi9Nb2R1bGVzL0FqYXhNb2R1bGVcIjtcclxuXHJcbmludGVyZmFjZSBGb3JtSW50ZXJmYWNlIHtcclxuXHRjb250YWluZXI6IEVsZW1lbnR8bnVsbDtcclxuXHRkYXRhOiBPYmplY3Q7XHJcblx0U1FMSW5qZWN0aW9uUmVndWxhcjogUmVnRXhwO1xyXG5cdHN1Y2Nlc3NDYWxsYmFjazogRnVuY3Rpb258bnVsbDtcclxuXHRlcnJvckNhbGxiYWNrOiBGdW5jdGlvbnxudWxsO1xyXG5cdG1heFN5bWJvbHNMZW5ndGhGb3JJbnB1dHM6IG51bWJlcjtcclxuXHRtYXhTeW1ib2xzTGVuZ3RoRm9yVGV4dGFyZWFzOiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBGb3JtUGF0dGVybiB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdHBhdHRlcm46IFJlZ0V4cDtcclxufVxyXG5cclxuaW50ZXJmYWNlIEZvcm1PcHRpb25zIHtcclxuXHRtYXhMZW5ndGhJbnB1dHM6IG51bWJlcnxudWxsO1xyXG5cdG1heExlbmd0aFRleHRhcmVhczogbnVtYmVyfG51bGw7XHJcbn1cclxuXHJcbmludGVyZmFjZSBDaGVja0lucHV0TGVuZ3RoT3B0aW9ucyB7XHJcblx0bWF4SW5wdXRzOiBudW1iZXI7XHJcblx0bWF4QXJlYXM6IG51bWJlcjtcclxufVxyXG5cclxuY2xhc3MgRm9ybSBpbXBsZW1lbnRzIEZvcm1JbnRlcmZhY2Uge1xyXG5cdGNvbnRhaW5lcjogRWxlbWVudHxudWxsO1xyXG5cdGRhdGE6IE9iamVjdCA9IHt9O1xyXG5cdHN1Y2Nlc3NDYWxsYmFjazogRnVuY3Rpb258bnVsbCA9IG51bGw7XHJcblx0ZXJyb3JDYWxsYmFjazogRnVuY3Rpb258bnVsbCA9IG51bGw7XHJcblx0aW52YWxpZElucHV0Q2FsbGJhY2s6IEZ1bmN0aW9ufG51bGwgPSBudWxsO1xyXG5cdG1heFN5bWJvbHNMZW5ndGhGb3JJbnB1dHM6IG51bWJlciA9IDI0O1xyXG5cdG1heFN5bWJvbHNMZW5ndGhGb3JUZXh0YXJlYXM6IG51bWJlciA9IDM2MDtcclxuXHRwYXR0ZXJuczogRm9ybVBhdHRlcm5bXSA9IFtcclxuXHRcdHtcclxuXHRcdFx0bmFtZTogXCJwaG9uZVwiLFxyXG5cdFx0XHRwYXR0ZXJuOiAvXltcXCtdP1soXT9bMC05XXszfVspXT9bLVxcc1xcLl0/WzAtOV17M31bLVxcc1xcLl0/WzAtOV17NCw2fSQvaW1cclxuXHRcdH1cclxuXHRdO1xyXG5cdFNRTEluamVjdGlvblJlZ3VsYXI6IFJlZ0V4cCA9IC88W14+XXswLH1bXi9dPi9nO1xyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKHNlbGVjdG9yOiBzdHJpbmcsIG9wdGlvbnM6IEZvcm1PcHRpb25zfG51bGwpIHtcclxuXHRcdHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgfHwgbnVsbDtcclxuXHRcdGlmIChvcHRpb25zKSB7XHJcblx0XHRcdHRoaXMubWF4U3ltYm9sc0xlbmd0aEZvcklucHV0cyA9IG9wdGlvbnMubWF4TGVuZ3RoSW5wdXRzIHx8IHRoaXMubWF4U3ltYm9sc0xlbmd0aEZvcklucHV0cztcclxuXHRcdFx0dGhpcy5tYXhTeW1ib2xzTGVuZ3RoRm9yVGV4dGFyZWFzID0gb3B0aW9ucy5tYXhMZW5ndGhUZXh0YXJlYXMgfHwgdGhpcy5tYXhTeW1ib2xzTGVuZ3RoRm9yVGV4dGFyZWFzO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmNvbnRhaW5lcikge1xyXG5cdFx0XHR2YXIgaW5wdXRzOiBOb2RlTGlzdE9mPEhUTUxJbnB1dEVsZW1lbnQ+ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKTtcclxuXHRcdFx0aWYgKGlucHV0cyAmJiBpbnB1dHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdGFkZElucHV0RXZlbnQoaW5wdXRzLCB0aGlzLmRhdGEpXHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXQuYmluZCh0aGlzKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRiZWZvcmVTZW5kQ2FsbGJhY2s6IEZ1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9ybS1sb2FkaW5nJyk7XHJcblx0fVxyXG5cclxuXHRzdWJtaXQoZXZlbnQ6YW55KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHJcblx0XHR2YXIgYWN0aW9uOnN0cmluZyA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FjdGlvbicpO1xyXG5cdFx0dmFyIG1ldGhvZDpzdHJpbmcgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdtZXRob2QnKSB8fCBcIlBPU1RcIjtcclxuXHRcdHZhciBpc1ByZXBhcmVkID0gdHJ1ZTtcclxuXHRcdGZvciAodmFyIGkgaW4gdGhpcy5kYXRhKSB7XHJcblx0XHRcdHZhciBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9XCIke2l9XCJdLHNlbGVjdFtuYW1lPVwiJHtpfVwiXWApO1xyXG5cdFx0XHRpZiAodGhpcy5kYXRhW2ldID09PSBcIlwiIHx8IGNoZWNrUGF0dGVybihpbnB1dCwgdGhpcy5wYXR0ZXJucykgPT09IGZhbHNlIHx8IGNoZWNrSW5wdXRMZW5ndGgoaW5wdXQsIHtcclxuXHRcdFx0XHRtYXhJbnB1dHM6IHRoaXMubWF4U3ltYm9sc0xlbmd0aEZvcklucHV0cyxcclxuXHRcdFx0XHRtYXhBcmVhczogdGhpcy5tYXhTeW1ib2xzTGVuZ3RoRm9yVGV4dGFyZWFzXHJcblx0XHRcdH0pID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdGlzUHJlcGFyZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRpZiAoaW5wdXQuY2xhc3NOYW1lLmluZGV4T2YoXCJmb3JtLWVycm9yXCIpID09IC0xKSBpbnB1dC5jbGFzc05hbWUgPSBcImZvcm0tZXJyb3JcIjtcclxuXHRcdFx0XHRpZiAodHlwZW9mIHRoaXMuaW52YWxpZElucHV0Q2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHRoaXMuaW52YWxpZElucHV0Q2FsbGJhY2soaW5wdXQsIHRoaXMuY29udGFpbmVyKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpbnB1dC5jbGFzc05hbWUgPSBpbnB1dC5jbGFzc05hbWUucmVwbGFjZShcImZvcm0tZXJyb3JcIiwgXCJcIikudHJpbSgpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblxyXG5cdFx0aWYgKGlzUHJlcGFyZWQgPT09IHRydWUpIHtcclxuXHRcdFx0dGhpcy5iZWZvcmVTZW5kQ2FsbGJhY2soKVxyXG5cdFx0XHRzZW5kUHJvbWlzZWRSZXF1ZXN0KGFjdGlvbiwge1xyXG5cdFx0XHRcdG1ldGhvZDogbWV0aG9kLFxyXG5cdFx0XHRcdGRhdGE6IHRoaXMuZGF0YVxyXG5cdFx0XHR9KS50aGVuKHJlc3BvbnNlID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy5zdWNjZXNzQ2FsbGJhY2sgIT09IG51bGwpIHRoaXMuc3VjY2Vzc0NhbGxiYWNrKHJlc3BvbnNlLCB0aGlzLmNvbnRhaW5lcik7XHJcblx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy5lcnJvckNhbGxiYWNrICE9PSBudWxsKSB0aGlzLmVycm9yQ2FsbGJhY2soZXJyb3IubWVzc2FnZSwgdGhpcy5jb250YWluZXIpO1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0QmVmb3JlU2VuZENhbGxiYWNrIChjYWxsYmFjazpGdW5jdGlvbikge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5iZWZvcmVTZW5kQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdGVsc2UgdGhpcy5iZWZvcmVTZW5kQ2FsbGJhY2sgPSBudWxsO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHRzZXRTdWNjZXNzQ2FsbGJhY2sgKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5zdWNjZXNzQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdGVsc2UgdGhpcy5zdWNjZXNzQ2FsbGJhY2sgPSBudWxsO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHRzZXRFcnJvckNhbGxiYWNrIChjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHRoaXMuZXJyb3JDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0ZWxzZSB0aGlzLmVycm9yQ2FsbGJhY2sgPSBudWxsO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHRzZXRJbnZhbGlkSW5wdXRDYWxsYmFjayAoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB0aGlzLmludmFsaWRJbnB1dENhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRlbHNlIHRoaXMuaW52YWxpZElucHV0Q2FsbGJhY2sgPSBudWxsO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkSW5wdXRFdmVudCAoZWxlbWVudHMsIGRhdGE6T2JqZWN0KSB7XHJcblx0aWYgKGVsZW1lbnRzKSB7XHJcblx0XHRlbGVtZW50cy5mb3JFYWNoKGkgPT4ge1xyXG5cdFx0XHRpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIGkpIHtcclxuXHRcdFx0XHRpZiAoaS5uYW1lICE9PSBcIlwiKSB7XHJcblx0XHRcdFx0XHRkYXRhW2kubmFtZV0gPSBpLnZhbHVlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGkuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBpbnB1dEV2ZW50LmJpbmQodGhpcywgZGF0YSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5wdXRFdmVudCAoZGF0YTpPYmplY3QsIGV2ZW50OiBhbnkpIHtcclxuXHRpZiAoZXZlbnQudGFyZ2V0Lm5hbWUgIT09IFwiXCIpXHJcblx0XHRkYXRhW2V2ZW50LnRhcmdldC5uYW1lXSA9IGV2ZW50LnRhcmdldC52YWx1ZS5yZXBsYWNlKHRoaXMuU1FMSW5qZWN0aW9uUmVndWxhciwgJycpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1c2VQYXR0ZXJuIChwYXR0ZXJuOiBGb3JtUGF0dGVybiwgdmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdGlmIChwYXR0ZXJuLnBhdHRlcm4udGVzdCkge1xyXG5cdFx0cmV0dXJuIHBhdHRlcm4ucGF0dGVybi50ZXN0KHZhbHVlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tQYXR0ZXJuIChpbnB1dDogSFRNTElucHV0RWxlbWVudCwgcGF0dGVybkxpc3Q6IEZvcm1QYXR0ZXJuW10pOmJvb2xlYW4ge1xyXG5cdHZhciBjdXJyZW50UGF0dGVybjogRm9ybVBhdHRlcm47IFxyXG5cdHZhciBkYXRhUGF0dGVybjogc3RyaW5nID0gaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBhdHRlcm4nKSB8fCAnJztcclxuXHRpZiAoZGF0YVBhdHRlcm4gPT09IG51bGwgfHwgZGF0YVBhdHRlcm4gPT09ICcnKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9IGVsc2Uge1xyXG5cclxuXHRcdGN1cnJlbnRQYXR0ZXJuID0gcGF0dGVybkxpc3QuZmlsdGVyKHAgPT4gcC5uYW1lID09PSBkYXRhUGF0dGVybilbMF07XHJcblxyXG5cdFx0aWYgKGN1cnJlbnRQYXR0ZXJuKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gdXNlUGF0dGVybihjdXJyZW50UGF0dGVybiwgaW5wdXQudmFsdWUpXHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdCBcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0lucHV0TGVuZ3RoIChpbnB1dDogSFRNTElucHV0RWxlbWVudCwgb3B0aW9uczogQ2hlY2tJbnB1dExlbmd0aE9wdGlvbnMpIHtcclxuXHRzd2l0Y2ggKGlucHV0LnRhZ05hbWUpIHtcclxuXHRcdGNhc2UgXCJJTlBVVFwiOiB7XHJcblx0XHRcdHJldHVybiBpbnB1dC52YWx1ZS5sZW5ndGggPiBvcHRpb25zLm1heElucHV0cz8gZmFsc2U6IHRydWU7XHJcblx0XHR9XHJcblx0XHRjYXNlIFwiVEVYVEFSRUFcIjoge1xyXG5cdFx0XHRyZXR1cm4gaW5wdXQudmFsdWUubGVuZ3RoID4gb3B0aW9ucy5tYXhBcmVhcz8gZmFsc2U6IHRydWU7XHJcblx0XHR9XHJcblx0XHRkZWZhdWx0OiB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZvcm07IiwiaW50ZXJmYWNlIE1vZGFsSW50ZXJmYWNlIHtcclxuXHRpc09wZW5lZDogYm9vbGVhbjtcclxuXHRjb250YWluZXI6IGFueTtcclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXJTZWxlY3RvcjpzdHJpbmcsIG9wdGlvbnM/OiBhbnl8bnVsbCk7XHJcbn1cclxuXHJcbmNsYXNzIE1vZGFsIHtcclxuXHRpc09wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdGNvbnRhaW5lciA9IG51bGw7XHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyU2VsZWN0b3I6c3RyaW5nLCBvcHRpb25zPzogYW55fG51bGwpIHtcclxuXHRcdHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XHJcblx0XHRpZiAodGhpcy5jb250YWluZXIpIHtcclxuXHRcdFx0dGhpcy5hZGRIYW5kbGVycygpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpZiAoJ3RvZ2dsZUFmdGVyTG9hZCcgaW4gb3B0aW9ucyAmJiBvcHRpb25zLnRvZ2dsZUFmdGVyTG9hZCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHRoaXMudG9nZ2xlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0dG9nZ2xlKCkge1xyXG5cdFx0dGhpcy5pc09wZW5lZCA9ICF0aGlzLmlzT3BlbmVkO1xyXG5cdFx0dGhpcy5oaWRlT3JTaG93Q29udGFpbmVyKCk7XHJcblx0fVxyXG5cdGhpZGVPclNob3dDb250YWluZXIoKSB7XHJcblx0XHR0aGlzLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gdGhpcy5pc09wZW5lZCA9PT0gdHJ1ZT8gJ2Jsb2NrJzogJ25vbmUnO1xyXG5cdH1cclxuXHRhZGRIYW5kbGVyc1RvRWxlbWVudHMoZWxlbWVudHMpIHtcclxuXHRcdGVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQ6RWxlbWVudCkgPT4ge1xyXG5cdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGUuYmluZCh0aGlzKSk7XHJcblx0XHR9KVxyXG5cdH1cclxuXHRhZGRIYW5kbGVycygpIHtcclxuXHRcdGNvbnN0IGVsZW1lbnRzVG9DbG9zZTogTm9kZUxpc3RPZjxFbGVtZW50PiA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbC13aW5kb3ctYmFja2dyb3VuZCwgLm1vZGFsLXdpbmRvdy1jbG9zZScpO1xyXG5cdFx0aWYgKGVsZW1lbnRzVG9DbG9zZSAmJiBlbGVtZW50c1RvQ2xvc2UubGVuZ3RoID4gMCkge1xyXG5cdFx0XHR0aGlzLmFkZEhhbmRsZXJzVG9FbGVtZW50cyhlbGVtZW50c1RvQ2xvc2UpXHJcblx0XHR9XHJcblx0fVxyXG5cdGFkZFRvZ2dsZUhhbmRsZXJUb0J1dHRvbnMoc2VsZWN0b3I6c3RyaW5nKSB7XHJcblx0XHRpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR2YXIgYnV0dG9uczogTm9kZUxpc3RPZjxFbGVtZW50PiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cdFx0XHRpZiAoYnV0dG9ucyAmJiBidXR0b25zLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR0aGlzLmFkZEhhbmRsZXJzVG9FbGVtZW50cyhidXR0b25zKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RhbDsiLCJleHBvcnQgY29uc3Qgc2VuZFByb21pc2VkUmVxdWVzdCA9ICh1cmw9XCJcIiwgb3B0aW9ucykgPT4ge1xyXG5cdHZhciBtZXRob2Q6IHN0cmluZyA9IG9wdGlvbnMubWV0aG9kIHx8IFwiUE9TVFwiO1xyXG5cdHZhciBkYXRhOiBPYmplY3QgPSBvcHRpb25zLmRhdGEgfHwge307XHJcblxyXG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHR2YXIgeGhyOiBYTUxIdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwpO1xyXG5cdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMSkge1xyXG5cdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcblx0XHRcdFx0cmVqZWN0KHtcclxuXHRcdFx0XHRcdGNvcmU6IHhocixcclxuXHRcdFx0XHRcdG1lc3NhZ2U6IFwiSW5jb3JyZWN0IEFKQVggUmVxdWVzdCEgVHJ5IGFnYWluIHdpdGggYW5vdGhlciBvcHRpb25zLlwiXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG1ldGhvZCA9PT0gXCJHRVRcIj8geGhyLnNlbmQoKTogeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG5cdH0pXHJcbn0iLCJleHBvcnQgY29uc3QgaW5saW5lQ3NzID0gKGU6IEhUTUxFbGVtZW50LCBvOiBPYmplY3QpOnZvaWQgPT4ge1xyXG5cdGZvciAobGV0IGogaW4gbykge1xyXG5cdFx0ZS5zdHlsZVtqXSA9IG9bal07XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlID0gKHRhZzogc3RyaW5nKTogSFRNTEVsZW1lbnQgPT4ge1xyXG5cdHJldHVybiA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYXR0YWNoRXZlbnQgPSAoZTogSFRNTEVsZW1lbnQsIGVOYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBFdmVudExpc3RlbmVyKTp2b2lkID0+IHtcclxuXHRpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIGUpIHtcclxuXHRcdGUuYWRkRXZlbnRMaXN0ZW5lcihlTmFtZSwgY2FsbGJhY2spO1xyXG5cdH1cclxufSIsImltcG9ydCBNb2RhbCBmcm9tICcuL0NvbXBvbmVudHMvTW9kYWwnO1xyXG5pbXBvcnQgRm9ybSBmcm9tICcuL0NvbXBvbmVudHMvRm9ybSc7XHJcbmltcG9ydCAnLi9Nb2R1bGVzL0FqYXhNb2R1bGUnO1xyXG5pbXBvcnQgJy4vTW9kdWxlcy9TdWdhckRPTSc7XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdCg8YW55PndpbmRvdykuTW9kYWwgPSBNb2RhbDtcclxuXHQoPGFueT53aW5kb3cpLkZvcm0gPSBGb3JtO1xyXG59KCkpICAiXSwic291cmNlUm9vdCI6IiJ9