const DOMNodeCollection = require('./dom_node_collection.js');

const _docReadyCallbacks = [];
let _docReady = false;


window.$l = selector => {
  if (typeof selector === "string") {
    const nodeList = document.querySelectorAll(selector);
    const variable1 = new DOMNodeCollection(nodeList);
    return variable1;
  }

  if (selector instanceof HTMLElement) {
    debugger
    const variable2 = new DOMNodeCollection([selector]);
    return variable2;
  }

  if (typeof selector === "function") {
    return registerDocReadyCallback(selector);
  }
};

registerDocReadyCallback = func => {
  if(!_docReady) {
    _docReadyCallbacks.push(func);
  } else {
    func();
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


function addToDo (event) {
  debugger
  event.preventDefault();
  const $form = $l(event.currentTarget);
  const toDoText = $form.find('input[type=text]').nodes[0][0].value;

  const $newToDo = $l('li', {
    text: toDoText,
    'class': 'incomplete'
  });

  $l('.todos-list').append($newToDo);
}

$l(() => {
  $l('form').on('submit', addToDo);
});

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach( func => func() );
});

// tests
// $l( () => {
//   alert('the document is ready');
//   console.log('3');
//   console.log('2');
//   console.log('1');
// });
