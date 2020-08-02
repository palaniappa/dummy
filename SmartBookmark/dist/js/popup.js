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
const $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
const PARAM_TYPE_ACTIVE_TAB = "$ActiveTab";
const PARAM_TYPE_JS_VALUE = "$Js";
const PARAM_TYPE_SEPARATOR = ":";
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
                    let resolvedUrl = this.getResolvedUrl(url, parameters, currentTab);
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
    getResolvedUrl(url, parameters, currentTab) {
        let resolvedUrl = url;
        if (parameters) {
            parameters.items.forEach(p => {
                let paramValue = this.getRuntimeParamValue(p.value, currentTab);
                resolvedUrl = this.substituteValue(resolvedUrl, p.key, paramValue);
            });
        }
        return resolvedUrl;
    }
    getFormattedParamName(paramName) {
        return "{{" + paramName + "}}";
    }
    getRuntimeParamValue(paramValue, currentActiveTab) {
        if (paramValue.indexOf(PARAM_TYPE_SEPARATOR) > 0) {
            let items = paramValue.split(PARAM_TYPE_SEPARATOR);
            let paramValueType = items[0];
            let computedValue = items[1];
            if (paramValueType == PARAM_TYPE_ACTIVE_TAB) {
                let propertyName = items[1];
                computedValue = this.getActiveTabValue(propertyName, currentActiveTab);
            }
            else if (paramValueType == PARAM_TYPE_JS_VALUE) {
                let expression = items[1];
                computedValue = eval(expression);
            }
            return computedValue;
        }
        return paramValue;
    }
    getActiveTabValue(variable, currentActiveTab) {
        let varValue = "";
        if (currentActiveTab && currentActiveTab.url) {
            let uri = new URL(currentActiveTab.url);
            varValue = uri[variable];
        }
        return varValue;
    }
    substituteValue(url, paramName, paramValue) {
        url = url.replace(this.getFormattedParamName(paramName), paramValue);
        return url;
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
            globalParameterListContainer.innerHTML = '';
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
                let table = this.createTable(items, hearders);
                globalParameterListContainer.appendChild(table);
            });
        }
    }
    createTable(tableData, headers) {
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
        this.parameters.items.push({ key: "issuerId", value: "My test Issuer Id" });
        this.parameters.items.push({ key: "audienceId", value: "My test audience Id" });
        this.parameters.items.push({ key: "SearchText", value: "$Js:'news on ' + new Date().toString()" });
        this.bookmarks.items.push({ name: "TenantInfo", url: "{{CurrentTabOrigin}}/qa/cdp/cdp.jsp" });
        this.bookmarks.items.push({ name: "Generate JWT", url: "{{CurrentTabOrigin}}/qa/cdp/generatejwt.jsp" });
        this.bookmarks.items.push({ name: "Mint JWT", url: "{{CurrentTabOrigin}}/qa/cdp/mintedjwt.jsp?issuerId={{issuerId}}&audienceId={{audienceId}}&type=JWT" });
        this.bookmarks.items.push({ name: "News Today", url: "https://www.google.com/search?q={{SearchText}}" });
        this.bookmarks.items.push({ name: "Google Current Host", url: "{{CurrentTabOrigin}}/qa/cdp/cdp.jsp" });
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXJzL3BvcHVwY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlcnMvc3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvcHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVB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QUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxnQ0FBZ0M7QUFDckU7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzRWE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxVQUFVLG1CQUFPLENBQUMsb0RBQVE7QUFDMUIsMEJBQTBCLG1CQUFPLENBQUMsMkVBQStCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLDBDQUEwQyx1QkFBdUI7QUFDakU7QUFDQSw0Q0FBNEMsMkJBQTJCO0FBQ3ZFLFFBQVE7QUFDUjtBQUNBLDRCQUE0QixrQ0FBa0M7QUFDOUQ7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsWUFBWTtBQUNaLFVBQVU7QUFDVixRQUFRO0FBQ1IsQ0FBQyIsImZpbGUiOiJwb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJwb3B1cFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL3BvcHVwLnRzXCIsXCJ2ZW5kb3JcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHN0b3JlXzEgPSByZXF1aXJlKFwiLi9zdG9yZVwiKTtcbmNvbnN0ICQgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xuY29uc3QgUEFSQU1fVFlQRV9BQ1RJVkVfVEFCID0gXCIkQWN0aXZlVGFiXCI7XG5jb25zdCBQQVJBTV9UWVBFX0pTX1ZBTFVFID0gXCIkSnNcIjtcbmNvbnN0IFBBUkFNX1RZUEVfU0VQQVJBVE9SID0gXCI6XCI7XG5jbGFzcyBQb3B1cENvbnRyb2xsZXIge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnJlbmRlckJvb2ttYXJrcygpO1xuICAgICAgICB0aGlzLnJlbmRlckJvb2ttYXJrQWRkQ29udHJvbHMoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJQYXJhbWV0ZXJzKCk7XG4gICAgICAgIHRoaXMucmVuZGVyUGFyYW1ldGVyQWRkQ29udHJvbHMoKTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGdldEN1cnJlbnRBY3RpdmVUYWIoKSB7XG4gICAgICAgIGxldCBxdWVyeVJlcSA9IHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH07XG4gICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkocXVlcnlSZXEsICh0YWJzKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRUYWIgPSB0YWJzWzBdO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoY3VycmVudFRhYik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICByZW5kZXJCb29rbWFya3MoKSB7XG4gICAgICAgIGxldCBibVByb21pc2UgPSBzdG9yZV8xLlN0b3JlLmluc3RhbmNlLmdldEJvb2ttYXJrcygpO1xuICAgICAgICBsZXQgY3RQcm9taXNlID0gdGhpcy5nZXRDdXJyZW50QWN0aXZlVGFiKCk7XG4gICAgICAgIGxldCBwYXJhbWV0ZXJzUHJvbWlzZSA9IHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuZ2V0UGFyYW1ldGVycygpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2JtUHJvbWlzZSwgcGFyYW1ldGVyc1Byb21pc2UsIGN0UHJvbWlzZV0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJvb2ttYXJrcyA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIGxldCBwYXJhbWV0ZXJzID0gcmVzdWx0WzFdO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRUYWIgPSByZXN1bHRbMl07XG4gICAgICAgICAgICBsZXQgYm9va21hcmtMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib29rbWFya0xpc3RcIik7XG4gICAgICAgICAgICBpZiAoYm9va21hcmtMaXN0Q29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgYm9va21hcmtMaXN0Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgIGxldCBmaXJzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9va21hcmtzLml0ZW1zLmZvckVhY2goYm9va21hcmsgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgeCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJBXCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGJvb2ttYXJrLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gYm9va21hcmsudXJsO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzb2x2ZWRVcmwgPSB0aGlzLmdldFJlc29sdmVkVXJsKHVybCwgcGFyYW1ldGVycywgY3VycmVudFRhYik7XG4gICAgICAgICAgICAgICAgICAgIHguc2V0QXR0cmlidXRlKFwidGFyZ2V0XCIsIFwiX2Jhc2VcIik7XG4gICAgICAgICAgICAgICAgICAgIHguc2V0QXR0cmlidXRlKFwiaHJlZlwiLCByZXNvbHZlZFVybCk7XG4gICAgICAgICAgICAgICAgICAgIHguYXBwZW5kQ2hpbGQodCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJyZWFrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvb2ttYXJrTGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChicmVha0l0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJvb2ttYXJrTGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZCh4KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldFJlc29sdmVkVXJsKHVybCwgcGFyYW1ldGVycywgY3VycmVudFRhYikge1xuICAgICAgICBsZXQgcmVzb2x2ZWRVcmwgPSB1cmw7XG4gICAgICAgIGlmIChwYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzLml0ZW1zLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtVmFsdWUgPSB0aGlzLmdldFJ1bnRpbWVQYXJhbVZhbHVlKHAudmFsdWUsIGN1cnJlbnRUYWIpO1xuICAgICAgICAgICAgICAgIHJlc29sdmVkVXJsID0gdGhpcy5zdWJzdGl0dXRlVmFsdWUocmVzb2x2ZWRVcmwsIHAua2V5LCBwYXJhbVZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNvbHZlZFVybDtcbiAgICB9XG4gICAgZ2V0Rm9ybWF0dGVkUGFyYW1OYW1lKHBhcmFtTmFtZSkge1xuICAgICAgICByZXR1cm4gXCJ7e1wiICsgcGFyYW1OYW1lICsgXCJ9fVwiO1xuICAgIH1cbiAgICBnZXRSdW50aW1lUGFyYW1WYWx1ZShwYXJhbVZhbHVlLCBjdXJyZW50QWN0aXZlVGFiKSB7XG4gICAgICAgIGlmIChwYXJhbVZhbHVlLmluZGV4T2YoUEFSQU1fVFlQRV9TRVBBUkFUT1IpID4gMCkge1xuICAgICAgICAgICAgbGV0IGl0ZW1zID0gcGFyYW1WYWx1ZS5zcGxpdChQQVJBTV9UWVBFX1NFUEFSQVRPUik7XG4gICAgICAgICAgICBsZXQgcGFyYW1WYWx1ZVR5cGUgPSBpdGVtc1swXTtcbiAgICAgICAgICAgIGxldCBjb21wdXRlZFZhbHVlID0gaXRlbXNbMV07XG4gICAgICAgICAgICBpZiAocGFyYW1WYWx1ZVR5cGUgPT0gUEFSQU1fVFlQRV9BQ1RJVkVfVEFCKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByb3BlcnR5TmFtZSA9IGl0ZW1zWzFdO1xuICAgICAgICAgICAgICAgIGNvbXB1dGVkVmFsdWUgPSB0aGlzLmdldEFjdGl2ZVRhYlZhbHVlKHByb3BlcnR5TmFtZSwgY3VycmVudEFjdGl2ZVRhYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYXJhbVZhbHVlVHlwZSA9PSBQQVJBTV9UWVBFX0pTX1ZBTFVFKSB7XG4gICAgICAgICAgICAgICAgbGV0IGV4cHJlc3Npb24gPSBpdGVtc1sxXTtcbiAgICAgICAgICAgICAgICBjb21wdXRlZFZhbHVlID0gZXZhbChleHByZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21wdXRlZFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbVZhbHVlO1xuICAgIH1cbiAgICBnZXRBY3RpdmVUYWJWYWx1ZSh2YXJpYWJsZSwgY3VycmVudEFjdGl2ZVRhYikge1xuICAgICAgICBsZXQgdmFyVmFsdWUgPSBcIlwiO1xuICAgICAgICBpZiAoY3VycmVudEFjdGl2ZVRhYiAmJiBjdXJyZW50QWN0aXZlVGFiLnVybCkge1xuICAgICAgICAgICAgbGV0IHVyaSA9IG5ldyBVUkwoY3VycmVudEFjdGl2ZVRhYi51cmwpO1xuICAgICAgICAgICAgdmFyVmFsdWUgPSB1cmlbdmFyaWFibGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YXJWYWx1ZTtcbiAgICB9XG4gICAgc3Vic3RpdHV0ZVZhbHVlKHVybCwgcGFyYW1OYW1lLCBwYXJhbVZhbHVlKSB7XG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKHRoaXMuZ2V0Rm9ybWF0dGVkUGFyYW1OYW1lKHBhcmFtTmFtZSksIHBhcmFtVmFsdWUpO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cbiAgICByZW5kZXJCb29rbWFya0FkZENvbnRyb2xzKCkge1xuICAgICAgICAkKFwiI2JtTmFtZVwiKS52YWwoJycpO1xuICAgICAgICAkKFwiI2JtVXJsXCIpLnZhbChcIlwiKTtcbiAgICAgICAgJCgnI2JtQWRkJykuY2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJtTmFtZSA9ICQoXCIjYm1OYW1lXCIpLnZhbCgpO1xuICAgICAgICAgICAgbGV0IGJtVXJsID0gJChcIiNibVVybFwiKS52YWwoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQm9va21hcmtJdGVtKGJtTmFtZSwgYm1VcmwpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZEJvb2ttYXJrSXRlbShuYW1lLCB1cmwpIHtcbiAgICAgICAgaWYgKG5hbWUgJiYgdXJsKSB7XG4gICAgICAgICAgICBsZXQgbmV3Qm9va21hcmsgPSB7IG5hbWU6IG5hbWUsIHVybDogdXJsIH07XG4gICAgICAgICAgICByZXR1cm4gc3RvcmVfMS5TdG9yZS5pbnN0YW5jZS5hZGRCb29rbWFyayhuZXdCb29rbWFyayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZW5kZXJQYXJhbWV0ZXJzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZVBhcmFtZXRlcnMgPSBzdG9yZV8xLlN0b3JlLmluc3RhbmNlLmdldFBhcmFtZXRlcnMoKTtcbiAgICAgICAgbGV0IGdsb2JhbFBhcmFtZXRlckxpc3RDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbFBhcmFtZXRlckxpc3RcIik7XG4gICAgICAgIGlmIChnbG9iYWxQYXJhbWV0ZXJMaXN0Q29udGFpbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWxQYXJhbWV0ZXJMaXN0Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgcHJvbWlzZVBhcmFtZXRlcnMudGhlbigocGFyYW1ldGVyc09iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzT2JqZWN0Lml0ZW1zLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyYW1JdGVtID0gW3Aua2V5LCBwLnZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2gocGFyYW1JdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxldCBoZWFyZGVycyA9IFtdO1xuICAgICAgICAgICAgICAgIGhlYXJkZXJzLnB1c2goXCJLZXlcIik7XG4gICAgICAgICAgICAgICAgaGVhcmRlcnMucHVzaChcIlZhbHVlXCIpO1xuICAgICAgICAgICAgICAgIGxldCB0YWJsZSA9IHRoaXMuY3JlYXRlVGFibGUoaXRlbXMsIGhlYXJkZXJzKTtcbiAgICAgICAgICAgICAgICBnbG9iYWxQYXJhbWV0ZXJMaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRhYmxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNyZWF0ZVRhYmxlKHRhYmxlRGF0YSwgaGVhZGVycykge1xuICAgICAgICBsZXQgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xuICAgICAgICBpZiAoaGVhZGVycykge1xuICAgICAgICAgICAgbGV0IHRhYmxlSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoZWFkJyk7XG4gICAgICAgICAgICBsZXQgaGVhZGVyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGVhZGVyRGF0YSkge1xuICAgICAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKTtcbiAgICAgICAgICAgICAgICBjZWxsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGhlYWRlckRhdGEpKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJSb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRhYmxlSGVhZC5hcHBlbmRDaGlsZChoZWFkZXJSb3cpO1xuICAgICAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGFibGVIZWFkKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGFibGVCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKTtcbiAgICAgICAgdGFibGVEYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvd0RhdGEpIHtcbiAgICAgICAgICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICAgICAgcm93RGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChjZWxsRGF0YSkge1xuICAgICAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgICAgICBjZWxsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNlbGxEYXRhKSk7XG4gICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0YWJsZUJvZHkuYXBwZW5kQ2hpbGQocm93KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRhYmxlQm9keSk7XG4gICAgICAgIHJldHVybiB0YWJsZTtcbiAgICB9XG4gICAgcmVuZGVyUGFyYW1ldGVyQWRkQ29udHJvbHMoKSB7XG4gICAgICAgICQoXCIjcG1LZXlcIikudmFsKFwiXCIpO1xuICAgICAgICAkKFwiI3BtVmFsdWVcIikudmFsKFwiXCIpO1xuICAgICAgICAkKCcjcG1BZGQnKS5jbGljaygoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcG1LZXkgPSAkKFwiI3BtS2V5XCIpLnZhbCgpO1xuICAgICAgICAgICAgbGV0IHBtVmFsdWUgPSAkKFwiI3BtVmFsdWVcIikudmFsKCk7XG4gICAgICAgICAgICB0aGlzLmFkZFBhcmFtZXRlcihwbUtleSwgcG1WYWx1ZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkUGFyYW1ldGVyKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGtleSAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IG5ld1BhcmFtZXRlciA9IHsga2V5OiBrZXksIHZhbHVlOiB2YWx1ZSB9O1xuICAgICAgICAgICAgcmV0dXJuIHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuYWRkUGFyYW1ldGVyKG5ld1BhcmFtZXRlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbn1cbmV4cG9ydHMuUG9wdXBDb250cm9sbGVyID0gUG9wdXBDb250cm9sbGVyO1xuUG9wdXBDb250cm9sbGVyLmluc3RhbmNlID0gbmV3IFBvcHVwQ29udHJvbGxlcigpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBTdG9yZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycyA9IHsgaXRlbXM6IFtdIH07XG4gICAgICAgIHRoaXMuYm9va21hcmtzID0geyBpdGVtczogW10gfTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZURlZmF1bHRzKCkge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuaXRlbXMucHVzaCh7IGtleTogXCJDdXJyZW50VGFiT3JpZ2luXCIsIHZhbHVlOiBcIiRBY3RpdmVUYWI6b3JpZ2luXCIgfSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5pdGVtcy5wdXNoKHsga2V5OiBcIkN1cnJlbnRUYWJIb3N0XCIsIHZhbHVlOiBcIiRBY3RpdmVUYWI6aG9zdFwiIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuaXRlbXMucHVzaCh7IGtleTogXCJpc3N1ZXJJZFwiLCB2YWx1ZTogXCJNeSB0ZXN0IElzc3VlciBJZFwiIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuaXRlbXMucHVzaCh7IGtleTogXCJhdWRpZW5jZUlkXCIsIHZhbHVlOiBcIk15IHRlc3QgYXVkaWVuY2UgSWRcIiB9KTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLml0ZW1zLnB1c2goeyBrZXk6IFwiU2VhcmNoVGV4dFwiLCB2YWx1ZTogXCIkSnM6J25ld3Mgb24gJyArIG5ldyBEYXRlKCkudG9TdHJpbmcoKVwiIH0pO1xuICAgICAgICB0aGlzLmJvb2ttYXJrcy5pdGVtcy5wdXNoKHsgbmFtZTogXCJUZW5hbnRJbmZvXCIsIHVybDogXCJ7e0N1cnJlbnRUYWJPcmlnaW59fS9xYS9jZHAvY2RwLmpzcFwiIH0pO1xuICAgICAgICB0aGlzLmJvb2ttYXJrcy5pdGVtcy5wdXNoKHsgbmFtZTogXCJHZW5lcmF0ZSBKV1RcIiwgdXJsOiBcInt7Q3VycmVudFRhYk9yaWdpbn19L3FhL2NkcC9nZW5lcmF0ZWp3dC5qc3BcIiB9KTtcbiAgICAgICAgdGhpcy5ib29rbWFya3MuaXRlbXMucHVzaCh7IG5hbWU6IFwiTWludCBKV1RcIiwgdXJsOiBcInt7Q3VycmVudFRhYk9yaWdpbn19L3FhL2NkcC9taW50ZWRqd3QuanNwP2lzc3VlcklkPXt7aXNzdWVySWR9fSZhdWRpZW5jZUlkPXt7YXVkaWVuY2VJZH19JnR5cGU9SldUXCIgfSk7XG4gICAgICAgIHRoaXMuYm9va21hcmtzLml0ZW1zLnB1c2goeyBuYW1lOiBcIk5ld3MgVG9kYXlcIiwgdXJsOiBcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vc2VhcmNoP3E9e3tTZWFyY2hUZXh0fX1cIiB9KTtcbiAgICAgICAgdGhpcy5ib29rbWFya3MuaXRlbXMucHVzaCh7IG5hbWU6IFwiR29vZ2xlIEN1cnJlbnQgSG9zdFwiLCB1cmw6IFwie3tDdXJyZW50VGFiT3JpZ2lufX0vcWEvY2RwL2NkcC5qc3BcIiB9KTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRGVmYXVsdHMoKTtcbiAgICAgICAgbGV0IHAxID0gdGhpcy5zYXZlUGFyYW1ldGVycyh0aGlzLnBhcmFtZXRlcnMpO1xuICAgICAgICBsZXQgcDIgPSB0aGlzLnNhdmVCb29rbWFya3ModGhpcy5ib29rbWFya3MpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3AxLCBwMl0pLnRoZW4oKTtcbiAgICB9XG4gICAgZ2V0Qm9va21hcmtzKCkge1xuICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFwiQm9va21hcmtMaXN0XCIsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9va21hcmtzID0gcmVzdWx0LkJvb2ttYXJrTGlzdDtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGJvb2ttYXJrcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBnZXRQYXJhbWV0ZXJzKCkge1xuICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFwiUGFyYW1MaXN0XCIsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1ldGVycyA9IHJlc3VsdC5QYXJhbUxpc3Q7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHNhdmVQYXJhbWV0ZXJzKHBhcmFtZXRlcnNPYmplY3QpIHtcbiAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7IFBhcmFtTGlzdDogcGFyYW1ldGVyc09iamVjdCB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTYXZlZCBwYXJhbWV0ZXJzXCIpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHNhdmVCb29rbWFya3MoYm9va21hcmtzT2JqZWN0KSB7XG4gICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoeyBCb29rbWFya0xpc3Q6IGJvb2ttYXJrc09iamVjdCB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTYXZlZCBib29rbWFya3NcIik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgYWRkQm9va21hcmsobmV3Qm9va21hcmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Qm9va21hcmtzKCkudGhlbihib29rbWFya3MgPT4ge1xuICAgICAgICAgICAgYm9va21hcmtzLml0ZW1zLnB1c2gobmV3Qm9va21hcmspO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZUJvb2ttYXJrcyhib29rbWFya3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkUGFyYW1ldGVyKG5ld1BhcmFtZXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXJzKCkudGhlbihwYXJhbWV0ZXJzID0+IHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnMuaXRlbXMucHVzaChuZXdQYXJhbWV0ZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZVBhcmFtZXRlcnMocGFyYW1ldGVycyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuU3RvcmUgPSBTdG9yZTtcblN0b3JlLmluc3RhbmNlID0gbmV3IFN0b3JlKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0ICQgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xuY29uc3QgcG9wdXBjb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9wb3B1cGNvbnRyb2xsZXJcIik7XG5sZXQgY291bnQgPSAwO1xuJChmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuICAgICAgICBwb3B1cGNvbnRyb2xsZXJfMS5Qb3B1cENvbnRyb2xsZXIuaW5zdGFuY2UucmVuZGVyKCk7XG4gICAgfSk7XG4gICAgLy8gY29uc3QgcXVlcnlJbmZvID0ge1xuICAgIC8vICAgYWN0aXZlOiB0cnVlLFxuICAgIC8vICAgY3VycmVudFdpbmRvdzogdHJ1ZVxuICAgIC8vIH07XG4gICAgLy8gY2hyb21lLnRhYnMucXVlcnkocXVlcnlJbmZvLCBmdW5jdGlvbih0YWJzKSB7XG4gICAgLy8gICAkKCcjdXJsJykudGV4dCh0YWJzWzBdLnVybCk7XG4gICAgLy8gICAkKCcjdGltZScpLnRleHQobW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJykpO1xuICAgIC8vIH0pO1xuICAgIC8vIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7dGV4dDogY291bnQudG9TdHJpbmcoKX0pO1xuICAgIC8vICQoJyNjb3VudFVwJykuY2xpY2soKCk9PntcbiAgICAvLyAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7dGV4dDogKCsrY291bnQpLnRvU3RyaW5nKCl9KTtcbiAgICAvLyB9KTtcbiAgICAvLyAkKCcjY2hhbmdlQmFja2dyb3VuZCcpLmNsaWNrKCgpPT57XG4gICAgLy8gICBjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlfSwgZnVuY3Rpb24odGFicykge1xuICAgIC8vICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJzWzBdLmlkLCB7XG4gICAgLy8gICAgICAgY29sb3I6ICcjNTU1NTU1J1xuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBmdW5jdGlvbihtc2cpIHtcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdCBtZXNzYWdlOlwiLCBtc2cpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9