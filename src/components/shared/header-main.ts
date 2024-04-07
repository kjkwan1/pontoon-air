import { BaseComponent } from "../../interface/base-component";
import './header-main.scss';

export class HeaderMain extends BaseComponent {
    private mainText: string;
    private subtext: string;
    private icon: string;

    constructor(
        id: string,
        main: string,
        sub: string,
        icon: string,
    ) {
        super(id);
        this.mainText = main;
        this.subtext = sub;
        this.icon = icon;
    }
    public render(): void {
        try {
            const container = this.getContainer();
            const div = document.createElement('div');
            this.applyScrollFadeIn(div);
            const icon = document.createElement('i');
            const h2 = document.createElement('h2');
            const p = document.createElement('p');
            div.className = 'header-main appear';
            h2.className = 'header-main--main';
            p.className = 'header-main--sub';
            icon.className = `${this.icon} text-unhealthy-at-risk`;

            h2.append(icon);
            h2.innerHTML += this.mainText;
            p.innerText = this.subtext;

            div.append(h2);
            div.append(p);
            container.append(div);
        } catch(e) {
            console.error(e);
        }
    }
}