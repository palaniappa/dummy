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
const bookmark_1 = __webpack_require__(/*! ../model/bookmark */ "./src/model/bookmark.ts");
const parameter_1 = __webpack_require__(/*! ../model/parameter */ "./src/model/parameter.ts");
const htmlutils_1 = __webpack_require__(/*! ../utils/htmlutils */ "./src/utils/htmlutils.ts");
const parameterutils_1 = __webpack_require__(/*! ../utils/parameterutils */ "./src/utils/parameterutils.ts");
const util_1 = __webpack_require__(/*! ../utils/util */ "./src/utils/util.ts");
const $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
class PopupController {
    constructor() {
        this.bookmarkEditId = null;
    }
    render() {
        console.log("rendering!");
        let p = this.renderBookmarks();
        this.renderBookmarkAddControls();
        this.renderParameters();
        this.renderParameterAddControls();
        return p.then(() => {
            console.log("rendering complete!");
        });
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
                bmList.className = "bmUList";
                return parameterutils_1.ParameterUtil.getAllParameterValues(parameters, currentTab).then((parameterValues) => {
                    bookmarks.items.forEach(bookmark => {
                        let url = bookmark.url;
                        let resolvedUrl = parameterutils_1.ParameterUtil.getResolvedUrl(url, parameters, parameterValues);
                        let bmUi = htmlutils_1.HtmlUtil.getBookmarkDisplay(bookmark, resolvedUrl, this.deleteBookmark.bind(this), this.editBookmark.bind(this));
                        bmList.appendChild(bmUi);
                    });
                    bookmarkListContainer.appendChild(bmList);
                });
            }
        });
    }
    editBookmark(bookmarkId) {
        store_1.Store.instance.getBookmark(bookmarkId).then((bookmark) => {
            if (bookmark) {
                this.bookmarkEditId = bookmarkId;
                $("#bmName").val(bookmark.name);
                $("#bmUrl").val(bookmark.url);
            }
        });
    }
    deleteBookmark(bookmarkId) {
        store_1.Store.instance.deleteBookmark(bookmarkId).then(() => {
            this.render();
        });
    }
    renderBookmarkAddControls() {
        $("#bmName").val('');
        $("#bmUrl").val('');
        this.bookmarkEditId = '';
        $('#bmAdd').off('click').on('click', () => {
            let bmName = $("#bmName").val();
            let bmUrl = $("#bmUrl").val();
            this.addBookmarkItem(this.bookmarkEditId, bmName, bmUrl).then(() => {
                this.render();
            });
        });
    }
    addBookmarkItem(id, name, url) {
        if (name && url) {
            if (id == '') {
                id = util_1.Util.getUniqueId(bookmark_1.BOOKMARK_ID_PREFIX);
            }
            let newBookmark = { id: id, name: name, url: url };
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
        $('#pmAdd').off('click').on('click', () => {
            let pmKey = $("#pmKey").val();
            let pmValue = $("#pmValue").val();
            this.addParameter(pmKey, pmValue).then(() => {
                this.render();
            });
        });
    }
    addParameter(key, value) {
        if (key && value) {
            let newParameter = { id: util_1.Util.getUniqueId(parameter_1.PARAMETER_ID_PREFIX), key: key, value: value };
            return store_1.Store.instance.addParameter(newParameter);
        }
        return;
    }
}
exports.PopupController = PopupController;
PopupController.instance = new PopupController();


/***/ }),

/***/ "./src/model/bookmark.ts":
/*!*******************************!*\
  !*** ./src/model/bookmark.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BOOKMARK_ID_PREFIX = "BM";
exports.BOOKMARK_ID_PREFIX = BOOKMARK_ID_PREFIX;


/***/ }),

/***/ "./src/model/parameter.ts":
/*!********************************!*\
  !*** ./src/model/parameter.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PARAMETER_ID_PREFIX = "PM";
exports.PARAMETER_ID_PREFIX = PARAMETER_ID_PREFIX;


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
    static getListItemWithClose(childElemet, itemId, deleteHandler, editHandler) {
        let newLi = document.createElement("li");
        newLi.className = "bmUListItem";
        newLi.appendChild(childElemet);
        let closeButton = HtmlUtil.getCloseButton(itemId, deleteHandler);
        newLi.appendChild(closeButton);
        newLi.ondblclick = () => {
            editHandler(itemId);
        };
        return newLi;
    }
    static getCloseButton(itemId, deleteHandler) {
        let closeButton = document.createElement("span");
        closeButton.className = "close";
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener("click", () => {
            deleteHandler(itemId);
        });
        return closeButton;
    }
    static getBookmarkDisplay(bm, resolvedUrl, deleteHandler, editHandler) {
        let anchorElement = HtmlUtil.getAnchorElement(bm.name, resolvedUrl);
        return HtmlUtil.getListItemWithClose(anchorElement, bm.id, deleteHandler, editHandler);
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

/***/ "./src/utils/util.ts":
/*!***************************!*\
  !*** ./src/utils/util.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    static getUniqueId(prefix) {
        return prefix + "_" + Math.floor(Math.random() * Date.now()).toString();
    }
}
exports.Util = Util;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXJzL3BvcHVwY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvYm9va21hcmsudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL3BhcmFtZXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wdXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2h0bWx1dGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOURhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInBvcHVwXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvcG9wdXAudHNcIixcInZlbmRvclwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc3RvcmVfMSA9IHJlcXVpcmUoXCIuL3N0b3JlXCIpO1xuY29uc3QgYm9va21hcmtfMSA9IHJlcXVpcmUoXCIuLi9tb2RlbC9ib29rbWFya1wiKTtcbmNvbnN0IHBhcmFtZXRlcl8xID0gcmVxdWlyZShcIi4uL21vZGVsL3BhcmFtZXRlclwiKTtcbmNvbnN0IGh0bWx1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL2h0bWx1dGlsc1wiKTtcbmNvbnN0IHBhcmFtZXRlcnV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvcGFyYW1ldGVydXRpbHNcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvdXRpbFwiKTtcbmNvbnN0ICQgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xuY2xhc3MgUG9wdXBDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib29rbWFya0VkaXRJZCA9IG51bGw7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJyZW5kZXJpbmchXCIpO1xuICAgICAgICBsZXQgcCA9IHRoaXMucmVuZGVyQm9va21hcmtzKCk7XG4gICAgICAgIHRoaXMucmVuZGVyQm9va21hcmtBZGRDb250cm9scygpO1xuICAgICAgICB0aGlzLnJlbmRlclBhcmFtZXRlcnMoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJQYXJhbWV0ZXJBZGRDb250cm9scygpO1xuICAgICAgICByZXR1cm4gcC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVuZGVyaW5nIGNvbXBsZXRlIVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldEN1cnJlbnRBY3RpdmVUYWIoKSB7XG4gICAgICAgIGxldCBxdWVyeVJlcSA9IHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH07XG4gICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkocXVlcnlSZXEsICh0YWJzKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRUYWIgPSB0YWJzWzBdO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoY3VycmVudFRhYik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICByZW5kZXJCb29rbWFya3MoKSB7XG4gICAgICAgIGxldCBibVByb21pc2UgPSBzdG9yZV8xLlN0b3JlLmluc3RhbmNlLmdldEJvb2ttYXJrcygpO1xuICAgICAgICBsZXQgY3RQcm9taXNlID0gdGhpcy5nZXRDdXJyZW50QWN0aXZlVGFiKCk7XG4gICAgICAgIGxldCBwYXJhbWV0ZXJzUHJvbWlzZSA9IHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuZ2V0UGFyYW1ldGVycygpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2JtUHJvbWlzZSwgcGFyYW1ldGVyc1Byb21pc2UsIGN0UHJvbWlzZV0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJvb2ttYXJrcyA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIGxldCBwYXJhbWV0ZXJzID0gcmVzdWx0WzFdO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRUYWIgPSByZXN1bHRbMl07XG4gICAgICAgICAgICBsZXQgYm9va21hcmtMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib29rbWFya0xpc3RcIik7XG4gICAgICAgICAgICBpZiAoYm9va21hcmtMaXN0Q29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgYm9va21hcmtMaXN0Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgIGxldCBibUxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICAgICAgICAgICAgYm1MaXN0LmNsYXNzTmFtZSA9IFwiYm1VTGlzdFwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbWV0ZXJ1dGlsc18xLlBhcmFtZXRlclV0aWwuZ2V0QWxsUGFyYW1ldGVyVmFsdWVzKHBhcmFtZXRlcnMsIGN1cnJlbnRUYWIpLnRoZW4oKHBhcmFtZXRlclZhbHVlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBib29rbWFya3MuaXRlbXMuZm9yRWFjaChib29rbWFyayA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gYm9va21hcmsudXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc29sdmVkVXJsID0gcGFyYW1ldGVydXRpbHNfMS5QYXJhbWV0ZXJVdGlsLmdldFJlc29sdmVkVXJsKHVybCwgcGFyYW1ldGVycywgcGFyYW1ldGVyVmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBibVVpID0gaHRtbHV0aWxzXzEuSHRtbFV0aWwuZ2V0Qm9va21hcmtEaXNwbGF5KGJvb2ttYXJrLCByZXNvbHZlZFVybCwgdGhpcy5kZWxldGVCb29rbWFyay5iaW5kKHRoaXMpLCB0aGlzLmVkaXRCb29rbWFyay5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJtTGlzdC5hcHBlbmRDaGlsZChibVVpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJvb2ttYXJrTGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChibUxpc3QpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWRpdEJvb2ttYXJrKGJvb2ttYXJrSWQpIHtcbiAgICAgICAgc3RvcmVfMS5TdG9yZS5pbnN0YW5jZS5nZXRCb29rbWFyayhib29rbWFya0lkKS50aGVuKChib29rbWFyaykgPT4ge1xuICAgICAgICAgICAgaWYgKGJvb2ttYXJrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib29rbWFya0VkaXRJZCA9IGJvb2ttYXJrSWQ7XG4gICAgICAgICAgICAgICAgJChcIiNibU5hbWVcIikudmFsKGJvb2ttYXJrLm5hbWUpO1xuICAgICAgICAgICAgICAgICQoXCIjYm1VcmxcIikudmFsKGJvb2ttYXJrLnVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkZWxldGVCb29rbWFyayhib29rbWFya0lkKSB7XG4gICAgICAgIHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuZGVsZXRlQm9va21hcmsoYm9va21hcmtJZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyQm9va21hcmtBZGRDb250cm9scygpIHtcbiAgICAgICAgJChcIiNibU5hbWVcIikudmFsKCcnKTtcbiAgICAgICAgJChcIiNibVVybFwiKS52YWwoJycpO1xuICAgICAgICB0aGlzLmJvb2ttYXJrRWRpdElkID0gJyc7XG4gICAgICAgICQoJyNibUFkZCcpLm9mZignY2xpY2snKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYm1OYW1lID0gJChcIiNibU5hbWVcIikudmFsKCk7XG4gICAgICAgICAgICBsZXQgYm1VcmwgPSAkKFwiI2JtVXJsXCIpLnZhbCgpO1xuICAgICAgICAgICAgdGhpcy5hZGRCb29rbWFya0l0ZW0odGhpcy5ib29rbWFya0VkaXRJZCwgYm1OYW1lLCBibVVybCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkQm9va21hcmtJdGVtKGlkLCBuYW1lLCB1cmwpIHtcbiAgICAgICAgaWYgKG5hbWUgJiYgdXJsKSB7XG4gICAgICAgICAgICBpZiAoaWQgPT0gJycpIHtcbiAgICAgICAgICAgICAgICBpZCA9IHV0aWxfMS5VdGlsLmdldFVuaXF1ZUlkKGJvb2ttYXJrXzEuQk9PS01BUktfSURfUFJFRklYKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuZXdCb29rbWFyayA9IHsgaWQ6IGlkLCBuYW1lOiBuYW1lLCB1cmw6IHVybCB9O1xuICAgICAgICAgICAgcmV0dXJuIHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuYWRkQm9va21hcmsobmV3Qm9va21hcmspO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmVuZGVyUGFyYW1ldGVycygpIHtcbiAgICAgICAgbGV0IHByb21pc2VQYXJhbWV0ZXJzID0gc3RvcmVfMS5TdG9yZS5pbnN0YW5jZS5nZXRQYXJhbWV0ZXJzKCk7XG4gICAgICAgIGxldCBnbG9iYWxQYXJhbWV0ZXJMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxQYXJhbWV0ZXJMaXN0XCIpO1xuICAgICAgICBpZiAoZ2xvYmFsUGFyYW1ldGVyTGlzdENvbnRhaW5lcikge1xuICAgICAgICAgICAgcHJvbWlzZVBhcmFtZXRlcnMudGhlbigocGFyYW1ldGVyc09iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzT2JqZWN0Lml0ZW1zLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyYW1JdGVtID0gW3Aua2V5LCBwLnZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2gocGFyYW1JdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxldCBoZWFyZGVycyA9IFtdO1xuICAgICAgICAgICAgICAgIGhlYXJkZXJzLnB1c2goXCJLZXlcIik7XG4gICAgICAgICAgICAgICAgaGVhcmRlcnMucHVzaChcIlZhbHVlXCIpO1xuICAgICAgICAgICAgICAgIGxldCB0YWJsZSA9IGh0bWx1dGlsc18xLkh0bWxVdGlsLmNyZWF0ZVRhYmxlKGl0ZW1zLCBoZWFyZGVycyk7XG4gICAgICAgICAgICAgICAgZ2xvYmFsUGFyYW1ldGVyTGlzdENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICBnbG9iYWxQYXJhbWV0ZXJMaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRhYmxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlclBhcmFtZXRlckFkZENvbnRyb2xzKCkge1xuICAgICAgICAkKFwiI3BtS2V5XCIpLnZhbChcIlwiKTtcbiAgICAgICAgJChcIiNwbVZhbHVlXCIpLnZhbChcIlwiKTtcbiAgICAgICAgJCgnI3BtQWRkJykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwbUtleSA9ICQoXCIjcG1LZXlcIikudmFsKCk7XG4gICAgICAgICAgICBsZXQgcG1WYWx1ZSA9ICQoXCIjcG1WYWx1ZVwiKS52YWwoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkUGFyYW1ldGVyKHBtS2V5LCBwbVZhbHVlKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRQYXJhbWV0ZXIoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoa2V5ICYmIHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgbmV3UGFyYW1ldGVyID0geyBpZDogdXRpbF8xLlV0aWwuZ2V0VW5pcXVlSWQocGFyYW1ldGVyXzEuUEFSQU1FVEVSX0lEX1BSRUZJWCksIGtleToga2V5LCB2YWx1ZTogdmFsdWUgfTtcbiAgICAgICAgICAgIHJldHVybiBzdG9yZV8xLlN0b3JlLmluc3RhbmNlLmFkZFBhcmFtZXRlcihuZXdQYXJhbWV0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG59XG5leHBvcnRzLlBvcHVwQ29udHJvbGxlciA9IFBvcHVwQ29udHJvbGxlcjtcblBvcHVwQ29udHJvbGxlci5pbnN0YW5jZSA9IG5ldyBQb3B1cENvbnRyb2xsZXIoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQk9PS01BUktfSURfUFJFRklYID0gXCJCTVwiO1xuZXhwb3J0cy5CT09LTUFSS19JRF9QUkVGSVggPSBCT09LTUFSS19JRF9QUkVGSVg7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFBBUkFNRVRFUl9JRF9QUkVGSVggPSBcIlBNXCI7XG5leHBvcnRzLlBBUkFNRVRFUl9JRF9QUkVGSVggPSBQQVJBTUVURVJfSURfUFJFRklYO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCAkID0gcmVxdWlyZShcImpxdWVyeVwiKTtcbmNvbnN0IHBvcHVwY29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvcG9wdXBjb250cm9sbGVyXCIpO1xubGV0IGNvdW50ID0gMDtcbiQoZnVuY3Rpb24gKCkge1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcbiAgICAgICAgcG9wdXBjb250cm9sbGVyXzEuUG9wdXBDb250cm9sbGVyLmluc3RhbmNlLnJlbmRlcigpO1xuICAgIH0pO1xuICAgIHZhciBjb2xsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbGxhcHNpYmxlXCIpO1xuICAgIHZhciBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBjb2xsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbGxbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICBpZiAoY29udGVudC5zdHlsZS5tYXhIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IGNvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gY29uc3QgcXVlcnlJbmZvID0ge1xuICAgIC8vICAgYWN0aXZlOiB0cnVlLFxuICAgIC8vICAgY3VycmVudFdpbmRvdzogdHJ1ZVxuICAgIC8vIH07XG4gICAgLy8gY2hyb21lLnRhYnMucXVlcnkocXVlcnlJbmZvLCBmdW5jdGlvbih0YWJzKSB7XG4gICAgLy8gICAkKCcjdXJsJykudGV4dCh0YWJzWzBdLnVybCk7XG4gICAgLy8gICAkKCcjdGltZScpLnRleHQobW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJykpO1xuICAgIC8vIH0pO1xuICAgIC8vIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7dGV4dDogY291bnQudG9TdHJpbmcoKX0pO1xuICAgIC8vICQoJyNjb3VudFVwJykuY2xpY2soKCk9PntcbiAgICAvLyAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7dGV4dDogKCsrY291bnQpLnRvU3RyaW5nKCl9KTtcbiAgICAvLyB9KTtcbiAgICAvLyAkKCcjY2hhbmdlQmFja2dyb3VuZCcpLmNsaWNrKCgpPT57XG4gICAgLy8gICBjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlfSwgZnVuY3Rpb24odGFicykge1xuICAgIC8vICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJzWzBdLmlkLCB7XG4gICAgLy8gICAgICAgY29sb3I6ICcjNTU1NTU1J1xuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBmdW5jdGlvbihtc2cpIHtcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdCBtZXNzYWdlOlwiLCBtc2cpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH0pO1xufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIEh0bWxVdGlsIHtcbiAgICBzdGF0aWMgY3JlYXRlVGFibGUodGFibGVEYXRhLCBoZWFkZXJzKSB7XG4gICAgICAgIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XG4gICAgICAgIGlmIChoZWFkZXJzKSB7XG4gICAgICAgICAgICBsZXQgdGFibGVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKTtcbiAgICAgICAgICAgIGxldCBoZWFkZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChoZWFkZXJEYXRhKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpO1xuICAgICAgICAgICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaGVhZGVyRGF0YSkpO1xuICAgICAgICAgICAgICAgIGhlYWRlclJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGFibGVIZWFkLmFwcGVuZENoaWxkKGhlYWRlclJvdyk7XG4gICAgICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUhlYWQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0YWJsZUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuICAgICAgICB0YWJsZURhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93RGF0YSkge1xuICAgICAgICAgICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgICAgICByb3dEYXRhLmZvckVhY2goZnVuY3Rpb24gKGNlbGxEYXRhKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2VsbERhdGEpKTtcbiAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRhYmxlQm9keS5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGFibGVCb2R5KTtcbiAgICAgICAgcmV0dXJuIHRhYmxlO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0TGlzdEl0ZW1XaXRoQ2xvc2UoY2hpbGRFbGVtZXQsIGl0ZW1JZCwgZGVsZXRlSGFuZGxlciwgZWRpdEhhbmRsZXIpIHtcbiAgICAgICAgbGV0IG5ld0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICBuZXdMaS5jbGFzc05hbWUgPSBcImJtVUxpc3RJdGVtXCI7XG4gICAgICAgIG5ld0xpLmFwcGVuZENoaWxkKGNoaWxkRWxlbWV0KTtcbiAgICAgICAgbGV0IGNsb3NlQnV0dG9uID0gSHRtbFV0aWwuZ2V0Q2xvc2VCdXR0b24oaXRlbUlkLCBkZWxldGVIYW5kbGVyKTtcbiAgICAgICAgbmV3TGkuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuICAgICAgICBuZXdMaS5vbmRibGNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgZWRpdEhhbmRsZXIoaXRlbUlkKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ld0xpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0Q2xvc2VCdXR0b24oaXRlbUlkLCBkZWxldGVIYW5kbGVyKSB7XG4gICAgICAgIGxldCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBjbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSBcImNsb3NlXCI7XG4gICAgICAgIGNsb3NlQnV0dG9uLmlubmVySFRNTCA9ICcmdGltZXM7JztcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZUhhbmRsZXIoaXRlbUlkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjbG9zZUJ1dHRvbjtcbiAgICB9XG4gICAgc3RhdGljIGdldEJvb2ttYXJrRGlzcGxheShibSwgcmVzb2x2ZWRVcmwsIGRlbGV0ZUhhbmRsZXIsIGVkaXRIYW5kbGVyKSB7XG4gICAgICAgIGxldCBhbmNob3JFbGVtZW50ID0gSHRtbFV0aWwuZ2V0QW5jaG9yRWxlbWVudChibS5uYW1lLCByZXNvbHZlZFVybCk7XG4gICAgICAgIHJldHVybiBIdG1sVXRpbC5nZXRMaXN0SXRlbVdpdGhDbG9zZShhbmNob3JFbGVtZW50LCBibS5pZCwgZGVsZXRlSGFuZGxlciwgZWRpdEhhbmRsZXIpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0QW5jaG9yRWxlbWVudChuYW1lLCByZXNvbHZlZFVybCkge1xuICAgICAgICBsZXQgeCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJBXCIpO1xuICAgICAgICBsZXQgdCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5hbWUpO1xuICAgICAgICB4LnNldEF0dHJpYnV0ZShcInRhcmdldFwiLCBcIl9iYXNlXCIpO1xuICAgICAgICB4LnNldEF0dHJpYnV0ZShcImhyZWZcIiwgcmVzb2x2ZWRVcmwpO1xuICAgICAgICB4LmFwcGVuZENoaWxkKHQpO1xuICAgICAgICByZXR1cm4geDtcbiAgICB9XG59XG5leHBvcnRzLkh0bWxVdGlsID0gSHRtbFV0aWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFV0aWwge1xuICAgIHN0YXRpYyBnZXRVbmlxdWVJZChwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHByZWZpeCArIFwiX1wiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSkudG9TdHJpbmcoKTtcbiAgICB9XG59XG5leHBvcnRzLlV0aWwgPSBVdGlsO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==