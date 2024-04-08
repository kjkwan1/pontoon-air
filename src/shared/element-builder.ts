interface IElementBuilder {
    class(className: string): ElementBuilder;
    classList(className: string): ElementBuilder;
    elementId: (id: string) => ElementBuilder;
    setHTML: (html: string) => ElementBuilder;
    append: (element: Element) => ElementBuilder;
    appendHTML: (html: string) => ElementBuilder;
    build(): Element;
}

export class ElementBuilder implements IElementBuilder {
    public element: Element;
    constructor(tag: string) {
        this.element = document.createElement(tag);
    }

    public class(className: string): ElementBuilder {
        this.element.className = className;
        return this;
    }

    public elementId(id: string): ElementBuilder {
        this.element.id = id;
        return this;
    }

    public setHTML(html: string): ElementBuilder {
        this.element.innerHTML = html;
        return this;
    }

    public append(element: Element): ElementBuilder {
        this.element.append(element);
        return this;
    }

    public appendHTML(html: string): ElementBuilder {
        this.element.insertAdjacentHTML('beforeend', html);
        return this;
    }

    public attribute(attribute: string, value: string): ElementBuilder {
        this.element.setAttribute(attribute, value);
        return this;
    }

    public classList(className: string): ElementBuilder {
        this.element.classList.add(className);
        return this;
    }

    public build(): Element {
        return this.element;
    }
}