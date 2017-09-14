class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(el) {
    if (typeof el === 'string') {
      return this.each(node => {
        node.innerHTML = el;
      });
    } else if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

  append(el) {
    if (el instanceof HTMLElement) {
      el = $l(el);
    }

    if (typeof el === 'string') {
      this.each(node => node.innerHTML += el);
    } else if (el instanceof DOMNodeCollection) {
      this.each(node => {
        el.each(elNode => {
          node.appendChild(elNode.cloneNode(true));
        });
      });
    }
  }

  empty() {
    this.html('');
  }

  attr(name, value) {
    if(name) {
      this.each(node => node.setAttribute(name, value));
    } else {
      return this.nodes;
    }
  }

  addClass(className) {
    this.each(node => node.classList.add(className));
  }

  removeClass(className) {
    this.each(node => node.classList.remove(className));
  }

  children() {
    let children = [];
    this.each(node => {
      children.push(node.childNodes);
    });
    return new DOMNodeCollection(children);
  }

  parent() {
    let parents = [];
    this.each(node => {
      parents.push(node.parentNode);
    });
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
    this.empty();
    this.each(node => {
      node.outerHTML = "";
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

  each(func) {
    this.nodes.forEach(func);
  }

} // end of DOMNodeCollection

module.exports = DOMNodeCollection;
