import { PM25Data } from "../../../interface/aqicn";
import { BaseComponent } from "../../../interface/base-component";
import { ElementBuilder } from "../../../shared/element-builder";

import './forecast.scss';

export class Forecast extends BaseComponent {
    private data: PM25Data[];
    constructor(id: string, forecastData: PM25Data[]) {
        super(id);
        this.data = forecastData;
    }

    public render(): void {
        try {
            const container = this.getContainer();
            const table = new ElementBuilder('table')
                .class('forecast appear')
                .appendHTML(`
                    <thead>
                        <tr class="forecast__desc">
                            <td class="forecast__cell">Day</td>
                            <td class="forecast__cell">Average</td>
                            <td class="forecast__cell">Max</td>
                            <td class="forecast__cell">Min</td>
                        </tr>
                    </thead>
                `)
                .build();

            this.applyScrollFadeIn(table);
            const tbody = new ElementBuilder('tbody')
                .class('forecast__tbody')
                .build();

            for (let forecast of this.data) {
                const { avg, day, max, min } = forecast;
                const tr = new ElementBuilder('tr')
                    .class('forecast__item appear')
                    .appendHTML(`
                        <td class="forecast__cell">${day}</td>
                    `)
                    .appendHTML(`
                        <td class="forecast__cell">${avg}</td>
                    `)
                    .appendHTML(`
                        <td class="forecast__cell">${max}</td>
                    `)
                    .appendHTML(`
                        <td class="forecast__cell">${min}</td>
                    `)
                    .build();
                    
                this.applyScrollFadeIn(tr);
                tbody.append(tr);
            }
            table.append(tbody);
            container.append(table);
        } catch(e) {
            console.error(e);
        }
    }
}