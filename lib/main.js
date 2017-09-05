const DOMNodeCollection = require('./dom_node_collection.js');

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
