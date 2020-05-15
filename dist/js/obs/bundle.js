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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/obs/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Library.ts":
/*!************************!*\
  !*** ./src/Library.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Library {\r\n    static dialog(content, force_ok = false, autoClose = 0) {\r\n        let dom = $(\"<div></div>\").addClass(\"dialog-wrapper\");\r\n        const dialog_close = () => {\r\n            dom.addClass(\"closing\");\r\n            setTimeout(() => {\r\n                dom.remove();\r\n            }, 2000);\r\n        };\r\n        dom.append($(\"<div></div>\").append($(\"<div></div>\").addClass(\"icon\").html('<i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>')).append($(\"<div></div>\").addClass(\"txt\").html(content)).append($(\"<div></div>\").addClass(\"button\").html(\"OK\").on({\r\n            \"click\": dialog_close\r\n        })).addClass(\"dialog\").on({ \"click\": (e) => { e.stopPropagation(); } }));\r\n        if (!force_ok) {\r\n            dom.on({\r\n                \"click\": dialog_close\r\n            });\r\n        }\r\n        if (autoClose > 0) {\r\n            setTimeout(dialog_close, autoClose);\r\n        }\r\n        $(\"body\").append(dom);\r\n        setTimeout(() => {\r\n            dom.addClass(\"show\");\r\n        }, 10);\r\n    }\r\n    static floor(base, ext) {\r\n        return Math.floor(base * (10 ^ ext)) / (10 ^ ext);\r\n    }\r\n}\r\nexports.Library = Library;\r\n\n\n//# sourceURL=webpack:///./src/Library.ts?");

/***/ }),

/***/ "./src/obs/index.ts":
/*!**************************!*\
  !*** ./src/obs/index.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Library_1 = __webpack_require__(/*! ../Library */ \"./src/Library.ts\");\r\n$(function () {\r\n    let url = \"ws://\" + document.domain + \":443/obsws\";\r\n    if (location.protocol == 'https:') {\r\n        \"wss://\" + document.domain + \"/obsws\";\r\n    }\r\n    const update = () => {\r\n        $(\".obs-area\").removeClass(\"show\");\r\n        if (!settings[\"viewOBS\"]) {\r\n            $(\".obs-area\").addClass(\"show\");\r\n        }\r\n        $(\".vote-group\").html(\"\");\r\n        const data = voteType;\r\n        let i = 1;\r\n        allData = 0;\r\n        Object.keys(voteData).forEach(key => {\r\n            allData = allData + voteData[key].length;\r\n        });\r\n        if (settings[\"viewData\"]) {\r\n            $(\".title\").html(title + \" [ \" + allData + \" ]\");\r\n        }\r\n        else {\r\n            $(\".title\").html(title);\r\n        }\r\n        Object.keys(data).forEach(key => {\r\n            const element = data[key];\r\n            if ($(\".vote-group-\" + i).get(0) == null) {\r\n                $(\".vote-group\").append($(\"<div></div>\").addClass(\"vote-group-\" + i));\r\n            }\r\n            else if ($(\".vote-group-\" + i + \" > *\").length >= oneline) {\r\n                i++;\r\n                $(\".vote-group\").append($(\"<div></div>\").addClass(\"vote-group-\" + i));\r\n            }\r\n            let el = $(\"<div></div>\").addClass(\"vote\");\r\n            el.append($(\"<div></div>\").html(element[\"text\"]));\r\n            el.get(0).dataset.id = key;\r\n            if (settings[\"viewData\"]) {\r\n                let per = \"0.0%\", len = 0;\r\n                if (voteData[element[\"text\"]] != null) {\r\n                    len = voteData[element[\"text\"]].length;\r\n                    if (((len / allData) * 100) % 1 == 0) {\r\n                        per = Library_1.Library.floor((len / allData) * 100, 1) + \".0%\";\r\n                    }\r\n                    else {\r\n                        per = Library_1.Library.floor((len / allData) * 100, 1) + \"%\";\r\n                    }\r\n                }\r\n                el.append($(\"<div></div>\").addClass(\"data-wrapper\").append($(\"<div></div>\").addClass(\"data-per\").html(per)).append($(\"<div></div>\").addClass(\"data\").html(len + \"\")));\r\n            }\r\n            $(\".vote-group-\" + i).append($(\"<div></div>\").addClass(\"vote-wrapper\").append(el).css(\"background\", element[\"backColor\"]).css(\"color\", element[\"color\"]).css(\"width\", \"calc(\" + 100 / oneline + \"% - 10px)\"));\r\n        });\r\n    };\r\n    const ws = new WebSocket(url);\r\n    let settings = {}, voteType = {}, voteData = {}, title = \"\", oneline = 8, allData = 0;\r\n    ws.addEventListener(\"message\", e => {\r\n        const data = JSON.parse(e.data);\r\n        // console.log(data);\r\n        if (data.mode == \"update-settings\") {\r\n            settings = data.settings;\r\n        }\r\n        else if (data.mode == \"update-title\") {\r\n            title = data.title;\r\n        }\r\n        else if (data.mode == \"update-type\") {\r\n            voteType = data.type;\r\n        }\r\n        else if (data.mode == \"update-data\") {\r\n            if (voteData[data.type] == null)\r\n                voteData[data.type] = [];\r\n            voteData = data.data;\r\n        }\r\n        else if (data.mode == \"update-oneline\") {\r\n            oneline = data.oneline;\r\n        }\r\n        else if (data.mode == \"hello\") {\r\n            voteData = data.data;\r\n            settings = data.settings;\r\n            voteType = data.voteType;\r\n            title = data.title;\r\n            oneline = data.oneLine;\r\n        }\r\n        update();\r\n    });\r\n    ws.addEventListener(\"open\", e => {\r\n        ws.send(JSON.stringify({\r\n            mode: \"hello\"\r\n        }));\r\n    });\r\n    ws.addEventListener(\"close\", e => {\r\n        Library_1.Library.dialog(\"通信が切断されました。\");\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack:///./src/obs/index.ts?");

/***/ })

/******/ });