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

const callbacks = [];
let documentReady = false;


window.$dom = selector => {
  if (typeof selector === "string") {
    const nodeList = document.querySelectorAll(selector);
    const variable1 = new DOMNodeCollection(nodeList);
    return variable1;
  }

  if (selector instanceof HTMLElement) {
    const variable2 = new DOMNodeCollection([selector]);
    return variable2;
  }

  if (typeof selector === "function") {
    return queueOrInvoke(selector);
  }
};

queueOrInvoke = callback => {
  if(!documentReady) {
    callbacks.push(callback);
  } else {
    callback();
  }
};

$dom.extend = (target, ...objs) => {
  objs.forEach(obj => {
    for(let key in obj) { target[key] = obj[key]; }
  });
  return target;
};

$dom.ajax = options => {
  const req = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };

  let updatedOptions = $dom.extend(defaults, options);

  req.open(updatedOptions.method, updatedOptions.url);

  req.onload = () => {
    if (req.status === 200) {
      updatedOptions.success(JSON.parse(req.response));
    } else {
      updatedOptions.error(JSON.parse(req.response));
    }
  };

  req.send(JSON.stringify(updatedOptions.data));
};

document.addEventListener('DOMContentLoaded', () => {
  documentReady = true;
  callbacks.forEach( callback => callback() );

});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(el) {
    if (typeof el === 'string') {
      this.each(node => node.innerHTML = el);
    } else if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

  append(el) {
    if (el instanceof HTMLElement) {
      el = $dom(el);
    }

    if (typeof el === 'string') {
      this.each(node => node.innerHTML += el);
    } else if (el instanceof DOMNodeCollection) {
      this.each(node => {
        el.each(elementNode => {
          node.appendChild(elementNode.cloneNode(true));
        });
      });

    }
  }

  empty() {
    this.html('');
  }

  attr(attrName, value) {
    if (typeof value === 'string') {
      this.each(node => node.setAttribute(attrName, value));
    } else {
      return this.nodes[0];
    }
  }

  addClass(className) {
    this.each(node => {
      node.classList.add(className);
    });
  }

  removeClass(className) {
    this.each(node => {
      node.classList.remove(className);
    });
  }

  toggleClass(className) {
    this.each(node => {
      if (node.classList.contains(className)) {
        node.classList.remove(className);
      } else {
        node.classList.add(className);
      }
    });
  }

  on(action, callback) {
    this.each(node => {
      node.addEventListener(action, callback);
      node.eventCallback = callback;
    });
  }

  off(action) {
    this.each(node => {
      node.removeEventListener(action, node.eventCallback);
    });
  }

  // TRAVERSAL METHODS
  children() {
    let childrenArray = [];
    this.each(node => {
      childrenArray = childrenArray.concat(Array.from(node.children));
    });
    return new DOMNodeCollection(childrenArray);
  }

  parent() {
    let parents = [];

    this.each(node => {
      let parent = node.parentNode;
      if (!parent.addedAlready) {
        parents.push(parent);
        parent.addedAlready = true;
      }
    });
    parents.forEach(node => node.addedAlready = false);
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let found = [];
    this.each(node => {
      found.push(node.querySelectorAll(selector));
    });

    return new DOMNodeCollection(found);
  }

  remove() {
    this.each(node => node.parentNode.removeChild(node));
  }

  // HELPER METHODS
  each(func) {
    this.nodes.forEach(func);
  }

} // end of DOMNodeCollection

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=DOMinos.js.map