export class BrowserFn {
  local(key) {
    const get = () => {
      return JSON.parse(localStorage.getItem(key) ?? "[]");
    };
    const set = (val) => {
      localStorage.setItem(key, JSON.stringify(val));
    };
    return { get, set };
  }
}
export class DomFn {
  isElem(elem, type = HTMLElement) {
    return elem instanceof type;
  }

  select(tag) {
    return document.querySelector(tag);
  }

  selectAll(tag) {
    return Array.from(document.querySelectorAll(tag));
  }

  create(tag, attribs) {
    const elem = document.createElement(tag);
    if (!attribs) return elem;
    for (const [attr, value] of Object.entries(attribs)) {
      elem.setAttribute(attr, value);
    }
    return elem;
  }

  removeChildren(parent) {
    if (!this.isElem(parent)) throw new Error(`Invalid parent: ${parent}.`);
    while (parent.firstElementChild) {
      parent.firstElementChild.remove();
    }
  }

  prependHtml(parent, html) {
    if (!this.isElem(parent)) throw new Error(`Invalid parent: ${parent}.`);
    parent.insertAdjacentHTML("afterbegin", html);
  }

  appendHtml(parent, html) {
    if (!this.isElem(parent)) throw new Error(`Invalid parent: ${parent}.`);
    parent.insertAdjacentHTML("beforeend", html);
  }
}
