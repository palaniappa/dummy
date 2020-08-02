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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background.ts":
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __webpack_require__(/*! ./controllers/store */ "./src/controllers/store.ts");
function polling() {
    console.log('polling');
    setTimeout(polling, 1000 * 30);
}
polling();
chrome.runtime.onInstalled.addListener(function () {
    store_1.Store.instance.initialize().then(() => {
        console.log("Initialize completed");
    });
    chrome.storage.sync.set({ color: '#3aa757' }, function () {
        console.log("The color is green.");
    });
});


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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXJzL3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxnQkFBZ0IsbUJBQU8sQ0FBQyx1REFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCw2QkFBNkIsbUJBQW1CO0FBQ2hEO0FBQ0EsS0FBSztBQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNmWTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0IsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQSxvQ0FBb0Msc0RBQXNEO0FBQzFGLG9DQUFvQyxrREFBa0Q7QUFDdEYsb0NBQW9DLCtDQUErQztBQUNuRixvQ0FBb0Msb0RBQW9EO0FBQ3hGLG9DQUFvQyxxRUFBcUU7QUFDekcsb0NBQW9DLDZFQUE2RTtBQUNqSCxtQ0FBbUMsNkJBQTZCLGtCQUFrQixrQkFBa0I7QUFDcEcsbUNBQW1DLCtCQUErQixrQkFBa0IsMEJBQTBCO0FBQzlHLG1DQUFtQywyQkFBMkIsa0JBQWtCLGlDQUFpQyxVQUFVLGNBQWMsWUFBWSxZQUFZO0FBQ2pLLG1DQUFtQyw2REFBNkQsWUFBWSxHQUFHO0FBQy9HLG1DQUFtQyxzRUFBc0UsZ0JBQWdCLEdBQUc7QUFDNUgsbUNBQW1DLG1GQUFtRixXQUFXLEdBQUc7QUFDcEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsOEJBQThCO0FBQ25FO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzdG9yZV8xID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvc3RvcmVcIik7XG5mdW5jdGlvbiBwb2xsaW5nKCkge1xuICAgIGNvbnNvbGUubG9nKCdwb2xsaW5nJyk7XG4gICAgc2V0VGltZW91dChwb2xsaW5nLCAxMDAwICogMzApO1xufVxucG9sbGluZygpO1xuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKCkge1xuICAgIHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuaW5pdGlhbGl6ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkluaXRpYWxpemUgY29tcGxldGVkXCIpO1xuICAgIH0pO1xuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHsgY29sb3I6ICcjM2FhNzU3JyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGNvbG9yIGlzIGdyZWVuLlwiKTtcbiAgICB9KTtcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBTdG9yZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycyA9IHsgaXRlbXM6IFtdIH07XG4gICAgICAgIHRoaXMuYm9va21hcmtzID0geyBpdGVtczogW10gfTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZURlZmF1bHRzKCkge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuaXRlbXMucHVzaCh7IGtleTogXCJDdXJyZW50VGFiT3JpZ2luXCIsIHZhbHVlOiBcIiRBY3RpdmVUYWI6b3JpZ2luXCIgfSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5pdGVtcy5wdXNoKHsga2V5OiBcIkN1cnJlbnRUYWJIb3N0XCIsIHZhbHVlOiBcIiRBY3RpdmVUYWI6aG9zdFwiIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuaXRlbXMucHVzaCh7IGtleTogXCJpc3N1ZXJJZFwiLCB2YWx1ZTogXCIxMjMzNDUzNEFBRkdERkcyMzRcIiB9KTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLml0ZW1zLnB1c2goeyBrZXk6IFwiYXVkaWVuY2VJZFwiLCB2YWx1ZTogXCJBVUQxMjMzNDUzNEFBRkdERkcyMzRcIiB9KTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLml0ZW1zLnB1c2goeyBrZXk6IFwiU2VhcmNoVGV4dFwiLCB2YWx1ZTogXCIkSnM6J25ld3Mgb24gJyArIG5ldyBEYXRlKCkudG9TdHJpbmcoKVwiIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuaXRlbXMucHVzaCh7IGtleTogXCJEYXlPZldlZWtcIiwgdmFsdWU6IFwiJEpzOm5ldyBEYXRlKCkudG9TdHJpbmcoKS5zcGxpdCgnICcpWzBdICsgJ2RheSdcIiB9KTtcbiAgICAgICAgdGhpcy5ib29rbWFya3MuaXRlbXMucHVzaCh7IG5hbWU6IFwiVGVuYW50SW5mb1wiLCB1cmw6IFwie3tDdXJyZW50VGFiT3JpZ2lufX0vcWEvY2RwL2NkcC5qc3BcIiB9KTtcbiAgICAgICAgdGhpcy5ib29rbWFya3MuaXRlbXMucHVzaCh7IG5hbWU6IFwiR2VuZXJhdGUgSldUXCIsIHVybDogXCJ7e0N1cnJlbnRUYWJPcmlnaW59fS9xYS9jZHAvZ2VuZXJhdGVqd3QuanNwXCIgfSk7XG4gICAgICAgIHRoaXMuYm9va21hcmtzLml0ZW1zLnB1c2goeyBuYW1lOiBcIk1pbnQgSldUXCIsIHVybDogXCJ7e0N1cnJlbnRUYWJPcmlnaW59fS9xYS9jZHAvbWludGVkand0LmpzcD9pc3N1ZXJJZD17e2lzc3VlcklkfX0mYXVkaWVuY2VJZD17e2F1ZGllbmNlSWR9fSZ0eXBlPUpXVFwiIH0pO1xuICAgICAgICB0aGlzLmJvb2ttYXJrcy5pdGVtcy5wdXNoKHsgbmFtZTogXCJOZXdzIFRvZGF5XCIsIHVybDogXCJodHRwczovL3d3dy5nb29nbGUuY29tL3NlYXJjaD9xPXt7U2VhcmNoVGV4dH19XCIgfSk7XG4gICAgICAgIHRoaXMuYm9va21hcmtzLml0ZW1zLnB1c2goeyBuYW1lOiBcIkdvb2dsZSBDdXJyZW50IEhvc3RcIiwgdXJsOiBcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vc2VhcmNoP3E9e3tDdXJyZW50VGFiSG9zdH19XCIgfSk7XG4gICAgICAgIHRoaXMuYm9va21hcmtzLml0ZW1zLnB1c2goeyBuYW1lOiBcIkpva2Ugb24gRGF5XCIsIHVybDogXCJodHRwczovL3d3dy5nb29nbGUuY29tL3NlYXJjaD9xPVRlbGwgbWUgYSBqb2tlIGFib3V0IHt7RGF5T2ZXZWVrfX1cIiB9KTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRGVmYXVsdHMoKTtcbiAgICAgICAgbGV0IHAxID0gdGhpcy5zYXZlUGFyYW1ldGVycyh0aGlzLnBhcmFtZXRlcnMpO1xuICAgICAgICBsZXQgcDIgPSB0aGlzLnNhdmVCb29rbWFya3ModGhpcy5ib29rbWFya3MpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3AxLCBwMl0pLnRoZW4oKTtcbiAgICB9XG4gICAgZ2V0Qm9va21hcmtzKCkge1xuICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFwiQm9va21hcmtMaXN0XCIsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9va21hcmtzID0gcmVzdWx0LkJvb2ttYXJrTGlzdDtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGJvb2ttYXJrcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBnZXRQYXJhbWV0ZXJzKCkge1xuICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFwiUGFyYW1MaXN0XCIsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1ldGVycyA9IHJlc3VsdC5QYXJhbUxpc3Q7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHNhdmVQYXJhbWV0ZXJzKHBhcmFtZXRlcnNPYmplY3QpIHtcbiAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7IFBhcmFtTGlzdDogcGFyYW1ldGVyc09iamVjdCB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTYXZlZCBwYXJhbWV0ZXJzXCIpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHNhdmVCb29rbWFya3MoYm9va21hcmtzT2JqZWN0KSB7XG4gICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoeyBCb29rbWFya0xpc3Q6IGJvb2ttYXJrc09iamVjdCB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTYXZlZCBib29rbWFya3NcIik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgYWRkQm9va21hcmsobmV3Qm9va21hcmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Qm9va21hcmtzKCkudGhlbihib29rbWFya3MgPT4ge1xuICAgICAgICAgICAgYm9va21hcmtzLml0ZW1zLnB1c2gobmV3Qm9va21hcmspO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZUJvb2ttYXJrcyhib29rbWFya3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZGVsZXRlQm9va21hcmsoYm9va21hcmtUb0RlbGV0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCb29rbWFya3MoKS50aGVuKGJvb2ttYXJrcyA9PiB7XG4gICAgICAgICAgICBib29rbWFya3MuaXRlbXMgPSBib29rbWFya3MuaXRlbXMuZmlsdGVyKGJtID0+IGJtLm5hbWUgIT0gYm9va21hcmtUb0RlbGV0ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zYXZlQm9va21hcmtzKGJvb2ttYXJrcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRQYXJhbWV0ZXIobmV3UGFyYW1ldGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcnMoKS50aGVuKHBhcmFtZXRlcnMgPT4ge1xuICAgICAgICAgICAgcGFyYW1ldGVycy5pdGVtcy5wdXNoKG5ld1BhcmFtZXRlcik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zYXZlUGFyYW1ldGVycyhwYXJhbWV0ZXJzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5TdG9yZSA9IFN0b3JlO1xuU3RvcmUuaW5zdGFuY2UgPSBuZXcgU3RvcmUoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=