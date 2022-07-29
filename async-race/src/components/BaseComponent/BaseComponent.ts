export default class BaseComponent {
  private element: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap) {
    this.element = document.createElement(tag);
  }

  attachTo(parent: HTMLElement | BaseComponent): this {
    if (parent instanceof BaseComponent) {
      parent.element.append(this.element);
    } else {
      parent.append(this.element);
    }

    return this;
  }

  setClass(classes: string | string[]): this {
    const args = Array.isArray(classes) ? classes : [classes];
    this.element.classList.add(...args);

    return this;
  }

  setAttribute(attr: string, value = ''): this {
    this.element.setAttribute(attr, value);

    return this;
  }

  setInnerText(content: string): this {
    this.element.innerText = content;

    return this;
  }

  setHandler(event: keyof HTMLElementEventMap, callback: (e: Event) => void): this {
    this.element.addEventListener(event, callback);
    return this;
  }
}
