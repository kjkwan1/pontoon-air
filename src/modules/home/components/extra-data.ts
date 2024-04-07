import { BaseComponent } from "../../../interface/base-component";
import { OpenWeatherComponents } from "../../../interface/open-weather";
import { getPollutionData } from "../../../services/open-weather";
import { ElementBuilder } from "../../../shared/element-builder";
import './extra-data.scss';

export class ExtraData extends BaseComponent {
    private lat: number;
    private lon: number;
    constructor(id: string, lat: number, lon: number) {
        super(id);
        this.lat = lat;
        this.lon = lon;
    }
    public render(): void {
        try {
            const container = this.getContainer();
            const ul = new ElementBuilder('ul')
                .class('extra-data appear')
                .elementId('extra-data')
                .build();

            getPollutionData(this.lat, this.lon)
                .then((response) => {
                    const data: OpenWeatherComponents = response.list[0].components;
                    for (let key of Object.keys(data)) {
                        const newKey = <keyof OpenWeatherComponents>key;
                        const li = new ElementBuilder('li')
                            .class('extra-data__item')
                            .appendHTML(`
                                <h2 class="extra-data__item--key">${key.toUpperCase()}</h2>
                                <h2 class="extra_data__item--value">${data[newKey]}</h2>
                            `)
                            .build();
                        ul.append(li);
                    } 

                })
                .finally(() => {
                    this.applyScrollFadeIn(ul);
                    container.append(ul);
                    this.resolve(null);
                })
        } catch(e) {
            console.error(e);
        }
    }
}