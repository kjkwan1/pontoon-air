import { Component } from "./component";

export class BaseComponent extends Component {
    public render(): void {
        throw new Error(`${BaseComponent.name}: Container not found`);
    }

    protected getContainer(): Element {
        const container = document.getElementById(this.id);
        if (!container) {
            throw new Error(`${BaseComponent.name}: Container not found`);
        }
        return container;
    }

    protected applyScrollFadeIn(element: Element) {
        const io = new IntersectionObserver((entries) => {
            for (let entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('inview');
                }
            }
        });
        io.observe(element);
    }
}