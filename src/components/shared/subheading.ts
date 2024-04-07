import { BaseComponent } from "../../interface/base-component";
import { ElementBuilder } from "../../shared/element-builder";
import './subheading.scss';

export class Subheading extends BaseComponent {
    private text: string;
    private icon: string | undefined;
    constructor(id: string, text: string, icon?: string) {
        super(id);
        this.text = text;
        this.icon = icon;
    }

    public render(): void {
        try {
            const container = this.getContainer();
            const text = new ElementBuilder('h3')
                .class('subheading appear')
                .build();

            if (this.icon) {
                const icon = new ElementBuilder('i')
                    .class(this.icon)
                    .classList('subheading--icon')
                    .build();

                text.append(icon);
                text.innerHTML += this.text;
            }
            this.applyScrollFadeIn(text);
            container.append(text);
        } catch(e) {
            console.error(e);
        }
    }
}