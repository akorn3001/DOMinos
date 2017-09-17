const DOMNodeCollection = require('./dom_node_collection.js');

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
