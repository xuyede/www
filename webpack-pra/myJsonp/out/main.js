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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/ajax.js":
/*!************************!*\
  !*** ./src/js/ajax.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\r\n    ajax : function (method, url, callback, data, flag) {\r\n        var xhr = null;\r\n        if (window.XMLHttpRequest) {\r\n            xhr = new XMLHttpRequest();\r\n        } else {\r\n            xhr = new ActiveXObject('Microsoft.XMLHttp');\r\n        }\r\n\r\n        xhr.onreadystatechange = function () {\r\n            if (xhr.readyState === 4) {\r\n                if (xhr.status === 200) {\r\n                    callback(xhr.responseText);\r\n                }\r\n            }\r\n        };\r\n\r\n        method = method.toUpperCase();\r\n        if (method === 'GET') {\r\n            xhr.open(method, url + '?' + data, flag);\r\n            xhr.send();\r\n        } else if (method === 'POST') {\r\n            xhr.open(method, url, flag);\r\n            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');\r\n            xhr.send(data);\r\n        }\r\n    }\r\n};\n\n//# sourceURL=webpack:///./src/js/ajax.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {\r\n    var $ = {\r\n        myAjax: function (param) {\r\n            //先获取域名等网络信息\r\n            var protocol = param.url.split('//')[0] + '//',\r\n                targetHost = param.url.split(protocol)[1].split('/')[0],\r\n                originHost = window.location.host;\r\n\r\n            // jsonp\r\n            if (param.dataType === 'jsonp') {\r\n                var jsonpTool = __webpack_require__(/*! ./jsonp.js */ \"./src/js/jsonp.js\"); \r\n                var obj = {\r\n                    url : param.url,\r\n                    data : param.data,\r\n                    jsonp : param.jsonp,\r\n                    jsonpCallback : param.jsonpCallback,\r\n                    success : param.success,\r\n                    targetHost : targetHost,\r\n                    originHost : originHost\r\n                };\r\n                jsonpTool.myJsonp(obj);\r\n            }\r\n            // ajax \r\n            else {\r\n                var ajaxTool = __webpack_require__(/*! ./ajax.js */ \"./src/js/ajax.js\");\r\n                if (targetHost !== originHost) {\r\n                    console.log('ajax can not cross domain');\r\n                    return;\r\n                } else {\r\n                    ajaxTool.ajax(param.type, param.url, param.success, param.data, true);\r\n                }\r\n            } \r\n\r\n        }\r\n    };\r\n    //https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su\r\n    $.myAjax({\r\n        type: 'GET', //POST\r\n        url: 'http://127.0.0.1:8001/src/js/getData.php',\r\n        data: 'page=one',\r\n        // dataType: 'jsonp',\r\n        // jsonp: 'cb',\r\n        success: doJSON\r\n    });\r\n\r\n    function doJSON (data) {\r\n        console.log(data);\r\n    }\r\n}).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/jsonp.js":
/*!*************************!*\
  !*** ./src/js/jsonp.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\r\n    myJsonp : function (param) {\r\n        // var param = {\r\n        //     url : param.url,\r\n        //     data : param.data,\r\n        //     jsonp : param.jsonp,\r\n        //     success : param.success,\r\n        //     targetHost : targetHost,\r\n        //     originHost : originHost\r\n        // };\r\n        \r\n        var isCrossDomain = true;\r\n        var cb = param.jsonp || 'callback';\r\n        var callback = 'jQuery' + new Date().getTime();\r\n\r\n        if (param.targetHost === param.originHost) {\r\n            isCrossDomain = false;\r\n        }\r\n\r\n        if (isCrossDomain) {\r\n            //跨域\r\n            window[callback] = param.success;\r\n            var oScript = document.createElement('script');\r\n            oScript.src = param.url + '?' + param.data + '&' + cb + '=' + callback;\r\n            document.head.appendChild(oScript);\r\n            document.head.removeChild(oScript);\r\n        } else {\r\n            //不跨域, GET请求\r\n            var xhr = null;\r\n            if (window.XMLHttpRequest) {\r\n                xhr = new XMLHttpRequest();\r\n            } else {\r\n                xhr = new ActiveXObject('Microsoft.XMLHttp');\r\n            }\r\n\r\n            xhr.onreadystatechange = function () {\r\n                if (xhr.readyState === 4) {\r\n                    if (xhr.status === 200) {\r\n                        // jQuery1829378123({})\r\n                        var temp = xhr.responseText.split(callback)[1];\r\n                        var result = temp.substring(1, temp.length - 1);\r\n                        window[callback] = param.success(result);\r\n                    }\r\n                }else {\r\n                    var error = param.error || function () {\r\n                        console.log('jsonp not crossDomain error');\r\n                    }\r\n                    error();\r\n                }\r\n            };\r\n\r\n            xhr.open('GET', param.url + '?' + param.data, flag);\r\n            xhr.send();\r\n        }\r\n    }\r\n};\n\n//# sourceURL=webpack:///./src/js/jsonp.js?");

/***/ })

/******/ });