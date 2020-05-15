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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/settings/index.ts");
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

/***/ "./src/settings/index.ts":
/*!*******************************!*\
  !*** ./src/settings/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Library_1 = __webpack_require__(/*! ../Library */ \"./src/Library.ts\");\r\n$(function () {\r\n    const update = () => {\r\n        fetch(\"/api/v1/getVoteTitle\").then(function (response) {\r\n            return response.json();\r\n        })\r\n            .then(function (json) {\r\n            const data = json;\r\n            $(\".title\").val(data.title);\r\n            $(\".current-title\").html(data.title);\r\n        });\r\n        fetch(\"/api/v1/getVoteType_s\").then(function (response) {\r\n            return response.json();\r\n        })\r\n            .then(function (json) {\r\n            const data = json;\r\n            $(\".data-group\").html(\"\");\r\n            $(\".current\").html(\"\");\r\n            $(\".oneline\").val(data[\"oneLine\"]);\r\n            Object.keys(data[\"data\"]).forEach(key => {\r\n                const element = data[\"data\"][key];\r\n                $(\".data-group\").append($('<div class=\"data\"></div>')\r\n                    .append($('<input class=\"text inline\" type=\"text\" placeholder=\"項目を入力...\">').val(element[\"text\"])).append($('<input class=\"color inline\" type=\"color\">').val(element[\"color\"])).append($('<input class=\"back-color inline\" type=\"color\">').val(element[\"backColor\"])).append($('<div class=\"cross\">✕</div>')));\r\n                $(\".current\").append($('<div class=\"data\"></div>').html(element[\"text\"]).css(\"color\", element[\"color\"]).css(\"background-color\", element[\"backColor\"]));\r\n            });\r\n        });\r\n    };\r\n    update();\r\n    $(\".btn.send\").on({\r\n        \"click\": () => {\r\n            let data = [];\r\n            $(\".data-group .data\").each((i, elm) => {\r\n                if ($(elm).find(\".text\").val() == \"\")\r\n                    return;\r\n                data.push({\r\n                    text: $(elm).find(\".text\").val(),\r\n                    color: $(elm).find(\".color\").val(),\r\n                    backColor: $(elm).find(\".back-color\").val()\r\n                });\r\n            });\r\n            fetch(\"/api/v1/setVoteType\", {\r\n                method: 'POST',\r\n                body: JSON.stringify({ data: data }),\r\n                headers: {\r\n                    'Content-Type': 'application/json'\r\n                }\r\n            }).then((rep) => {\r\n                if (rep.ok)\r\n                    update();\r\n            });\r\n        }\r\n    });\r\n    $(\".btn.title-update\").on({\r\n        \"click\": () => {\r\n            let data = $(\".title\").val().toString();\r\n            fetch(\"/api/v1/setVoteTitle\", {\r\n                method: 'POST',\r\n                body: JSON.stringify({ data: data }),\r\n                headers: {\r\n                    'Content-Type': 'application/json'\r\n                }\r\n            }).then((rep) => {\r\n                if (rep.ok)\r\n                    update();\r\n            });\r\n        }\r\n    });\r\n    $(\".btn.oneline-update\").on({\r\n        \"click\": () => {\r\n            let data = $(\".oneline\").val().toString();\r\n            fetch(\"/api/v1/setOneline\", {\r\n                method: 'POST',\r\n                body: JSON.stringify({ data: data }),\r\n                headers: {\r\n                    'Content-Type': 'application/json'\r\n                }\r\n            }).then((rep) => {\r\n                if (rep.ok)\r\n                    update();\r\n            });\r\n        }\r\n    });\r\n    $(\".btn.update\").on({\r\n        \"click\": update\r\n    });\r\n    $(\".btn.add\").on({\r\n        \"click\": () => {\r\n            $(\".data-group\").append($('<div class=\"data\"><input class=\"text inline\" type=\"text\" placeholder=\"項目を入力...\"><input class=\"color inline\" type=\"color\"><input class=\"back-color inline\" type=\"color\" value=\"#FFFFFF\"><div class=\"cross\">✕</div></div>'));\r\n        }\r\n    });\r\n    $(\".btn.allclear\").on({\r\n        \"click\": () => {\r\n            $(\".data-group\").html(\"\").append($('<div class=\"data\"><input class=\"text inline\" type=\"text\" placeholder=\"項目を入力...\"><input class=\"color inline\" type=\"color\"><input class=\"back-color inline\" type=\"color\" value=\"#FFFFFF\"><div class=\"cross\">✕</div></div>'));\r\n        }\r\n    });\r\n    $(document).on(\"click\", \".data-group .data .cross\", (e) => {\r\n        $(e.target).parent().remove();\r\n    });\r\n    $(\".btn.reset\").on({\r\n        \"click\": (e) => {\r\n            const target = e.target;\r\n            fetch(\"/api/v1/resetVoteData\", {\r\n                method: 'POST',\r\n                body: JSON.stringify({\r\n                    data: \"dummy\"\r\n                }),\r\n                headers: {\r\n                    'Content-Type': 'application/json'\r\n                }\r\n            }).then((rep) => {\r\n                console.log(rep.json());\r\n                if (rep.ok) {\r\n                    update();\r\n                    Library_1.Library.dialog(\"リセットしました。\", false, 400);\r\n                }\r\n            });\r\n        }\r\n    });\r\n    $(\".btn.start, .btn.stop\").on({\r\n        \"click\": (e) => {\r\n            const target = e.target;\r\n            fetch(\"/api/v1/setSettings\", {\r\n                method: 'POST',\r\n                body: JSON.stringify({\r\n                    data: {\r\n                        canVote: $(target).hasClass(\"start\")\r\n                    }\r\n                }),\r\n                headers: {\r\n                    'Content-Type': 'application/json'\r\n                }\r\n            }).then((rep) => {\r\n                console.log(rep.json());\r\n                if (rep.ok) {\r\n                    update();\r\n                    Library_1.Library.dialog(\"変更しました。\", false, 400);\r\n                }\r\n            });\r\n        }\r\n    });\r\n    $(\".btn.show, .btn.hide\").on({\r\n        \"click\": (e) => {\r\n            const target = e.target;\r\n            fetch(\"/api/v1/setSettings\", {\r\n                method: 'POST',\r\n                body: JSON.stringify({\r\n                    data: {\r\n                        viewOBS: $(target).hasClass(\"show\")\r\n                    }\r\n                }),\r\n                headers: {\r\n                    'Content-Type': 'application/json'\r\n                }\r\n            }).then((rep) => {\r\n                console.log(rep.json());\r\n                if (rep.ok) {\r\n                    update();\r\n                    Library_1.Library.dialog(\"変更しました。\", false, 400);\r\n                }\r\n            });\r\n        }\r\n    });\r\n    $(\".btn.data-show, .btn.data-hide\").on({\r\n        \"click\": (e) => {\r\n            const target = e.target;\r\n            fetch(\"/api/v1/setSettings\", {\r\n                method: 'POST',\r\n                body: JSON.stringify({\r\n                    data: {\r\n                        viewData: $(target).hasClass(\"data-show\")\r\n                    }\r\n                }),\r\n                headers: {\r\n                    'Content-Type': 'application/json'\r\n                }\r\n            }).then((rep) => {\r\n                console.log(rep.json());\r\n                if (rep.ok) {\r\n                    update();\r\n                    Library_1.Library.dialog(\"変更しました。\", false, 400);\r\n                }\r\n            });\r\n        }\r\n    });\r\n    $(\".btn.canChange, .btn.notChange\").on({\r\n        \"click\": (e) => {\r\n            const target = e.target;\r\n            fetch(\"/api/v1/setSettings\", {\r\n                method: 'POST',\r\n                body: JSON.stringify({\r\n                    data: {\r\n                        voteChange: $(target).hasClass(\"canChange\")\r\n                    }\r\n                }),\r\n                headers: {\r\n                    'Content-Type': 'application/json'\r\n                }\r\n            }).then((rep) => {\r\n                console.log(rep.json());\r\n                if (rep.ok) {\r\n                    update();\r\n                    Library_1.Library.dialog(\"変更しました。\", false, 400);\r\n                }\r\n            });\r\n        }\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack:///./src/settings/index.ts?");

/***/ })

/******/ });