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
                    let bmUi = htmlutils_1.HtmlUtil.getBookmarkDisplay(bookmark.name, resolvedUrl, this.deleteBookmark.bind(this));
                    bmList.appendChild(bmUi);
                });
                bookmarkListContainer.appendChild(bmList);
            }
        });
    }
    deleteBookmark(bookmarkName) {
        store_1.Store.instance.deleteBookmark(bookmarkName).then(() => {
            this.render();
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
    deleteBookmark(bookmarkToDelete) {
        return this.getBookmarks().then(bookmarks => {
            bookmarks.items = bookmarks.items.filter(bm => bm.name != bookmarkToDelete);
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
    static getListItemWithClose(childElemet, itemName, deleteHandler) {
        let newLi = document.createElement("li");
        newLi.appendChild(childElemet);
        let closeButton = document.createElement("span");
        closeButton.className = "close";
        closeButton.innerHTML = '&times;';
        newLi.appendChild(closeButton);
        closeButton.addEventListener("click", () => {
            deleteHandler(itemName);
        });
        return newLi;
    }
    static getBookmarkDisplay(name, resolvedUrl, deleteHandler) {
        let anchorElement = HtmlUtil.getAnchorElement(name, resolvedUrl);
        return HtmlUtil.getListItemWithClose(anchorElement, name, deleteHandler);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXJzL3BvcHVwY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlcnMvc3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvcHVwLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9odG1sdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3BhcmFtZXRlcnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInBvcHVwXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvcG9wdXAudHNcIixcInZlbmRvclwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc3RvcmVfMSA9IHJlcXVpcmUoXCIuL3N0b3JlXCIpO1xuY29uc3QgaHRtbHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvaHRtbHV0aWxzXCIpO1xuY29uc3QgcGFyYW1ldGVydXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9wYXJhbWV0ZXJ1dGlsc1wiKTtcbmNvbnN0ICQgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xuY2xhc3MgUG9wdXBDb250cm9sbGVyIHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBwID0gdGhpcy5yZW5kZXJCb29rbWFya3MoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJCb29rbWFya0FkZENvbnRyb2xzKCk7XG4gICAgICAgIHRoaXMucmVuZGVyUGFyYW1ldGVycygpO1xuICAgICAgICB0aGlzLnJlbmRlclBhcmFtZXRlckFkZENvbnRyb2xzKCk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBnZXRDdXJyZW50QWN0aXZlVGFiKCkge1xuICAgICAgICBsZXQgcXVlcnlSZXEgPSB7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9O1xuICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHF1ZXJ5UmVxLCAodGFicykgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50VGFiID0gdGFic1swXTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGN1cnJlbnRUYWIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgcmVuZGVyQm9va21hcmtzKCkge1xuICAgICAgICBsZXQgYm1Qcm9taXNlID0gc3RvcmVfMS5TdG9yZS5pbnN0YW5jZS5nZXRCb29rbWFya3MoKTtcbiAgICAgICAgbGV0IGN0UHJvbWlzZSA9IHRoaXMuZ2V0Q3VycmVudEFjdGl2ZVRhYigpO1xuICAgICAgICBsZXQgcGFyYW1ldGVyc1Byb21pc2UgPSBzdG9yZV8xLlN0b3JlLmluc3RhbmNlLmdldFBhcmFtZXRlcnMoKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtibVByb21pc2UsIHBhcmFtZXRlcnNQcm9taXNlLCBjdFByb21pc2VdKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGxldCBib29rbWFya3MgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBsZXQgcGFyYW1ldGVycyA9IHJlc3VsdFsxXTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50VGFiID0gcmVzdWx0WzJdO1xuICAgICAgICAgICAgbGV0IGJvb2ttYXJrTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9va21hcmtMaXN0XCIpO1xuICAgICAgICAgICAgaWYgKGJvb2ttYXJrTGlzdENvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGJvb2ttYXJrTGlzdENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICBsZXQgYm1MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICAgICAgICAgICAgICAgIGJvb2ttYXJrcy5pdGVtcy5mb3JFYWNoKGJvb2ttYXJrID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVybCA9IGJvb2ttYXJrLnVybDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc29sdmVkVXJsID0gcGFyYW1ldGVydXRpbHNfMS5QYXJhbWV0ZXJVdGlsLmdldFJlc29sdmVkVXJsKHVybCwgcGFyYW1ldGVycywgY3VycmVudFRhYik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBibVVpID0gaHRtbHV0aWxzXzEuSHRtbFV0aWwuZ2V0Qm9va21hcmtEaXNwbGF5KGJvb2ttYXJrLm5hbWUsIHJlc29sdmVkVXJsLCB0aGlzLmRlbGV0ZUJvb2ttYXJrLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgICAgICBibUxpc3QuYXBwZW5kQ2hpbGQoYm1VaSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYm9va21hcmtMaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGJtTGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkZWxldGVCb29rbWFyayhib29rbWFya05hbWUpIHtcbiAgICAgICAgc3RvcmVfMS5TdG9yZS5pbnN0YW5jZS5kZWxldGVCb29rbWFyayhib29rbWFya05hbWUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlckJvb2ttYXJrQWRkQ29udHJvbHMoKSB7XG4gICAgICAgICQoXCIjYm1OYW1lXCIpLnZhbCgnJyk7XG4gICAgICAgICQoXCIjYm1VcmxcIikudmFsKFwiXCIpO1xuICAgICAgICAkKCcjYm1BZGQnKS5jbGljaygoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYm1OYW1lID0gJChcIiNibU5hbWVcIikudmFsKCk7XG4gICAgICAgICAgICBsZXQgYm1VcmwgPSAkKFwiI2JtVXJsXCIpLnZhbCgpO1xuICAgICAgICAgICAgdGhpcy5hZGRCb29rbWFya0l0ZW0oYm1OYW1lLCBibVVybCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkQm9va21hcmtJdGVtKG5hbWUsIHVybCkge1xuICAgICAgICBpZiAobmFtZSAmJiB1cmwpIHtcbiAgICAgICAgICAgIGxldCBuZXdCb29rbWFyayA9IHsgbmFtZTogbmFtZSwgdXJsOiB1cmwgfTtcbiAgICAgICAgICAgIHJldHVybiBzdG9yZV8xLlN0b3JlLmluc3RhbmNlLmFkZEJvb2ttYXJrKG5ld0Jvb2ttYXJrKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlbmRlclBhcmFtZXRlcnMoKSB7XG4gICAgICAgIGxldCBwcm9taXNlUGFyYW1ldGVycyA9IHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuZ2V0UGFyYW1ldGVycygpO1xuICAgICAgICBsZXQgZ2xvYmFsUGFyYW1ldGVyTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsUGFyYW1ldGVyTGlzdFwiKTtcbiAgICAgICAgaWYgKGdsb2JhbFBhcmFtZXRlckxpc3RDb250YWluZXIpIHtcbiAgICAgICAgICAgIHByb21pc2VQYXJhbWV0ZXJzLnRoZW4oKHBhcmFtZXRlcnNPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgcGFyYW1ldGVyc09iamVjdC5pdGVtcy5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmFtSXRlbSA9IFtwLmtleSwgcC52YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHBhcmFtSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsZXQgaGVhcmRlcnMgPSBbXTtcbiAgICAgICAgICAgICAgICBoZWFyZGVycy5wdXNoKFwiS2V5XCIpO1xuICAgICAgICAgICAgICAgIGhlYXJkZXJzLnB1c2goXCJWYWx1ZVwiKTtcbiAgICAgICAgICAgICAgICBsZXQgdGFibGUgPSBodG1sdXRpbHNfMS5IdG1sVXRpbC5jcmVhdGVUYWJsZShpdGVtcywgaGVhcmRlcnMpO1xuICAgICAgICAgICAgICAgIGdsb2JhbFBhcmFtZXRlckxpc3RDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgZ2xvYmFsUGFyYW1ldGVyTGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJQYXJhbWV0ZXJBZGRDb250cm9scygpIHtcbiAgICAgICAgJChcIiNwbUtleVwiKS52YWwoXCJcIik7XG4gICAgICAgICQoXCIjcG1WYWx1ZVwiKS52YWwoXCJcIik7XG4gICAgICAgICQoJyNwbUFkZCcpLmNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBwbUtleSA9ICQoXCIjcG1LZXlcIikudmFsKCk7XG4gICAgICAgICAgICBsZXQgcG1WYWx1ZSA9ICQoXCIjcG1WYWx1ZVwiKS52YWwoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkUGFyYW1ldGVyKHBtS2V5LCBwbVZhbHVlKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRQYXJhbWV0ZXIoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoa2V5ICYmIHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgbmV3UGFyYW1ldGVyID0geyBrZXk6IGtleSwgdmFsdWU6IHZhbHVlIH07XG4gICAgICAgICAgICByZXR1cm4gc3RvcmVfMS5TdG9yZS5pbnN0YW5jZS5hZGRQYXJhbWV0ZXIobmV3UGFyYW1ldGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxufVxuZXhwb3J0cy5Qb3B1cENvbnRyb2xsZXIgPSBQb3B1cENvbnRyb2xsZXI7XG5Qb3B1cENvbnRyb2xsZXIuaW5zdGFuY2UgPSBuZXcgUG9wdXBDb250cm9sbGVyKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFN0b3JlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0geyBpdGVtczogW10gfTtcbiAgICAgICAgdGhpcy5ib29rbWFya3MgPSB7IGl0ZW1zOiBbXSB9O1xuICAgIH1cbiAgICBpbml0aWFsaXplRGVmYXVsdHMoKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5pdGVtcy5wdXNoKHsga2V5OiBcIkN1cnJlbnRUYWJPcmlnaW5cIiwgdmFsdWU6IFwiJEFjdGl2ZVRhYjpvcmlnaW5cIiB9KTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLml0ZW1zLnB1c2goeyBrZXk6IFwiQ3VycmVudFRhYkhvc3RcIiwgdmFsdWU6IFwiJEFjdGl2ZVRhYjpob3N0XCIgfSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5pdGVtcy5wdXNoKHsga2V5OiBcImlzc3VlcklkXCIsIHZhbHVlOiBcIjEyMzM0NTM0QUFGR0RGRzIzNFwiIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuaXRlbXMucHVzaCh7IGtleTogXCJhdWRpZW5jZUlkXCIsIHZhbHVlOiBcIkFVRDEyMzM0NTM0QUFGR0RGRzIzNFwiIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuaXRlbXMucHVzaCh7IGtleTogXCJTZWFyY2hUZXh0XCIsIHZhbHVlOiBcIiRKczonbmV3cyBvbiAnICsgbmV3IERhdGUoKS50b1N0cmluZygpXCIgfSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5pdGVtcy5wdXNoKHsga2V5OiBcIkRheU9mV2Vla1wiLCB2YWx1ZTogXCIkSnM6bmV3IERhdGUoKS50b1N0cmluZygpLnNwbGl0KCcgJylbMF0gKyAnZGF5J1wiIH0pO1xuICAgICAgICB0aGlzLmJvb2ttYXJrcy5pdGVtcy5wdXNoKHsgbmFtZTogXCJUZW5hbnRJbmZvXCIsIHVybDogXCJ7e0N1cnJlbnRUYWJPcmlnaW59fS9xYS9jZHAvY2RwLmpzcFwiIH0pO1xuICAgICAgICB0aGlzLmJvb2ttYXJrcy5pdGVtcy5wdXNoKHsgbmFtZTogXCJHZW5lcmF0ZSBKV1RcIiwgdXJsOiBcInt7Q3VycmVudFRhYk9yaWdpbn19L3FhL2NkcC9nZW5lcmF0ZWp3dC5qc3BcIiB9KTtcbiAgICAgICAgdGhpcy5ib29rbWFya3MuaXRlbXMucHVzaCh7IG5hbWU6IFwiTWludCBKV1RcIiwgdXJsOiBcInt7Q3VycmVudFRhYk9yaWdpbn19L3FhL2NkcC9taW50ZWRqd3QuanNwP2lzc3VlcklkPXt7aXNzdWVySWR9fSZhdWRpZW5jZUlkPXt7YXVkaWVuY2VJZH19JnR5cGU9SldUXCIgfSk7XG4gICAgICAgIHRoaXMuYm9va21hcmtzLml0ZW1zLnB1c2goeyBuYW1lOiBcIk5ld3MgVG9kYXlcIiwgdXJsOiBcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vc2VhcmNoP3E9e3tTZWFyY2hUZXh0fX1cIiB9KTtcbiAgICAgICAgdGhpcy5ib29rbWFya3MuaXRlbXMucHVzaCh7IG5hbWU6IFwiR29vZ2xlIEN1cnJlbnQgSG9zdFwiLCB1cmw6IFwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9zZWFyY2g/cT17e0N1cnJlbnRUYWJIb3N0fX1cIiB9KTtcbiAgICAgICAgdGhpcy5ib29rbWFya3MuaXRlbXMucHVzaCh7IG5hbWU6IFwiSm9rZSBvbiBEYXlcIiwgdXJsOiBcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vc2VhcmNoP3E9VGVsbCBtZSBhIGpva2UgYWJvdXQge3tEYXlPZldlZWt9fVwiIH0pO1xuICAgIH1cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVEZWZhdWx0cygpO1xuICAgICAgICBsZXQgcDEgPSB0aGlzLnNhdmVQYXJhbWV0ZXJzKHRoaXMucGFyYW1ldGVycyk7XG4gICAgICAgIGxldCBwMiA9IHRoaXMuc2F2ZUJvb2ttYXJrcyh0aGlzLmJvb2ttYXJrcyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbcDEsIHAyXSkudGhlbigpO1xuICAgIH1cbiAgICBnZXRCb29rbWFya3MoKSB7XG4gICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoXCJCb29rbWFya0xpc3RcIiwgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib29rbWFya3MgPSByZXN1bHQuQm9va21hcmtMaXN0O1xuICAgICAgICAgICAgICAgIHJlc29sdmUoYm9va21hcmtzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGdldFBhcmFtZXRlcnMoKSB7XG4gICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoXCJQYXJhbUxpc3RcIiwgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwYXJhbWV0ZXJzID0gcmVzdWx0LlBhcmFtTGlzdDtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgc2F2ZVBhcmFtZXRlcnMocGFyYW1ldGVyc09iamVjdCkge1xuICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHsgUGFyYW1MaXN0OiBwYXJhbWV0ZXJzT2JqZWN0IH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNhdmVkIHBhcmFtZXRlcnNcIik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgc2F2ZUJvb2ttYXJrcyhib29rbWFya3NPYmplY3QpIHtcbiAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7IEJvb2ttYXJrTGlzdDogYm9va21hcmtzT2JqZWN0IH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNhdmVkIGJvb2ttYXJrc1wiKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBhZGRCb29rbWFyayhuZXdCb29rbWFyaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCb29rbWFya3MoKS50aGVuKGJvb2ttYXJrcyA9PiB7XG4gICAgICAgICAgICBib29rbWFya3MuaXRlbXMucHVzaChuZXdCb29rbWFyayk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zYXZlQm9va21hcmtzKGJvb2ttYXJrcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkZWxldGVCb29rbWFyayhib29rbWFya1RvRGVsZXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJvb2ttYXJrcygpLnRoZW4oYm9va21hcmtzID0+IHtcbiAgICAgICAgICAgIGJvb2ttYXJrcy5pdGVtcyA9IGJvb2ttYXJrcy5pdGVtcy5maWx0ZXIoYm0gPT4gYm0ubmFtZSAhPSBib29rbWFya1RvRGVsZXRlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNhdmVCb29rbWFya3MoYm9va21hcmtzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZFBhcmFtZXRlcihuZXdQYXJhbWV0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVycygpLnRoZW4ocGFyYW1ldGVycyA9PiB7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzLml0ZW1zLnB1c2gobmV3UGFyYW1ldGVyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNhdmVQYXJhbWV0ZXJzKHBhcmFtZXRlcnMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLlN0b3JlID0gU3RvcmU7XG5TdG9yZS5pbnN0YW5jZSA9IG5ldyBTdG9yZSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCAkID0gcmVxdWlyZShcImpxdWVyeVwiKTtcbmNvbnN0IHBvcHVwY29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvcG9wdXBjb250cm9sbGVyXCIpO1xubGV0IGNvdW50ID0gMDtcbiQoZnVuY3Rpb24gKCkge1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcbiAgICAgICAgcG9wdXBjb250cm9sbGVyXzEuUG9wdXBDb250cm9sbGVyLmluc3RhbmNlLnJlbmRlcigpO1xuICAgIH0pO1xuICAgIHZhciBjb2xsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbGxhcHNpYmxlXCIpO1xuICAgIHZhciBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBjb2xsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbGxbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICBpZiAoY29udGVudC5zdHlsZS5tYXhIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IGNvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gY29uc3QgcXVlcnlJbmZvID0ge1xuICAgIC8vICAgYWN0aXZlOiB0cnVlLFxuICAgIC8vICAgY3VycmVudFdpbmRvdzogdHJ1ZVxuICAgIC8vIH07XG4gICAgLy8gY2hyb21lLnRhYnMucXVlcnkocXVlcnlJbmZvLCBmdW5jdGlvbih0YWJzKSB7XG4gICAgLy8gICAkKCcjdXJsJykudGV4dCh0YWJzWzBdLnVybCk7XG4gICAgLy8gICAkKCcjdGltZScpLnRleHQobW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJykpO1xuICAgIC8vIH0pO1xuICAgIC8vIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7dGV4dDogY291bnQudG9TdHJpbmcoKX0pO1xuICAgIC8vICQoJyNjb3VudFVwJykuY2xpY2soKCk9PntcbiAgICAvLyAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7dGV4dDogKCsrY291bnQpLnRvU3RyaW5nKCl9KTtcbiAgICAvLyB9KTtcbiAgICAvLyAkKCcjY2hhbmdlQmFja2dyb3VuZCcpLmNsaWNrKCgpPT57XG4gICAgLy8gICBjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlfSwgZnVuY3Rpb24odGFicykge1xuICAgIC8vICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJzWzBdLmlkLCB7XG4gICAgLy8gICAgICAgY29sb3I6ICcjNTU1NTU1J1xuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBmdW5jdGlvbihtc2cpIHtcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdCBtZXNzYWdlOlwiLCBtc2cpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH0pO1xufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIEh0bWxVdGlsIHtcbiAgICBzdGF0aWMgY3JlYXRlVGFibGUodGFibGVEYXRhLCBoZWFkZXJzKSB7XG4gICAgICAgIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XG4gICAgICAgIGlmIChoZWFkZXJzKSB7XG4gICAgICAgICAgICBsZXQgdGFibGVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKTtcbiAgICAgICAgICAgIGxldCBoZWFkZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChoZWFkZXJEYXRhKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpO1xuICAgICAgICAgICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaGVhZGVyRGF0YSkpO1xuICAgICAgICAgICAgICAgIGhlYWRlclJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGFibGVIZWFkLmFwcGVuZENoaWxkKGhlYWRlclJvdyk7XG4gICAgICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUhlYWQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0YWJsZUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuICAgICAgICB0YWJsZURhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93RGF0YSkge1xuICAgICAgICAgICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgICAgICByb3dEYXRhLmZvckVhY2goZnVuY3Rpb24gKGNlbGxEYXRhKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2VsbERhdGEpKTtcbiAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRhYmxlQm9keS5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGFibGVCb2R5KTtcbiAgICAgICAgcmV0dXJuIHRhYmxlO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0TGlzdEl0ZW1XaXRoQ2xvc2UoY2hpbGRFbGVtZXQsIGl0ZW1OYW1lLCBkZWxldGVIYW5kbGVyKSB7XG4gICAgICAgIGxldCBuZXdMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgbmV3TGkuYXBwZW5kQ2hpbGQoY2hpbGRFbGVtZXQpO1xuICAgICAgICBsZXQgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gXCJjbG9zZVwiO1xuICAgICAgICBjbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSAnJnRpbWVzOyc7XG4gICAgICAgIG5ld0xpLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZUhhbmRsZXIoaXRlbU5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ld0xpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0Qm9va21hcmtEaXNwbGF5KG5hbWUsIHJlc29sdmVkVXJsLCBkZWxldGVIYW5kbGVyKSB7XG4gICAgICAgIGxldCBhbmNob3JFbGVtZW50ID0gSHRtbFV0aWwuZ2V0QW5jaG9yRWxlbWVudChuYW1lLCByZXNvbHZlZFVybCk7XG4gICAgICAgIHJldHVybiBIdG1sVXRpbC5nZXRMaXN0SXRlbVdpdGhDbG9zZShhbmNob3JFbGVtZW50LCBuYW1lLCBkZWxldGVIYW5kbGVyKTtcbiAgICB9XG4gICAgc3RhdGljIGdldEFuY2hvckVsZW1lbnQobmFtZSwgcmVzb2x2ZWRVcmwpIHtcbiAgICAgICAgbGV0IHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiQVwiKTtcbiAgICAgICAgbGV0IHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShuYW1lKTtcbiAgICAgICAgeC5zZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIiwgXCJfYmFzZVwiKTtcbiAgICAgICAgeC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHJlc29sdmVkVXJsKTtcbiAgICAgICAgeC5hcHBlbmRDaGlsZCh0KTtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxufVxuZXhwb3J0cy5IdG1sVXRpbCA9IEh0bWxVdGlsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBQYXJhbWV0ZXJVdGlsIHtcbiAgICBzdGF0aWMgZ2V0UmVzb2x2ZWRVcmwodXJsLCBwYXJhbWV0ZXJzLCBjdXJyZW50VGFiKSB7XG4gICAgICAgIGxldCByZXNvbHZlZFVybCA9IHVybDtcbiAgICAgICAgaWYgKHBhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnMuaXRlbXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1WYWx1ZSA9IHRoaXMuZ2V0UnVudGltZVBhcmFtVmFsdWUocC52YWx1ZSwgY3VycmVudFRhYik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZWRVcmwgPSB0aGlzLnN1YnN0aXR1dGVWYWx1ZShyZXNvbHZlZFVybCwgcC5rZXksIHBhcmFtVmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc29sdmVkVXJsO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0Rm9ybWF0dGVkUGFyYW1OYW1lKHBhcmFtTmFtZSkge1xuICAgICAgICByZXR1cm4gXCJ7e1wiICsgcGFyYW1OYW1lICsgXCJ9fVwiO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0UnVudGltZVBhcmFtVmFsdWUocGFyYW1WYWx1ZSwgY3VycmVudEFjdGl2ZVRhYikge1xuICAgICAgICBpZiAocGFyYW1WYWx1ZS5pbmRleE9mKFBhcmFtZXRlclV0aWwuUEFSQU1fVFlQRV9TRVBBUkFUT1IpID4gMCkge1xuICAgICAgICAgICAgbGV0IGl0ZW1zID0gcGFyYW1WYWx1ZS5zcGxpdChQYXJhbWV0ZXJVdGlsLlBBUkFNX1RZUEVfU0VQQVJBVE9SKTtcbiAgICAgICAgICAgIGxldCBwYXJhbVZhbHVlVHlwZSA9IGl0ZW1zWzBdO1xuICAgICAgICAgICAgbGV0IGNvbXB1dGVkVmFsdWUgPSBpdGVtc1sxXTtcbiAgICAgICAgICAgIGlmIChwYXJhbVZhbHVlVHlwZSA9PSBQYXJhbWV0ZXJVdGlsLlBBUkFNX1RZUEVfQUNUSVZFX1RBQikge1xuICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0eU5hbWUgPSBpdGVtc1sxXTtcbiAgICAgICAgICAgICAgICBjb21wdXRlZFZhbHVlID0gdGhpcy5nZXRBY3RpdmVUYWJWYWx1ZShwcm9wZXJ0eU5hbWUsIGN1cnJlbnRBY3RpdmVUYWIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGFyYW1WYWx1ZVR5cGUgPT0gUGFyYW1ldGVyVXRpbC5QQVJBTV9UWVBFX0pTX1ZBTFVFKSB7XG4gICAgICAgICAgICAgICAgbGV0IGV4cHJlc3Npb24gPSBpdGVtc1sxXTtcbiAgICAgICAgICAgICAgICBjb21wdXRlZFZhbHVlID0gZXZhbChleHByZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21wdXRlZFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbVZhbHVlO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0QWN0aXZlVGFiVmFsdWUodmFyaWFibGUsIGN1cnJlbnRBY3RpdmVUYWIpIHtcbiAgICAgICAgbGV0IHZhclZhbHVlID0gXCJcIjtcbiAgICAgICAgaWYgKGN1cnJlbnRBY3RpdmVUYWIgJiYgY3VycmVudEFjdGl2ZVRhYi51cmwpIHtcbiAgICAgICAgICAgIGxldCB1cmkgPSBuZXcgVVJMKGN1cnJlbnRBY3RpdmVUYWIudXJsKTtcbiAgICAgICAgICAgIHZhclZhbHVlID0gdXJpW3ZhcmlhYmxlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFyVmFsdWU7XG4gICAgfVxuICAgIHN0YXRpYyBzdWJzdGl0dXRlVmFsdWUodXJsLCBwYXJhbU5hbWUsIHBhcmFtVmFsdWUpIHtcbiAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UodGhpcy5nZXRGb3JtYXR0ZWRQYXJhbU5hbWUocGFyYW1OYW1lKSwgcGFyYW1WYWx1ZSk7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxufVxuZXhwb3J0cy5QYXJhbWV0ZXJVdGlsID0gUGFyYW1ldGVyVXRpbDtcblBhcmFtZXRlclV0aWwuUEFSQU1fVFlQRV9BQ1RJVkVfVEFCID0gXCIkQWN0aXZlVGFiXCI7XG5QYXJhbWV0ZXJVdGlsLlBBUkFNX1RZUEVfSlNfVkFMVUUgPSBcIiRKc1wiO1xuUGFyYW1ldGVyVXRpbC5QQVJBTV9UWVBFX1NFUEFSQVRPUiA9IFwiOlwiO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==