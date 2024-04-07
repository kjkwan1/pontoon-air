import { BaseComponent } from "../../interface/base-component";
import { ElementBuilder } from "../../shared/element-builder";
import './contact.scss';

export class Contact extends BaseComponent {
    public render(): void {
        try {
            const container = this.getContainer();
            const table = new ElementBuilder('table')
                .class('contact__table appear-up')
                .elementId('contact__table')
                .appendHTML(`
                    <tr>
                        <td class="contact__table--title"><i class="contact__table--icon fa-solid fa-phone"></i>Phone</td>
                        <td class="contact__table--data">1-(123)-456-7890</td>
                    </tr>
                    <tr>
                        <td class="contact__table--title"><i class="contact__table--icon fa-solid fa-envelope"></i>Email</td>
                        <td class="contact__table--data">test@testmail.com</td>
                    </tr>
                    <tr>
                        <td class="contact__table--title"><i class="contact__table--icon fa-solid fa-globe"></i>Web</td>
                        <td class="contact__table--data">www.thissite.com</td>
                    </tr>
                    <tr>
                        <td class="contact__table--title"><i class="contact__table--icon fa-brands fa-github"></i>Github</td>
                        <td class="contact__table--data">github.com/testing1</td>
                    </tr>
                `)
                .build();
            this.applyScrollFadeIn(table);
            container.append(table);
        } catch(e) {
            console.error(e);
        }
    }
}