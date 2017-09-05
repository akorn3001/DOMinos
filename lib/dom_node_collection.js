class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(arg) {
    if (typeof arg === 'string') {
      return this.nodes.forEach(node => {
        node.innerHTML = arg;
      });
    } else if (this.nodes.length > 0) {
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
