/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"popup": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/popup.ts","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/controllers/popupcontroller.ts":
/*!********************************************!*\
  !*** ./src/controllers/popupcontroller.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __webpack_require__(/*! ./store */ "./src/controllers/store.ts");
const htmlutils_1 = __webpack_require__(/*! ../utils/htmlutils */ "./src/utils/htmlutils.ts");
const parameterutils_1 = __webpack_require__(/*! ../utils/parameterutils */ "./src/utils/parameterutils.ts");
const $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
class PopupController {
    render() {
        let p = this.renderBookmarks();
        this.renderBookmarkAddControls();
        this.renderParameters();
        this.renderParameterAddControls();
        return p;
    }
    getCurrentActiveTab() {
        let queryReq = { active: true, currentWindow: true };
        let p = new Promise((resolve, reject) => {
            chrome.tabs.query(queryReq, (tabs) => {
                let currentTab = tabs[0];
                resolve(currentTab);
            });
        });
        return p;
    }
    renderBookmarks() {
        let bmPromise = store_1.Store.instance.getBookmarks();
        let ctPromise = this.getCurrentActiveTab();
        let parametersPromise = store_1.Store.instance.getParameters();
        return Promise.all([bmPromise, parametersPromise, ctPromise]).then((result) => {
            let bookmarks = result[0];
            let parameters = result[1];
            let currentTab = result[2];
            let bookmarkListContainer = document.getElementById("bookmarkList");
            if (bookmarkListContainer) {
                bookmarkListContainer.innerHTML = '';
                let first = true;
                bookmarks.items.forEach(bookmark => {
                    let x = document.createElement("A");
                    let t = document.createTextNode(bookmark.name);
                    let url = bookmark.url;
                    let resolvedUrl = parameterutils_1.ParameterUtil.getResolvedUrl(url, parameters, currentTab);
                    x.setAttribute("target", "_base");
                    x.setAttribute("href", resolvedUrl);
                    x.appendChild(t);
                    if (first == false) {
                        let breakItem = document.createElement("br");
                        bookmarkListContainer.appendChild(breakItem);
                    }
                    first = false;
                    bookmarkListContainer.appendChild(x);
                });
            }
        });
    }
    renderBookmarkAddControls() {
        $("#bmName").val('');
        $("#bmUrl").val("");
        $('#bmAdd').click(() => {
            let bmName = $("#bmName").val();
            let bmUrl = $("#bmUrl").val();
            this.addBookmarkItem(bmName, bmUrl).then(() => {
                this.render();
            });
        });
    }
    addBookmarkItem(name, url) {
        if (name && url) {
            let newBookmark = { name: name, url: url };
            return store_1.Store.instance.addBookmark(newBookmark);
        }
        return;
    }
    renderParameters() {
        let promiseParameters = store_1.Store.instance.getParameters();
        let globalParameterListContainer = document.getElementById("globalParameterList");
        if (globalParameterListContainer) {
            promiseParameters.then((parametersObject) => {
                document.createElement("table");
                let items = [];
                parametersObject.items.forEach(p => {
                    if (p) {
                        let paramItem = [p.key, p.value];
                        items.push(paramItem);
                    }
                });
                let hearders = [];
                hearders.push("Key");
                hearders.push("Value");
                let table = htmlutils_1.HtmlUtil.createTable(items, hearders);
                globalParameterListContainer.innerHTML = '';
                globalParameterListContainer.appendChild(table);
            });
        }
    }
    renderParameterAddControls() {
        $("#pmKey").val("");
        $("#pmValue").val("");
        $('#pmAdd').click(() => {
            let pmKey = $("#pmKey").val();
            let pmValue = $("#pmValue").val();
            this.addParameter(pmKey, pmValue).then(() => {
                this.render();
            });
        });
    }
    addParameter(key, value) {
        if (key && value) {
            let newParameter = { key: key, value: value };
            return store_1.Store.instance.addParameter(newParameter);
        }
        return;
    }
}
exports.PopupController = PopupController;
PopupController.instance = new PopupController();


/***/ }),

/***/ "./src/controllers/store.ts":
/*!**********************************!*\
  !*** ./src/controllers/store.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Store {
    constructor() {
        this.parameters = { items: [] };
        this.bookmarks = { items: [] };
    }
    initializeDefaults() {
        this.parameters.items.push({ key: "CurrentTabOrigin", value: "$ActiveTab:origin" });
        this.parameters.items.push({ key: "CurrentTabHost", value: "$ActiveTab:host" });
        this.parameters.items.push({ key: "issuerId", value: "12334534AAFGDFG234" });
        this.parameters.items.push({ key: "audienceId", value: "AUD12334534AAFGDFG234" });
        this.parameters.items.push({ key: "SearchText", value: "$Js:'news on ' + new Date().toString()" });
        this.parameters.items.push({ key: "DayOfWeek", value: "$Js:new Date().toString().split(' ')[0] + 'day'" });
        this.bookmarks.items.push({ name: "TenantInfo", url: "{{CurrentTabOrigin}}/qa/cdp/cdp.jsp" });
        this.bookmarks.items.push({ name: "Generate JWT", url: "{{CurrentTabOrigin}}/qa/cdp/generatejwt.jsp" });
        this.bookmarks.items.push({ name: "Mint JWT", url: "{{CurrentTabOrigin}}/qa/cdp/mintedjwt.jsp?issuerId={{issuerId}}&audienceId={{audienceId}}&type=JWT" });
        this.bookmarks.items.push({ name: "News Today", url: "https://www.google.com/search?q={{SearchText}}" });
        this.bookmarks.items.push({ name: "Google Current Host", url: "https://www.google.com/search?q={{CurrentTabHost}}" });
        this.bookmarks.items.push({ name: "Joke on Day", url: "https://www.google.com/search?q=Tell me a joke about {{DayOfWeek}}" });
    }
    initialize() {
        this.initializeDefaults();
        let p1 = this.saveParameters(this.parameters);
        let p2 = this.saveBookmarks(this.bookmarks);
        return Promise.all([p1, p2]).then();
    }
    getBookmarks() {
        let p = new Promise((resolve, reject) => {
            chrome.storage.sync.get("BookmarkList", (result) => {
                let bookmarks = result.BookmarkList;
                resolve(bookmarks);
            });
        });
        return p;
    }
    getParameters() {
        let p = new Promise((resolve, reject) => {
            chrome.storage.sync.get("ParamList", (result) => {
                let parameters = result.ParamList;
                resolve(parameters);
            });
        });
        return p;
    }
    saveParameters(parametersObject) {
        let p = new Promise((resolve, reject) => {
            chrome.storage.sync.set({ ParamList: parametersObject }, () => {
                console.log("Saved parameters");
                resolve();
            });
        });
        return p;
    }
    saveBookmarks(bookmarksObject) {
        let p = new Promise((resolve, reject) => {
            chrome.storage.sync.set({ BookmarkList: bookmarksObject }, () => {
                console.log("Saved bookmarks");
                resolve();
            });
        });
        return p;
    }
    addBookmark(newBookmark) {
        return this.getBookmarks().then(bookmarks => {
            bookmarks.items.push(newBookmark);
            return this.saveBookmarks(bookmarks);
        });
    }
    addParameter(newParameter) {
        return this.getParameters().then(parameters => {
            parameters.items.push(newParameter);
            return this.saveParameters(parameters);
        });
    }
}
exports.Store = Store;
Store.instance = new Store();


/***/ }),

/***/ "./src/popup.ts":
/*!**********************!*\
  !*** ./src/popup.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
const popupcontroller_1 = __webpack_require__(/*! ./controllers/popupcontroller */ "./src/controllers/popupcontroller.ts");
let count = 0;
$(function () {
    $(document).ready(() => {
        popupcontroller_1.PopupController.instance.render();
    });
    var coll = document.getElementsByClassName("collapsible");
    var i;
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            }
            else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
    // const queryInfo = {
    //   active: true,
    //   currentWindow: true
    // };
    // chrome.tabs.query(queryInfo, function(tabs) {
    //   $('#url').text(tabs[0].url);
    //   $('#time').text(moment().format('YYYY-MM-DD HH:mm:ss'));
    // });
    // chrome.browserAction.setBadgeText({text: count.toString()});
    // $('#countUp').click(()=>{
    //   chrome.browserAction.setBadgeText({text: (++count).toString()});
    // });
    // $('#changeBackground').click(()=>{
    //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, {
    //       color: '#555555'
    //     },
    //     function(msg) {
    //       console.log("result message:", msg);
    //     });
    //   });
    // });
});


/***/ }),

/***/ "./src/utils/htmlutils.ts":
/*!********************************!*\
  !*** ./src/utils/htmlutils.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class HtmlUtil {
    static createTable(tableData, headers) {
        let table = document.createElement('table');
        if (headers) {
            let tableHead = document.createElement('thead');
            let headerRow = document.createElement('tr');
            headers.forEach(function (headerData) {
                let cell = document.createElement('th');
                cell.appendChild(document.createTextNode(headerData));
                headerRow.appendChild(cell);
            });
            tableHead.appendChild(headerRow);
            table.appendChild(tableHead);
        }
        let tableBody = document.createElement('tbody');
        tableData.forEach(function (rowData) {
            let row = document.createElement('tr');
            rowData.forEach(function (cellData) {
                let cell = document.createElement('td');
                cell.appendChild(document.createTextNode(cellData));
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        });
        table.appendChild(tableBody);
        return table;
    }
}
exports.HtmlUtil = HtmlUtil;


/***/ }),

/***/ "./src/utils/parameterutils.ts":
/*!*************************************!*\
  !*** ./src/utils/parameterutils.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ParameterUtil {
    static getResolvedUrl(url, parameters, currentTab) {
        let resolvedUrl = url;
        if (parameters) {
            parameters.items.forEach(p => {
                let paramValue = this.getRuntimeParamValue(p.value, currentTab);
                resolvedUrl = this.substituteValue(resolvedUrl, p.key, paramValue);
            });
        }
        return resolvedUrl;
    }
    static getFormattedParamName(paramName) {
        return "{{" + paramName + "}}";
    }
    static getRuntimeParamValue(paramValue, currentActiveTab) {
        if (paramValue.indexOf(ParameterUtil.PARAM_TYPE_SEPARATOR) > 0) {
            let items = paramValue.split(ParameterUtil.PARAM_TYPE_SEPARATOR);
            let paramValueType = items[0];
            let computedValue = items[1];
            if (paramValueType == ParameterUtil.PARAM_TYPE_ACTIVE_TAB) {
                let propertyName = items[1];
                computedValue = this.getActiveTabValue(propertyName, currentActiveTab);
            }
            else if (paramValueType == ParameterUtil.PARAM_TYPE_JS_VALUE) {
                let expression = items[1];
                computedValue = eval(expression);
            }
            return computedValue;
        }
        return paramValue;
    }
    static getActiveTabValue(variable, currentActiveTab) {
        let varValue = "";
        if (currentActiveTab && currentActiveTab.url) {
            let uri = new URL(currentActiveTab.url);
            varValue = uri[variable];
        }
        return varValue;
    }
    static substituteValue(url, paramName, paramValue) {
        url = url.replace(this.getFormattedParamName(paramName), paramValue);
        return url;
    }
}
exports.ParameterUtil = ParameterUtil;
ParameterUtil.PARAM_TYPE_ACTIVE_TAB = "$ActiveTab";
ParameterUtil.PARAM_TYPE_JS_VALUE = "$Js";
ParameterUtil.PARAM_TYPE_SEPARATOR = ":";


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXJzL3BvcHVwY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlcnMvc3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvcHVwLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9odG1sdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3BhcmFtZXRlcnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQix1QkFBdUI7UUFDdkM7OztRQUdBO1FBQ0E7UUFDQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDdkphO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsZ0JBQWdCLG1CQUFPLENBQUMsMkNBQVM7QUFDakMsb0JBQW9CLG1CQUFPLENBQUMsb0RBQW9CO0FBQ2hELHlCQUF5QixtQkFBTyxDQUFDLDhEQUF5QjtBQUMxRCxVQUFVLG1CQUFPLENBQUMsb0RBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xIYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0IsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQSxvQ0FBb0Msc0RBQXNEO0FBQzFGLG9DQUFvQyxrREFBa0Q7QUFDdEYsb0NBQW9DLCtDQUErQztBQUNuRixvQ0FBb0Msb0RBQW9EO0FBQ3hGLG9DQUFvQyxxRUFBcUU7QUFDekcsb0NBQW9DLDZFQUE2RTtBQUNqSCxtQ0FBbUMsNkJBQTZCLGtCQUFrQixrQkFBa0I7QUFDcEcsbUNBQW1DLCtCQUErQixrQkFBa0IsMEJBQTBCO0FBQzlHLG1DQUFtQywyQkFBMkIsa0JBQWtCLGlDQUFpQyxVQUFVLGNBQWMsWUFBWSxZQUFZO0FBQ2pLLG1DQUFtQyw2REFBNkQsWUFBWSxHQUFHO0FBQy9HLG1DQUFtQyxzRUFBc0UsZ0JBQWdCLEdBQUc7QUFDNUgsbUNBQW1DLG1GQUFtRixXQUFXLEdBQUc7QUFDcEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsOEJBQThCO0FBQ25FO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdFYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELFVBQVUsbUJBQU8sQ0FBQyxvREFBUTtBQUMxQiwwQkFBMEIsbUJBQU8sQ0FBQywyRUFBK0I7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLDBDQUEwQyx1QkFBdUI7QUFDakU7QUFDQSw0Q0FBNEMsMkJBQTJCO0FBQ3ZFLFFBQVE7QUFDUjtBQUNBLDRCQUE0QixrQ0FBa0M7QUFDOUQ7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsWUFBWTtBQUNaLFVBQVU7QUFDVixRQUFRO0FBQ1IsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzdDWTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM5QmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJwb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJwb3B1cFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL3BvcHVwLnRzXCIsXCJ2ZW5kb3JcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHN0b3JlXzEgPSByZXF1aXJlKFwiLi9zdG9yZVwiKTtcbmNvbnN0IGh0bWx1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL2h0bWx1dGlsc1wiKTtcbmNvbnN0IHBhcmFtZXRlcnV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvcGFyYW1ldGVydXRpbHNcIik7XG5jb25zdCAkID0gcmVxdWlyZShcImpxdWVyeVwiKTtcbmNsYXNzIFBvcHVwQ29udHJvbGxlciB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgcCA9IHRoaXMucmVuZGVyQm9va21hcmtzKCk7XG4gICAgICAgIHRoaXMucmVuZGVyQm9va21hcmtBZGRDb250cm9scygpO1xuICAgICAgICB0aGlzLnJlbmRlclBhcmFtZXRlcnMoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJQYXJhbWV0ZXJBZGRDb250cm9scygpO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgZ2V0Q3VycmVudEFjdGl2ZVRhYigpIHtcbiAgICAgICAgbGV0IHF1ZXJ5UmVxID0geyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfTtcbiAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjaHJvbWUudGFicy5xdWVyeShxdWVyeVJlcSwgKHRhYnMpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFRhYiA9IHRhYnNbMF07XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjdXJyZW50VGFiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHJlbmRlckJvb2ttYXJrcygpIHtcbiAgICAgICAgbGV0IGJtUHJvbWlzZSA9IHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuZ2V0Qm9va21hcmtzKCk7XG4gICAgICAgIGxldCBjdFByb21pc2UgPSB0aGlzLmdldEN1cnJlbnRBY3RpdmVUYWIoKTtcbiAgICAgICAgbGV0IHBhcmFtZXRlcnNQcm9taXNlID0gc3RvcmVfMS5TdG9yZS5pbnN0YW5jZS5nZXRQYXJhbWV0ZXJzKCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbYm1Qcm9taXNlLCBwYXJhbWV0ZXJzUHJvbWlzZSwgY3RQcm9taXNlXSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBsZXQgYm9va21hcmtzID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgbGV0IHBhcmFtZXRlcnMgPSByZXN1bHRbMV07XG4gICAgICAgICAgICBsZXQgY3VycmVudFRhYiA9IHJlc3VsdFsyXTtcbiAgICAgICAgICAgIGxldCBib29rbWFya0xpc3RDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvb2ttYXJrTGlzdFwiKTtcbiAgICAgICAgICAgIGlmIChib29rbWFya0xpc3RDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBib29rbWFya0xpc3RDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBib29rbWFya3MuaXRlbXMuZm9yRWFjaChib29rbWFyayA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkFcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYm9va21hcmsubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSBib29rbWFyay51cmw7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXNvbHZlZFVybCA9IHBhcmFtZXRlcnV0aWxzXzEuUGFyYW1ldGVyVXRpbC5nZXRSZXNvbHZlZFVybCh1cmwsIHBhcmFtZXRlcnMsIGN1cnJlbnRUYWIpO1xuICAgICAgICAgICAgICAgICAgICB4LnNldEF0dHJpYnV0ZShcInRhcmdldFwiLCBcIl9iYXNlXCIpO1xuICAgICAgICAgICAgICAgICAgICB4LnNldEF0dHJpYnV0ZShcImhyZWZcIiwgcmVzb2x2ZWRVcmwpO1xuICAgICAgICAgICAgICAgICAgICB4LmFwcGVuZENoaWxkKHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3QgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBicmVha0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBib29rbWFya0xpc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoYnJlYWtJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBib29rbWFya0xpc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoeCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXJCb29rbWFya0FkZENvbnRyb2xzKCkge1xuICAgICAgICAkKFwiI2JtTmFtZVwiKS52YWwoJycpO1xuICAgICAgICAkKFwiI2JtVXJsXCIpLnZhbChcIlwiKTtcbiAgICAgICAgJCgnI2JtQWRkJykuY2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJtTmFtZSA9ICQoXCIjYm1OYW1lXCIpLnZhbCgpO1xuICAgICAgICAgICAgbGV0IGJtVXJsID0gJChcIiNibVVybFwiKS52YWwoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQm9va21hcmtJdGVtKGJtTmFtZSwgYm1VcmwpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZEJvb2ttYXJrSXRlbShuYW1lLCB1cmwpIHtcbiAgICAgICAgaWYgKG5hbWUgJiYgdXJsKSB7XG4gICAgICAgICAgICBsZXQgbmV3Qm9va21hcmsgPSB7IG5hbWU6IG5hbWUsIHVybDogdXJsIH07XG4gICAgICAgICAgICByZXR1cm4gc3RvcmVfMS5TdG9yZS5pbnN0YW5jZS5hZGRCb29rbWFyayhuZXdCb29rbWFyayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZW5kZXJQYXJhbWV0ZXJzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZVBhcmFtZXRlcnMgPSBzdG9yZV8xLlN0b3JlLmluc3RhbmNlLmdldFBhcmFtZXRlcnMoKTtcbiAgICAgICAgbGV0IGdsb2JhbFBhcmFtZXRlckxpc3RDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbFBhcmFtZXRlckxpc3RcIik7XG4gICAgICAgIGlmIChnbG9iYWxQYXJhbWV0ZXJMaXN0Q29udGFpbmVyKSB7XG4gICAgICAgICAgICBwcm9taXNlUGFyYW1ldGVycy50aGVuKChwYXJhbWV0ZXJzT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNPYmplY3QuaXRlbXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJhbUl0ZW0gPSBbcC5rZXksIHAudmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaChwYXJhbUl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbGV0IGhlYXJkZXJzID0gW107XG4gICAgICAgICAgICAgICAgaGVhcmRlcnMucHVzaChcIktleVwiKTtcbiAgICAgICAgICAgICAgICBoZWFyZGVycy5wdXNoKFwiVmFsdWVcIik7XG4gICAgICAgICAgICAgICAgbGV0IHRhYmxlID0gaHRtbHV0aWxzXzEuSHRtbFV0aWwuY3JlYXRlVGFibGUoaXRlbXMsIGhlYXJkZXJzKTtcbiAgICAgICAgICAgICAgICBnbG9iYWxQYXJhbWV0ZXJMaXN0Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgIGdsb2JhbFBhcmFtZXRlckxpc3RDb250YWluZXIuYXBwZW5kQ2hpbGQodGFibGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyUGFyYW1ldGVyQWRkQ29udHJvbHMoKSB7XG4gICAgICAgICQoXCIjcG1LZXlcIikudmFsKFwiXCIpO1xuICAgICAgICAkKFwiI3BtVmFsdWVcIikudmFsKFwiXCIpO1xuICAgICAgICAkKCcjcG1BZGQnKS5jbGljaygoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcG1LZXkgPSAkKFwiI3BtS2V5XCIpLnZhbCgpO1xuICAgICAgICAgICAgbGV0IHBtVmFsdWUgPSAkKFwiI3BtVmFsdWVcIikudmFsKCk7XG4gICAgICAgICAgICB0aGlzLmFkZFBhcmFtZXRlcihwbUtleSwgcG1WYWx1ZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkUGFyYW1ldGVyKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGtleSAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IG5ld1BhcmFtZXRlciA9IHsga2V5OiBrZXksIHZhbHVlOiB2YWx1ZSB9O1xuICAgICAgICAgICAgcmV0dXJuIHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuYWRkUGFyYW1ldGVyKG5ld1BhcmFtZXRlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbn1cbmV4cG9ydHMuUG9wdXBDb250cm9sbGVyID0gUG9wdXBDb250cm9sbGVyO1xuUG9wdXBDb250cm9sbGVyLmluc3RhbmNlID0gbmV3IFBvcHVwQ29udHJvbGxlcigpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBTdG9yZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycyA9IHsgaXRlbXM6IFtdIH07XG4gICAgICAgIHRoaXMuYm9va21hcmtzID0geyBpdGVtczogW10gfTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZURlZmF1bHRzKCkge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuaXRlbXMucHVzaCh7IGtleTogXCJDdXJyZW50VGFiT3JpZ2luXCIsIHZhbHVlOiBcIiRBY3RpdmVUYWI6b3JpZ2luXCIgfSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5pdGVtcy5wdXNoKHsga2V5OiBcIkN1cnJlbnRUYWJIb3N0XCIsIHZhbHVlOiBcIiRBY3RpdmVUYWI6aG9zdFwiIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuaXRlbXMucHVzaCh7IGtleTogXCJpc3N1ZXJJZFwiLCB2YWx1ZTogXCIxMjMzNDUzNEFBRkdERkcyMzRcIiB9KTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLml0ZW1zLnB1c2goeyBrZXk6IFwiYXVkaWVuY2VJZFwiLCB2YWx1ZTogXCJBVUQxMjMzNDUzNEFBRkdERkcyMzRcIiB9KTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLml0ZW1zLnB1c2goeyBrZXk6IFwiU2VhcmNoVGV4dFwiLCB2YWx1ZTogXCIkSnM6J25ld3Mgb24gJyArIG5ldyBEYXRlKCkudG9TdHJpbmcoKVwiIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuaXRlbXMucHVzaCh7IGtleTogXCJEYXlPZldlZWtcIiwgdmFsdWU6IFwiJEpzOm5ldyBEYXRlKCkudG9TdHJpbmcoKS5zcGxpdCgnICcpWzBdICsgJ2RheSdcIiB9KTtcbiAgICAgICAgdGhpcy5ib29rbWFya3MuaXRlbXMucHVzaCh7IG5hbWU6IFwiVGVuYW50SW5mb1wiLCB1cmw6IFwie3tDdXJyZW50VGFiT3JpZ2lufX0vcWEvY2RwL2NkcC5qc3BcIiB9KTtcbiAgICAgICAgdGhpcy5ib29rbWFya3MuaXRlbXMucHVzaCh7IG5hbWU6IFwiR2VuZXJhdGUgSldUXCIsIHVybDogXCJ7e0N1cnJlbnRUYWJPcmlnaW59fS9xYS9jZHAvZ2VuZXJhdGVqd3QuanNwXCIgfSk7XG4gICAgICAgIHRoaXMuYm9va21hcmtzLml0ZW1zLnB1c2goeyBuYW1lOiBcIk1pbnQgSldUXCIsIHVybDogXCJ7e0N1cnJlbnRUYWJPcmlnaW59fS9xYS9jZHAvbWludGVkand0LmpzcD9pc3N1ZXJJZD17e2lzc3VlcklkfX0mYXVkaWVuY2VJZD17e2F1ZGllbmNlSWR9fSZ0eXBlPUpXVFwiIH0pO1xuICAgICAgICB0aGlzLmJvb2ttYXJrcy5pdGVtcy5wdXNoKHsgbmFtZTogXCJOZXdzIFRvZGF5XCIsIHVybDogXCJodHRwczovL3d3dy5nb29nbGUuY29tL3NlYXJjaD9xPXt7U2VhcmNoVGV4dH19XCIgfSk7XG4gICAgICAgIHRoaXMuYm9va21hcmtzLml0ZW1zLnB1c2goeyBuYW1lOiBcIkdvb2dsZSBDdXJyZW50IEhvc3RcIiwgdXJsOiBcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vc2VhcmNoP3E9e3tDdXJyZW50VGFiSG9zdH19XCIgfSk7XG4gICAgICAgIHRoaXMuYm9va21hcmtzLml0ZW1zLnB1c2goeyBuYW1lOiBcIkpva2Ugb24gRGF5XCIsIHVybDogXCJodHRwczovL3d3dy5nb29nbGUuY29tL3NlYXJjaD9xPVRlbGwgbWUgYSBqb2tlIGFib3V0IHt7RGF5T2ZXZWVrfX1cIiB9KTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRGVmYXVsdHMoKTtcbiAgICAgICAgbGV0IHAxID0gdGhpcy5zYXZlUGFyYW1ldGVycyh0aGlzLnBhcmFtZXRlcnMpO1xuICAgICAgICBsZXQgcDIgPSB0aGlzLnNhdmVCb29rbWFya3ModGhpcy5ib29rbWFya3MpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3AxLCBwMl0pLnRoZW4oKTtcbiAgICB9XG4gICAgZ2V0Qm9va21hcmtzKCkge1xuICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFwiQm9va21hcmtMaXN0XCIsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9va21hcmtzID0gcmVzdWx0LkJvb2ttYXJrTGlzdDtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGJvb2ttYXJrcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBnZXRQYXJhbWV0ZXJzKCkge1xuICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFwiUGFyYW1MaXN0XCIsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1ldGVycyA9IHJlc3VsdC5QYXJhbUxpc3Q7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHNhdmVQYXJhbWV0ZXJzKHBhcmFtZXRlcnNPYmplY3QpIHtcbiAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7IFBhcmFtTGlzdDogcGFyYW1ldGVyc09iamVjdCB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTYXZlZCBwYXJhbWV0ZXJzXCIpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHNhdmVCb29rbWFya3MoYm9va21hcmtzT2JqZWN0KSB7XG4gICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoeyBCb29rbWFya0xpc3Q6IGJvb2ttYXJrc09iamVjdCB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTYXZlZCBib29rbWFya3NcIik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgYWRkQm9va21hcmsobmV3Qm9va21hcmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Qm9va21hcmtzKCkudGhlbihib29rbWFya3MgPT4ge1xuICAgICAgICAgICAgYm9va21hcmtzLml0ZW1zLnB1c2gobmV3Qm9va21hcmspO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZUJvb2ttYXJrcyhib29rbWFya3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkUGFyYW1ldGVyKG5ld1BhcmFtZXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXJzKCkudGhlbihwYXJhbWV0ZXJzID0+IHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnMuaXRlbXMucHVzaChuZXdQYXJhbWV0ZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZVBhcmFtZXRlcnMocGFyYW1ldGVycyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuU3RvcmUgPSBTdG9yZTtcblN0b3JlLmluc3RhbmNlID0gbmV3IFN0b3JlKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0ICQgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xuY29uc3QgcG9wdXBjb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9wb3B1cGNvbnRyb2xsZXJcIik7XG5sZXQgY291bnQgPSAwO1xuJChmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuICAgICAgICBwb3B1cGNvbnRyb2xsZXJfMS5Qb3B1cENvbnRyb2xsZXIuaW5zdGFuY2UucmVuZGVyKCk7XG4gICAgfSk7XG4gICAgdmFyIGNvbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29sbGFwc2libGVcIik7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IGNvbGwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29sbFtpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGlmIChjb250ZW50LnN0eWxlLm1heEhlaWdodCkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gY29udGVudC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBjb25zdCBxdWVyeUluZm8gPSB7XG4gICAgLy8gICBhY3RpdmU6IHRydWUsXG4gICAgLy8gICBjdXJyZW50V2luZG93OiB0cnVlXG4gICAgLy8gfTtcbiAgICAvLyBjaHJvbWUudGFicy5xdWVyeShxdWVyeUluZm8sIGZ1bmN0aW9uKHRhYnMpIHtcbiAgICAvLyAgICQoJyN1cmwnKS50ZXh0KHRhYnNbMF0udXJsKTtcbiAgICAvLyAgICQoJyN0aW1lJykudGV4dChtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSk7XG4gICAgLy8gfSk7XG4gICAgLy8gY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHt0ZXh0OiBjb3VudC50b1N0cmluZygpfSk7XG4gICAgLy8gJCgnI2NvdW50VXAnKS5jbGljaygoKT0+e1xuICAgIC8vICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHt0ZXh0OiAoKytjb3VudCkudG9TdHJpbmcoKX0pO1xuICAgIC8vIH0pO1xuICAgIC8vICQoJyNjaGFuZ2VCYWNrZ3JvdW5kJykuY2xpY2soKCk9PntcbiAgICAvLyAgIGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9LCBmdW5jdGlvbih0YWJzKSB7XG4gICAgLy8gICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHtcbiAgICAvLyAgICAgICBjb2xvcjogJyM1NTU1NTUnXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIGZ1bmN0aW9uKG1zZykge1xuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0IG1lc3NhZ2U6XCIsIG1zZyk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgfSk7XG4gICAgLy8gfSk7XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgSHRtbFV0aWwge1xuICAgIHN0YXRpYyBjcmVhdGVUYWJsZSh0YWJsZURhdGEsIGhlYWRlcnMpIHtcbiAgICAgICAgbGV0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcbiAgICAgICAgaWYgKGhlYWRlcnMpIHtcbiAgICAgICAgICAgIGxldCB0YWJsZUhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpO1xuICAgICAgICAgICAgbGV0IGhlYWRlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24gKGhlYWRlckRhdGEpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJyk7XG4gICAgICAgICAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShoZWFkZXJEYXRhKSk7XG4gICAgICAgICAgICAgICAgaGVhZGVyUm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0YWJsZUhlYWQuYXBwZW5kQ2hpbGQoaGVhZGVyUm93KTtcbiAgICAgICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRhYmxlSGVhZCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRhYmxlQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5Jyk7XG4gICAgICAgIHRhYmxlRGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3dEYXRhKSB7XG4gICAgICAgICAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgICAgIHJvd0RhdGEuZm9yRWFjaChmdW5jdGlvbiAoY2VsbERhdGEpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjZWxsRGF0YSkpO1xuICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUJvZHkpO1xuICAgICAgICByZXR1cm4gdGFibGU7XG4gICAgfVxufVxuZXhwb3J0cy5IdG1sVXRpbCA9IEh0bWxVdGlsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBQYXJhbWV0ZXJVdGlsIHtcbiAgICBzdGF0aWMgZ2V0UmVzb2x2ZWRVcmwodXJsLCBwYXJhbWV0ZXJzLCBjdXJyZW50VGFiKSB7XG4gICAgICAgIGxldCByZXNvbHZlZFVybCA9IHVybDtcbiAgICAgICAgaWYgKHBhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnMuaXRlbXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1WYWx1ZSA9IHRoaXMuZ2V0UnVudGltZVBhcmFtVmFsdWUocC52YWx1ZSwgY3VycmVudFRhYik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZWRVcmwgPSB0aGlzLnN1YnN0aXR1dGVWYWx1ZShyZXNvbHZlZFVybCwgcC5rZXksIHBhcmFtVmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc29sdmVkVXJsO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0Rm9ybWF0dGVkUGFyYW1OYW1lKHBhcmFtTmFtZSkge1xuICAgICAgICByZXR1cm4gXCJ7e1wiICsgcGFyYW1OYW1lICsgXCJ9fVwiO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0UnVudGltZVBhcmFtVmFsdWUocGFyYW1WYWx1ZSwgY3VycmVudEFjdGl2ZVRhYikge1xuICAgICAgICBpZiAocGFyYW1WYWx1ZS5pbmRleE9mKFBhcmFtZXRlclV0aWwuUEFSQU1fVFlQRV9TRVBBUkFUT1IpID4gMCkge1xuICAgICAgICAgICAgbGV0IGl0ZW1zID0gcGFyYW1WYWx1ZS5zcGxpdChQYXJhbWV0ZXJVdGlsLlBBUkFNX1RZUEVfU0VQQVJBVE9SKTtcbiAgICAgICAgICAgIGxldCBwYXJhbVZhbHVlVHlwZSA9IGl0ZW1zWzBdO1xuICAgICAgICAgICAgbGV0IGNvbXB1dGVkVmFsdWUgPSBpdGVtc1sxXTtcbiAgICAgICAgICAgIGlmIChwYXJhbVZhbHVlVHlwZSA9PSBQYXJhbWV0ZXJVdGlsLlBBUkFNX1RZUEVfQUNUSVZFX1RBQikge1xuICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0eU5hbWUgPSBpdGVtc1sxXTtcbiAgICAgICAgICAgICAgICBjb21wdXRlZFZhbHVlID0gdGhpcy5nZXRBY3RpdmVUYWJWYWx1ZShwcm9wZXJ0eU5hbWUsIGN1cnJlbnRBY3RpdmVUYWIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGFyYW1WYWx1ZVR5cGUgPT0gUGFyYW1ldGVyVXRpbC5QQVJBTV9UWVBFX0pTX1ZBTFVFKSB7XG4gICAgICAgICAgICAgICAgbGV0IGV4cHJlc3Npb24gPSBpdGVtc1sxXTtcbiAgICAgICAgICAgICAgICBjb21wdXRlZFZhbHVlID0gZXZhbChleHByZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21wdXRlZFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbVZhbHVlO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0QWN0aXZlVGFiVmFsdWUodmFyaWFibGUsIGN1cnJlbnRBY3RpdmVUYWIpIHtcbiAgICAgICAgbGV0IHZhclZhbHVlID0gXCJcIjtcbiAgICAgICAgaWYgKGN1cnJlbnRBY3RpdmVUYWIgJiYgY3VycmVudEFjdGl2ZVRhYi51cmwpIHtcbiAgICAgICAgICAgIGxldCB1cmkgPSBuZXcgVVJMKGN1cnJlbnRBY3RpdmVUYWIudXJsKTtcbiAgICAgICAgICAgIHZhclZhbHVlID0gdXJpW3ZhcmlhYmxlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFyVmFsdWU7XG4gICAgfVxuICAgIHN0YXRpYyBzdWJzdGl0dXRlVmFsdWUodXJsLCBwYXJhbU5hbWUsIHBhcmFtVmFsdWUpIHtcbiAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UodGhpcy5nZXRGb3JtYXR0ZWRQYXJhbU5hbWUocGFyYW1OYW1lKSwgcGFyYW1WYWx1ZSk7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxufVxuZXhwb3J0cy5QYXJhbWV0ZXJVdGlsID0gUGFyYW1ldGVyVXRpbDtcblBhcmFtZXRlclV0aWwuUEFSQU1fVFlQRV9BQ1RJVkVfVEFCID0gXCIkQWN0aXZlVGFiXCI7XG5QYXJhbWV0ZXJVdGlsLlBBUkFNX1RZUEVfSlNfVkFMVUUgPSBcIiRKc1wiO1xuUGFyYW1ldGVyVXRpbC5QQVJBTV9UWVBFX1NFUEFSQVRPUiA9IFwiOlwiO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==