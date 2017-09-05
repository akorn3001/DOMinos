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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

$l = selector => {
  if (typeof selector === "string") {
    const nodeList = document.querySelectorAll(selector);
    return new DOMNodeCollection(nodeList);
  }

  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }

  if (typeof selector === "function") {
    let queue = [];
    queue.push(selector);
    if (document.readyState === 'complete') {
      queue.forEach(func => {
        func();
      });
    }
  }

};

$l.extend = (target, ...objs) => {
  objs.forEach(obj => {
    for(let key in obj) { target[key] = obj[key]; }
  });
  return target;
};

$l.ajax = options => {
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
};

// tests
// $l( () => {
//   alert('the document is ready');
//   console.log('3');
//   console.log('2');
//   console.log('1');
// });


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(arg) {
    if (arg) {
      return this.nodes.forEach(node => {
        node.innerHTML = arg;
      });
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    return this.nodes.forEach(node => {
      node.innerHTML = "";
    });
  }

  append(obj) {
    return this.nodes.forEach(node => {
      if (obj instanceof HTMLElement) {
        node.innerHTML = obj.outerHTML;
      } else if (typeof obj === 'string') {
        node.innerHTML = obj;
      } else if (obj instanceof jQuery){
        obj.each((idx,el) => {
          node.innerHTML = el.outerHTML;
        });
      }
    });
  }

  attr(name, value) {
    if(name) {
      this.nodes.forEach(node => node.setAttribute(name, value));
    } else {
      return this.nodes;
    }
  }

  addClass(className) {
    this.attr('class', className);
  }


  removeClass() {
    this.nodes.forEach(node => node.removeAttribute('class'));
  }

  children() {
    let children = [];
    this.nodes.forEach(node => {
      children.push(node.childNodes);
    });
    return new DOMNodeCollection(children);
  }

  parent() {
    let parents = [];
    this.nodes.forEach(node => {
      parents.push(node.parentNode);
    });
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let found = [];
    this.nodes.forEach(node => {
      found.push(node.querySelectorAll(selector));
    });

    return new DOMNodeCollection(found);
  }

  remove() {
    this.empty();
    this.nodes.forEach(node => {
      node.outerHTML = "";
    });
  }

  on(action, callback) {
    this.nodes.forEach(node => {
      node.addEventListener(action, callback);
      node.eventCallback = callback;
    });
  }

  off(action) {
    this.nodes.forEach(node => {
      node.removeEventListener(action, node.eventCallback);
    });
  }

} // end of DOMNodeCollection

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);