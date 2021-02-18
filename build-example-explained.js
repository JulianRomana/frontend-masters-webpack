/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	// KEY_POINTS-2, Where the magic happends, the first module which is the input given 
/******/ 	// to webpack's config
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		 // KEY_POINTS-3 creation of the first 'module'
/******/ 		 // below is a syntax declares an object, affects it a dynamic property on the 
/******/ 		 // installedModules object, then affects the same object the module variable
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/     // KEY_POINTS-7, the call() below is going to be called, 
/******/     // notice that the previous one is still processing, and it will go on until 
/******/     // there is no deeply imported module, but thanks to caching, it'll save time 
/******/     // if a module is being used several times
/******/ 
/******/ 		// Execute the module function
/******/ 		// ❗️❗️❗️ KEY_POINTS-4 
/******/ 		// Everything happends from there
/******/ 		// It will call the moduleId(0), so the 1st function of the iife's args
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 		// KEY_POINTS-10 the above function is finally done for the modules[1] 
/******/    // KEY_POINTS-12 the above function is finally done for the modules[0]
/******/   
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/    
/******/ 		// and will be stored in the _footer__WEBPACK_IMPORTED_MODULE_0__ variable
/******/ 		
/******/ 		// KEY_POINTS-13 last step, will return an empty object
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
/******/ 	// Takes an object and a string, checks if this string is a property in the object, not herited
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/
/******/ 	// KEY_POINTS-1, the first function executed (after the iife ofc)
/******/ 	// Note that at this point, none of the above has been called
/******/ 	// it's just function declaration and methods attached to an object
/******/ 	
/******/ 	// KEY_POINTS-14 the iife is finally fully executed
/******/ 	// Since it's an iife, webpack will run it and do this with it later
/******/ 	// remember that we have a lot of unused methods that will probably do things later
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
  // KEY_POINTS-5, this functions is being executed, __webpack_exports__ === module.exports
  "use strict";
  // Sets an '__esModule' property on the 'module.exports' object
  __webpack_require__.r(__webpack_exports__);
  // // KEY_POINTS-6, will load every module that were imported in the original file (there we only have one)
  /* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
  
  /**
  * KEY_POINTS-11 Whohooo, finally there
  * _footer__WEBPACK_IMPORTED_MODULE_0__'s value is now "top"
  */
  
  /***/ }),
  /* 1 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
    // KEY_POINTS-8, thankfully this functions doesn't have module imported, it will be over soon
  "use strict";
  // __webpack_exports__ === module.exports
  // Sets an '__esModule' property on the 'module.export' object
  __webpack_require__.r(__webpack_exports__);
  // KEY_POINTS-9, this d.() method will add a "top" property to the__webpack_exports__ object 
  // (which is module.exports just as a small reminder)
  // and will contain a getter which will be the const top just below (which is hoisted thanks to
  // this iife's context)
   /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "top", function() { return top; });
    const top = "top";
  
  /***/ })
  /******/ ]);