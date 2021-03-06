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
