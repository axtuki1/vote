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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/vote/index.ts");
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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Library {\r\n    static dialog(content, force_ok = false, autoClose = 0) {\r\n        let dom = $(\"<div></div>\").addClass(\"dialog-wrapper\");\r\n        const dialog_close = () => {\r\n            dom.addClass(\"closing\");\r\n            setTimeout(() => {\r\n                dom.remove();\r\n            }, 2000);\r\n        };\r\n        dom.append($(\"<div></div>\").append($(\"<div></div>\").addClass(\"icon\").html('<i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>')).append($(\"<div></div>\").addClass(\"txt\").html(content)).append($(\"<div></div>\").addClass(\"button\").html(\"OK\").on({\r\n            \"click\": dialog_close\r\n        })).addClass(\"dialog\").on({ \"click\": (e) => { e.stopPropagation(); } }));\r\n        if (!force_ok) {\r\n            dom.on({\r\n                \"click\": dialog_close\r\n            });\r\n        }\r\n        if (autoClose > 0) {\r\n            setTimeout(dialog_close, autoClose);\r\n        }\r\n        $(\"body\").append(dom);\r\n        setTimeout(() => {\r\n            dom.addClass(\"show\");\r\n        }, 10);\r\n    }\r\n    static floor(base, ext) {\r\n        return Math.floor(base * (10 ** ext)) / (10 ** ext);\r\n    }\r\n}\r\nexports.Library = Library;\r\n\n\n//# sourceURL=webpack:///./src/Library.ts?");

/***/ }),

/***/ "./src/vote/index.ts":
/*!***************************!*\
  !*** ./src/vote/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Library_1 = __webpack_require__(/*! ../Library */ \"./src/Library.ts\");\r\n$(function () {\r\n    const update = () => {\r\n        fetch(\"/api/v1/getVoteTitle\").then(function (response) {\r\n            return response.json();\r\n        })\r\n            .then(function (json) {\r\n            const data = json;\r\n            if (data[\"title\"] != null) {\r\n                $(\".title\").html(data[\"title\"]);\r\n            }\r\n        }).catch((reason) => {\r\n        });\r\n        fetch(\"/api/v1/getVoteType\").then(function (response) {\r\n            return response.json();\r\n        })\r\n            .then(function (json) {\r\n            const data = json;\r\n            if (data[\"data\"] != null) {\r\n                let i = 1, oneline = data[\"oneLine\"];\r\n                if (data[\"oneLine\"] == null)\r\n                    oneline = 8;\r\n                $(\".vote-group\").html(\"\");\r\n                $(\".top\").hide();\r\n                $(\".vote-wrapper\").show();\r\n                Object.keys(data[\"data\"]).forEach(key => {\r\n                    const element = data[\"data\"][key];\r\n                    // if($(\".vote-group-\"+i).get(0) == null){\r\n                    //     $(\".vote-group\").append(\r\n                    //         $(\"<div></div>\").addClass(\"vote-group-\"+i)\r\n                    //     );\r\n                    // } else if($(\".vote-group-\"+i+\" > *\").length >= oneline){\r\n                    //     i++;\r\n                    //     $(\".vote-group\").append(\r\n                    //         $(\"<div></div>\").addClass(\"vote-group-\"+i)\r\n                    //     );\r\n                    // }\r\n                    let el = $(\"<div></div>\").addClass(\"vote\").append(element[\"text\"]).css(\"background\", element[\"backColor\"]).css(\"color\", element[\"color\"]);\r\n                    el.get(0).dataset.id = key;\r\n                    // $(\".vote-group-\"+i).append(el);\r\n                    $(\".vote-group\").append(el);\r\n                });\r\n            }\r\n            else if (data[\"mode\"] == \"error\") {\r\n                $(\".top\").html(data[\"text\"]);\r\n            }\r\n        }).catch((reason) => {\r\n        });\r\n    };\r\n    update();\r\n    const send = (type) => {\r\n        fetch(\"/api/v1/postVote\", {\r\n            method: 'POST',\r\n            body: JSON.stringify({ type: type }),\r\n            headers: {\r\n                'Content-Type': 'application/json'\r\n            }\r\n        }).then(function (response) {\r\n            return response.json();\r\n        })\r\n            .then(function (json) {\r\n            const data = json;\r\n            if (data[\"mode\"] == \"ok\") {\r\n                Library_1.Library.dialog(\"投票しました\");\r\n            }\r\n            else if (data[\"mode\"] == \"error\") {\r\n                Library_1.Library.dialog(data[\"text\"]);\r\n            }\r\n        });\r\n    };\r\n    $(document).on(\"click\", \".vote-group .vote\", (e) => {\r\n        const target = e.target;\r\n        console.log(target);\r\n        send(target.getAttribute(\"data-id\"));\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack:///./src/vote/index.ts?");

/***/ })

/******/ });