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
                let bmList = document.createElement("ul");
                bookmarks.items.forEach(bookmark => {
                    let url = bookmark.url;
                    let resolvedUrl = parameterutils_1.ParameterUtil.getResolvedUrl(url, parameters, currentTab);
                    let bmUi = htmlutils_1.HtmlUtil.getBookmarkDisplay(bookmark.name, resolvedUrl);
                    bmList.appendChild(bmUi);
                });
                bookmarkListContainer.appendChild(bmList);
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
    static getListItemWithClose(childElemet) {
        let newLi = document.createElement("li");
        newLi.appendChild(childElemet);
        let closeButton = document.createElement("span");
        closeButton.className = "close";
        closeButton.innerHTML = '&times;';
        newLi.appendChild(closeButton);
        return newLi;
    }
    static getBookmarkDisplay(name, resolvedUrl) {
        let anchorElement = HtmlUtil.getAnchorElement(name, resolvedUrl);
        return HtmlUtil.getListItemWithClose(anchorElement);
    }
    static getAnchorElement(name, resolvedUrl) {
        let x = document.createElement("A");
        let t = document.createTextNode(name);
        x.setAttribute("target", "_base");
        x.setAttribute("href", resolvedUrl);
        x.appendChild(t);
        return x;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXJzL3BvcHVwY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlcnMvc3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvcHVwLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9odG1sdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3BhcmFtZXRlcnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwicG9wdXBcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9wb3B1cC50c1wiLFwidmVuZG9yXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzdG9yZV8xID0gcmVxdWlyZShcIi4vc3RvcmVcIik7XG5jb25zdCBodG1sdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9odG1sdXRpbHNcIik7XG5jb25zdCBwYXJhbWV0ZXJ1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL3BhcmFtZXRlcnV0aWxzXCIpO1xuY29uc3QgJCA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5jbGFzcyBQb3B1cENvbnRyb2xsZXIge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnJlbmRlckJvb2ttYXJrcygpO1xuICAgICAgICB0aGlzLnJlbmRlckJvb2ttYXJrQWRkQ29udHJvbHMoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJQYXJhbWV0ZXJzKCk7XG4gICAgICAgIHRoaXMucmVuZGVyUGFyYW1ldGVyQWRkQ29udHJvbHMoKTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGdldEN1cnJlbnRBY3RpdmVUYWIoKSB7XG4gICAgICAgIGxldCBxdWVyeVJlcSA9IHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH07XG4gICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkocXVlcnlSZXEsICh0YWJzKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRUYWIgPSB0YWJzWzBdO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoY3VycmVudFRhYik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICByZW5kZXJCb29rbWFya3MoKSB7XG4gICAgICAgIGxldCBibVByb21pc2UgPSBzdG9yZV8xLlN0b3JlLmluc3RhbmNlLmdldEJvb2ttYXJrcygpO1xuICAgICAgICBsZXQgY3RQcm9taXNlID0gdGhpcy5nZXRDdXJyZW50QWN0aXZlVGFiKCk7XG4gICAgICAgIGxldCBwYXJhbWV0ZXJzUHJvbWlzZSA9IHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuZ2V0UGFyYW1ldGVycygpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2JtUHJvbWlzZSwgcGFyYW1ldGVyc1Byb21pc2UsIGN0UHJvbWlzZV0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJvb2ttYXJrcyA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIGxldCBwYXJhbWV0ZXJzID0gcmVzdWx0WzFdO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRUYWIgPSByZXN1bHRbMl07XG4gICAgICAgICAgICBsZXQgYm9va21hcmtMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib29rbWFya0xpc3RcIik7XG4gICAgICAgICAgICBpZiAoYm9va21hcmtMaXN0Q29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgYm9va21hcmtMaXN0Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgIGxldCBibUxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICAgICAgICAgICAgYm9va21hcmtzLml0ZW1zLmZvckVhY2goYm9va21hcmsgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gYm9va21hcmsudXJsO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzb2x2ZWRVcmwgPSBwYXJhbWV0ZXJ1dGlsc18xLlBhcmFtZXRlclV0aWwuZ2V0UmVzb2x2ZWRVcmwodXJsLCBwYXJhbWV0ZXJzLCBjdXJyZW50VGFiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJtVWkgPSBodG1sdXRpbHNfMS5IdG1sVXRpbC5nZXRCb29rbWFya0Rpc3BsYXkoYm9va21hcmsubmFtZSwgcmVzb2x2ZWRVcmwpO1xuICAgICAgICAgICAgICAgICAgICBibUxpc3QuYXBwZW5kQ2hpbGQoYm1VaSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYm9va21hcmtMaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGJtTGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXJCb29rbWFya0FkZENvbnRyb2xzKCkge1xuICAgICAgICAkKFwiI2JtTmFtZVwiKS52YWwoJycpO1xuICAgICAgICAkKFwiI2JtVXJsXCIpLnZhbChcIlwiKTtcbiAgICAgICAgJCgnI2JtQWRkJykuY2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJtTmFtZSA9ICQoXCIjYm1OYW1lXCIpLnZhbCgpO1xuICAgICAgICAgICAgbGV0IGJtVXJsID0gJChcIiNibVVybFwiKS52YWwoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQm9va21hcmtJdGVtKGJtTmFtZSwgYm1VcmwpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZEJvb2ttYXJrSXRlbShuYW1lLCB1cmwpIHtcbiAgICAgICAgaWYgKG5hbWUgJiYgdXJsKSB7XG4gICAgICAgICAgICBsZXQgbmV3Qm9va21hcmsgPSB7IG5hbWU6IG5hbWUsIHVybDogdXJsIH07XG4gICAgICAgICAgICByZXR1cm4gc3RvcmVfMS5TdG9yZS5pbnN0YW5jZS5hZGRCb29rbWFyayhuZXdCb29rbWFyayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZW5kZXJQYXJhbWV0ZXJzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZVBhcmFtZXRlcnMgPSBzdG9yZV8xLlN0b3JlLmluc3RhbmNlLmdldFBhcmFtZXRlcnMoKTtcbiAgICAgICAgbGV0IGdsb2JhbFBhcmFtZXRlckxpc3RDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbFBhcmFtZXRlckxpc3RcIik7XG4gICAgICAgIGlmIChnbG9iYWxQYXJhbWV0ZXJMaXN0Q29udGFpbmVyKSB7XG4gICAgICAgICAgICBwcm9taXNlUGFyYW1ldGVycy50aGVuKChwYXJhbWV0ZXJzT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNPYmplY3QuaXRlbXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJhbUl0ZW0gPSBbcC5rZXksIHAudmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaChwYXJhbUl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbGV0IGhlYXJkZXJzID0gW107XG4gICAgICAgICAgICAgICAgaGVhcmRlcnMucHVzaChcIktleVwiKTtcbiAgICAgICAgICAgICAgICBoZWFyZGVycy5wdXNoKFwiVmFsdWVcIik7XG4gICAgICAgICAgICAgICAgbGV0IHRhYmxlID0gaHRtbHV0aWxzXzEuSHRtbFV0aWwuY3JlYXRlVGFibGUoaXRlbXMsIGhlYXJkZXJzKTtcbiAgICAgICAgICAgICAgICBnbG9iYWxQYXJhbWV0ZXJMaXN0Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgIGdsb2JhbFBhcmFtZXRlckxpc3RDb250YWluZXIuYXBwZW5kQ2hpbGQodGFibGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyUGFyYW1ldGVyQWRkQ29udHJvbHMoKSB7XG4gICAgICAgICQoXCIjcG1LZXlcIikudmFsKFwiXCIpO1xuICAgICAgICAkKFwiI3BtVmFsdWVcIikudmFsKFwiXCIpO1xuICAgICAgICAkKCcjcG1BZGQnKS5jbGljaygoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcG1LZXkgPSAkKFwiI3BtS2V5XCIpLnZhbCgpO1xuICAgICAgICAgICAgbGV0IHBtVmFsdWUgPSAkKFwiI3BtVmFsdWVcIikudmFsKCk7XG4gICAgICAgICAgICB0aGlzLmFkZFBhcmFtZXRlcihwbUtleSwgcG1WYWx1ZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkUGFyYW1ldGVyKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGtleSAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IG5ld1BhcmFtZXRlciA9IHsga2V5OiBrZXksIHZhbHVlOiB2YWx1ZSB9O1xuICAgICAgICAgICAgcmV0dXJuIHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuYWRkUGFyYW1ldGVyKG5ld1BhcmFtZXRlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbn1cbmV4cG9ydHMuUG9wdXBDb250cm9sbGVyID0gUG9wdXBDb250cm9sbGVyO1xuUG9wdXBDb250cm9sbGVyLmluc3RhbmNlID0gbmV3IFBvcHVwQ29udHJvbGxlcigpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBTdG9yZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycyA9IHsgaXRlbXM6IFtdIH07XG4gICAgICAgIHRoaXMuYm9va21hcmtzID0geyBpdGVtczogW10gfTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZURlZmF1bHRzKCkge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuaXRlbXMucHVzaCh7IGtleTogXCJDdXJyZW50VGFiT3JpZ2luXCIsIHZhbHVlOiBcIiRBY3RpdmVUYWI6b3JpZ2luXCIgfSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5pdGVtcy5wdXNoKHsga2V5OiBcIkN1cnJlbnRUYWJIb3N0XCIsIHZhbHVlOiBcIiRBY3RpdmVUYWI6aG9zdFwiIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuaXRlbXMucHVzaCh7IGtleTogXCJpc3N1ZXJJZFwiLCB2YWx1ZTogXCIxMjMzNDUzNEFBRkdERkcyMzRcIiB9KTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLml0ZW1zLnB1c2goeyBrZXk6IFwiYXVkaWVuY2VJZFwiLCB2YWx1ZTogXCJBVUQxMjMzNDUzNEFBRkdERkcyMzRcIiB9KTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLml0ZW1zLnB1c2goeyBrZXk6IFwiU2VhcmNoVGV4dFwiLCB2YWx1ZTogXCIkSnM6J25ld3Mgb24gJyArIG5ldyBEYXRlKCkudG9TdHJpbmcoKVwiIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuaXRlbXMucHVzaCh7IGtleTogXCJEYXlPZldlZWtcIiwgdmFsdWU6IFwiJEpzOm5ldyBEYXRlKCkudG9TdHJpbmcoKS5zcGxpdCgnICcpWzBdICsgJ2RheSdcIiB9KTtcbiAgICAgICAgdGhpcy5ib29rbWFya3MuaXRlbXMucHVzaCh7IG5hbWU6IFwiVGVuYW50SW5mb1wiLCB1cmw6IFwie3tDdXJyZW50VGFiT3JpZ2lufX0vcWEvY2RwL2NkcC5qc3BcIiB9KTtcbiAgICAgICAgdGhpcy5ib29rbWFya3MuaXRlbXMucHVzaCh7IG5hbWU6IFwiR2VuZXJhdGUgSldUXCIsIHVybDogXCJ7e0N1cnJlbnRUYWJPcmlnaW59fS9xYS9jZHAvZ2VuZXJhdGVqd3QuanNwXCIgfSk7XG4gICAgICAgIHRoaXMuYm9va21hcmtzLml0ZW1zLnB1c2goeyBuYW1lOiBcIk1pbnQgSldUXCIsIHVybDogXCJ7e0N1cnJlbnRUYWJPcmlnaW59fS9xYS9jZHAvbWludGVkand0LmpzcD9pc3N1ZXJJZD17e2lzc3VlcklkfX0mYXVkaWVuY2VJZD17e2F1ZGllbmNlSWR9fSZ0eXBlPUpXVFwiIH0pO1xuICAgICAgICB0aGlzLmJvb2ttYXJrcy5pdGVtcy5wdXNoKHsgbmFtZTogXCJOZXdzIFRvZGF5XCIsIHVybDogXCJodHRwczovL3d3dy5nb29nbGUuY29tL3NlYXJjaD9xPXt7U2VhcmNoVGV4dH19XCIgfSk7XG4gICAgICAgIHRoaXMuYm9va21hcmtzLml0ZW1zLnB1c2goeyBuYW1lOiBcIkdvb2dsZSBDdXJyZW50IEhvc3RcIiwgdXJsOiBcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vc2VhcmNoP3E9e3tDdXJyZW50VGFiSG9zdH19XCIgfSk7XG4gICAgICAgIHRoaXMuYm9va21hcmtzLml0ZW1zLnB1c2goeyBuYW1lOiBcIkpva2Ugb24gRGF5XCIsIHVybDogXCJodHRwczovL3d3dy5nb29nbGUuY29tL3NlYXJjaD9xPVRlbGwgbWUgYSBqb2tlIGFib3V0IHt7RGF5T2ZXZWVrfX1cIiB9KTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRGVmYXVsdHMoKTtcbiAgICAgICAgbGV0IHAxID0gdGhpcy5zYXZlUGFyYW1ldGVycyh0aGlzLnBhcmFtZXRlcnMpO1xuICAgICAgICBsZXQgcDIgPSB0aGlzLnNhdmVCb29rbWFya3ModGhpcy5ib29rbWFya3MpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3AxLCBwMl0pLnRoZW4oKTtcbiAgICB9XG4gICAgZ2V0Qm9va21hcmtzKCkge1xuICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFwiQm9va21hcmtMaXN0XCIsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9va21hcmtzID0gcmVzdWx0LkJvb2ttYXJrTGlzdDtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGJvb2ttYXJrcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBnZXRQYXJhbWV0ZXJzKCkge1xuICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFwiUGFyYW1MaXN0XCIsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1ldGVycyA9IHJlc3VsdC5QYXJhbUxpc3Q7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHNhdmVQYXJhbWV0ZXJzKHBhcmFtZXRlcnNPYmplY3QpIHtcbiAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7IFBhcmFtTGlzdDogcGFyYW1ldGVyc09iamVjdCB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTYXZlZCBwYXJhbWV0ZXJzXCIpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHNhdmVCb29rbWFya3MoYm9va21hcmtzT2JqZWN0KSB7XG4gICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoeyBCb29rbWFya0xpc3Q6IGJvb2ttYXJrc09iamVjdCB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTYXZlZCBib29rbWFya3NcIik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgYWRkQm9va21hcmsobmV3Qm9va21hcmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Qm9va21hcmtzKCkudGhlbihib29rbWFya3MgPT4ge1xuICAgICAgICAgICAgYm9va21hcmtzLml0ZW1zLnB1c2gobmV3Qm9va21hcmspO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZUJvb2ttYXJrcyhib29rbWFya3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkUGFyYW1ldGVyKG5ld1BhcmFtZXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXJzKCkudGhlbihwYXJhbWV0ZXJzID0+IHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnMuaXRlbXMucHVzaChuZXdQYXJhbWV0ZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZVBhcmFtZXRlcnMocGFyYW1ldGVycyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuU3RvcmUgPSBTdG9yZTtcblN0b3JlLmluc3RhbmNlID0gbmV3IFN0b3JlKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0ICQgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xuY29uc3QgcG9wdXBjb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9wb3B1cGNvbnRyb2xsZXJcIik7XG5sZXQgY291bnQgPSAwO1xuJChmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuICAgICAgICBwb3B1cGNvbnRyb2xsZXJfMS5Qb3B1cENvbnRyb2xsZXIuaW5zdGFuY2UucmVuZGVyKCk7XG4gICAgfSk7XG4gICAgdmFyIGNvbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29sbGFwc2libGVcIik7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IGNvbGwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29sbFtpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGlmIChjb250ZW50LnN0eWxlLm1heEhlaWdodCkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gY29udGVudC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBjb25zdCBxdWVyeUluZm8gPSB7XG4gICAgLy8gICBhY3RpdmU6IHRydWUsXG4gICAgLy8gICBjdXJyZW50V2luZG93OiB0cnVlXG4gICAgLy8gfTtcbiAgICAvLyBjaHJvbWUudGFicy5xdWVyeShxdWVyeUluZm8sIGZ1bmN0aW9uKHRhYnMpIHtcbiAgICAvLyAgICQoJyN1cmwnKS50ZXh0KHRhYnNbMF0udXJsKTtcbiAgICAvLyAgICQoJyN0aW1lJykudGV4dChtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSk7XG4gICAgLy8gfSk7XG4gICAgLy8gY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHt0ZXh0OiBjb3VudC50b1N0cmluZygpfSk7XG4gICAgLy8gJCgnI2NvdW50VXAnKS5jbGljaygoKT0+e1xuICAgIC8vICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHt0ZXh0OiAoKytjb3VudCkudG9TdHJpbmcoKX0pO1xuICAgIC8vIH0pO1xuICAgIC8vICQoJyNjaGFuZ2VCYWNrZ3JvdW5kJykuY2xpY2soKCk9PntcbiAgICAvLyAgIGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9LCBmdW5jdGlvbih0YWJzKSB7XG4gICAgLy8gICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHtcbiAgICAvLyAgICAgICBjb2xvcjogJyM1NTU1NTUnXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIGZ1bmN0aW9uKG1zZykge1xuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0IG1lc3NhZ2U6XCIsIG1zZyk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgfSk7XG4gICAgLy8gfSk7XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgSHRtbFV0aWwge1xuICAgIHN0YXRpYyBjcmVhdGVUYWJsZSh0YWJsZURhdGEsIGhlYWRlcnMpIHtcbiAgICAgICAgbGV0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcbiAgICAgICAgaWYgKGhlYWRlcnMpIHtcbiAgICAgICAgICAgIGxldCB0YWJsZUhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpO1xuICAgICAgICAgICAgbGV0IGhlYWRlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24gKGhlYWRlckRhdGEpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJyk7XG4gICAgICAgICAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShoZWFkZXJEYXRhKSk7XG4gICAgICAgICAgICAgICAgaGVhZGVyUm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0YWJsZUhlYWQuYXBwZW5kQ2hpbGQoaGVhZGVyUm93KTtcbiAgICAgICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRhYmxlSGVhZCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRhYmxlQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5Jyk7XG4gICAgICAgIHRhYmxlRGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3dEYXRhKSB7XG4gICAgICAgICAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgICAgIHJvd0RhdGEuZm9yRWFjaChmdW5jdGlvbiAoY2VsbERhdGEpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjZWxsRGF0YSkpO1xuICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUJvZHkpO1xuICAgICAgICByZXR1cm4gdGFibGU7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRMaXN0SXRlbVdpdGhDbG9zZShjaGlsZEVsZW1ldCkge1xuICAgICAgICBsZXQgbmV3TGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgIG5ld0xpLmFwcGVuZENoaWxkKGNoaWxkRWxlbWV0KTtcbiAgICAgICAgbGV0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9IFwiY2xvc2VcIjtcbiAgICAgICAgY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gJyZ0aW1lczsnO1xuICAgICAgICBuZXdMaS5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XG4gICAgICAgIHJldHVybiBuZXdMaTtcbiAgICB9XG4gICAgc3RhdGljIGdldEJvb2ttYXJrRGlzcGxheShuYW1lLCByZXNvbHZlZFVybCkge1xuICAgICAgICBsZXQgYW5jaG9yRWxlbWVudCA9IEh0bWxVdGlsLmdldEFuY2hvckVsZW1lbnQobmFtZSwgcmVzb2x2ZWRVcmwpO1xuICAgICAgICByZXR1cm4gSHRtbFV0aWwuZ2V0TGlzdEl0ZW1XaXRoQ2xvc2UoYW5jaG9yRWxlbWVudCk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRBbmNob3JFbGVtZW50KG5hbWUsIHJlc29sdmVkVXJsKSB7XG4gICAgICAgIGxldCB4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkFcIik7XG4gICAgICAgIGxldCB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobmFtZSk7XG4gICAgICAgIHguc2V0QXR0cmlidXRlKFwidGFyZ2V0XCIsIFwiX2Jhc2VcIik7XG4gICAgICAgIHguc2V0QXR0cmlidXRlKFwiaHJlZlwiLCByZXNvbHZlZFVybCk7XG4gICAgICAgIHguYXBwZW5kQ2hpbGQodCk7XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbn1cbmV4cG9ydHMuSHRtbFV0aWwgPSBIdG1sVXRpbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgUGFyYW1ldGVyVXRpbCB7XG4gICAgc3RhdGljIGdldFJlc29sdmVkVXJsKHVybCwgcGFyYW1ldGVycywgY3VycmVudFRhYikge1xuICAgICAgICBsZXQgcmVzb2x2ZWRVcmwgPSB1cmw7XG4gICAgICAgIGlmIChwYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzLml0ZW1zLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtVmFsdWUgPSB0aGlzLmdldFJ1bnRpbWVQYXJhbVZhbHVlKHAudmFsdWUsIGN1cnJlbnRUYWIpO1xuICAgICAgICAgICAgICAgIHJlc29sdmVkVXJsID0gdGhpcy5zdWJzdGl0dXRlVmFsdWUocmVzb2x2ZWRVcmwsIHAua2V5LCBwYXJhbVZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNvbHZlZFVybDtcbiAgICB9XG4gICAgc3RhdGljIGdldEZvcm1hdHRlZFBhcmFtTmFtZShwYXJhbU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIFwie3tcIiArIHBhcmFtTmFtZSArIFwifX1cIjtcbiAgICB9XG4gICAgc3RhdGljIGdldFJ1bnRpbWVQYXJhbVZhbHVlKHBhcmFtVmFsdWUsIGN1cnJlbnRBY3RpdmVUYWIpIHtcbiAgICAgICAgaWYgKHBhcmFtVmFsdWUuaW5kZXhPZihQYXJhbWV0ZXJVdGlsLlBBUkFNX1RZUEVfU0VQQVJBVE9SKSA+IDApIHtcbiAgICAgICAgICAgIGxldCBpdGVtcyA9IHBhcmFtVmFsdWUuc3BsaXQoUGFyYW1ldGVyVXRpbC5QQVJBTV9UWVBFX1NFUEFSQVRPUik7XG4gICAgICAgICAgICBsZXQgcGFyYW1WYWx1ZVR5cGUgPSBpdGVtc1swXTtcbiAgICAgICAgICAgIGxldCBjb21wdXRlZFZhbHVlID0gaXRlbXNbMV07XG4gICAgICAgICAgICBpZiAocGFyYW1WYWx1ZVR5cGUgPT0gUGFyYW1ldGVyVXRpbC5QQVJBTV9UWVBFX0FDVElWRV9UQUIpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJvcGVydHlOYW1lID0gaXRlbXNbMV07XG4gICAgICAgICAgICAgICAgY29tcHV0ZWRWYWx1ZSA9IHRoaXMuZ2V0QWN0aXZlVGFiVmFsdWUocHJvcGVydHlOYW1lLCBjdXJyZW50QWN0aXZlVGFiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHBhcmFtVmFsdWVUeXBlID09IFBhcmFtZXRlclV0aWwuUEFSQU1fVFlQRV9KU19WQUxVRSkge1xuICAgICAgICAgICAgICAgIGxldCBleHByZXNzaW9uID0gaXRlbXNbMV07XG4gICAgICAgICAgICAgICAgY29tcHV0ZWRWYWx1ZSA9IGV2YWwoZXhwcmVzc2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tcHV0ZWRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyYW1WYWx1ZTtcbiAgICB9XG4gICAgc3RhdGljIGdldEFjdGl2ZVRhYlZhbHVlKHZhcmlhYmxlLCBjdXJyZW50QWN0aXZlVGFiKSB7XG4gICAgICAgIGxldCB2YXJWYWx1ZSA9IFwiXCI7XG4gICAgICAgIGlmIChjdXJyZW50QWN0aXZlVGFiICYmIGN1cnJlbnRBY3RpdmVUYWIudXJsKSB7XG4gICAgICAgICAgICBsZXQgdXJpID0gbmV3IFVSTChjdXJyZW50QWN0aXZlVGFiLnVybCk7XG4gICAgICAgICAgICB2YXJWYWx1ZSA9IHVyaVt2YXJpYWJsZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhclZhbHVlO1xuICAgIH1cbiAgICBzdGF0aWMgc3Vic3RpdHV0ZVZhbHVlKHVybCwgcGFyYW1OYW1lLCBwYXJhbVZhbHVlKSB7XG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKHRoaXMuZ2V0Rm9ybWF0dGVkUGFyYW1OYW1lKHBhcmFtTmFtZSksIHBhcmFtVmFsdWUpO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cbn1cbmV4cG9ydHMuUGFyYW1ldGVyVXRpbCA9IFBhcmFtZXRlclV0aWw7XG5QYXJhbWV0ZXJVdGlsLlBBUkFNX1RZUEVfQUNUSVZFX1RBQiA9IFwiJEFjdGl2ZVRhYlwiO1xuUGFyYW1ldGVyVXRpbC5QQVJBTV9UWVBFX0pTX1ZBTFVFID0gXCIkSnNcIjtcblBhcmFtZXRlclV0aWwuUEFSQU1fVFlQRV9TRVBBUkFUT1IgPSBcIjpcIjtcbiJdLCJzb3VyY2VSb290IjoiIn0=