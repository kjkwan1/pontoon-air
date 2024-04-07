import { BaseComponent } from '../../interface/base-component';
import { ElementBuilder } from '../../shared/element-builder';
import './header.scss';

export class Header extends BaseComponent {
    private navOptions: string[] = [
        'Home',
        'Search',
        'Calculator',
        'About',
    ];

    public render() {
        const container = this.getContainer();
        const header = new ElementBuilder('header')
            .class('header')
            .appendHTML(`
                <nav class="nav" id="nav">
                    <a class="nav__logo">
                        <p>Pontoon Air</p>
                    </a>
                </nav>
            `)
            .elementId('header')
            .build();
        
        let listItems: string = '';
        for (let option of this.navOptions) {
            listItems += `
                <li class="nav__item">
                    <p class="text-medium">${option}</p>
                </li>
            `;
        }
        const navList = new ElementBuilder('ul')
            .class('nav__list')
            .elementId('nav__list')
            .setHTML(listItems)
            .build();

        const homeRef = document.getElementById('home');
        container.insertBefore(header, homeRef);

        const nav = document.getElementById('nav');
        nav?.append(navList);
    }
}