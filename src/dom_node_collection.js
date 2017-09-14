class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(arg) {
    if (typeof arg === 'string') {
      return this.each(node => {
        node.innerHTML = arg;
      });
    } else if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    return this.each(node => {
      node.innerHTML = "";
    });
  }

  append(obj) {
    return this.each(node => {
      if (obj instanceof HTMLElement) {
        node.innerHTML = obj.outerHTML;
      } else if (typeof obj === 'string') {
        node.innerHTML += obj;
      } else if (obj instanceof DOMNodeCollection){
        obj.nodes.forEach(el => {
          node.innerHTML += el.outerHTML;
        });
      }
    });
  }

  attr(name, value) {
    if(name) {
      this.each(node => node.setAttribute(name, value));
    } else {
      return this.nodes;
    }
  }

  addClass(className) {
    this.attr('class', className);
  }


  removeClass() {
    this.each(node => node.removeAttribute('class'));
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
